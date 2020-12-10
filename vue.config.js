const isDev = process.env.NODE_ENV === 'development'

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: isDev,

  css: {
    sourceMap: isDev,
  },

  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      noEmitOnErrors: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
    },
  },

  chainWebpack: (config) => {
    const IS_VENDOR = /[\\/]node_modules[\\/]/
    const IS_PLUGIN = /[\\/]node_modules\/(@babel|core-js|vue-loader)[\\/]/

    /**
     * Chunks config
     */
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        // --Vendors
        vendors: {
          name: 'vendors',
          test: IS_VENDOR,
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: true,
          minChunks: 3,
        },
        plugins: {
          name: 'plugins',
          test: IS_PLUGIN,
          chunks: 'async',
          priority: -10,
          reuseExistingChunk: true,
          minChunks: 3,
        },

        // --Commons
        common: {
          name: 'common',
          chunks: 'initial',
          priority: -20,
          reuseExistingChunk: true,
          minChunks: 3,
        },
      },
    })

    /**
     * Assets compression handler
     */
    if (!isDev) {
      config.plugin('CompressionBrotli').use(CompressionPlugin, [
        {
          filename: '[path].br[query]',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 10240,
          minRatio: 0.7,
        },
      ])
      config.plugin('CompressionGZip').use(CompressionPlugin, [
        {
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 9 },
          threshold: 10240,
          minRatio: 0.7,
        },
      ])
    }
  },

  pages: {
    app: {
      entry: 'src/app/index.ts',
      filename: 'index.html',
      title: 'TODOs',
      chunks: ['runtime', 'vendors', 'plugins', 'common', 'app'],
    },
  },
}
