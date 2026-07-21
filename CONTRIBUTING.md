# Contributing

Thanks for wanting to contribute to mkk-companion! A few guidelines before you open a PR.

## AI use

I'm pro-AI as a tool — use it if it helps you. What I won't accept:

- **Pull requests submitted directly by an autonomous AI agent**, with no
  human reviewing the change before it's opened.
- **Contributions where you can't explain or defend a change in your own
  words** if I ask a follow-up question during review. If the honest
  answer to "why did you do it this way?" is "the AI decided," it's not
  ready to submit.

What's fine, no disclosure needed:

- Autocomplete, single-line completions, regex help, translation.

What's fine, but disclose it in the PR description (there's a section for
this in the PR template):

- Using an LLM to help write, debug, or research a substantial part of a
  change — as long as you reviewed, tested, and understand what it produced
  well enough to answer questions about it.

There's only one maintainer here, and the point of review is a real
back-and-forth about the actual change. If a PR turns into me asking "why
this approach?" and getting an answer that's clearly not yours, I'll close
it — not because AI was involved, but because at that point there's no one
on the other end who can actually respond.

## Other guidelines

- `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, and
  `pnpm-workspace.yaml` changes from non-maintainer PRs will be auto-flagged
  by CI — revert those files if your PR touches them unintentionally.
- Run `pnpm run typecheck`, `pnpm run lint`, and `pnpm run test` locally
  before opening a PR; the same checks run in CI.

<div align="center">
  <p>
    <strong>Happy Coding :)</strong>
  </p>
</div>
