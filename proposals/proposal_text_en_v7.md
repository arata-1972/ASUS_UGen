# Taiwanese SpeechBridge | ASUS UGen AI League 2026

## 1. Taiwanese SpeechBridge

Help a Taiwanese visitor and a Mandarin receptionist understand each turn

ASUS UGen AI League 2026 | Workplace AI
Proposed track: Thunderstorm | Two-person individual team
Existing speech technology: Taigi AI Labs LLC
Stage I: local interface and self-hosted API integration demonstrated
UGen / B70 GPU inference is not yet verified

## 2. Reception needs the next sentence to make sense

Use-case hypothesis: a visitor asks where to go; staff checks the booking

The visitor normally speaks Taiwanese; staff uses Mandarin.
They need to confirm the destination, booking name, and waiting area.
Each person reads or hears the other turn before replying.
We aim to reduce repeated questions and misunderstandings.
This is a use-case hypothesis, not a deployed customer result.

## 3. Review the words before communicating them

WAV input → ASR → review → translation → speech

1  Select Taiwanese or Mandarin and a WAV file; click to transcribe.
2  Check and correct the original, including names or locations.
3  Translate to the other language and review the translation.
4  Generate speech, play it, or listen again.
5  Switch the source language for the other person’s reply.
The current prototype uses file upload, not microphone recording.

## 4. Actual interface: review and play the translation

The browser runs locally; configured self-hosted services run inference

Actual interface with English explanations. Control labels: translate for the other person; review/edit translation; play translated audio; download audio. The original interface labels remain Traditional Chinese.

## 5. Show the recognition error, then correct it

The input is Taigi TTS-generated Taiwanese, not a human recording

Input: “請問服務台佇佗位?” — “Where is the service desk?”
Actual ASR: “請問服務代到位去。” — the question was misrecognized.
User correction: “請問服務台佇佗位？”
Translation: “請問服務台在哪裡?”; punctuation edited before Mandarin TTS.
The interface retains both texts and supports review before each step.
This demonstrates correction; it does not establish recognition accuracy.

## 6. Current architecture: UI and self-hosted speech

ASR, EOLE translation, and TTS. No LLM is required.

Local browser: Select Taiwanese / Mandarin and a WAV file
Local Node bridge: Send audio to the configured self-hosted ASR
User: Review and edit the recognized original
Self-hosted EOLE: Translate, then review and edit the translation
Taiwanese / Mandarin TTS: Generate audio; play or download in the browser

## 7. Reception demo: hear the corrected question

Synthetic Taiwanese question → ASR → correction → translation → TTS

Question: “請問服務台佇佗位？” / “Where is the service desk?”
Mandarin output: “請問服務台在哪裡？”
UI times: ASR about 803 ms; translation 189 ms; TTS 1,147 ms.
Mandarin audio was generated and played; browser download is unverified.
One API operation per step, including network time; user editing excluded.
This reception demo is separate from CLI tests and is not UGen performance.

## 8. Stage II: speech recognition on the designated platform

Thunderstorm: validate OpenVINO ASR before evaluating other speech models

Local UI / host: Manage audio, text review, and playback
B70 / OpenVINO ASR: Designated-environment ASR: Stage II validation
Existing EOLE / TTS: Keep services initially; validate porting separately
Our model compatibility and GPU execution are unverified.

## 9. Verified evidence and the next tests

API completion, correct meaning, and GPU execution are separate checks

12 adapter-contract and error-handling tests passed.
The local UI starts; editing and unconfigured-backend errors were checked.
Real API results, generated audio, and failure records are retained.
Next: human speech, corrections, and two-way reception conversations.
Stage II: model compatibility, GPU execution, memory, and latency.
Compare CPU and GPU only with comparable models, settings, and inputs.

## 10. Separate the new application from existing technology

Existing speech technology belongs to Taigi AI Labs LLC

Existing assets: Taiwanese ASR, translation, TTS, and Mandarin speech.
New work: conversation UI, text review, adapters, tests, and device integration.
Public scope: the new client, integration explanations, and documentation.
Excluded: API keys, private weights, training data, and existing server code.
Model/runtime licences and attribution follow the actual packages selected.

## 11. Validate one reception workflow before expanding

Goal: the visitor communicates a need, and staff can respond clearly

Start with one reception PC and short alternating Taiwanese/Mandarin turns.
Test whether it reduces mishearing, repeated questions, and retyping.
Later, evaluate an internal server serving multiple PCs or tablets.
Deployment cost, staff use, and adoption interest still need validation.
We make no pricing, paid-customer, or measured business-outcome claim.

## 12. Project documents, demonstration, and references

Taigi AI Labs LLC | info@ailabs.jp | https://ailabs.jp

Public GitHub
https://github.com/arata-1972/ASUS_UGen
English-narrated actual-interface demo (YouTube unlisted)
https://youtu.be/Iapyx8E_vpM
Competition rules
https://contest.bhuntr.com/en/39jg9vimiynrhlksze/home/
ASUS B70 specifications / Intel OpenVINO ASR
https://www.asus.com/motherboards-components/ai-accelerator/ugen/ugen-arc-pro-b70-32g/techspec/
https://docs.openvino.ai/2026/api/genai_api/_autosummary/openvino_genai.ASRPipeline.html

