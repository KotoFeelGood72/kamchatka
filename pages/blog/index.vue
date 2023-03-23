<template>
    <div v-if="data" class="blog">
        <parallax :layers="layers" />
        <PageHeader class="header__padding">{{ data.intro.bannerText }}</PageHeader>
        <div class="blog__wrap">
            <section class="blog__content container--middle">

                <div class="blog__menu">
                    <div class="blog__menu-item text--large" :class="{'blog__menu-active': activeMenu === 'all'}" @click="activeMenu = 'all'">
                        {{ $t('blogPage.all') }}
                    </div>
                    <div v-for="(item, index) in data.content" :key="'blog__menu' + index" class="blog__menu-item text--large"
                         :class="{'blog__menu-active': item.section && activeMenu === item.section.type}" @click="activeMenu = item.section.type">{{item.section.name}}</div>
                </div>

                <div class="blog__list" v-for="(article, index) in filteredJob" :key="'blog__item-' + index">
                    <nuxt-link class="blog__block row" :to="$i18n.locale === 'en' ? '/blog/' + article.slug + '/' : '/blog/' + article.slug + '/'">
                        <div class="col-6">
                            <ContentImage isBack="true" v-if="article.img" :data="article.img"/>
                        </div>
                        <div class="col-6 blog__list-info">
                            <Heading tag="h2" size="xs" fw="600" color="craiola">{{article.name}}</Heading>
                            <p class="blog__list-text" v-if="article.text" v-html="article.text"/>
                            <div class="blog__list-detailed">{{$t('blogPage.detalInfoBlog')}}</div>
                        </div>
                    </nuxt-link>
                </div>

            </section>
        </div>
    </div>
</template>

<script>
import Heading from '../../components/content/heading';
import ContentImage from '../../components/content/contentImage';
import {Api} from '../../api/api';
import PageHeader from '../../components/content/pageHeader';
import parallax from '../../components/parallax/index';

export default {
    name: 'blog',
    components: {
        PageHeader,
        Heading,
        ContentImage,
        parallax
    },
    head () {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                { hid: 'description', name: 'description', content: this.seo ? this.seo.description : '' },
                { hid: 'image', name: 'image', content: this.data && this.data.intro && this.data.intro.bannerImage ? this.data.intro.bannerImage.src : ''},
                { hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : '' },
                { hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : '' },
                { hid: 'og:image', name: 'og:image', content: this.data && this.data.intro && this.data.intro.bannerImage ? this.data.intro.bannerImage.src : ''}
            ]
        }
    },
    data() {
        return {
            data: '',
            activeMenu: 'all',
            seo: '',
            layers: [
                {
                strength: .25,
                background: {
                    image: 'url("/parallax/blog/1.png")'
                }
                },
                {
                strength: .5,
                background: {
                    image: 'url("/parallax/blog/2.png")',
                    position: 'bottom 0 center'
                }
                },
                {
                strength: .66,
                background: {
                    image: 'url("/parallax/blog/3.png")'
                }
                }
            ]
        };
    },
    computed: {
        filteredJob() {
            if (this.activeMenu === 'all') {
                let items = [];
                this.data.content.map((item) => {
                    items = items.concat(item.items);
                })
                return items
            } else {
                let filter = '';
                filter = this.data.content.filter((item) => {
                    if (item.section && item.section.type === this.activeMenu) {
                        return true;
                    }
                })[0];
                if (filter) {
                    return filter.items
                }
            }
        }
    },
    methods: {
        changeStatus(article) {
            article.status = !article.status;
        }
    },
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`blog?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            response.data.data.content = response.data.data.content.filter((item) => {
                if (item.section) {
                    return item;
                }
            });
            return {
                seo: response.data.seo,
                data: response.data.data,
                activeMenu: 'all'
            }
        });
    },
    mounted() {
        let breadCrumbs = [
            {name: 'blog'}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
    .blog__menu-active {
        color: color(lightBlue) !important;
        border-bottom: 1px solid;
    }
    .blog__menu-item {
        color: color(white);
        font-weight: 600;
        line-height: 1.5;
        @include respond-to(sm) {
            font-size: 20px;
            margin-right: 20px !important;
        }
    }
    .blog {
        background-color: color(black);
        &__content {
            padding-bottom: 50px;
        }
    }
    .blog__list-text {
         display: -webkit-box;
         -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
         overflow: hidden;
        margin-bottom: 20px;
    }
    .blog__header {
        width: 100%;
        height: 100vh;
        background: url("~assets/img/aboutUs/about-us-header.png") no-repeat;
        background-size: cover;
        padding: 100px 0;
        display: flex;
        @include respond-to(custom425) {
            height: 50vh;
            padding-top: 0 !important;
            padding-bottom: 190px;
        }
    }
    .blog__header-container {
        margin-top: auto;
        margin-bottom: auto;
        h1 {
            margin: 0 !important;
            color: color(white) !important;
        }
    }
    .blog__menu {
        position: relative;

        display: flex;
            padding-top: 80px;
        .blog__menu-item {
            cursor: pointer;
        }
        .blog__menu-item:last-child {
            margin-right: 0;
        }

    }
    .blog__list {
        margin: 30px 0;
        height: 400px;
        box-shadow: 10px 14px 20px rgba(0, 0, 0, 0.25);
        @include respond-to(customMobile) {
            flex-direction: column;
        }
        &:hover {
            h2 {
                color: #1DCFFF;
            }
        }
        .content-image {
            margin-top: 0;
            height: 100% !important;
            > img {
                height: 100%;
            }
        }
        a {
            height: 100%;
            text-decoration: none;
            @include respond-to(sm) {
                display: flex;
                flex-direction: column;
            }
        }
    }
    .blog__list a > div {
        padding: 0;
        @include respond-to(customMobile) {
            max-width: 100% !important;
        }
    }
    .blog__list-info {
        background-color: color(grayBlue);
        padding: 50px 55px !important;
        color: color(white);
        display: flex;
        flex-direction: column;
        @include respond-to(customMobile) {
            padding: 30px 15px !important;
        }
        > h2 {
            margin: 0 !important;
            color: #A5ACC5;
            line-height: 1.5;
            @include respond-to(lg) {
                font-size: 18px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 18px;
                line-height: 1.5;
            }
        }
        p {
            font-family: 'Montserrat';
            font-weight: normal;
            font-size: 20px;
            line-height: 1.5;
            margin-top: 30px;
            @include respond-to(lg) {
                font-size: 18px;
                margin-top: 26px;
            }
            @include respond-to(sm) {
                font-size: 14px;
                margin-top: 20px;
                padding-bottom: 0px;
            }
        }
    }
    .blog__list-detailed {
        display: flex;
        align-items: center;
        color: color(marengo);
        font-weight: 500;
        font-size: 20px;
        line-height: 1.5;
        margin-top: auto;
        @include respond-to(sm) {
        }
        @include respond-to(lg) {
            margin-top: 40px;
        }
        @include respond-to(sm) {
            margin: 0;
            font-size: 14px;
            position: absolute;
            bottom: 20px;
        }
        &:hover {
            color: color(blue);
            text-decoration: underline;
        }
    }

    .blog {

        position: relative;  //для blog__cover
        overflow: hidden;    //

        &__menu {
            padding-bottom: 20px;

            @include respond-to(lg) {
                padding-top: 60px;
                padding-bottom: 6px;
            }

            @include respond-to(md) {
                padding-top: 42px;
                padding-bottom: 8px;
            }

            @include respond-to(sm) {
                padding-top: 32px;
                padding-bottom: 0;
            }

            &-item {
                margin-right: 100px;

                @include respond-to(lg) {
                    margin-right: 28px !important;
                }
            }
        }

        &__block {
            margin-right: -2.5px;
            margin-left: -2.5px;

            @include respond-to(lg) {
                margin-right: 0;
                margin-left: 0;

                flex-wrap: nowrap;

                .col-6 {
                    height: 100%;
                    flex-basis: auto;
                    flex-shrink: 1;
                    max-width: 100%;

                    @include respond-to(sm) {
                        flex-basis: 240px;
                        height: 240px;
                    }

                    &:first-child {
                        flex-basis: 450px;
                        flex-shrink: 0;

                        @include respond-to(md) {
                            flex-basis: 300px;
                        }

                        @include respond-to(sm) {
                            flex-basis: 240px;
                            height: 240px;
                        }
                    }
                }

                .blog__list-info {
                    @include respond-to(md) {
                        padding: 30px !important;
                    }

                    @include respond-to(sm) {
                        padding: 30px 15px !important;
                    }

                    p {
                        line-height: 1.5;
                        @include respond-to(md) {
                            font-size: 14px;
                            line-height: 1.5;
                        }
                    }
                }
            }

        }

        &__list {

            @include respond-to(lg) {
                height: 330px;
            }

            @include respond-to(md) {
                height: 240px;
                margin: 20px 0;
            }

            @include respond-to(sm) {
                height: auto;
                margin: 24px 0;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            &-info {
                @include respond-to(lg) {
                    position: relative;
                }
            }

            &-detailed {
                line-height: 1.5;
                @include respond-to(lg) {
                    position: absolute;
                    margin-bottom: 30px;
                    bottom: 0;
                }

                @include respond-to(md) {
                    font-size: 12px;
                }
            }
        }

        &__cover {
            background-image: url('~assets/img/blog/svg/cover.svg');
            background-repeat: no-repeat;
            background-position: top center;
            background-size: 100% auto;
            position: absolute;
            width: 100vw;
            height: 100%;
            left: 0;

            @include respond-to(sm) {
                display: none;
            }
        }

        /deep/.heading--size-xs {

            font-size: 28px;
            line-height: 1.5;

            @include respond-to(lg) {
                font-size: 26px;
                line-height: 1.5
            }

            @include respond-to(md) {
                font-size: 18px;
                line-height: 1.5;
            }
        }

        /deep/ .container {
            .page-header__title {
                line-height: 1.5;
                @include respond-to(sm) {
                    font-size: 40px;
                    line-height: 1.5
                }
            }
        }

        /deep/ .text--large {
            line-height: 1.5;
            @include respond-to(lg) {
                font-size: 24px !important;
                line-height: 1.5 !important;
            }

            @include respond-to(lg) {
                font-size: 20px !important;
            }
        }

        /deep/ .container--middle {

            @include respond-to(lg) {
                max-width: 1020px !important;
                padding-left: 0;
                padding-right: 0;
            }

            @include respond-to(md) {
                max-width: 650px !important;
            }

            @include respond-to(sm) {
                max-width: 325px !important;
                padding-bottom: 0;
            }
        }

        &__wrap {
            background: #0e121a;
            position: relative;
            margin-top: 200px;
            @include respond-to(sm) {
                margin-top: 0;
            }
        }
        .page-header {
            position: absolute;
            top: 0;
            left: 8px;
            right: 0;
            @include respond-to(md) {
                left: 0;
                top: -50px;
            }
            @include respond-to(sm) {
                left: 25px;
                top: 0;
            }
            /deep/ .container {
                margin:  0 auto;
                padding: 0;
            }
        }
        /*.page-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            @include respond-to(md) {
                left: 0;
                top: -50px;
                padding-top: 19vh;
                padding-bottom: 40vh;
            }
            @include respond-to(sm) {
                left: 25px;
                top: 0;
                min-height: calc(100vh - 100px);
                padding-top: 10vh;
                padding-bottom: 30vh;
            }
            /deep/ .container {
                margin:  0 auto;
                padding: 0;
            }
        }*/
    }
</style>
