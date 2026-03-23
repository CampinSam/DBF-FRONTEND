const path = require('path')
const { override } = require('customize-cra')
const webpack = require('webpack')

module.exports = override(
  (config) => {
    // Transpile all @solana/* and related packages through Babel
    // to convert ESM to CJS so webpack 4 can handle named imports
    const babelLoaderRule = config.module.rules.find((rule) => rule.oneOf)
    if (babelLoaderRule) {
      const babelLoader = babelLoaderRule.oneOf.find(
        (r) => r.loader && r.loader.includes('babel-loader') && r.include
      )
      if (babelLoader) {
        const originalInclude = babelLoader.include

        // Add a new rule before the existing babel-loader for @solana/* packages
        // This rule transforms ESM to CJS and handles modern syntax
        babelLoaderRule.oneOf.unshift({
          test: /\.(js|mjs)$/,
          include: [
            /node_modules[/\\]@solana[/\\]/,
            /node_modules[/\\]@coral-xyz[/\\]/,
            /node_modules[/\\]@wallet-standard[/\\]/,
            /node_modules[/\\]@solana-mobile[/\\]/,
            /node_modules[/\\]@noble[/\\]/,
          ],
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  require.resolve('babel-preset-react-app'),
                  { runtime: 'automatic', flow: false, typescript: false },
                ],
              ],
              plugins: [
                require.resolve('@babel/plugin-transform-modules-commonjs'),
                require.resolve('@babel/plugin-transform-logical-assignment-operators'),
                [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
              ],
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        })
      }
    }

    // Force CJS browser builds to avoid ESM issues with webpack 4
    config.resolve.alias = {
      ...config.resolve.alias,
      '@solana/web3.js': path.resolve(
        __dirname,
        'node_modules/@solana/web3.js/lib/index.browser.cjs.js'
      ),
      'rpc-websockets': path.resolve(
        __dirname,
        'node_modules/rpc-websockets/dist/index.browser.cjs'
      ),
    }

    // Webpack 4 node polyfill configuration
    config.node = {
      ...config.node,
      crypto: true,
      stream: true,
      buffer: true,
      process: true,
      path: false,
      fs: false,
      os: false,
      net: false,
      tls: false,
      zlib: false,
    }

    // Provide global Buffer and process
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      })
    )

    return config
  }
)
