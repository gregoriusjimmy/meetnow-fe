module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@assets': './assets',
            '@src': './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
