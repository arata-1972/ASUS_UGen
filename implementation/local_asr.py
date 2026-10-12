"""Optional offline Hugging Face Whisper adapter. No model download or remote API."""
import argparse,json,os,sys,time,tempfile,subprocess,resource
from pathlib import Path

def fail(code,message):print(json.dumps({'status':'failed','code':code,'message':message}));sys.exit(1)
p=argparse.ArgumentParser();p.add_argument('--audio',required=True);p.add_argument('--language',choices=['tw','zh'],required=True);a=p.parse_args()
model_dir=Path(os.environ.get('BRIDGE_LOCAL_WHISPER_DIR',''))
if not os.environ.get('BRIDGE_LOCAL_WHISPER_DIR'):fail('LOCAL_MODEL_NOT_CONFIGURED','Set BRIDGE_LOCAL_WHISPER_DIR to a complete local Hugging Face Whisper snapshot.')
if not model_dir.is_dir():fail('LOCAL_MODEL_MISSING','Configured local model directory was not found.')
required=['config.json','preprocessor_config.json','tokenizer_config.json','vocab.json','merges.txt']
missing=[x for x in required if not (model_dir/x).is_file()]
if missing or not any((model_dir/x).is_file() for x in ['model.safetensors','pytorch_model.bin']):fail('LOCAL_MODEL_INCOMPLETE','Local Whisper snapshot is incomplete; no automatic download was attempted.')
if a.language=='tw' and not os.environ.get('BRIDGE_LOCAL_TAIGI_ADAPTER_DIR'):fail('LOCAL_TAIGI_MODEL_NOT_CONFIGURED','Taiwanese requires the matching locally available fine-tuned adapter; generic Whisper is not substituted.')
started=time.perf_counter()
try:
 import torch,soundfile as sf
 from transformers import WhisperProcessor,WhisperForConditionalGeneration
 with tempfile.TemporaryDirectory(prefix='speechbridge-local-') as d:
  wav=Path(d)/'input.wav';subprocess.run(['ffmpeg','-v','error','-y','-i',a.audio,'-ar','16000','-ac','1',str(wav)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  samples,rate=sf.read(wav,dtype='float32')
 processor=WhisperProcessor.from_pretrained(str(model_dir),local_files_only=True)
 model=WhisperForConditionalGeneration.from_pretrained(str(model_dir),local_files_only=True).to('cpu').eval()
 if a.language=='tw':
  from peft import PeftModel
  adapter=Path(os.environ['BRIDGE_LOCAL_TAIGI_ADAPTER_DIR'])
  if not adapter.is_dir():fail('LOCAL_TAIGI_ADAPTER_MISSING','Taiwanese adapter directory was not found.')
  model=PeftModel.from_pretrained(model,str(adapter),local_files_only=True)
 inputs=processor(samples,sampling_rate=rate,return_tensors='pt')
 with torch.inference_mode():ids=model.generate(inputs.input_features,language='chinese',task='transcribe',max_new_tokens=448)
 text=processor.batch_decode(ids,skip_special_tokens=True)[0].strip()
 if not text:fail('ASR_EMPTY_TEXT','Local inference produced no text.')
 print(json.dumps({'text':text,'source_language':a.language,'backend':'local_hf_whisper_cpu','device':'cpu','latency_ms':(time.perf_counter()-started)*1000,'python_max_rss_bytes':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss*(1 if sys.platform=='darwin' else 1024),'hardware_accelerator_verified':False},ensure_ascii=False))
except ImportError:fail('LOCAL_DEPENDENCY_MISSING','Install the documented local dependencies; this prototype does not install them automatically.')
except Exception:fail('LOCAL_INFERENCE_FAILED','Local Whisper inference failed; no server fallback or model download occurred.')
