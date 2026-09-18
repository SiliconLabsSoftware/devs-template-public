# Contributing Guideline
As an open-source project, we welcome and encourage the community to submit patches directly to the project.
In our collaborative open-source environment, standards and methods for submitting changes help reduce
the chaos that can result from an active development community.

This document explains how to participate in project conversations, log bugs and enhancement requests,
and submit patches to the project so your patch will be accepted quickly into the codebase.

## Prerequisites
You should be familiar with Git and GitHub. [Getting started](https://docs.github.com/en/get-started)
If you haven't already done so, you'll need to create a (free) GitHub account at https://github.com
and have Git tools available on your development system. You also need to add your email address to your account.

As a contributor, you'll want to be familiar with the Silicon Labs tooling:
- [Simplicity Studio](https://docs.silabs.com/simplicity-studio-5-users-guide/latest/ss-5-users-guide-overview/)
- [Platform](https://docs.silabs.com/gecko-platform/latest/platform-overview/)
- [Simplicity Commander](https://docs.silabs.com/simplicity-commander/latest/simplicity-commander-start/)

Read the Silicon Labs [coding guidelines](https://github.com/SiliconLabsSoftware/agreements-and-guidelines/blob/main/coding_standard.md).
## Git Setup
We need to know who you are, and how to contact you. Please add the following information to your Git installation:
```
git config --global user.name "FirstName LastName"
git config --global user.email "firstname.lastname@example.com"
```
set the Git configuration variables user.name to your full name, and user.email to your email address.
The user.name must be your full name (first and last at minimum), not a pseudonym or hacker handle.
The email address that you use in your Git configuration must match the email address you use to sign your commits.

If you intend to edit commits using the Github.com UI, ensure that your github profile email address and profile name also match those used in your git configuration
(user.name & user.email).

### Set up GitHub commit signature

**command line setup**

The repository requires signed off commits. Follow this [guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits) how to set it up.
1. Generate a gpg key [howto](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
2. Configure your local repository with the gpg key. [guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key)
3. Configure your GitHub account with the gpg key [guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/associating-an-email-with-your-gpg-key)

**Command line steps:**
Use the git-bash and navigate into your local repo.
1. disable all the gpg signature globally. (Optional)
```
$ git config --global --unset gpg.format
```
2. Create a gpg-key
```
$ gpg --full-generate-key
```
3. Configure the local repo with your new key.
```
$ gpg --list-secret-keys --keyid-format=long
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
/c/Users/silabsuser/.gnupg/pubring.kbx
------------------------------------
sec   rsa3072/1234567891234567 2025-04-09 [SC]
      ABDGDGFDGFDGDHHSRGRG12345667912345678981
uid                 [ultimate] Firstname Lastname <example@example.com>
ssb   rsa3072/11098765432110981 2025-04-09 [E]

$ git config user.signingkey 1234567891234567
```
4. Force every commit to be signed
```
$ git config commit.gpgsign true
```
5. Export your gpg key
```
$ gpg --armor --export 888BA795B7085898
```
Make sure your email address is verified by GitHub before committing anything.

## Licensing
Please check the [Licensing.md](../LICENSE.md) for more details.

## Contributor License Agreement
When a project receives a contribution, it must be clear that the contributor has the rights to contribute the content and that the project then has the rights to use and otherwise operate with the content (e.g., relicense or distribute). A Contributor License Agreement (CLA) is a legal document establishing these rights and defining the terms under which a license is granted by a contributor to an open-source project. A CLA clarifies that any contribution was authorized (not contributing someone else’s code without permission or without legal authority to contribute) and protects the project from potential future legal challenges.

Please check Silicon Labs [CLA document](https://github.com/SiliconLabsSoftware/agreements-and-guidelines/blob/main/contributor_license_agreement.md).
During the pull request review, every new contributor must sign the CLA document. It can be signed as an individual or on behalf of a company.
Signatures have a 6-month expiration period.

## Contribution process

### Issues and Questions
Open a GitHub issue when you can describe a specific problem, such as a reproducible bug or a missing
feature. For questions, early-stage ideas, or topics that are not yet sufficiently defined, start a
discussion on the [Silicon Labs Community](https://community.silabs.com/). Once the discussion
produces a concrete proposal, open a GitHub issue before submitting a pull request.

### Pull Request Guideline
We welcome pull requests for bug fixes and feature implementations. Before starting work, document
the proposed change as described in the Issues and Questions section above.

1. **Fork the repository**
   Branching is disabled on public Silicon Labs repositories, so create a fork under your GitHub
   account. See GitHub's [contribution guide](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
   for instructions.
2. **Create a branch in your fork**
   Create the branch from the latest version of the upstream default branch. Use the following naming
   convention: `IssueNumber-short-description` (for example, `99-fix-bootloader-startup`).
3. **Implement and test the change**
   Keep the pull request focused on one bug fix or feature. Follow the Silicon Labs
   [coding guidelines](https://github.com/SiliconLabsSoftware/agreements-and-guidelines/blob/main/coding_standard.md)
   and add or update tests where appropriate.
4. **Commit and push your changes**
   Create signed commits as described in the Git setup section. Use clear commit messages that explain
   what changed and why, then push the branch to your fork.
5. **Open a draft pull request**
   Open a draft pull request from the branch in your fork to the default branch of this repository.
   Use a clear title and complete the pull request template. Link to the related GitHub issue or
   Silicon Labs Community discussion and describe the change, its motivation, and how it was tested.
6. **Verify the automated checks**
   Review the CI results while the pull request is in draft. Correct any failures in your branch and
   push the updates to your fork. The checks run again automatically and must pass before the pull
   request is submitted for review:
   - **[Coding Convention Check](workflows/00-Check-Code-Convention.yml)**: Verifies code formatting.
   - **[Firmware Build](workflows/02-Build-Firmware.yml)**: Builds the firmware using the
     [Dockerfile](../Dockerfile).
   - **[Secret Scanner](workflows/04-TruffleHog-Security-Scan.yml)**: Checks for API keys and other
     committed secrets.
7. **Submit the pull request for review**
   After all automated checks pass and the contribution is ready, select **Ready for review** on
   GitHub. Sign the Contributor License Agreement when requested, do not remove reviewers assigned
   through [CODEOWNERS](CODEOWNERS), and address review comments.

## Pull request review process
Silicon Labs uses the following process to review external pull requests.

### 1. Contributor License Agreement Check
The CLA bot verifies that every commit author has accepted the Silicon Labs Contributor License
Agreement and that each signature is still valid. While this requirement is not satisfied, the pull
request is blocked and labeled **Waiting for CLA**.

If a signature is missing or has expired, follow the instructions posted by the bot. Processing
continues automatically after all commit authors satisfy the CLA requirement.

### 2. Automated Validation
GitHub automation assigns reviewers according to [CODEOWNERS](CODEOWNERS) and runs the public checks
configured for the repository. These checks may include formatting, coding-convention, build, test,
and secret-scanning checks. Some repositories may also perform an AI-assisted code review.

Review the results and correct any failures that can be addressed in your fork.

### 3. Initial Silicon Labs Review
The designated code owners evaluate the contribution's relevance, ownership, scope, quality, and
overall value. During this stage, the pull request is labeled **Under review**. The review may result
in one of the following outcomes:

- A suitable contribution proceeds to detailed code review.
- A contribution that is not useful, cannot be accepted, or falls outside the project scope is
  closed, with an explanation where appropriate.
- A valid contribution owned by another product team is assigned or escalated to the responsible
  Silicon Labs R&D team for further evaluation.

Submitting a pull request does not guarantee acceptance. Silicon Labs may decline a contribution
because of technical direction, product plans, security, licensing, maintenance cost, duplication,
or other project considerations.

### 4. Detailed Code Review
The designated code owners review the implementation. Comments may address correctness, coding
standards, maintainability, documentation, testing, performance, security, licensing, or
compatibility.

If changes are requested, update the same branch in your fork and push the new commits. The pull
request updates automatically. Review continues until the contribution is approved or the pull
request is closed.

### 5. Protected CI/CD Validation
After code-owner approval, an authorized Silicon Labs developer starts any protected CI/CD
validation that cannot run safely or automatically for an external pull request.

If validation fails, results that can be shared are posted to the pull request. Update your
contribution to address the reported problems. Validation and review then continue. If validation
passes, the pull request becomes eligible for merge.

### Contributor Responsibilities During Review
- Monitor the pull request for bot messages, review comments, and check results.
- Respond to questions and requested changes in a timely manner.
- Keep the pull request focused on one logical change and avoid unrelated modifications.
- Update documentation and tests when required by the change.
- Do not include credentials, secrets, confidential information, third-party code without
  appropriate rights, or content you are not authorized to contribute.
