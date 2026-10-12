# TaigiCareNote | ASUS UGen AI League 2026

## 1. TaigiCareNote

Care handover records that people can check

A care worker checks the original statements,
corrects the draft, and approves a specific version.
The exported record shows what was checked.

ASUS UGen AI League 2026 | Stage I proposal
Taigi AI Labs LLC

## 2. Who needs this?

A care worker handing over to the next shift

Scenario: a worker receives a spoken care report
and prepares a written handover for a colleague.
Taiwanese speech may need Mandarin text.

A fluent draft can still change left to right,
lose a negation, or change a number and its unit.
The next worker needs the checked facts.

## 3. One handover, one clear check

Fictional example; no patient data

Original statements:
“Today at 9 a.m., the person receiving care
reported pain in the left knee. No dizziness.
Drank 200 mL of water.”

The demo deliberately changes left → right
and 200 mL → 250 mL in the draft.

## 4. Review the draft against its source

Actual local prototype; controlled test faults

Actual local TaigiCareNote interface. Source-linked review of controlled left/right and quantity faults.

## 5. What the worker does

Check → correct → explain → approve

1. Open each flagged statement beside its source.
2. Correct the side or amount using the original.
3. Record how each check was resolved.
4. Enter the reviewer name and approve.
5. Export that approved version as JSON or CSV.

Editing the record requires another approval.

## 6. What is inherited, what is added

Existing public PoC is background technology

Existing PoC: source references, review flags,
issue resolution, confirmation, export,
and approval invalidation after changes.

This implementation adds content hashes,
revision-linked approval, export-time checks,
and a readable event history in the output.

## 7. Approval belongs to an exact version

A content fingerprint links review to export

The approval stores source, draft, and review hashes,
revision number, reviewer, and timestamp.

Export checks those values again.
Changed content or review notes require approval
of the revised version before export.
The event log records corrections and resolutions.

## 8. Current prototype architecture

Host-side review; existing speech services are background

Input / existing speech APIs: Care text; existing ASR and translation adapters
Host: CareNote review: Split source statements; attach exact text evidence
Worker review: Check side, negation, and quantities; correct draft
Version-linked approval: Store hashes, revision, reviewer, and time
JSON / CSV export: Recheck approval; include evidence and event log

## 9. What we have demonstrated

Local review and export; evidence is reproducible

17 automated tests passed.
Actual local UI: load → correct → resolve → approve.
JSON and CSV saved from approved revision 3.
After another edit: revision 4, export locked.

Source, draft, and review hashes are recorded.
This proves the local review workflow;
care ASR and UGen performance are not measured.

## 10. UGen has a specific computation role

Stage II: validate speech recognition on B70

Audio / host interface: Receive consented test audio and manage review
B70 / OpenVINO ASR: Run speech recognition in the designated environment
Host: CareNote review: Keep evidence checks and approval on the host
Our model compatibility and GPU execution are unverified.

## 11. Measure the handover work

Proposed evaluation; results are not assumed

Use consented test speech and fictional records.
Compare manual checking with guided review.
Measure review time, corrections, unresolved flags,
and successful export of the approved version.

For device ASR, record model, precision, memory,
latency, transcript quality, and CPU comparison.

## 12. Adoption starts with one workflow

A test with a care organization is the next step

Start with one handover form and one review role.
Check whether staff can find and correct differences
without retyping the whole report.

The first output is a reviewed handover record,
not a diagnosis or treatment recommendation.
Facility deployment and clinical quality are unverified.

## 13. Ownership and references

Background assets remain separately owned

Taigi AI Labs LLC: existing Taiwanese ASR,
translation, TTS, and the existing medical-care PoC.
Public PoC identifier: poc-medical-20261005.

References: organizer reply; competition rules;
ASUS B70 specifications; OpenVINO ASRPipeline;
local implementation, tests, and audit evidence.

## 14. Submission links

English proposal and narrated prototype demonstration

Public repository
https://github.com/arata-1972/ASUS_UGen

English demonstration video
https://youtu.be/BKMI5votioI

Stage I: local review prototype and design documents.
Stage II: designated-environment ASR validation.

