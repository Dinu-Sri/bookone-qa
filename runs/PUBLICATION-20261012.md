# Publication handover — 2026-10-12

- Public QA repository: https://github.com/Dinu-Sri/bookone-qa
- Initial QA implementation: [`9dfe7e9e0282857110366f97fe724b1753ca8e4e`](https://github.com/Dinu-Sri/bookone-qa/commit/9dfe7e9e0282857110366f97fe724b1753ca8e4e).
- CI: [QA repository validation run 38147275729](https://github.com/Dinu-Sri/bookone-qa/actions/runs/38147275729), completed successfully. Checked install, metadata/guard checks, source preparation, unit tests and E2E discovery; no staging browser execution.
- Local validation: 86 unit tests passed, 4 optional local-workbook cases skipped; 2 target-origin guard checks passed; 771 E2E tests discovered. See [bootstrap run](RUN-20261011-bootstrap.md).
- Product docs: [`bdff296bd3f0dae6470b15be74cfee8b71567501`](https://github.com/Dinu-Sri/BookOne/commit/bdff296bd3f0dae6470b15be74cfee8b71567501) on BookOne `master`, 11 Markdown files only.

## Coding-agent entry points

- [Product AGENTS.md](https://github.com/Dinu-Sri/BookOne/blob/master/AGENTS.md)
- [Development change contract](https://github.com/Dinu-Sri/BookOne/blob/master/docs/QA_CHANGE_CONTRACT.md)
- [Inbuilt E2E cleanup instructions](https://github.com/Dinu-Sri/BookOne/blob/master/docs/REMOVE_INBUILT_E2E.md)
- [Product change ledger/template](https://github.com/Dinu-Sri/BookOne/tree/master/docs/changes)

The requested repository, rules and cleanup guide are published. The cleanup itself has not been executed. The external test suite needs stronger P0 assertions, portable replacements for skipped bank fixtures, exact staging-build identity and real business acceptance runs before it can justify release decisions. Product release-gate enforcement, migration/recovery drills and production validation remain outside this completed bootstrap.

Future sessions should read AGENTS.md and STATUS.md, preserve source/QA version pairs, and record actual runs rather than assuming old passes remain valid. All data at the owner-authorized staging URL is disposable testing data. Production is not accessible to the QA agent. Public source does not authorize publishing credentials or sensitive runtime evidence.
