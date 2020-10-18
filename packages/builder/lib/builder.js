#!/usr/bin/env node

const rollup = require('rollup');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;
/* const cjs = require('@rollup/plugin-babel'); */
const postcss = require('rollup-plugin-postcss');
const currentPath = process.cwd();
/* chang path from main or local in package.json into src because src cover local */
const { src, name } = require(path.join(currentPath, 'package.json'));

const entry = path.join(currentPath, src);

const entryFileName = name.replace('"@muhi-ui/', '');
/* https://rollupjs.org/guide/en/#creating-your-first-bundle */

const entryOpt = {
  input: entry,
  external: ['react', 'prop-types'],
  plugins: [
    resolve(),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      // babelrc: false,
    }),
    postcss({
      modules: true,
      //  with custom options for `postcss-modules` modules : {}
    }),
  ],
};
/* https://rollupjs.org/guide/en/#es-module-syntax */
const outputOpt = [
  {
    file: `dist/${entryFileName}.cjs.js`,
    format: 'cjs',
  },
  {
    file: `dist/${entryFileName}.esm.js`,
    format: 'esm',
  },
];
async function runBuild() {
    /* bundling */
    const myBundles = await rollup.rollup(entryOpt);

    /* looping & callback */
    outputOpt.forEach(async (opts) => {
        await myBundles.write(opts);
    });
}
runBuild();