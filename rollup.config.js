import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'

const entries = [
  'src/index.ts',
]

const plugins = [
  alias({
    entries: [
      { find: /^node:(.+)$/, replacement: '$1' },
    ],
  }),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        // file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        dir: 'dist/es/',
        format: 'es',
        preserveModules: true,
      },
      {
        // file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        dir: 'dist/cjs/',
        format: 'cjs',
        exports: 'named',
        preserveModules: true,
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    plugins: [
      dts({ respectExternal: true }),
    ],
  })),
]
