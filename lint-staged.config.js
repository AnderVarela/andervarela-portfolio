export default {
  '*.{ts,tsx}': ['eslint --fix --max-warnings 0', 'prettier --write'],
  '*.css': ['stylelint --fix --max-warnings 0', 'prettier --write'],
  '*.{js,json,html,md,yml,yaml}': 'prettier --write',
};
