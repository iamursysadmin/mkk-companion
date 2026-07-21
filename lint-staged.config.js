export default {
  '*.{js,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{ts,vue}': [() => 'pnpm run typecheck', () => 'pnpm run test'],
  '*.{json,md,css}': ['prettier --write']
}
