module.exports = {
  stories: ['../packages/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-actions',
    // '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config, { configType }) => { 
    config.module.rules = config.module.rules.filter(
      (f) => f.test.toString() !== '/\\.css$/'
    );
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    });
    // This is where we change the order of resolution of main fields
    config.resolve.mainFields = ['src', 'module', 'main'];
    return config;
  },
};