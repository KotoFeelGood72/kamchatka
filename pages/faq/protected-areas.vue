<template>
    <section class="faq-content protected-areas">
        <FaqMenu/>
        <div v-if="data" class="container--middle page-content text--small">
            <div v-for="(intro,index) in data.intro" :key="'intro-' + index">
                <Heading v-if="intro.underlineTitle"
                         tag="p"
                         color="granite"
                         size="sm"
                         fw="600"
                         class="heading--title"
                         underline="bottom" v-html="intro.title"/>
                <Heading v-if="!intro.underlineTitle" v-html="intro.title"/>
                <div class="text-controllerfaqprotected" v-if="intro.text" v-html="intro.text"/>
                <contentImage v-if="intro.img" isBack="true" width="fullwidth" :data="intro.img"/>
            </div>
            <div v-for="(area, index) in data.areas" :key="'area-' + index">
                <Heading color="blue" v-html="area.name"/>
                <div class="text-controllerfaqprotected" v-html="area.text"/>
                <div v-for="(item, index) in area.items" :key="'item-' + index">
                    <Heading v-if="item.title" v-html="item.title"/>
                    <div class="text-controllerfaqprotected" v-if="item.text" v-html="item.text"/>
                    <contentImage v-if="item.img" width="fullwidth" isBack="true" :data="item.img"/>
                </div>
                <divider v-if="index != data.areas.length -1"/>
            </div>

            <Heading class="heading--tail" tag="p" size="sm" fw="600" color="gray" v-if="data.outro" v-html="data.outro"/>
        </div>
    </section>
</template>

<script>
import FaqMenu from '../../components/faqMenu/faqMenu';
import Heading from '../../components/content/heading';
import ContentImage from '../../components/content/contentImage';
import Divider from '../../components/content/divider';
import {Api} from '../../api/api';

export default {
    name: 'protectedAreas',
    components: {
        FaqMenu,
        ContentImage,
        Divider,
        Heading
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
        return Api.get(`protected-areas?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                data:response.data.data
            }
        });
    },
    created() {
        let breadCrumbs = [
            {name: 'breadCrumbs.faqAreas'}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};
</script>
<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
     .text-controllerfaqprotected{
        font-family: "Montserrat";
        font-weight: 400;
        line-height: 1.5;
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
            width: 650px;
            max-width: 100% !important;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    .heading--title {
        line-height: 1.5;
        margin-top: 40px;
        &:after {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        @include respond-to(lg) {
            margin-top: 0;
             line-height: 1.5;
        }
        @include respond-to(md) {
            margin-top: -20px;
            font-size: 22px;
             line-height: 1.5;
        }
        @include respond-to(sm) {
            margin-top: -36px;
            font-size: 18px;
             line-height: 1.5;
            &:after {
                margin-top: 8px;
                margin-bottom: 8px;
            }
        }
    }

    .heading:not(.heading--size-sm) {
        margin-top: 1.5em;
        margin-bottom: .4em;
        font-size: 60px;
         line-height: 1.5;
        @include respond-to(lg) {
            margin-top: 1.1em;
            margin-bottom: .5em;
            font-size: 40px;
        }
        @include respond-to(md) {
            margin-top: 1.7em;
            margin-bottom: .5em;
            font-size: 30px;
        }
        @include respond-to(sm) {
            margin-top: 1.3em;
            margin-bottom: .35em;
            font-size: 26px;
        }
    }

    .heading.heading--tail {
        font-weight: 600;
        margin-top: 73px;
        margin-bottom: 140px;
        font-size: 36px;
         line-height: 1.5;
        @include respond-to(lg) {
            margin-top: 84px;
            margin-bottom: 0px;
            font-size: 28px;
        }
        @include respond-to(md) {
            margin-top: 52px;
            margin-bottom: 64px;
            font-size: 22px;
        }
        @include respond-to(sm) {
            margin-top: 46px;
            margin-bottom: 4px;
            font-size: 18px;
        }
    }

    .content-image--fullwidth {
        margin-top: 3em;
        @include respond-to(md) {
            margin-top: 2em;
        }
    }
    .content-divider {
        @include respond-to(md) {
            margin-bottom: -1.3em
        }
        @include respond-to(sm) {
            background-size: 50%;
        }
    }

    .faq-content {
        @include respond-to(md) {
            background-image: none;
        }
    }
</style>
