# TaiwaneseSpeechBridge — working integration prototype


TaiwaneseSpeechBridge accepts WAV speech, transcribes it, optionally translates Taiwanese ↔ Mandarin, and optionally generates speech in the other language. The local browser UI lets a person inspect and edit both the recognized text and translation before requesting speech. Language selection is manual. There is no LLM, automatic language detector, task-card extraction, or automatic business action.

The implemented default backend calls existing self-hosted ASR, EOLE translation, and TTS HTTP services. Running this UI on a local computer does **not** mean inference ran on that computer or on ASUS hardware. `self_hosted_server_api` metrics include upstream processing and network latency. No UGen300/Hailo, B70/Intel GPU, or OpenVINO execution was verified. Hardware paths are unimplemented and return explicit errors rather than a simulated result.

Requirements: Node.js 20 or later; the default HTTP integration has no npm dependencies. `npm test` uses Node's built-in test runner and in-memory protocol fixtures. Fixture tests are not model accuracy, throughput, or hardware benchmarks. The optional offline CPU ASR adapter additionally requires installed Python, PyTorch, Transformers, SoundFile, ffmpeg, and a complete local Hugging Face Whisper snapshot; Taiwanese also requires its matching fine-tuned PEFT adapter. Models are never automatically downloaded.

From this directory:

```sh
npm test
node server.mjs
```

Open `http://127.0.0.1:8766`. The server binds only to loopback. With no endpoint configuration, the UI opens but speech requests fail explicitly with `BACKEND_NOT_CONFIGURED`. Supply the authorized upstream URLs listed in `config.example.env` through your existing environment/configuration mechanism. Configure `BRIDGE_CHINESE_TTS_KEY` privately for Mandarin TTS. No key, existing secret configuration, model weights, or customer credentials belong in this package or a published repository. Do not configure paid customer billing gateways as backend URLs.

Use the CLI after configuration:

```sh
node cli.mjs --audio /absolute/input.wav --language tw --translate --tts --out /absolute/run-output
```

Use `--language zh` for Mandarin → Taiwanese. Omit `--translate` or `--tts` to disable that step. A successful run creates `result.json` and, when TTS is requested, `output.wav`. An in-progress `partial.json` records completed ASR/translation stages; it is not a success report. HTTP failures, missing text, incompatible translation responses, unexpected audio hosting origins, and missing credentials fail explicitly. Logs never include authorization headers or upstream error bodies.

Optional offline ASR:

```sh
export BRIDGE_ASR_BACKEND=local_hf_whisper
export BRIDGE_LOCAL_WHISPER_DIR=/absolute/complete-whisper-snapshot
export BRIDGE_LOCAL_TAIGI_ADAPTER_DIR=/absolute/matching-taigi-adapter
node cli.mjs --audio /absolute/input.wav --language tw --out /absolute/local-run
```

This is a CPU Hugging Face execution path, not OpenVINO or UGen execution. Missing/incomplete models cause `LOCAL_MODEL_NOT_CONFIGURED`, `LOCAL_MODEL_INCOMPLETE`, or a corresponding explicit error. There is no server fallback. EOLE and TTS remain server APIs if their optional steps are enabled.

UI flow: choose Taiwanese or Mandarin → select a WAV file → transcribe → inspect/edit the original → translate if needed → inspect/edit translation → request and play speech → download audio and inspect measured stage latencies. The UI does not access the microphone or upload any file before the person clicks transcription. Synthetic speech is a transport/integration test, not evidence of real-speaker recognition quality.

See `ARCHITECTURE.md`, `BENCHMARK.md`, and `evidence/`. Version 5 artifacts remain as historical materials. The version 7 submission retains the version 6 implementation and measurements; no competition form has been submitted.
