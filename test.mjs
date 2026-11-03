import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('🧪 Running Claude Animation Skills repository sanity test suite...\n');

// 1. Required files
const requiredFiles = [
  'README.md',
  'LICENSE',
  'MAINTAINERS.md',
  'CITATION.cff',
  'package.json',
  'install.sh',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json'
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `Expected ${file} to exist`);
  const content = fs.readFileSync(file, 'utf8');
  assert.ok(content.length > 0, `Expected ${file} not to be empty`);
  console.log(`✓ File verified: ${file}`);
}

// 2. Prohibited files
const forbiddenFiles = ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'];
for (const file of forbiddenFiles) {
  assert.ok(!fs.existsSync(file), `Forbidden file found: ${file}`);
  console.log(`✓ Confirmed absent: ${file}`);
}

// 3. Verify skills
const expectedSkills = [
  'zach-d-films',
  'stick-figure',
  'minimalistic-graphics',
  'map-route',
  'breakdown',
  'graph'
];
for (const skill of expectedSkills) {
  const skillFile = path.join('skills', skill, 'SKILL.md');
  assert.ok(fs.existsSync(skillFile), `Expected skill manifest: ${skillFile}`);
  console.log(`✓ Skill verified: /${skill}`);
}

// 4. Sole maintainer policy
const maintainers = fs.readFileSync('MAINTAINERS.md', 'utf8');
assert.ok(maintainers.includes('Abdullah Formuli'), 'MAINTAINERS.md must specify Abdullah Formuli');
assert.ok(maintainers.includes('authrainmedia@gmail.com'), 'MAINTAINERS.md must specify email');
assert.ok(maintainers.includes('External contributions or third-party pull requests are not accepted'), 'MAINTAINERS.md must enforce sole maintainer policy');

const readme = fs.readFileSync('README.md', 'utf8');
assert.ok(readme.includes('maintained solely by [Abdullah Formuli]'), 'README.md must declare sole maintainer');
assert.ok(readme.includes('External contributions or third-party pull requests are not accepted'), 'README.md must declare no contributions accepted');
console.log('✓ Confirmed: Sole maintainer policy enforced');

// 5. License verification
const license = fs.readFileSync('LICENSE', 'utf8');
assert.ok(license.includes('Copyright (c) 2026 Abdullah Formuli'), 'LICENSE must attribute Abdullah Formuli');
console.log('✓ Confirmed: LICENSE attributed to Abdullah Formuli');

// 6. Citation verification
const citation = fs.readFileSync('CITATION.cff', 'utf8');
assert.ok(citation.includes('family-names: Formuli'), 'CITATION.cff must list Formuli');
assert.ok(citation.includes('given-names: Abdullah'), 'CITATION.cff must list Abdullah');
assert.ok(citation.includes('authrain-cloud-abdullahformuli/claude-animation-skills'), 'CITATION.cff must list repo');
console.log('✓ Confirmed: CITATION.cff verified');

// 7. Package.json verification
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert.strictEqual(pkg.name, 'claude-animation-skills');
assert.ok(pkg.author.includes('Abdullah Formuli'), 'package.json author must be Abdullah Formuli');
assert.ok(pkg.repository.url.includes('authrain-cloud-abdullahformuli/claude-animation-skills'), 'package.json repo URL must be updated');
console.log('✓ Confirmed: package.json verified');

// 8. Plugin metadata verification
const pluginJson = JSON.parse(fs.readFileSync('.claude-plugin/plugin.json', 'utf8'));
assert.ok(pluginJson.author.name.includes('Abdullah Formuli'), 'plugin.json author must be Abdullah Formuli');
assert.ok(pluginJson.repository.includes('authrain-cloud-abdullahformuli/claude-animation-skills'), 'plugin.json repository must be updated');

const marketplaceJson = JSON.parse(fs.readFileSync('.claude-plugin/marketplace.json', 'utf8'));
assert.ok(marketplaceJson.owner.name.includes('Abdullah Formuli'), 'marketplace.json owner must be Abdullah Formuli');
console.log('✓ Confirmed: Plugin metadata verified');

// 9. Zero upstream mentions
assert.ok(!readme.includes('artemnovitckii'), 'README.md must not reference upstream author handle');
assert.ok(!readme.includes('novitckii.com'), 'README.md must not reference upstream domain');
console.log('✓ Confirmed: Zero upstream author references');

console.log('\n🎉 All Claude Animation Skills sanity tests passed successfully!');
