# Prototype demo instructions


This is a local review procedure, not an uploaded competition video. The published Traditional Chinese video script is linked from the repository README.

### 1. Local UI

Start the implemented loopback server:

```sh
cd /absolute/path/to/ASUS_UGen/implementation
node server.mjs
```

Open `http://127.0.0.1:8766`. Select Taiwanese or Mandarin, choose a permitted WAV, then explicitly click transcription. The UI has no microphone recording. Inspect/edit the original, request translation if needed, inspect/edit the translation, then request speech and replay/download it. Do not upload customer audio or change upstream destinations without authorization.

With no backend configuration, demonstrate the real `BACKEND_NOT_CONFIGURED` error. Do not replace it with a fixture transcript. The unconfigured local UI check is distinct from the recorded HTTP integration evidence.

### 2. Integration evidence already recorded

Review `BENCHMARK.md` and the raw evidence before recording a successful step:

- The Mandarin synthetic input completed ASR and EOLE translation. TTS generated audio, but the first automated download rejected an unconfigured origin.
- The already generated Taiwanese audio was recovered; no missing TTS generation time was fabricated.
- That Taiwanese synthetic audio completed ASR → EOLE → Mandarin TTS in the reverse CLI run. The input hash matches the recovered output hash.
- Recognized words contain errors that propagated through translation. This is an API integration check, not a reception conversation or accuracy result.
- CLI execution does not pause for human edits. UI editing and live CLI completion are distinct evidence.

Use the recorded generated WAVs for playback only with their synthetic-input labels. Keep the original transcripts and errors visible. Do not edit a measured result into a correct answer.

### 3. Tests and hardware

```sh
cd /absolute/path/to/ASUS_UGen/implementation
npm test
```

Twelve fixture/protocol/error tests pass. They do not prove ASR quality or device performance. The optional local CPU ASR requires complete model/adapter files and has not been demonstrated here. UGen/OpenVINO backends are unimplemented. Show current self-hosted API routing and proposed Thunderstorm ASR integration separately.

The repository README identifies the latest published video and materials. No competition form has been submitted.
