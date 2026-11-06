@AGENTS.md

## Claude Code notes

- `AGENTS.md` (imported above) is the single source of truth for every agent. Keep project knowledge there,
  not here, so Codex, OpenCode and Cursor get the same context.
- Playbooks live in `.agents/skills/<name>/SKILL.md`. Before a task that matches one, read it and follow it.
- If `docs/HANDOFF_PRIVATE.md` exists locally, read it at the start of a session (confidential context,
  owner's open items). It is gitignored; never commit it.
- Before UI work, use the installed design skills (design-taste-frontend, impeccable, frontend-design) and
  stay inside the design system in `AGENTS.md` section 5.
