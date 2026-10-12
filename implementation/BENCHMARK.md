# v8 verification evidence


17 local unit tests pass: exact source spans; faithful clause copying; side, negation, quantity and missing-unit candidates; review/approval/export gates; draft/source edits; approved hash rechecks; review changes; JSON/CSV consistency; CSV escaping and formula neutralization. The tests use fictional text. They do not measure speech quality, clinical efficiency, server ASR latency, GPU performance, or clinical accuracy.

Actual browser operations loaded the controlled discrepancy fixture, corrected right knee to left knee and 250 mL to 200 mL using the source, resolved three candidates with notes, approved version 3, and enabled exports. The same server's approved JSON and CSV were saved under `evidence/approved_record.json` and `.csv`. A subsequent edit created version 4, cleared approval, and disabled exports. Screenshots `ui_01_initial.png` through `ui_06_invalidated.png` and `ui_event_history.json` record this flow. Export files share the approved source/draft/review hashes and event history.

No care-case audio/ASR/translation inference was executed. The optional adapter comes from the earlier integration prototype; its earlier reception measurements must not be presented as care-case performance. No UGen/B70/OpenVINO device was used. The UI flow timestamps include operator time and are not a speed benchmark. Memory footprint and performance improvements were not measured.

Additional UI check: unsaved changes to source, draft, or review-note text disable approval and exports immediately. Screenshot ui_07_unsaved_locked.png.
