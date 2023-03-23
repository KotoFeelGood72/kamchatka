export default {
    head: {
        title: 'Камчатка',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Отдых на Камчатке в 2021 году с Туроператором Enjoy Kamchatka - Персональные премиальные приключения. Лучшие базы отдыха, вертолеты, яхты и авто на Камчатке'},
            {hid: 'cmsmagazine', name: 'cmsmagazine', content: '9dece2e20769e5fefc2f5dec3eee83ae'}
        ],
        script: [
            { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' },
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
    },
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost
    },
    plugins: [

        {src: '~/plugins/vue-mask.js', ssr: false},
        {src: '~/plugins/vue-particle-effect-buttons.js', mode: 'client', ssr: false},
        {src: '~/plugins/analytics.js', mode: 'client'},
    ],
    /*
    ** Customize the progress bar color
    */
    loading: '~/components/loading.vue',
    /*
    ** Build configuration
    */

    modules: [
        '@nuxt/image',
        // '@nuxtjs/svg',
        '@nuxtjs/gtm',
        ['nuxt-i18n', {
            lazy:true,
            locales: [
                {
                    name: 'RU',
                    code: 'ru',
                    iso: 'ru-RU',
                    file: 'ru-ru.js',
                    domain: 'enjoykamchatka.ru'
                },
                {
                    name: 'EN',
                    code: 'en',
                    iso: 'en-EN',
                    file: 'en-en.js',
                    domain: 'enjoykamchatka.com'
                }
            ],
            loadLanguagesAsync: true,
            langDir: '/lang/',
            defaultLocale: 'ru',
            differentDomains: true,
            detectBrowserLanguage: false
        }],
        [
            'nuxt-compress',
            {
                gzip: {
                    threshold: 8192,
                },
                brotli: {
                    threshold: 8192,
                },
            },
        ],
    ],
    gtm: {
        id: 'GTM-NB69J66',

        enabled: true,
        debug: true,

        pageTracking: true,
        pageViewEventName: 'nuxtRoute',

        autoInit: true,
        respectDoNotTrack: true,

        scriptId: 'gtm-script',
        scriptDefer: true,
        scriptURL: 'https://www.googletagmanager.com/gtm.js',
        crossOrigin: true,
    },
    build: {
        analyze: {
            analyzerMode: 'static'
        },
        optimization: {
            splitChunks: {
                maxSize: 10000,
                minSize: 3000,
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
				extend(config, { isDev, isClient }) {
					config.resolve.alias["vue$"] = "vue/dist/vue.esm.js";

					// проверяем, определено ли свойство module.rules
					if (config.module.rules) {
						const cssRule = config.module.rules.find(rule => rule.test.test('.css'))
						if (cssRule && cssRule.use) {
							cssRule.use.unshift('style-loader')
						}
					}

					if (isDev && isClient) {
						config.module.rules.push({
							enforce: 'pre',
							test: /\.(js|vue)$/,
							loader: 'eslint-loader',
							exclude: /(node_modules)/
						})
					}
				}

    },
    router: {
      base: "/",
    },
    serverMiddleware: [
        '~/middleware/redirectsSlash.js'
    ],
    render: {
        asyncScripts: true,
        http2: {
            push: true,
        }
    }
}
