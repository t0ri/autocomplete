import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/autocomplete.js',
    // plugins: [terser()],
    output: {
      file: 'umd/autocomplete.js',
      format: 'umd',
      name: 'autocomplete',
      esModule: false,
    },
  },
  {
    input: 'src/autocomplete.js',
    // plugins: [terser()],
    output: {
      file: 'esm/autocomplete.js',
      format: 'esm',
    },
  },
  {
    input: 'src/prefixtree.js',
    // plugins: [terser()],
    output: {
      file: 'umd/prefixtree.js',
      format: 'umd',
      name: 'prefixtree',
      esModule: false,
    },
  },
  {
    input: 'src/prefixtree.js',
    // plugins: [terser()],
    output: {
      file: 'esm/prefixtree.js',
      format: 'esm',
    },
  },
  {
    input: 'src/prefixtreenode.js',
    // plugins: [terser()],
    output: {
      file: 'umd/prefixtreenode.js',
      format: 'umd',
      name: 'prefixtreenode',
      esModule: false,
    },
  },
  {
    input: 'src/prefixtreenode.js',
    // plugins: [terser()],
    output: {
      file: 'esm/prefixtreenode.js',
      format: 'esm',
    },
  },
];
