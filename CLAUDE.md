# @matiasjgelpi/skills

CLI multiplataforma para instalar skills en Claude Code, Cursor y Antigravity.

## Estructura del proyecto

```
skills/
├── package.json              # Paquete npm @matiasjgelpi/skills
├── bin/cli.js                # CLI principal (comando: laburen-skills)
├── adapters/                 # Adaptadores por plataforma
│   ├── claude.js             # → ~/.claude/skills/<name>/SKILL.md
│   ├── cursor.js             # → ~/.cursor/skills/<name>/SKILL.md
│   └── antigravity.js        # → ~/.gemini/antigravity/skills/<name>/SKILL.md
└── skills/                   # Skills disponibles
    └── <skill-name>/
        └── SKILL.md          # Contenido del skill (frontmatter + markdown)
```

## Comandos CLI

```bash
npx laburen-skills list                              # Lista skills disponibles
npx laburen-skills install <skill> --claude          # Instala en Claude Code
npx laburen-skills install <skill> --cursor          # Instala en Cursor
npx laburen-skills install <skill> --antigravity     # Instala en Antigravity
npx laburen-skills install <skill> --all             # Instala en todas
```

## Formato de un skill (SKILL.md)

```markdown
---
name: nombre-del-skill
description: Descripción corta que aparece en la lista de skills disponibles
---

# Título del Skill

Contenido del skill en markdown...
```

## Agregar un nuevo skill

1. Crear directorio en `skills/<nombre-del-skill>/`
2. Crear `SKILL.md` con frontmatter (name, description) y contenido
3. Probar localmente: `node bin/cli.js install <nombre> --claude`
4. Commit, bump version, publicar en npm

## Rutas de instalación por plataforma

| Plataforma   | Directorio destino                          | Archivo    |
|--------------|---------------------------------------------|------------|
| Claude Code  | `~/.claude/skills/<skill-name>/`            | SKILL.md   |
| Cursor       | `~/.cursor/skills/<skill-name>/`            | SKILL.md   |
| Antigravity  | `~/.gemini/antigravity/skills/<skill-name>/`| SKILL.md   |

## Desarrollo local

```bash
# Probar comandos sin publicar
node bin/cli.js list
node bin/cli.js install laburen-prompt-guide --claude

# Publicar nueva versión
npm version patch
npm publish --access public --otp=CODIGO
git push
```

## Skills incluidos

- **laburen-prompt-guide**: Guía para crear prompts de agentes conversacionales siguiendo la estructura estándar de Laburen
