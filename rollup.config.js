import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
// import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
// import url from 'rollup-plugin-url';
// import svgr from '@svgr/rollup';
// import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const umdGlobals = {
  react: 'React',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
};

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'reactThreeViewer',
      globals: umdGlobals,
      // external: [...Object.keys(pkg.peerDependencies || {})],
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      globals: umdGlobals,
      // external,
      exports: 'named',
      sourcemap: true,
    },
  ],
  // output: [
  //   {
  //     file: pkg.main,
  //     format: 'cjs',
  //     exports: 'named',
  //     sourcemap: true,
  //   },
  //   {
  //     file: pkg.module,
  //     format: 'es',
  //     exports: 'named',
  //     sourcemap: true,
  //   },
  // ],
  plugins: [
    external(),
    // postcss({
    //   modules: true,
    // }),
    // url(),
    // svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      exclude: '**/node_modules/**',
    }),
    // babel({ exclude: '**/node_modules/**' }),
    commonjs(),
  ],
};
