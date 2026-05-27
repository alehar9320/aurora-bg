import esbuild from 'rollup-plugin-esbuild'
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/index.ts',
    plugins: [esbuild({ tsconfig: 'tsconfig.json' }), resolve()],
    output: {
      file: 'dist/aurora.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  },
  {
    input: 'src/index.ts',
    plugins: [
      esbuild({ tsconfig: 'tsconfig.json' }),
      resolve(),
      terser({ format: { comments: false } }),
    ],
    output: {
      file: 'dist/aurora.umd.js',
      format: 'umd',
      name: 'auroraBg',
      sourcemap: true,
    },
  },
]
