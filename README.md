# TaigiCareNote

ASUS UGen AI League 2026 · Workplace AI · Stage I · v8

## A checked care handover record

A care worker reviews a draft beside its original statements, corrects differences, records how each check was handled, and approves the exact record before JSON/CSV export. The current prototype runs locally. It uses a fictional care case, not patient records, and supports documentation review rather than diagnosis or treatment.

## Existing PoC and the v8 difference

The existing medical-care PoC, identified as `poc-medical-20261005`, is background work. It already had source references, review flags, human resolutions, approval, export and approval invalidation after edits. Those capabilities are not described as first invented here.

The new independent contest implementation adds source, draft and review-content SHA-256 fingerprints, approval tied to the source/draft revision, export-time checks against the approved fingerprints, and a readable correction/review event history in both JSON and CSV. A changed source, draft or review note requires another approval. This is snapshot consistency; it is not an immutable compliance log or proof that the meaning is clinically correct.

## Demonstration and evidence

The controlled example deliberately changes left knee to right knee and 200 mL to 250 mL in a source-copy draft. These are injected test faults, not speech-recognition results. The operator corrects them against the source, records the checks, approves and exports the record, then edits it again to demonstrate approval invalidation.

Rule-based flags are prompts for human review and may miss differences or flag correct text. The local draft copies source statements and does not use a generative model. The optional existing speech/translation adapters are not executed in this demonstration. No new care ASR, clinical-quality or UGen performance measurement is claimed.

## Specific UGen role

The Stage II plan is Thunderstorm ASR on the designated Intel Arc Pro B70/OpenVINO environment. Model compatibility, conversion, actual selected-device execution, memory and performance remain unverified. The current JS review, fingerprinting and export checks are host operations, not UGen inference. Existing translation/TTS can remain services while their device compatibility is evaluated. An LLM is not required.

## Materials and runnable application

- [English proposal PDF](proposals/proposal_en_v8.pdf)
- [English PowerPoint](proposals/proposal_en_v8.pptx)
- [English proposal text](proposals/proposal_text_en_v8.md)
- [Current and planned architecture](architecture/architecture_en_v8.pdf)
- [Application and setup](implementation/README.md)
- [Architecture and computation boundaries](implementation/ARCHITECTURE.md)
- [Tests and measured scope](implementation/BENCHMARK.md)
- [English video script](demo/demo_script_en_v8.md)
- [English captions](demo/demo_en_v8.srt)

[English narrated demo — YouTube unlisted](https://youtu.be/BKMI5votioI)

126.52 seconds, with published English CC captions. Edited screenshots show actual new local CareNote operations, not continuous screen recording. English explanation uses macOS Samantha. The application demo uses fictional text and executes no audio ASR/translation calls.

## Publication boundary and versions

Existing Taigi APIs, backend services, models and the earlier medical PoC remain background assets. Only the new client and permitted fictional demonstration evidence are included. No existing backend source, model weights, training data, patient information, API keys or session credentials are published. Configuration is supplied privately; no new model/data licence is granted.

v8 is the latest CareNote submission. [The earlier v7 Speech Bridge client](versions/v7/implementation/README.md) and older proposal files remain historical references. Full Japanese translations are kept locally. No competition form has been submitted. Next content revision: v9.

[Official competition](https://contest.bhuntr.com/en/39jg9vimiynrhlksze/home/) · [Existing PoC](https://learn-language.tokyo/zh-TW/poc-medical-20261005) · [Public repository](https://github.com/arata-1972/ASUS_UGen)
