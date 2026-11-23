<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Git Workflow Rule

- **Mandatory Checkpoint Before Major Changes:** Before making any major changes (redesigns, multi-file feature additions, refactors, or dependency swaps), ALWAYS create a Git checkpoint first (`git add -A && git commit -m "..."` plus a descriptive `git tag`) so the user can cleanly roll back at any time.

