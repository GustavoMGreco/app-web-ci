const js = require('@eslint/js');
const globals = require('globals');
const security = require('eslint-plugin-security');

module.exports = [
  { ignores: ['node_modules/', 'dist/', 'coverage/'] },
  js.configs.recommended,
  security.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.jest },
    },
    rules: {
      // Desativa falso-positivo para acesso a propriedades literais
      'security/detect-object-injection': 'off',
    },
  },
];
