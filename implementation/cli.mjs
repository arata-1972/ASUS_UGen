import {pipeline,BridgeError} from './bridge.mjs';
const args=process.argv.slice(2),value=x=>args[args.indexOf(x)+1];
if(!args.includes('--audio')||!args.includes('--language')){console.error('Usage: node cli.mjs --audio /absolute/input.wav --language tw|zh [--translate] [--tts] --out /absolute/output');process.exitCode=2;}
else try{console.log(JSON.stringify(await pipeline({audioPath:value('--audio'),language:value('--language'),translation:args.includes('--translate'),tts:args.includes('--tts'),outDir:args.includes('--out')?value('--out'):'./run-output'}),null,2));}catch(e){console.error(JSON.stringify({status:'failed',code:e.code||'LOCAL_ERROR',message:e instanceof BridgeError?e.message:'Local input/output failed.'}));process.exitCode=1;}
