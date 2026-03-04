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
        format: {
          comments: 'some' // 保留重要注释（如版权信息）
        },
        compress: {
          drop_console: true, // 去除所有 console 语句
          pure_funcs: []
        }
      })
    ]
  },
  
  // ES Module 格式（保留 banner）
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
      // 不使用 terser，保留完整代码和 banner
    ]
  },
  
  // CommonJS 格式（保留 banner）
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
      // 不使用 terser，保留完整代码和 banner
    ]
  }
];