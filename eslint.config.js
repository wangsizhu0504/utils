import Kriszu from '@kriszu/eslint-config'

export default Kriszu({
  rules: {
    'no-restricted-globals': 'off',
    'no-new-func': 'off',
    'ts/ban-types': 'off',
    'node/prefer-global/buffer': 'off',
  },
})
