# v2.5.10 first preflight — preserved QA metadata failure

Product81a505c4e39c71f5019eea5de0bc7c5fffc50a1f; QA implementation2ae39d9a3679c958a2967ce3a8efc66aa1b47c3d/tested merge de608eee26bfbc8588fc5f8df925e328f205fb9d; PR34.

First candidate archive CI38840800352/job116780174179 fails before product preparation: backup plan validator finds retained v2.5.9 productSha in catalog/backup-assertions.json and batches/backup-restore.json versus deliberately updated product-ref81a505c. Archive helper assertions did not execute; missing artifact is consequential. This is QA metadata inconsistency, not a product failure. Preserve first validation/source/campaign attempts and exact terminal records separately.

Correction updates only productSha and requiredLiveStamp in those two declarative candidate files. All scenario IDs, assertions, expected money, role controls, acceptance gaps and backup-last order remain unchanged. New QA fingerprint required. Live stamp still unobserved; no staging writes.
