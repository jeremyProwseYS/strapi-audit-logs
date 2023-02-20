import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';

const name = pluginPkg.strapi.name;

const myComponent = async () => {
  const component = await import('./pages/HomePage');
  return component;
};

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
  bootstrap(app) {
		// Adding a single link
		app.addSettingsLink(
		 'global',
			{
				intlLabel: {
          id: `/settings/${pluginId}/`,
          defaultMessage: "Audit Logs"
        },
				id: `${pluginId}.plugin.name`,
				to: `/settings/${pluginId}`,
				Component: myComponent,
				permissions: {}
			}
    )
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  }
}