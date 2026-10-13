# v2.2.4 retest intent

Candidate343d546ed41f7790e1fc45414d130012dab37a39, staging observed v2.2.4 ·343d546 with business navigation restored in existing Owner session. No staging writes/reset. Preserve v2.2.3 RUN-13; its results belong to0d only.

Independent diff one commit9files: reserved-client adapter now attaches pool options, supplies same-reserved-connection begin/commit/rollback and savepoint, permission loader logs caught error, focused product mock test, version/docs. Dependency/migration unchanged. Graph extraction stale on prior candidate; pinned Git source used to verify changed functions.

Run unchanged60 source and20 isolated PostgreSQL cases, especially RT-012/013, helper visibility/cleanup, real permission/action positives, B-104 and RT-006. Mock adapter tests and restored menu alone are insufficient. Query/transaction rollback, nested savepoint integration and concurrent finance require actual driver evidence. Public reports remain sanitized; no release acceptance pending tests.
