/**
 * Absolute imports
 */
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';

/**
 * package.json
 */
import pkg from './package.json';

// const umdGlobals = {
//   react: 'React',
//   'prop-types': 'PropTypes',
//   'react-dom': 'ReactDOM',
// };

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      // name: 'reactThreeViewer',
      // globals: umdGlobals,
      // external: [...Object.keys(pkg.peerDependencies || {})],
      sourcemap: true,
      exports: 'named',
    },
    // {
    //   file: pkg.browser,
    //   format: 'umd',
    //   name: 'RTV',
    //   exports: 'named',
    //   sourcemap: true,
    // },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ['**/__tests__/**'],
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    // babel({ exclude: '**/node_modules/**' }),
    commonjs(),
  ],
};
