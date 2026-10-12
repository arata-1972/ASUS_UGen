# TaiwaneseSpeechBridge architecture


The visitor and reception worker select Taiwanese or Mandarin manually. The browser uploads a WAV only after the transcription button is pressed. A loopback Node server sends it to the configured self-hosted ASR service. The person inspects and edits the resulting text. Optional EOLE translation produces text in the other language; the person can edit that text before requesting TTS. The browser plays or downloads the generated audio. No LLM or automatic business action is involved.

```mermaid
flowchart LR
  A[Browser: select language and WAV] --> B[Local Node bridge]
  B --> C[Self-hosted ASR]
  C --> D[Inspect and edit original]
  D --> E[Optional EOLE translation]
  E --> F[Inspect and edit translation]
  F --> G[Self-hosted Taiwanese or Mandarin TTS]
  G --> H[Play and download audio]
```

The CLI uses the same adapters and can run all optional steps in sequence. Unlike the browser, it does not pause for text correction. A successful CLI result therefore demonstrates API integration, not human-confirmed conversational meaning. Stage latencies are client elapsed times including networking. Completed stages are retained in `partial.json` when a later stage fails.

URLs and credentials are supplied privately through environment variables. The bridge does not call customer billing wrappers. Taiwanese TTS may return a separate hosted audio URL: set `BRIDGE_TAIGI_AUDIO_BASE` to that known hosting origin. Unexpected origins are rejected. No upstream error body or authorization header is logged. WAV input, empty outputs, unsupported languages, incompatible schemas, and missing configuration have explicit errors.

An optional local Hugging Face Whisper CPU adapter requires complete pre-existing model files and, for Taiwanese, the matching fine-tuned adapter. It never downloads weights or falls back to a server. Local CPU inference has not been demonstrated with a complete model in this environment. EOLE/TTS still use server APIs when enabled. UGen300/Hailo and Intel B70/OpenVINO adapters remain unimplemented; requesting those backends produces an error. The proposed competition hardware integration is future work. Neither local UI execution nor these server measurements proves accelerator execution or full offline operation.
