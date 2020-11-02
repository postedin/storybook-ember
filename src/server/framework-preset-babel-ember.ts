import { precompile, registerPlugin } from 'ember-source/dist/ember-template-compiler';
import NamedBlocksPolyfillPlugin from 'ember-named-blocks-polyfill/lib/named-blocks-polyfill-plugin';
import { Configuration } from 'webpack'; // eslint-disable-line

export function babel(config: Configuration) {
  const babelConfigPlugins = config.plugins || [];

  registerPlugin('ast', NamedBlocksPolyfillPlugin);

  const extraPlugins = [
    [
      require.resolve('babel-plugin-htmlbars-inline-precompile'),
      {
        precompile,
        modules: {
          'ember-cli-htmlbars': 'hbs',
          'ember-cli-htmlbars-inline-precompile': 'default',
          'htmlbars-inline-precompile': 'default',
        },
      },
    ],
    [require.resolve('babel-plugin-ember-modules-api-polyfill')],
  ];

  return {
    ...config,
    plugins: [].concat(babelConfigPlugins, extraPlugins),
  };
}
