# Guía para contribuir skills

Esta guía explica cómo crear un repositorio de skills similar y cómo contribuir skills al proyecto.

## Crear tu propio repositorio de skills

### 1. Estructura inicial

```bash
mkdir mi-skills && cd mi-skills
npm init -y
```

### 2. package.json

```json
{
  "name": "@tu-usuario/skills",
  "version": "1.0.0",
  "description": "Mis skills para Claude, Cursor y Antigravity",
  "type": "module",
  "bin": {
    "mi-skills": "bin/cli.js"
  },
  "files": ["bin", "skills", "adapters"],
  "author": "Tu Nombre",
  "license": "MIT"
}
```

### 3. Crear estructura de directorios

```bash
mkdir -p bin adapters skills
```

### 4. CLI (bin/cli.js)

```javascript
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
  if (args.includes('--all')) return ['claude', 'cursor', 'antigravity'];
  const targets = [];
  if (args.includes('--claude')) targets.push('claude');
  if (args.includes('--cursor')) targets.push('cursor');
  if (args.includes('--antigravity')) targets.push('antigravity');
  return targets;
}

function showHelp() {
  console.log(`
Uso:
  mi-skills list                              Lista skills disponibles
  mi-skills install <skill> --claude          Instala en Claude Code
  mi-skills install <skill> --cursor          Instala en Cursor
  mi-skills install <skill> --antigravity     Instala en Antigravity
  mi-skills install <skill> --all             Instala en todas
`);
}

switch (command) {
  case 'list':
    await listSkills();
    break;
  case 'install':
    const skillName = args.find(a => !a.startsWith('--'));
    const targets = parseTargets(args);
    if (!skillName || targets.length === 0) {
      console.error('Uso: mi-skills install <skill> --claude|--cursor|--antigravity|--all');
      process.exit(1);
    }
    await installSkill(skillName, targets);
    break;
  default:
    showHelp();
}
```

### 5. Adapters

**adapters/claude.js**
```javascript
import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

export default {
  name: 'claude',
  targetDir: join(homedir(), '.claude', 'skills'),
  filename: 'SKILL.md',

  async install(skillPath, skillName) {
    const targetDir = join(this.targetDir, skillName);
    const sourcePath = join(skillPath, 'SKILL.md');
    const targetPath = join(targetDir, this.filename);
    await mkdir(targetDir, { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
};
```

**adapters/cursor.js** y **adapters/antigravity.js** son iguales, solo cambian:
- cursor: `targetDir = ~/.cursor/skills/`
- antigravity: `targetDir = ~/.gemini/antigravity/skills/`

### 6. Crear un skill

```bash
mkdir -p skills/mi-skill
```

**skills/mi-skill/SKILL.md**
```markdown
---
name: mi-skill
description: Descripción corta del skill
---

# Mi Skill

Instrucciones y contenido del skill...
```

### 7. Hacer ejecutable y probar

```bash
chmod +x bin/cli.js
node bin/cli.js list
node bin/cli.js install mi-skill --claude
```

### 8. Publicar en npm

```bash
npm login
npm publish --access public --otp=CODIGO
```

---

## Contribuir a @laburen/skills (futuro)

Si el proyecto prospera y se migra a la organización `@laburen` en npm:

### Requisitos para contribuir un skill

1. **Formato correcto**: SKILL.md con frontmatter (name, description)
2. **Nombre único**: No debe colisionar con skills existentes
3. **Descripción clara**: Explicar cuándo usar el skill
4. **Contenido útil**: El skill debe aportar valor real

### Proceso de contribución

1. Fork del repositorio
2. Crear branch: `git checkout -b skill/nombre-del-skill`
3. Agregar skill en `skills/<nombre>/SKILL.md`
4. Probar localmente
5. Crear Pull Request

### Convenciones de nombres

- Usar kebab-case: `mi-skill-util`
- Prefijo por categoría (opcional):
  - `prompt-*`: Skills para crear prompts
  - `code-*`: Skills para código
  - `doc-*`: Skills para documentación

---

## Migrar a @laburen en npm

Cuando el proyecto esté listo para la organización:

1. Crear organización `laburen` en npmjs.com
2. Agregar colaboradores
3. Cambiar `name` en package.json a `@laburen/skills`
4. Publicar: `npm publish --access public`
5. Actualizar documentación con nuevos comandos

```bash
# Después de migrar:
npx @laburen/skills list
npx @laburen/skills install <skill> --all
```
