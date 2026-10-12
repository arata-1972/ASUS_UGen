# CareNote v8 — approval tied to the reviewed content


This independent local prototype helps a care-record reviewer compare a Mandarin draft with exact source statements. The default draft copies source clauses; it is a rule-based template, not an LLM-generated medical summary. The demonstration uses fictional text and a deliberately altered draft. No patient recording or care ASR/translation request was executed in this demonstration.

Run Node.js 20+ from this directory:

```sh
npm test
npm start
```

Open http://127.0.0.1:8768. Load the synthetic case or controlled discrepancy test. Compare the draft with each exact source span, edit values, save changes, and write review notes for the flagged candidates. Supply a demo reviewer label and approve. JSON and CSV both carry the approved version, source/draft/review SHA-256 hashes, source positions, and event history. Editing source or draft clears previous checks and approval. Changing a review note clears approval. Export checks current hashes again. Hashes detect content disagreement; this local event list is not an immutable compliance audit system.

| Capability | Existing medical PoC background | New independent v8 work |
|---|---|---|
| Taiwanese speech → Mandarin; source references; side/negation/number review; human confirmation; JSON/CSV | Already present | Not claimed as first developed |
| Invalidate confirmation after editing | Already present | Retained behavior |
| Explicit version and source/draft/review hashes tied to approval | Not found in inspected old files | Implemented |
| Recheck approved hashes at export | Not found | Implemented |
| Full before/after edit events and linked approval/export content | Not found | Implemented |
| Exact source offsets plus source hash | Old source IDs/quoted evidence | New offset/hash representation |

The prior https://learn-language.tokyo/zh-TW/poc-medical-20261005 application is background technology. It uses an LLM for draft generation; v8's new review template does not. Neither existing service nor its backend was modified. New work is not proof of clinical effectiveness, recognition accuracy, device inference, regulatory compliance, or a production medical record system.

Optional WAV → Taiwanese ASR → reviewed transcript → EOLE Mandarin translation adapters are available through the expanded audio section. They require authorized private environment configuration. With no endpoints, requests fail clearly. See the retained `bridge.mjs` configuration variables; no secrets or upstream addresses are included. The adapter is reused background integration code. No automatic model download or paid customer billing wrapper is used. UGen/OpenVINO execution is not implemented or verified. The planned Stage II competition deployment must be verified in its designated environment.

All cases are fictional. Use only synthetic test data here. Review rules flag candidates and omissions; they do not establish medical correctness, diagnose, prescribe, or recommend treatment. The in-memory single-user state is lost when the server restarts. This package and version 8 video are new local deliverables; prior versions remain preserved.
