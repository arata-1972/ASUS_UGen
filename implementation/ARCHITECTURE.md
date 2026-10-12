# CareNote architecture


Browser → loopback Node HTTP server → independent CareNote review state → version/hash-bound approval → JSON/CSV. The server keeps the synthetic source, exact UTF-16 source offsets, draft values, review decisions, and sequential events in memory. Source/draft edits create a new content version and invalidate prior checks. Review decision edits invalidate approval. Before export, the server checks source, draft, and review hashes against the approval. Both formats represent that same approved content.

Optional audio adapters call configured self-hosted ASR and EOLE APIs; they are not used by the v8 review demonstration. No LLM is required for the new draft template or review code. The existing LLM medical PoC, speech models, weights, and server implementations remain background technology. GPU/UGen/OpenVINO inference is future integration work.

Flags cover limited character patterns for side, negation, quantities/units, unknown information, and stale evidence. A flag being resolved means a person wrote a source-check note, not that software verified medical meaning. Exact matching may miss paraphrases or unsupported patterns. No automatic care action is taken. Export hashes are content checks, not a digital signature or immutable log.
