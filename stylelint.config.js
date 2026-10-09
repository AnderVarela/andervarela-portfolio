export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      { message: 'Las clases de CSS Modules se escriben en camelCase' },
    ],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
  },
};
