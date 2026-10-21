---
name: apply-oss-templates
description: >-
  Decorates a repository with the Developer Services public OSS template from
  this repo: governance files, issue and pull request templates, workflows,
  gitignore entries, and top-level make targets. Use when the user asks to
  apply, install, or add the OSS template, or to make a repository match this
  template. Asks for the input repository root and edits that repository.
---

# Apply OSS templates

Install the Developer Services template requirements into an input repository. The same checker used by `verify-oss-readiness` decides what is required. Apply the mechanical changes, then report every deviation that is still left.

## Input repository

Use the input repository root the user gave. It must be the root of the repository to decorate.

If the user did not give a path, ask:

> What is the absolute path to the root of the repository that should be decorated with this template?

Stop until the user answers. Do not guess a path, and do not modify the current workspace as a substitute.

Never run apply against this template repository. The script refuses that path.

## Template root

The template root is the checkout that contains `skills/apply-oss-templates/SKILL.md`. `.cursor/skills` is a symlink to that `skills` directory, so every agent sees the same files.

## Run the applier

Run this from the template root. If the input path is outside the current workspace, request unrestricted permissions so the script can write there.

```bash
node skills/oss-template/scripts/oss_template.js apply --input "/absolute/path/to/input-repo" --template "/absolute/path/to/this-template-repo"
```

Do not hand-edit the input repository before or after the script. Do not commit or push.

Exit code `0` means no deviations remain. Exit code `1` means the script finished and deviations remain. Show that report; do not treat exit code `1` as a crash. Exit code `2` means the path was rejected.

## What the script changes

- Copies a missing scaffold file from the template. Replaces an existing scaffold file only when required template content is missing. Scaffold files are `CLA.md`, `CODE_OF_CONDUCT.md`, `.github/CONTRIBUTING.md`, the issue and pull request templates, the four workflows, `projects/README.md`, and `resources/README.md`.
- Copies `LICENSE.md` and `Dockerfile` only when those files are absent. An existing license or image is left in place.
- Copies `README.md` when it is absent, and deletes a `## How to use the template` section when that heading is present. It does not invent hardware, build, or debug text, and it does not remove TODO placeholders.
- Copies `.gitignore` when it is absent. Otherwise it appends template patterns that are missing.
- Writes top-level `all` and `clean` targets when `Makefile` is missing or is still a stub with no targets. When other targets already exist, it only adds the missing `all` or `clean` target.
- Copies `.github/CODEOWNERS` when no CODEOWNERS file exists. When a CODEOWNERS file exists but has no `@owner` rule, it adds the template owner line. It does not replace an existing owner.

## Report

Present the script report as the answer. Keep the changes-applied list and every remaining deviation and proposed correction. Remaining README placeholders and a missing project under `projects/` need the project owner. The GitHub ruleset import and the CLA app secrets stay manual. Do not fill those in by inventing content.
