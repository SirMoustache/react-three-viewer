// import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
// import external from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss-modules'
// import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
// import url from 'rollup-plugin-url';
// import svgr from '@svgr/rollup';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const umdGlobals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

export default {
  input: 'src/index.js',
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'reactThreeViewer',
    globals: umdGlobals,
    sourcemap: true,
    exports: 'named',
  },
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
    // external(),
    // postcss({
    //   modules: true,
    // }),
    // url(),
    // svgr(),
    resolve(),
    // typescript({
    //   rollupCommonJSResolveHack: true,
    //   clean: true,
    // }),
    babel({ exclude: '**/node_modules/**' }),
    commonjs(),
  ],
};
