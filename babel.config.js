const isDev = process.env.NODE_ENV === 'development';

const plugins = [
    [ "@babel/plugin-proposal-decorators", { legacy: true } ],
    [ "@babel/plugin-transform-runtime", { "corejs": 3, "regenerator": true }]
]

if (isDev) {
    // 配置react开发环境热替换
    plugins.unshift(require.resolve("react-refresh/babel"))
}

module.exports = {
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    presets: [
        ["@babel/preset-env",
            {
                "targets":{
                    "edge":"17",
                    "firefox":"60",
                    "chrome":"67",
                    "safari":"11.1",
                    "ie":"11"
                },
                "useBuiltIns":"usage",  // 根据配置的浏览器兼容，以及代码中使用到的api进行引入polyfill按需添加
                "corejs": "3"
            }],
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    plugins,
    sourceType: "unambiguous",   // 解决ES6和CommonJS模块导出的问题
};
