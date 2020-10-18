const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  // 1. register the docs panel (as opposed to '@storybook/addon-docs' which
  //    will configure everything with a preset)
  stories: ['../packages/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/react',
    '@storybook/addon-docs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  // 2. manually configure webpack, since you're not using the preset
  webpackFinal: async (config) => {
    config.module.rules.push({
      // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
      //     the docs page from the markdown
      test: /\.(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          // may or may not need this line depending on your app's setup
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });
    
      config.resolve.extensions.push('.js', '.jsx');
    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.
    config.module.rules.push({
      test: /\.(stories|story)\.[tj]sx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    });
    return config;
  },
};