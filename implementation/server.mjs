import http from 'node:http';import {readFile} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import {createBridge,BridgeError,config} from './bridge.mjs';
const cfg=config(),bridge=createBridge(cfg);let busy=false;const ui=fileURLToPath(new URL('./public/index.html',import.meta.url));
const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
const server=http.createServer(async(req,res)=>{try{
 if(req.method==='GET'&&req.url==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(ui));return;}
 if(req.method==='GET'&&req.url==='/api/status'){json(res,200,{name:'TaiwaneseSpeechBridge',backend:'self_hosted_server_api',asr_tw_configured:!!cfg.taigiAsr,asr_zh_configured:!!cfg.multiAsr,translation_configured:!!cfg.translationBase,tts_tw_configured:!!cfg.taigiTtsBase,tts_zh_configured:!!cfg.chineseTtsBase&&!!cfg.chineseTtsKey,asr_backend:cfg.asrBackend,local_model_execution:cfg.asrBackend==='local_hf_whisper',openvino_implemented:false,ugen_hardware_verified:false,llm_used:false});return;}
 if(req.method!=='POST'||!['/api/recognize','/api/translate','/api/speak'].includes(req.url)){json(res,404,{code:'NOT_FOUND'});return;}
 if(busy){json(res,429,{code:'BUSY',message:'One request is running; wait before retrying.'});return;}
 let bytes=0,parts=[];for await(const chunk of req){bytes+=chunk.length;if(bytes>15*1024*1024)throw new BridgeError('BODY_TOO_LARGE','Request exceeds 15 MiB.',413);parts.push(chunk);}let body;try{body=JSON.parse(Buffer.concat(parts).toString());}catch{throw new BridgeError('INVALID_JSON','Expected JSON.',400);}
 busy=true;try{
 if(req.url==='/api/recognize')json(res,200,await bridge.recognize(Buffer.from(body.audio||'','base64'),body.language));
 if(req.url==='/api/translate')json(res,200,await bridge.translate(body.text,body.language));
 if(req.url==='/api/speak'){const {audio,mime,...meta}=await bridge.speak(body.text,body.language);res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-store','X-Bridge-Latency-Ms':String(meta.latency_ms),'X-Bridge-Audio-Sha256':meta.audio_sha256});res.end(audio);}
 }finally{busy=false;}
 }catch(e){json(res,e instanceof BridgeError?e.status:500,{status:'failed',code:e.code||'LOCAL_ERROR',message:e instanceof BridgeError?e.message:'Local server failed.'});}});
server.on('error',e=>{console.error(JSON.stringify({status:'failed',code:e.code||'SERVER_START_FAILED',message:'Local server could not bind; no running UI was claimed.'}));process.exitCode=1;});
server.listen(Number(process.env.BRIDGE_PORT||8766),'127.0.0.1',()=>console.log(JSON.stringify({ui:'http://127.0.0.1:'+server.address().port,backend:cfg.backend,hardware_verified:false})));
