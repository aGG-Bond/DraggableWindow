const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const pkg = require('./package.json');

// 获取包信息
const version = pkg.version;
const author = pkg.author || 'Unknown';
const license = pkg.license || 'MIT';
const name = pkg.name;
const homepage = pkg.homepage;

// 生成 banner 注释
const banner = `/**
 * ${name} v${version}
 * ${pkg.description}
 * 
 * @author ${author}
 * @license ${license}
 * @GitHub ${homepage}
 */`;

module.exports = [
  // UMD 格式（浏览器直接使用，未压缩）
  {
    input: 'src/DraggableWindow.js',
    output: {
      file: 'dist/DraggableWindow.js',
      format: 'umd',
      name: 'DraggableWindow',
      banner: banner,
      sourcemap: true
    },
    plugins: [
      resolve.default(),
      commonjs.default()
    ]
  },
  
  // UMD 格式（压缩版）
  {
    input: 'src/DraggableWindow.js',
    output: {
      file: 'dist/DraggableWindow.min.js',
      format: 'umd',
      name: 'DraggableWindow',
      banner: banner,
      sourcemap: true
    },
    plugins: [
      resolve.default(),
      commonjs.default(),
      terser.default({
        output: {
          comments: /^!/
        },
        compress: {
          drop_console: false,
          pure_funcs: ['console.info']
        }
      })
    ]
  },
  
  // ES Module 格式
  {
    input: 'src/DraggableWindow.js',
    output: {
      file: 'dist/DraggableWindow.esm.js',
      format: 'es',
      banner: banner,
      sourcemap: true
    },
    plugins: [
      resolve.default(),
      commonjs.default()
    ]
  },
  
  // CommonJS 格式
  {
    input: 'src/DraggableWindow.js',
    output: {
      file: 'dist/DraggableWindow.common.js',
      format: 'cjs',
      exports: 'default',
      banner: banner,
      sourcemap: true
    },
    plugins: [
      resolve.default(),
      commonjs.default(),
      replace.default({
        preventAssignment: true,
        values: {
          'typeof require': "'function'",
          'typeof exports': "'object'",
          'typeof module': "'object'"
        }
      })
    ]
  }
];