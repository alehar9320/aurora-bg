import esbuild from 'rollup-plugin-esbuild'
import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import terser from '@rollup/plugin-terser'

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
      ...(process.env.SERVE
        ? [
            serve({
              open: '/examples/basic.html',
              contentBase: '.',
              host: 'localhost',
              port: 3000,
              historyApiFallback: '/examples/basic.html',
            }),
            livereload({ watch: 'dist', verbose: false }),
          ]
        : []),
    ],
    output: {
      file: 'dist/aurora.umd.js',
      format: 'umd',
      name: 'auroraBg',
      sourcemap: true,
    },
  },
]
