<template>
    <div v-if="policy" class="policy">
        <div class="container">
            <Heading color="blue-simple" tag="h1">{{ $t('politic') }}</Heading>
            <div v-for="(item, index) in policy" :key="'policy-' + index">
                <Heading tag="h2" color="blue-simple" v-if="item.headline" v-html="item.headline"/>
                <div v-if="item.text" v-html="item.text"/>
            </div>
        </div>
    </div>
</template>

<script>
import Heading from "../components/content/headingStep";
import {Api} from "../api/api";

export default {
    name: 'politic',
    components: {Heading},
    head () {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                { hid: 'description', name: 'description', content: this.seo ? this.seo.description : '' },
                { hid: 'image', name: 'image', content: 'https://new.enjoykamchatka.ru/contacts-header.png'},
                { hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : '' },
                { hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : '' },
                { hid: 'og:image', name: 'og:image', content: 'https://new.enjoykamchatka.ru/contacts-header.png' }
            ]
        }
    },
    data() {
        return {
            policy: '',
            seo: ''
        };
    },
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`policy?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                policy:response.data.data.policy
            }
        });
    },

};
</script>

<style lang="scss" scoped>
    .policy {
        background-color: #171920;
        padding-bottom: 30px;
        /deep/ > div * {
            padding-left: 25px;
            color: white;
            line-height: 1.5;
        }
        /deep/h1, h2, h3, h4 {
            padding-left: 0;
            margin-bottom: 15px;
            margin-top: 30px;
            color: #1DCFFF;
            line-height: 1.5;
        }
        /deep/> div > h1 {
            margin-top: 0px;
            padding-top: 60px;
            line-height: 1.5;
        }
        /deep/li {
            padding-left: 0;
            margin-left: 35px;
            margin-top: 10px;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        /deep/p {
            margin: 10px 0;
            font-family: 'Montserrat';
            font-weight: 400;
            line-height: 1.5;
        }

    }

</style>
