import path from 'path'
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel'
import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser' // 读取 package.json 配置
import pkg from './package.json'
import copy from 'rollup-plugin-copy'

const env = process.env.NODE_ENV

const config =  {
    input: [
        path.resolve(__dirname, 'src/index-utils.ts'),
         path.resolve(__dirname, 'src/index-hooks.ts')
    ],
    output: [
        {
            // file: pkg.main,
            dir: 'dist',
            format: 'cjs'
        },
        // {
        //     file: pkg.module,
        //     format: 'es'
        // },
        // {
        //     // umd 模式的编译结果文件输出的全局变量名称
        //     name: 'RollupTsTemplate',
        //     // 输出 ＵＭＤ格式，各种模块规范通用
        //     file: pkg.umd,
        //     format: 'umd'
        // }
    ],
    watch: {  // 配置监听处理
        exclude: 'node_modules/**'
    },
    plugins: [
        // 解析第三方依赖
        resolve(),
        // 识别 commonjs 模式第三方依赖
        commonjs(),
        // rollup 编译 typescript
        rollupTypescript(),
        // babel 配置
        babel({
            // 编译库使用
            babelHelpers: 'runtime',
            // 只转换源代码，不转换外部依赖
            exclude: 'node_modules/**',
            // babel 默认不支持 ts 需要手动添加
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
        }),
        copy({
            targets: [
                // 将图片静态资源image目录，复制到dist目录下
                { src: 'src/assets/image', dest: 'dist' },
            ]
        }),
        // 不是要内置打包css
        // postcss({
        //     extract: 'css/druid-lib.css',
        //     namedExports: true,
        //     minimize: true,
        //     sourceMap: true,
        //     extensions: [".less", ".css"]
        // }),
    ],
    // 告诉rollup不要将此lodash打包，而作为外部依赖
    external: [
        'react', 'antd', 'query-string', 'dayjs', 'axios'
    ]
};

// 若打包正式环境，压缩混淆代码
if (env === 'production') {
    config.plugins.push(terser({
        compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        }
    }))
}


export default config
