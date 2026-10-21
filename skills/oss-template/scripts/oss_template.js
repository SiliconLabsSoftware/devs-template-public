#!/usr/bin/env node
'use strict';

// This entire source code is AI generated and is not intended to be maintained by human.

// Check or apply the Developer Services public OSS template.
// The template repository is the checkout that contains this script. The input
// repository is the project being measured. Verification is read-only. Apply
// installs missing scaffold files and mechanical fixes. It does not invent
// project-specific README content, and it does not overwrite an existing
// LICENSE.md or Dockerfile.

const fs = require('fs');
const os = require('os');
const path = require('path');

const SCAFFOLD = [
  ['CLA.md', ['contributor_license_agreement.md']],
  ['CODE_OF_CONDUCT.md', ['code_of_conduct.md']],
  ['.github/CONTRIBUTING.md', [
    'contributor_license_agreement.md',
    'coding_standard.md',
    'CODEOWNERS',
    '00-Check-Code-Convention.yml',
    '02-Build-Firmware.yml',
    '04-TruffleHog-Security-Scan.yml',
    'IssueNumber-issue-title-goes-here',
  ]],
  ['.github/PULL_REQUEST_TEMPLATE.md', [
    'contributor_license_agreement.md',
    'coding_standard.md',
    'action workflow',
  ]],
  ['.github/ISSUE_TEMPLATE/bug_report.md', [
    'name: Bug report',
    '**Summary (Mandatory)**',
    '**Steps to reproduce (Mandatory)**',
    '**Expected Result (Mandatory)**',
    '**Actual Result (Mandatory)**',
  ]],
  ['.github/ISSUE_TEMPLATE/feature_request.md', ['name: Feature request']],
  ['.github/workflows/00-Check-Code-Convention.yml', [
    'name: 00-Check-Code-Convention',
    'SiliconLabsSoftware/devs-coding-convention-tool',
  ]],
  ['.github/workflows/01-CLA-Assistant.yml', [
    'name: 01-CLA-Assistant',
    'SiliconLabsSoftware/action-cla-assistant',
    'secrets.GH_APP_ID',
    'secrets.GH_APP_PRIVATE_KEY',
  ]],
  ['.github/workflows/02-Build-Firmware.yml', [
    'name: 02-Build-Firmware',
    'docker build',
    'make all',
  ]],
  ['.github/workflows/04-TruffleHog-Security-Scan.yml', [
    'name: 04-TruffleHog-Security-Scan',
    'trufflesecurity/trufflehog',
  ]],
  ['projects/README.md', []],
  ['resources/README.md', []],
];

const SIGNED_COMMIT_RE = /signed/i;
const README_SECTIONS = [
  'Hardware requirements',
  'Hardware Setup',
  'Build environment setup',
  'Debug environment',
  'Contributing',
  'License',
];
const README_RESIDUE = [
  '## How to use the template',
  'Import the [basic ruleset]',
  'Add github app private key for CLA assistant',
  'remove this list from it',
];
const README_INTRO_RESIDUE = [
  '# Developer Services template project',
  'Put project introduction here',
];
const TODO_RE = /\*\*\s*TODO\s*\*\*|####\s*TODO\s*####/i;
const TARGET_RE = /^([^:#=]+?)\s*:(?!=)/;
const CODEOWNERS_CANDIDATES = ['.github/CODEOWNERS', 'CODEOWNERS', 'docs/CODEOWNERS'];
const SPDX_RE = /^SPDX-License-Identifier:\s*(\S+)/m;
const FROM_RE = /^FROM\s+\S+/m;

const STANDARD_MAKEFILE = [
  '# Top-level build for this repository.',
  '# Each software project lives in its own directory under projects/.',
  '# A project is included when that directory contains a Makefile with all and clean targets.',
  '',
  '.PHONY: all clean',
  '',
  'PROJECT_DIRS := $(wildcard projects/*/)',
  '',
  'all:',
  '\t@set -e; \\',
  '\tfound=0; \\',
  '\tfor dir in $(PROJECT_DIRS); do \\',
  '\t  if [ -f "$$dir/Makefile" ]; then \\',
  '\t    found=1; \\',
  '\t    $(MAKE) -C "$$dir" all; \\',
  '\t  fi; \\',
  '\tdone; \\',
  '\tif [ "$$found" -eq 0 ]; then \\',
  '\t  echo "No projects/*/Makefile found. Add a project Makefile with an all target."; \\',
  '\t  exit 1; \\',
  '\tfi',
  '',
  'clean:',
  '\t@set -e; \\',
  '\tfor dir in $(PROJECT_DIRS); do \\',
  '\t  if [ -f "$$dir/Makefile" ]; then \\',
  '\t    $(MAKE) -C "$$dir" clean; \\',
  '\t  fi; \\',
  '\tdone',
  '',
].join('\n');

const ALL_TARGET_BLOCK = [
  '.PHONY: all',
  'all:',
  '\t@set -e; \\',
  '\tfound=0; \\',
  '\tfor dir in $(PROJECT_DIRS); do \\',
  '\t  if [ -f "$$dir/Makefile" ]; then \\',
  '\t    found=1; \\',
  '\t    $(MAKE) -C "$$dir" all; \\',
  '\t  fi; \\',
  '\tdone; \\',
  '\tif [ "$$found" -eq 0 ]; then \\',
  '\t  echo "No projects/*/Makefile found. Add a project Makefile with an all target."; \\',
  '\t  exit 1; \\',
  '\tfi',
  '',
].join('\n');

const CLEAN_TARGET_BLOCK = [
  '.PHONY: clean',
  'clean:',
  '\t@set -e; \\',
  '\tfor dir in $(PROJECT_DIRS); do \\',
  '\t  if [ -f "$$dir/Makefile" ]; then \\',
  '\t    $(MAKE) -C "$$dir" clean; \\',
  '\t  fi; \\',
  '\tdone',
  '',
].join('\n');

function die(message, code = 2) {
  fs.writeSync(2, `${message}\n`);
  process.exit(code);
}

function createReport() {
  return { findings: [], reviews: [], passed: [], changes: [] };
}

function addDeviation(report, finding) {
  report.findings.push(finding);
}

function addReview(report, finding) {
  report.reviews.push(finding);
}

function expandUser(value) {
  if (value === '~') return os.homedir();
  if (value.startsWith('~/')) return path.join(os.homedir(), value.slice(2));
  return value;
}

function splitLines(text) {
  if (text === '') return [];
  const lines = text.split(/\r\n|\n|\r/);
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}

function splitLinesKeepEnds(text) {
  const lines = [];
  const re = /\r\n|\n|\r/g;
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    lines.push(text.slice(last, match.index + match[0].length));
    last = match.index + match[0].length;
  }
  if (last < text.length) lines.push(text.slice(last));
  return lines;
}

function endsWithNewline(text) {
  return text.endsWith('\n') || text.endsWith('\r\n');
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function isDir(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function exists(filePath) {
  try {
    fs.lstatSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function readText(filePath) {
  if (!isFile(filePath)) return null;
  const bytes = fs.readFileSync(filePath);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

function newlineOf(text) {
  return text.includes('\r\n') ? '\r\n' : '\n';
}

function writeText(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const existing = readText(filePath);
  if (existing !== null && existing.replace(/\r\n/g, '\n') === text.replace(/\r\n/g, '\n')) {
    return false;
  }
  const data = text.replace(/\n/g, newlineOf(existing ?? text));
  fs.writeFileSync(filePath, data);
  return true;
}

function copyBytes(src, dst) {
  const data = fs.readFileSync(src);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (isFile(dst) && fs.readFileSync(dst).equals(data)) return false;
  fs.writeFileSync(dst, data);
  return true;
}

function gitignorePatterns(text) {
  const patterns = [];
  const seen = new Set();
  for (const line of splitLines(text)) {
    const stripped = line.trim();
    if (!stripped || stripped.startsWith('#') || seen.has(stripped)) continue;
    seen.add(stripped);
    patterns.push(stripped);
  }
  return patterns;
}

function headingName(line) {
  const match = /^##\s+(.+?)\s*$/.exec(line);
  return match ? match[1].trim() : null;
}

function sections(text) {
  const found = new Map();
  let current = null;
  for (const line of splitLines(text)) {
    const name = headingName(line);
    if (name !== null) {
      current = name;
      if (!found.has(current)) found.set(current, []);
      continue;
    }
    if (current !== null) found.get(current).push(line);
  }
  const result = new Map();
  for (const [name, body] of found) result.set(name, body.join('\n'));
  return result;
}

function sectionBody(text, title) {
  const wanted = title.toLowerCase();
  for (const [name, body] of sections(text)) {
    if (name.toLowerCase() === wanted) return body;
  }
  return null;
}

function makeTargets(text) {
  const targets = new Map();
  let current = [];
  for (const line of splitLines(text)) {
    if (line.startsWith('.')) {
      const match = TARGET_RE.exec(line);
      if (match && match[1].trim() === '.PHONY') {
        current = [];
        continue;
      }
    }
    const match = TARGET_RE.exec(line);
    if (match && !line.startsWith(' ') && !line.startsWith('\t')) {
      const names = match[1].split(/\s+/).filter(Boolean);
      current = [];
      for (const name of names) targets.set(name, current);
      continue;
    }
    if (line.startsWith('\t')) {
      const recipe = line.replace(/^\t+/, '');
      if (line.trim() && !recipe.startsWith('#')) current.push(line);
    }
  }
  return targets;
}

function codeownersPath(root) {
  for (const relative of CODEOWNERS_CANDIDATES) {
    const candidate = path.join(root, relative);
    if (isFile(candidate)) return candidate;
  }
  return null;
}

function ownerRules(text) {
  const rules = [];
  for (const line of splitLines(text)) {
    const stripped = line.trim();
    if (!stripped || stripped.startsWith('#')) continue;
    if (stripped.includes('@')) rules.push(stripped);
  }
  return rules;
}

function missingMarkers(text, markers) {
  return markers.filter((marker) => !text.includes(marker));
}

function sameList(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function stripHowTo(text) {
  const kept = [];
  let skipping = false;
  for (const line of splitLinesKeepEnds(text)) {
    const bare = line.replace(/^\uFEFF/, '');
    if (!skipping && bare.startsWith('## How to use the template')) {
      skipping = true;
      continue;
    }
    if (skipping && bare.startsWith('## ') && !bare.startsWith('### ')) skipping = false;
    if (!skipping) kept.push(line);
  }
  let result = kept.join('');
  if (endsWithNewline(text) && result && !endsWithNewline(result)) result += '\n';
  return result;
}

function collect(template, target) {
  const report = createReport();
  const templateLicense = readText(path.join(template, 'LICENSE.md')) || '';
  const templateSpdx = SPDX_RE.exec(templateLicense);
  const expectedSpdx = templateSpdx ? templateSpdx[1] : 'LicenseRef-MSLA';
  const templateOwners = ownerRules(readText(path.join(template, '.github', 'CODEOWNERS')) || '');
  const templateIgnore = gitignorePatterns(readText(path.join(template, '.gitignore')) || '');

  if (!exists(path.join(target, '.git'))) {
    addDeviation(report, {
      title: 'Input path is not a Git repository',
      path: '.git',
      expected: 'A Git checkout with a .git directory',
      found: 'No .git directory',
      proposed_correction: 'Use the root of an existing Git clone. Do not initialize a repository only to satisfy this check.',
    });
  } else {
    report.passed.push('Git repository root');
  }

  for (const [relative, markers] of SCAFFOLD) {
    const filePath = path.join(target, relative);
    const text = readText(filePath);
    const templateFile = path.join(template, relative);
    if (text === null) {
      addDeviation(report, {
        title: `Missing ${relative}`,
        path: relative,
        expected: 'File copied from the template and containing the required template content',
        found: exists(filePath) ? 'present but not valid UTF-8 text' : 'absent',
        proposed_correction: `Copy \`${relative}\` from the template (${templateFile}).`,
      });
      continue;
    }
    if (!text.trim()) {
      addDeviation(report, {
        title: `${relative} is empty`,
        path: relative,
        expected: 'Non-empty template content',
        found: 'empty file',
        proposed_correction: `Replace \`${relative}\` with the template copy (${templateFile}).`,
      });
      continue;
    }
    const absent = missingMarkers(text, markers);
    if (relative === '.github/CONTRIBUTING.md' && !SIGNED_COMMIT_RE.test(text)) {
      absent.push('a mention of signed commits');
    }
    if (absent.length) {
      addDeviation(report, {
        title: `${relative} is missing required template content`,
        path: relative,
        expected: markers.join('; ') || 'non-empty file',
        found: `missing: ${absent.join('; ')}`,
        proposed_correction: `Replace \`${relative}\` with the template copy so the required content is present (${templateFile}).`,
      });
    } else {
      report.passed.push(relative);
    }
  }

  const licenseText = readText(path.join(target, 'LICENSE.md'));
  if (licenseText === null) {
    addDeviation(report, {
      title: 'Missing LICENSE.md',
      path: 'LICENSE.md',
      expected: `LICENSE.md containing SPDX-License-Identifier: ${expectedSpdx}`,
      found: 'absent',
      proposed_correction: 'Copy LICENSE.md from the template. If the project uses a different license, add that file instead and keep its SPDX identifier.',
    });
  } else {
    const foundSpdx = SPDX_RE.exec(licenseText);
    if (!foundSpdx) {
      addDeviation(report, {
        title: 'LICENSE.md has no SPDX identifier',
        path: 'LICENSE.md',
        expected: `SPDX-License-Identifier: ${expectedSpdx}`,
        found: 'no SPDX-License-Identifier line',
        proposed_correction: `Add \`SPDX-License-Identifier: ${expectedSpdx}\` if this repository uses the template license, or add the SPDX identifier of the license the project actually uses. Do not replace an existing license blindly.`,
      });
    } else if (foundSpdx[1] !== expectedSpdx) {
      addDeviation(report, {
        title: 'LICENSE.md SPDX identifier differs from the template',
        path: 'LICENSE.md',
        expected: expectedSpdx,
        found: foundSpdx[1],
        proposed_correction: `Use the template LICENSE.md (${expectedSpdx}) when this repository is distributed under that license. Keep the current file when the project intentionally uses a different license.`,
      });
    } else {
      report.passed.push('LICENSE.md');
    }
  }

  const ignoreText = readText(path.join(target, '.gitignore'));
  if (ignoreText === null) {
    addDeviation(report, {
      title: 'Missing .gitignore',
      path: '.gitignore',
      expected: `Template ignore patterns: ${templateIgnore.join(', ')}`,
      found: 'absent',
      proposed_correction: 'Copy .gitignore from the template, then add any project-specific patterns.',
    });
  } else {
    const present = new Set(gitignorePatterns(ignoreText));
    const missing = templateIgnore.filter((pattern) => !present.has(pattern));
    if (missing.length) {
      addDeviation(report, {
        title: '.gitignore is missing template patterns',
        path: '.gitignore',
        expected: 'Every uncommented template pattern',
        found: `missing: ${missing.join(', ')}`,
        proposed_correction: 'Append the missing patterns to .gitignore. Keep existing project-specific patterns.',
      });
    } else {
      report.passed.push('.gitignore');
    }
  }

  const dockerfile = readText(path.join(target, 'Dockerfile'));
  if (dockerfile === null) {
    addDeviation(report, {
      title: 'Missing Dockerfile',
      path: 'Dockerfile',
      expected: 'A Dockerfile whose build image can run make all',
      found: 'absent',
      proposed_correction: 'Copy Dockerfile from the template, then extend it for this project if the image needs extra tools.',
    });
  } else if (!FROM_RE.test(dockerfile)) {
    addDeviation(report, {
      title: 'Dockerfile has no FROM instruction',
      path: 'Dockerfile',
      expected: 'A FROM instruction',
      found: 'no FROM line',
      proposed_correction: 'Add a FROM instruction, or replace the file with the template Dockerfile and re-apply project-specific packages.',
    });
  } else {
    report.passed.push('Dockerfile');
  }

  const makefile = readText(path.join(target, 'Makefile'));
  if (makefile === null) {
    addDeviation(report, {
      title: 'Missing Makefile',
      path: 'Makefile',
      expected: 'Top-level all and clean targets',
      found: 'absent',
      proposed_correction: 'Add a top-level Makefile whose all target builds every project and whose clean target removes generated files.',
    });
  } else {
    const targets = makeTargets(makefile);
    for (const name of ['all', 'clean']) {
      if (!targets.has(name)) {
        const article = 'aeiou'.includes(name[0]) ? 'An' : 'A';
        addDeviation(report, {
          title: `Makefile has no ${name} target`,
          path: 'Makefile',
          expected: `${article} \`${name}:\` target with a tab-indented recipe`,
          found: 'target absent',
          proposed_correction: `Add a \`${name}\` target. The template requirement is that \`make all\` builds the repository and \`make clean\` removes generated files.`,
        });
      } else if (!targets.get(name).length) {
        addDeviation(report, {
          title: `Makefile ${name} target has no recipe`,
          path: 'Makefile',
          expected: `\`${name}\` recipe indented with a tab`,
          found: 'no tab-indented recipe',
          proposed_correction: `Give \`${name}\` a tab-indented recipe that builds or cleans the projects under projects/.`,
        });
      } else {
        report.passed.push(`Makefile:${name}`);
      }
    }
  }

  const readme = readText(path.join(target, 'README.md'));
  if (readme === null) {
    addDeviation(report, {
      title: 'Missing README.md',
      path: 'README.md',
      expected: 'Project README with hardware, build, debug, contributing, and license sections, and no template onboarding list',
      found: 'absent',
      proposed_correction: "Create README.md from the template, delete the 'How to use the template' section, and replace every TODO with content for this project.",
    });
  } else {
    const lowered = readme.toLowerCase();
    const residue = README_RESIDUE.filter((snippet) => lowered.includes(snippet.toLowerCase()));
    if (residue.length) {
      addDeviation(report, {
        title: 'README.md still contains the template onboarding instructions',
        path: 'README.md',
        expected: "No 'How to use the template' section and no template setup checklist",
        found: residue.join('; '),
        proposed_correction: "Delete the 'How to use the template' section and any leftover template setup steps. The published README is for users of this project.",
      });
    } else {
      report.passed.push('README.md onboarding section removed');
    }

    const intro = README_INTRO_RESIDUE.filter((snippet) => readme.includes(snippet));
    if (intro.length) {
      addDeviation(report, {
        title: 'README.md still uses the template introduction',
        path: 'README.md',
        expected: 'A project-specific title and a 1-2 sentence introduction',
        found: intro.join('; '),
        proposed_correction: 'Replace the template title and the introduction placeholder with a description of this project.',
      });
    } else {
      report.passed.push('README.md introduction');
    }

    const todoLines = splitLines(readme)
      .map((line, index) => ({ index: index + 1, line }))
      .filter(({ line }) => TODO_RE.test(line))
      .map(({ index, line }) => `${index}: ${line.trim()}`);
    if (todoLines.length) {
      addDeviation(report, {
        title: 'README.md still has template TODO placeholders',
        path: 'README.md',
        expected: 'Every template TODO replaced with project content, or the unsupported section removed',
        found: todoLines.join('; '),
        proposed_correction: 'Replace each TODO. Hardware requirements and hardware setup need the real parts and a block diagram. Build setup needs numbered steps for each supported host, and unsupported hosts should be removed. Debug environment needs the actual debug procedure.',
      });
    } else {
      report.passed.push('README.md placeholders');
    }

    const missingSections = README_SECTIONS.filter((title) => sectionBody(readme, title) === null);
    if (missingSections.length) {
      addDeviation(report, {
        title: 'README.md is missing required sections',
        path: 'README.md',
        expected: README_SECTIONS.join(', '),
        found: `missing: ${missingSections.join(', ')}`,
        proposed_correction: 'Add the missing second-level headings and fill them in. Remove a host-platform subsection only when that host is unsupported; do not remove Hardware, Build, Debug, Contributing, or License.',
      });
    } else {
      report.passed.push('README.md sections');
    }

    const contributing = sectionBody(readme, 'Contributing');
    if (contributing !== null && !contributing.includes('CONTRIBUTING')) {
      addDeviation(report, {
        title: 'README.md Contributing section does not link to the contributing guide',
        path: 'README.md',
        expected: 'A link to .github/CONTRIBUTING.md',
        found: contributing.trim().slice(0, 200) || 'empty section',
        proposed_correction: 'Link the Contributing section to .github/CONTRIBUTING.md.',
      });
    } else if (contributing !== null) {
      report.passed.push('README.md contributing link');
    }

    const licenseBody = sectionBody(readme, 'License');
    if (licenseBody !== null && !licenseBody.includes('LICENSE.md')) {
      addDeviation(report, {
        title: 'README.md License section does not link to LICENSE.md',
        path: 'README.md',
        expected: 'A link to LICENSE.md',
        found: licenseBody.trim().slice(0, 200) || 'empty section',
        proposed_correction: 'Link the License section to LICENSE.md.',
      });
    } else if (licenseBody !== null) {
      report.passed.push('README.md license link');
    }

    const build = sectionBody(readme, 'Build environment setup');
    if (build !== null && !build.toLowerCase().includes('docker')) {
      addDeviation(report, {
        title: 'README.md build section does not document Docker',
        path: 'README.md',
        expected: 'A Docker subsection under Build environment setup',
        found: 'no Docker mention in that section',
        proposed_correction: 'Document how to build the image from Dockerfile and how to run the container. Keep numbered setup steps for each supported native host.',
      });
    } else if (build !== null) {
      report.passed.push('README.md Docker setup');
    }
  }

  const projects = path.join(target, 'projects');
  if (!isDir(projects)) {
    addDeviation(report, {
      title: 'Missing projects directory',
      path: 'projects/',
      expected: 'Software projects live in subdirectories of projects/',
      found: 'absent',
      proposed_correction: 'Create projects/ and put each software project in its own subdirectory.',
    });
  } else {
    const children = fs.readdirSync(projects, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => entry.name)
      .sort();
    if (!children.length) {
      addDeviation(report, {
        title: 'No software project under projects/',
        path: 'projects/',
        expected: 'At least one project subdirectory',
        found: 'no subdirectories',
        proposed_correction: 'Create the software project under projects/<project-name>/ and make sure the top-level `make all` builds it.',
      });
    } else {
      report.passed.push(`projects/ contains ${children.join(', ')}`);
    }
  }

  const ownersFile = codeownersPath(target);
  if (ownersFile === null) {
    addDeviation(report, {
      title: 'Missing CODEOWNERS',
      path: '.github/CODEOWNERS',
      expected: 'At least one ownership rule',
      found: 'absent',
      proposed_correction: 'Copy .github/CODEOWNERS from the template, then replace the default owner with the team that owns this repository if it is different.',
    });
  } else {
    const relative = path.relative(target, ownersFile);
    const text = readText(ownersFile) || '';
    const rules = ownerRules(text);
    if (!rules.length) {
      addDeviation(report, {
        title: 'CODEOWNERS has no ownership rule',
        path: relative,
        expected: 'At least one rule containing an @owner',
        found: 'no owner rules',
        proposed_correction: 'Add an ownership rule. Start from the template default if this repository does not have a team yet.',
      });
    } else {
      report.passed.push(relative);
      if (sameList(rules, templateOwners)) {
        addReview(report, {
          title: 'CODEOWNERS still matches the template default',
          path: relative,
          expected: 'Owners for this repository',
          found: rules.join('; '),
          proposed_correction: 'Keep this rule if that team owns the repository. Otherwise replace it with the owning team. Apply does not change an existing owner rule.',
        });
      }
    }
  }

  return report;
}

function applyFixes(template, target, report) {
  for (const [relative, markers] of SCAFFOLD) {
    const source = path.join(template, relative);
    const destination = path.join(target, relative);
    if (!isFile(source)) die(`Template file is missing: ${source}`);
    const text = readText(destination);
    let needsCopy = text === null || !text.trim() || missingMarkers(text, markers).length > 0;
    if (relative === '.github/CONTRIBUTING.md' && text !== null && !SIGNED_COMMIT_RE.test(text)) {
      needsCopy = true;
    }
    if (needsCopy && copyBytes(source, destination)) {
      const action = text === null ? 'Copied' : 'Replaced';
      report.changes.push(`${action} \`${relative}\` from the template.`);
    }
  }

  const licenseDest = path.join(target, 'LICENSE.md');
  if (!exists(licenseDest) && copyBytes(path.join(template, 'LICENSE.md'), licenseDest)) {
    report.changes.push('Copied `LICENSE.md` from the template.');
  }

  const dockerDest = path.join(target, 'Dockerfile');
  if (!exists(dockerDest) && copyBytes(path.join(template, 'Dockerfile'), dockerDest)) {
    report.changes.push('Copied `Dockerfile` from the template.');
  }

  const readmePath = path.join(target, 'README.md');
  if (!exists(readmePath) && copyBytes(path.join(template, 'README.md'), readmePath)) {
    report.changes.push('Copied `README.md` from the template.');
  }
  const readme = readText(readmePath);
  if (readme !== null && readme !== stripHowTo(readme) && writeText(readmePath, stripHowTo(readme))) {
    report.changes.push('Removed the `## How to use the template` section from `README.md`.');
  }

  const ignoreDest = path.join(target, '.gitignore');
  const requiredPatterns = gitignorePatterns(readText(path.join(template, '.gitignore')) || '');
  const currentIgnore = readText(ignoreDest);
  if (currentIgnore === null) {
    if (copyBytes(path.join(template, '.gitignore'), ignoreDest)) {
      report.changes.push('Copied `.gitignore` from the template.');
    }
  } else {
    const present = new Set(gitignorePatterns(currentIgnore));
    const missing = requiredPatterns.filter((pattern) => !present.has(pattern));
    if (missing.length) {
      const suffix = endsWithNewline(currentIgnore) ? currentIgnore : `${currentIgnore}\n`;
      const block = ['', '# Developer Services template patterns', ...missing, ''].join('\n');
      if (writeText(ignoreDest, suffix + block)) {
        report.changes.push('Appended missing template patterns to `.gitignore`.');
      }
    }
  }

  const makefilePath = path.join(target, 'Makefile');
  const makefile = readText(makefilePath);
  if (makefile === null || makeTargets(makefile).size === 0) {
    if (writeText(makefilePath, STANDARD_MAKEFILE)) {
      const action = makefile === null ? 'Wrote' : 'Replaced stub';
      report.changes.push(`${action} \`Makefile\` with top-level all and clean targets.`);
    }
  } else {
    const targets = makeTargets(makefile);
    const blocks = [];
    if (!makefile.includes('PROJECT_DIRS') && (!targets.has('all') || !targets.has('clean'))) {
      blocks.push('PROJECT_DIRS := $(wildcard projects/*/)\n');
    }
    if (!targets.has('all') || !targets.get('all').length) blocks.push(ALL_TARGET_BLOCK);
    if (!targets.has('clean') || !targets.get('clean').length) blocks.push(CLEAN_TARGET_BLOCK);
    if (blocks.length) {
      const suffix = endsWithNewline(makefile) ? makefile : `${makefile}\n`;
      const addition = `\n# Developer Services template targets\n${blocks.join('\n')}`;
      if (writeText(makefilePath, suffix + addition)) {
        report.changes.push('Added missing all and/or clean targets to `Makefile`.');
      }
    }
  }

  if (codeownersPath(target) === null) {
    if (copyBytes(path.join(template, '.github', 'CODEOWNERS'), path.join(target, '.github', 'CODEOWNERS'))) {
      report.changes.push('Copied `.github/CODEOWNERS` from the template.');
    }
  } else {
    const owners = codeownersPath(target);
    const text = readText(owners) || '';
    if (!ownerRules(text).length) {
      const templateRules = ownerRules(readText(path.join(template, '.github', 'CODEOWNERS')) || '');
      const line = templateRules[0] || '* @SiliconLabsSoftware/DevServices-DevLeads';
      const suffix = text === '' || endsWithNewline(text) ? text : `${text}\n`;
      if (writeText(owners, `${suffix}${line}\n`)) {
        report.changes.push(`Added an ownership rule to \`${path.relative(target, owners)}\`.`);
      }
    }
  }
}

function manualFollowups() {
  return [
    'Import the basic public ruleset into the GitHub organization: https://github.com/SiliconLabsSoftware/devs-template/blob/main/.github/rulesets/Silabs-basic-public-ruleset.json . This is an organization setting and is not visible in the working tree.',
    'Install the CLA assistant GitHub App key as repository or organization secrets `GH_APP_ID` and `GH_APP_PRIVATE_KEY` for `.github/workflows/01-CLA-Assistant.yml`. Contact Silicon Labs GitHub support. Do not commit the private key.',
    'Confirm the repository is public and that the four template workflows are the ones that should run. The template README allows adjustment for internal versus public repositories; files that already contain the required workflow markers are left in place.',
  ];
}

function renderFinding(index, finding) {
  return [
    `### ${index}. ${finding.title}`,
    '',
    `- **Path:** \`${finding.path}\``,
    `- **Expected:** ${finding.expected}`,
    `- **Found:** ${finding.found}`,
    `- **Proposed correction:** ${finding.proposed_correction}`,
    '',
  ];
}

function render(template, target, mode, before, after) {
  const deviations = after.findings;
  const result = deviations.length ? 'Not ready' : 'Ready';
  const lines = [
    '# OSS readiness report',
    '',
    `- **Input repository:** \`${target}\``,
    `- **Template:** \`${template}\``,
    `- **Mode:** ${mode}`,
    `- **Result:** ${result}`,
    `- **Deviations:** ${deviations.length}`,
    '',
  ];
  if (mode === 'apply') {
    lines.push('## Changes applied', '');
    if (before && before.changes.length) {
      for (const change of before.changes) lines.push(`- ${change}`);
    } else {
      lines.push('- No files changed.');
    }
    lines.push('');
  }
  lines.push('## Deviations', '');
  if (!deviations.length) {
    lines.push('No deviations.', '');
  } else {
    deviations.forEach((finding, index) => lines.push(...renderFinding(index + 1, finding)));
  }
  lines.push('## Review', '');
  if (!after.reviews.length) {
    lines.push('No review items.', '');
  } else {
    after.reviews.forEach((finding, index) => lines.push(...renderFinding(index + 1, finding)));
  }
  lines.push(
    '## Manual follow-up',
    '',
    'These items are required by the template and cannot be confirmed or completed from the working tree:',
    '',
  );
  for (const item of manualFollowups()) lines.push(`- ${item}`);
  lines.push('', '## Passed', '');
  if (after.passed.length) {
    for (const item of after.passed) lines.push(`- ${item}`);
  } else {
    lines.push('- None.');
  }
  lines.push('');
  return lines.join('\n');
}

function defaultTemplateRoot() {
  let current = __dirname;
  for (;;) {
    const marker = path.join(current, '.github', 'workflows', '01-CLA-Assistant.yml');
    const canonical = path.join(current, 'skills', 'oss-template');
    const linked = path.join(current, '.cursor', 'skills', 'oss-template');
    if (isFile(marker) && (isDir(canonical) || isDir(linked))) return fs.realpathSync(current);
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  die(`Could not find the template root from ${__dirname}`);
}

function resolveTemplate(arg) {
  const template = fs.realpathSync(path.resolve(expandUser(arg || defaultTemplateRoot())));
  const marker = path.join(template, '.github', 'workflows', '01-CLA-Assistant.yml');
  if (!isDir(template) || !isFile(marker)) {
    die(`Template root does not contain the Developer Services workflows: ${template}`);
  }
  return template;
}

function resolveInput(arg) {
  const expanded = path.resolve(expandUser(arg));
  if (!isDir(expanded)) die(`Input repository root does not exist or is not a directory: ${expanded}`);
  return fs.realpathSync(expanded);
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function overlaps(template, target) {
  return isInside(template, target) || isInside(target, template);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  if (!args.length || args[0] === '-h' || args[0] === '--help') {
    die('Usage: node oss_template.js <verify|apply> --input <path> [--template <path>]');
  }
  const mode = args[0];
  if (mode !== 'verify' && mode !== 'apply') die(`Unknown mode: ${mode}`);
  let input = null;
  let template = null;
  for (let i = 1; i < args.length; i += 1) {
    const option = args[i];
    const value = args[i + 1];
    if ((option === '--input' || option === '--template') && !value) die(`Missing value for ${option}`);
    if (option === '--input') {
      input = value;
      i += 1;
    } else if (option === '--template') {
      template = value;
      i += 1;
    } else {
      die(`Unknown argument: ${option}`);
    }
  }
  if (!input) die('Input repository root is required. Pass --input <path>.');
  return { mode, input, template };
}

function main() {
  const args = parseArgs(process.argv);
  const template = resolveTemplate(args.template);
  const target = resolveInput(args.input);
  if (args.mode === 'apply' && overlaps(template, target)) {
    die('Refusing to modify the template repository or a directory inside it. Pass the root of the repository that should receive the template.');
  }
  const changes = createReport();
  if (args.mode === 'apply') applyFixes(template, target, changes);
  const report = collect(template, target);
  fs.writeSync(1, `${render(template, target, args.mode, args.mode === 'apply' ? changes : null, report)}\n`);
  process.exit(report.findings.length ? 1 : 0);
}

main();
