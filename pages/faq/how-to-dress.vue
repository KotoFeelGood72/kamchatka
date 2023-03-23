<template>
    <section id="how-to-dress" class="how-to-dress">
        <FaqMenu/>
        <div v-if="data" class="container--middle how-to-dress__description">
            <div v-for="(intro, index) in data.intro" :key="'intro-' + index">
                <div class="how-to-dress__intro">
                    <Heading v-if="intro.title" tag="h2" class="text--header how-to-dress__title" v-html="intro.title"/>
                    <div v-if="intro.text" class="how-to-dress__text" v-html="intro.text"/>
                </div>
                <ContentImage :class="{'how-to-dress__intro-img': index !== 0}" v-if="intro.img" width="fullwidth" isBack="true" :data="intro.img"/>
            </div>
        </div>
        <div class="container--middle">
            <div class="text" v-if="data.howToDressDescription" v-html="data.howToDressDescription"/>
            <hr v-if="data.howToDressDescription" class="line">
        </div>
        <div v-for="(advices, index) in data.advices" :key="'advices-' + index">
            <div class="container--middle how-to-dress__description ">
                <Heading v-if="advices.name" tag="h2" class="text--header how-to-dress__title" v-html="advices.name"/>
                <div v-if="advices.text" class="how-to-dress__text" v-html="advices.text"/>
            </div>
            <According :data="advices.items" :key="'according-advices' + index" class="accordion_icon accordion_border-top accordion_border-top how-to-dress__accordion"/>
        </div>
    </section>
</template>

<script>
import FaqMenu from '../../components/faqMenu/faqMenu';
import According from '../../components/according/according';
import {Api} from '../../api/api';
import Heading from '../../components/content/heading';
import ContentImage from '../../components/content/contentImage';
export default {
    name: 'howToDress',
    components: {
        ContentImage,
        Heading,
        According,
        FaqMenu
    },
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
            data: '',
            featuresRegion: [
                'howToDressFeaturesRegion.desc',
                'howToDressFeaturesRegion.desc2',
                'howToDressFeaturesRegion.desc3'

            ],
            kamchatkaSummer: [
                'howToDresskamchatkaSummer.desc',
                'howToDresskamchatkaSummer.desc2'
            ],
            accordingClothes: [{
                name: 'Термобелье',
                text: `<p>На Камчатке около 300 вулканов, 30 из которых — действующие. Сюда приезжают, чтобы не
                        только издалека посмотреть на огненных исполинов, но и совершить восхождение на один из них.</p>`,
                active: false
            }],
            seo: ''
        };
    },
    methods: {
        init() {
            Api.get(`how-to-dress?lang=${this.$i18n.locale}&router=${this.$route.path}`).then((response) => {
                this.seo = response.data.seo;
                this.data = response.data.data;
            });
        }
    },
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`how-to-dress?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                data:response.data.data
            }
        });
    },
    created() {
        let breadCrumbs = [
            {name: 'breadCrumbs.faqDress'}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};

</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .faq-content {
        @include respond-to(md) {
            background-image: none;
        }
    }

    .container--middle {
        @include respond-to(lg) {
            max-width: initial !important;
            width: 1020px;
            padding-left: 0;
            padding-right: 0;
        }

        @include respond-to(md) {
            width: 650px;
        }

        @include respond-to(sm) {
            max-width: 100% !important;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    .how-to-dress {
        padding-bottom: 150px;
        @include respond-to(sm) {
            padding-bottom: 80px;
        }
        @include respond-to(customMobile) {
            padding-bottom: 100px;
        }

        &__description {
            padding-top: 20px;
            padding-bottom: 50px;

            p {
                font-family: 'Montserrat';
                font-weight: 400;
                margin-top: 24px;
                @include respond-to(customMobile) {
                    margin-top: 12px;
                }
            }
        }

        &__title {
            margin-top: 90px;
            font-size: 50px;
            line-height: 1.5;
            margin-bottom: 28px;
            color: #43495C;
            @include respond-to(lg) {
                margin-top: 50px;
                font-size: 40px;
                margin-bottom: 15px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                margin-top: 50px;
                font-size: 30px!important;
                margin-bottom: 15px;
               line-height: 1.5!important;
            }
            @include respond-to(sm) {
                margin-top: 40px;
                font-size: 26px!important;
                margin-bottom: 11px;
                line-height: 1.5!important;
            }
        }

        &__text {
            font-size: 26px;
            line-height: 1.5;
            color: #2A2E39;
            font-family: 'Montserrat', sans-serif;
            font-weight: normal;
            @include respond-to(lg) {
                font-size: 18px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 16px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
        &__intro-img {
            margin-top: 60px;
        }
    }

    hr.line {
        width: 100%;
        height: 10px;
        background-color: #1dcfff;
        border-radius: 10px 0px;
        border: none;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .separator {
        margin: 80px 0;

        @include respond-to(sm) {
            margin: 50px 0;
        }

    }

</style>
