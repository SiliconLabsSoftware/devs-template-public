---
name: verify-oss-readiness
description: >-
  Reports how far a repository is from the Developer Services public OSS
  template in this repo. Use when the user asks to verify, audit, check, or
  assess OSS readiness, template compliance, missing OSS files, or deviations
  from this template. Read-only: it does not modify the input repository.
---

# Verify OSS readiness

Compare an input repository with the Developer Services template in this repository. Report every deviation and its proposed correction. Do not create, edit, or delete files in the input repository.

## Input repository

Use the input repository root the user gave. It must be the root of the repository to analyze, not this template repository unless the user explicitly asked to analyze the template.

If the user did not give a path, ask:

> What is the absolute path to the root of the repository that should be checked?

Stop until the user answers. Do not guess a path, and do not analyze the current workspace as a substitute.

## Template root

The template root is the checkout that contains `skills/verify-oss-readiness/SKILL.md`. `.cursor/skills` is a symlink to that `skills` directory, so every agent sees the same files.

## Run the checker

Run this from the template root. If the input path is outside the current workspace, request unrestricted permissions so the script can read it.

```bash
node skills/oss-template/scripts/oss_template.js verify --input "/absolute/path/to/input-repo" --template "/absolute/path/to/this-template-repo"
```

Exit code `0` means the repository is ready. Exit code `1` means the report was produced and the repository is not ready. Show that report; do not treat exit code `1` as a crash. Exit code `2` means the path or template was rejected. Ask for a corrected path if that is what the script reports.

## Report

Present the script report as the answer. Keep every deviation, proposed correction, review item, and manual follow-up. Do not add deviations the script did not report, and do not drop any it did report.

The checker covers scaffold files (CLA, code of conduct, contributing guide, issue and pull request templates, the four workflows, `projects/README.md`, `resources/README.md`), `LICENSE.md`, `.gitignore` patterns, `Dockerfile`, top-level `make all` and `make clean`, README structure and leftover template text, a real project directory under `projects/`, and `CODEOWNERS`. GitHub ruleset import and the CLA app private key stay in the manual follow-up because they are not files in the tree.
