import defineEslintConfig from '@kriszu/eslint-config'

export default defineEslintConfig({
  stylistic:{
    semi: 'always',
  },
},{
  rules: {
    'no-restricted-globals': 'off',
    'no-new-func': 'off',
    'ts/ban-types': 'off',
    'node/prefer-global/buffer': 'off',
    'prefer-rest-params': 'off',
    'ts/prefer-for-of': 'off',
    'ts/no-use-before-define': 'off',
  },
})
