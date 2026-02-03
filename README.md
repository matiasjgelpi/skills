# @matiasjgelpi/skills

Skills multiplataforma para **Claude Code**, **Cursor** y **Antigravity**.

## Instalación

No requiere instalación. Usa directamente con `npx`:

```bash
npx laburen-skills list
```

## Uso

```bash
# Ver skills disponibles
npx laburen-skills list

# Instalar en Claude Code
npx laburen-skills install laburen-prompt-guide --claude

# Instalar en Cursor
npx laburen-skills install laburen-prompt-guide --cursor

# Instalar en Antigravity
npx laburen-skills install laburen-prompt-guide --antigravity

# Instalar en todas las plataformas
npx laburen-skills install laburen-prompt-guide --all
```

## Skills disponibles

| Skill | Descripción |
|-------|-------------|
| `laburen-prompt-guide` | Guía para crear prompts de agentes conversacionales |

## Rutas de instalación

| Plataforma | Ubicación |
|------------|-----------|
| Claude Code | `~/.claude/skills/<skill>/SKILL.md` |
| Cursor | `~/.cursor/skills/<skill>/SKILL.md` |
| Antigravity | `~/.gemini/antigravity/skills/<skill>/SKILL.md` |

## Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para crear tus propios skills o contribuir al proyecto.

## Licencia

MIT
