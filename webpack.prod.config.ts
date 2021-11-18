import webpackDevConfig from './webpack.config'
const webpackConfig = () => ({
    ...webpackDevConfig(),
    devServer: undefined,
    plugins: [...webpackDevConfig().plugins],
})

export default webpackConfig
