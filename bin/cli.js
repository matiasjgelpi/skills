#!/usr/bin/env node

import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const adapters = {
  claude: (await import('../adapters/claude.js')).default,
  cursor: (await import('../adapters/cursor.js')).default,
  antigravity: (await import('../adapters/antigravity.js')).default,
};

const [,, command, ...args] = process.argv;

async function listSkills() {
  const skillsDir = join(rootDir, 'skills');
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = entries.filter(e => e.isDirectory()).map(e => e.name);

  console.log('\nSkills disponibles:\n');
  skills.forEach(s => console.log(`  - ${s}`));
  console.log();
}

async function installSkill(skillName, targets) {
  const skillPath = join(rootDir, 'skills', skillName);

  for (const target of targets) {
    const adapter = adapters[target];
    if (!adapter) {
      console.error(`Adapter desconocido: ${target}`);
      continue;
    }

    try {
      await adapter.install(skillPath, skillName);
      console.log(`✓ ${skillName} instalado en ${target}`);
    } catch (err) {
      console.error(`✗ Error instalando ${skillName} en ${target}: ${err.message}`);
    }
  }
}

function parseTargets(args) {
  const targets = [];

  if (args.includes('--all')) {
    return ['claude', 'cursor', 'antigravity'];
  }

  if (args.includes('--claude')) targets.push('claude');
  if (args.includes('--cursor')) targets.push('cursor');
  if (args.includes('--antigravity')) targets.push('antigravity');

  return targets;
}

function showHelp() {
  console.log(`
@laburen/skills - Skills multiplataforma

Uso:
  laburen-skills list                              Lista skills disponibles
  laburen-skills install <skill> --claude          Instala en Claude Code
  laburen-skills install <skill> --cursor          Instala en Cursor
  laburen-skills install <skill> --antigravity     Instala en Antigravity
  laburen-skills install <skill> --all             Instala en todas las plataformas

Ejemplos:
  laburen-skills install laburen-prompt-guide --claude
  laburen-skills install laburen-prompt-guide --all
`);
}

// Main
switch (command) {
  case 'list':
    await listSkills();
    break;

  case 'install':
    const skillName = args.find(a => !a.startsWith('--'));
    const targets = parseTargets(args);

    if (!skillName) {
      console.error('Error: Debes especificar el nombre del skill');
      process.exit(1);
    }

    if (targets.length === 0) {
      console.error('Error: Debes especificar al menos un target (--claude, --cursor, --antigravity, --all)');
      process.exit(1);
    }

    await installSkill(skillName, targets);
    break;

  case 'help':
  case '--help':
  case '-h':
  default:
    showHelp();
}
