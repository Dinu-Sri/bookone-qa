# Public repository policy

The owner explicitly requested public visibility on 2026-10-11. Source, synthetic fixtures, business rules, sanitized bug reports, change contracts and compact run summaries may be public.

Never commit passwords, tokens, session/storage-state files, real statements, customer records, raw traces, screenshots with sensitive data, database backups, private infrastructure identifiers, or recovery secrets. Keep them in ignored local/private access-controlled storage. GitHub Actions artifacts in this public repository must not receive raw browser evidence.

Review staged files before each commit; use synthetic IDs in public summaries. The .gitignore and validation scan reduce mistakes but cannot establish that an arbitrary artifact is safe to publish. Review attachments and exports individually.

The imported catalog is historical design, not a security certification. Preserve source provenance and disclose assertion gaps. Detailed newly discovered exploitable weaknesses with sensitive evidence should be reported privately to the owner before a sanitized public issue is considered.

All future agents must keep this repository public unless the owner changes that instruction, while keeping operational secrets and sensitive evidence private. Package.json `private: true` only prevents accidental npm publication; it does not describe GitHub visibility.
