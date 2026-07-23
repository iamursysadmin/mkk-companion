export default {
  '*.{js,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  // Unit tests only — `pnpm run test` also runs Playwright e2e (full app build),
  // which is too slow / flaky for a pre-commit hook in the desktop-lite container.
  '*.{ts,vue}': [() => 'pnpm run typecheck', () => 'pnpm run test:unit'],
  '*.{json,md,css}': ['prettier --write']
}
