import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: './lib/tool.js',
    format: 'umd'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    terser(),
  ]
};