<template>
    <div id="app">
        <div v-if="isLoad" class="preloader">
            <div class="preloader__wrapper">
                <img src="~assets/img/preload/loading.gif" alt class="preload__img" />
                <div class="preloader__progress" style="width: 0"></div>
            </div>
        </div>

        <div v-show="notReady">
            <!-- <parallax v-if="$route.path == '/' && isParallax"></parallax> -->
            <client-only>
                <BaseHeader
                    v-if="$route.name !== '404' && $route.name !== null"
                    :headerBlack="headerBlack"
                    :isFixed="$route.path !== null"
                />
                <Breadcrumbs
                    v-if="breadcrumbs.length && $route.name !== '404' && $route.name !== null && $route.path !== '/' && $route.path !== '/en' && $route.path !== '/create-tour/'"
                />
            </client-only>
            <div
                :class="[{'fixed-container': $route.path !== '/' && $route.path !== '/en' && $route.name !== null},
                      {'fixed-container--transparent': isTransparent}]"
            >
                <nuxt />
            </div>
            <!--        <client-only>-->
            <!--            <ModalSuggestions time-show-modal="30000" :key="$route.path"/>-->
            <!--        </client-only>-->
            <client-only>
                <BaseFooter
                    v-if="$route.name !== '404' && $route.name !== null && $route.path !== '/' && $route.path !== '/en'"
                />
                <Feedback
                    v-if="isShowFeedback"
                    @toggleFeedback="$store.dispatch('changeIsShowFeedback', !isShowFeedback)"
                />
            </client-only>
        </div>
        <!-- Яндекс и Google аналитика -->
        <div v-if="lang == 'ru'">
            <client-only>
                <!-- Yandex.Metrika counter -->
                <noscript><div><img src="https://mc.yandex.ru/watch/61444693" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            </client-only>
        </div>
        <div v-else-if="lang == 'en'">
            <client-only>
                <!-- Yandex.Metrika counter -->
                <noscript><div><img src="https://mc.yandex.ru/watch/62640601" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            </client-only>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ImgCom from "../components/img/imgCom";
import Feedback from "../components/feedback/feedback"
import BaseHeader from "../shared/layouts/BaseHeader"
import BaseFooter from "../shared/layouts/BaseFooter"
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs"
import ModalSuggestions from "../components/modal/Suggestions"
import { mapState } from "vuex";


Vue.component("img-com", ImgCom);

export default {
    scrollToTop: false,
    name: "app",

    head() {
        return {
            link: [
                {
                    rel: 'canonical',
                    href: 'https://enjoykamchatka.ru' + this.$route.path
                }
            ],
            script: [{ src: "../../../../../../../../libs/script.js" }]
        }
    },
    components: {
        Feedback,
        BaseHeader,
        BaseFooter,
        Breadcrumbs,
        ModalSuggestions,
        // parallax
    },
    data() {
        return {
            isLoad: true,
            notReady: false,
            progressWidth: 0,
            isTransparent: false,
            screen: this.$store.getters.SCREEN,
            headerBlack: false,
            isParallax: true
        };
    },
    watch: {
        thisIsTransparent(val) {
            this.isTransparent = val;
            // console.log(val);
        },
        $route() {
            this.$store.commit("changeRouterfalse");
        }
    },
    computed: {
        ...mapState(["breadcrumbs", "lang"]),
        isShowFeedback() {
            return this.$store.getters["getIsShowFeedback"]();
        },
        thisIsTransparent() {
            return this.$store.getters["getIsTransparent"]();
        }
    },
    methods: {
        checkIsTransparent() {
            let path = this.$route.path;
            let isTransparent =
                path.startsWith("/activities") ||
                path.startsWith("/blog") ||
                path.startsWith("/faq") ||
                path.startsWith("/about") ||
                path.startsWith("/contacts") ||
                path.endsWith("/tours/") ||
                path.endsWith("/activities/") ||
                path.endsWith("/upcoming-tours/") ||
                path.endsWith("/en") ||

                path === "/";
            this.$store.dispatch("changeIsTransparent", isTransparent);
            this.isTransparent = isTransparent;
        },
        listenResize() {
            this.$store.commit("SCREENW", window.innerWidth);
            this.$store.commit("SCREENH", window.innerHeight);
        },
    },
    mounted() {
        if (this.screen.width < 500 || this.screen.height < 500) {
            this.$store.commit("changeRouter");
            this.notReady = true;
            setTimeout(() => {
                this.isLoad = false;
            }, 300);

        } else {
            this.notReady = true;
            setTimeout(() => {
                this.isLoad = false;
            }, 200);
        }

        this.$router.afterEach((to, from) => {
            let path = to.path;
            if (to.path == "/") {
                this.isParallax = false;
            }
            let isTransparent =
                path.startsWith("/blog") ||
                path.startsWith("/faq") ||
                path.startsWith("/about") ||
                path.startsWith("/contacts") ||
                path.endsWith("/tours/") ||
                path.endsWith("/activities/") ||
                path.endsWith("/upcoming-tours/") ||
                path.endsWith("/en") ||
                path === "/";
            this.$store.dispatch("changeIsTransparent", isTransparent);
        });
        window.addEventListener("resize", this.listenResize);
        this.checkIsTransparent();

        this.$store.watch(this.$store.getters.getIsParallax, isParallax => {
            this.isParallax = isParallax;
            // console.log(isParallax);
        });
    },
    created() {
        this.$store.dispatch("changeLang", this.$i18n.locale);
        if (process.client) {
            window.addEventListener("resize", this.listenResize);
            this.listenResize();
            let _this = this;
            window.addEventListener("scroll", function() {
                if (pageYOffset+170> this.screen.height) {
                    _this.headerBlack = true;
                } else {
                    _this.headerBlack = false;
                }
            });
        }
    },
    destroyed() {
        window.removeEventListener("resize", this.listenResize);
    }
};
</script>


<style lang="scss">
@import "../assets/scss/config";
@import "../assets/scss/mixins";
@import "../assets/libs/bootstrap/bootstrap-grid";
@import "../assets/fonts/stylesheet.css";
@import "../assets/fonts/icomoon/style.css";

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
button::-moz-focus-inner {
    border: 0;
}
a {
    cursor: pointer;
}

table {
    margin: 20px 0;
    border: 1px double #a5acc5; /* Рамка вокруг таблицы */
    border-collapse: collapse;

    th {
        text-align: left; /* Выравнивание по левому краю */
        padding: 5px; /* Поля вокруг содержимого ячеек */
        border: 1px solid #a5acc5; /* Граница вокруг ячеек */
    }

    td {
        padding: 5px; /* Поля вокруг содержимого ячеек */
        border: 1px solid #a5acc5; /* Граница вокруг ячеек */
    }
}

.fixed-container {
    padding-top: 100px;
    @include respond-to(sm) {
        padding-top: 80px;
    }

    &--transparent {
        padding-top: 0;
        overflow-x: hidden;
    }
}

body {
    font-family: "Mpluse1p";
    font-weight: 500;
    color: color(granite);
    overflow-x: hidden;
}
.blog__item_ullishka ul{
    font-family: "Montserrat";
    font-weight: 400;
    margin: 10px 0;
    line-height: 1.5;
    list-style-position: inside;
}
.blog__item_ullishka ul li{
    font-family: "Montserrat";
    font-weight: 400;
    margin: 10px 0;
    line-height: 1.5;
    list-style-position: inside;
}
.tour-item-list_styler ul{
    font-family: "Montserrat";
    font-weight: 400;
    line-height: 1.5;
    margin: 50px 0;
    color: #fbfbfb;
    font-size: 24px;
    line-height: 1.5;
    font-family: "Montserrat";
    font-weight: 400;
    max-width: 1200px;
    list-style-position: inside;
    @include respond-to(lg) {
        margin: 12px 0;
        font-size: 20px;
        line-height: 1.5;
        max-width: 1000px;
    }
    @include respond-to(md) {
        margin: 12px 0;
        font-size: 16px;
        line-height: 1.5;
        max-width: 100%;
    }
    @include respond-to(sm) {
        margin: 12px 0;
        font-size: 14px;
        line-height: 1.5;
        max-width: 100%;
    }
}
.tour-item-list_styler ul li{
    font-family: "Montserrat";
    font-weight: 400;
    line-height: 1.5;
    margin: 15px 0;
    color: #fbfbfb;
    font-size: 24px;
    line-height: 1.5;
    font-family: "Montserrat";
    font-weight: 400;
    max-width: 1200px;
    list-style-position: inside;
    @include respond-to(lg) {
        margin: 12px 0;
        font-size: 20px;
        line-height: 1.5;
        max-width: 1000px;
    }
    @include respond-to(md) {
        margin: 12px 0;
        font-size: 16px;
        line-height: 1.5;
        max-width: 100%;
    }
    @include respond-to(sm) {
        margin: 12px 0;
        font-size: 14px;
        line-height: 1.5;
        max-width: 100%;
    }

}

.t-body_scroll-locked_menu {
    left: 0;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    overflow: hidden;
}

a {
    color: color(blueScreen);
    text-decoration: none;
}

img {
    max-width: 100%;
}

.mt-40 {
    margin-top: 40px;
}

.mw-600 {
    max-width: 600px;
}

.preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2001;

    &__wrapper {
    }

    &__img {
    }

    &__progress {
        height: 2px;
        background-color: #537786;
        transition: 0.3s 0s all ease;
    }
}

.text-center {
    text-align: center;
}

.container {
    padding: 0 10px;
    @include respond-to(sm) {
        padding: 0 25px;
    }
}

.mx-datepicker {
    max-width: 195px;
}

.mx-datepicker-main {
    z-index:2001!important;
    table {
        border: none;

        th,
        tr,
        td {
            border: none;
            text-align: center;
        }
    }
}

.mx-icon-calendar {
    background: url("~assets/img/date/dateIcon.png") no-repeat;
    color: rgba(0, 0, 0, 0);
    width: 28px;
    height: 30px;
    font-size: 0 !important;

    cursor: pointer;
}

.border-b {
    border-bottom: 2px solid;
}

.container--middle {
    max-width: 1135px !important;
    width: 100%;
    margin: 0 auto;
    @include respond-to(lg) {
        max-width: 1000px !important;
        padding-left: 70px;
        padding-right: 70px;
    }
    @include respond-to(sm) {
        max-width: 650px !important;
        padding-left: 30px;
        padding-right: 30px;
    }
    @include respond-to(customMobile) {
        max-width: 350px !important;
        width: 100% !important;
        padding-left: 25px;
        padding-right: 25px;
    }
}
.container--middle-tour {
    padding: 0 10px;
    /deep/.container{
        max-width:100%
    }
    max-width: 1200px !important;
    width: 100%;
    margin: 0 auto;
    @include respond-to(custom) {
        max-width: 1040px !important;
    }
    @include respond-to(lg) {
        max-width: 1040px !important;
    }
    @include respond-to(md){
        max-width: 660px!important;
    }
    @include respond-to(sm) {
        max-width: 100% !important;
        padding: 0 25px;
    }
    @include respond-to(customMobile) {
        max-width: 100% !important;
        padding-left: 25px;
        padding-right: 25px;
    }
}
.container--ingoS--slider{
    padding: 0 10px;
    /deep/.container{
        max-width:100%
    }
    max-width: 1550px !important;
    width: 100%;
    margin: 0 auto;
    @include respond-to(custom) {
        max-width: 1040px !important;
    }
    @include respond-to(lg) {
        max-width: 1040px !important;
    }
    @include respond-to(md){
        max-width: 660px!important;
    }
    @include respond-to(sm) {
        max-width: 100% !important;
        padding: 0 25px;
    }
    @include respond-to(customMobile) {
        max-width: 100% !important;
        padding-left: 25px;
        padding-right: 25px;
    }
}



.text--middle {
    font-size: 80px;
    line-height: 1;
    @include respond-to(lg) {
        font-size: 60px;
    }
    @include respond-to(sm) {
        font-size: 40px;
    }
    @include respond-to(xs) {
        font-size: 26px;
    }
}

.text--large {
    font-size: 40px !important;
    line-height: 1.5 !important;
    @include respond-to(lg) {
        font-size: 30px !important;
        line-height: 1.5 !important;
    }
    @include respond-to(sm) {
        font-size: 24px !important;
        line-height: 1.5 !important;
    }
    @include respond-to(xs) {
        font-size: 16px !important;
        line-height: 1.5 !important;
    }
}

.text {
    font-size: 36px;
    line-height: 1.5;
    @include respond-to(lg) {
        font-size: 24px;
        line-height: 1.5;
    }
    @include respond-to(sm) {
        font-size: 20px;
        line-height: 1.5;
    }
    @include respond-to(xs) {
        font-size: 18px;
        line-height: 1.5;
    }
}

.text--blue {
    color: color(blue) !important;

    > * {
        color: color(blue) !important;
    }
}

.text--blueKM {
    color: color(blueKM) !important;
}

.text--small {
    font-size: 26px;
    line-height: 1.5;
    @include respond-to(lg) {
        font-size: 18px;
        line-height: 1.5;
    }
    @include respond-to(sm) {
        font-size: 16px;
        line-height: 1.5;
    }
    @include respond-to(xs) {
        font-size: 14px;
        line-height: 1.5;
    }
}

.video-embed {
    margin: 50px 0;
}

.text--header {
    font-size: 50px !important;
    line-height: 1.5 !important;
    @include respond-to(lg) {
        font-size: 40px !important;
        line-height: 1.5 !important;
    }
    @include respond-to(sm) {
        font-size: 30px !important;
        line-height: 1.5 !important;
    }
    @include respond-to(xs) {
        font-size: 26px !important;
        line-height: 1.5 !important;
    }
}

.text--headline {
    font-size: 130px;
    line-height: 1.5;
    @include respond-to(lg) {
        font-size: 100px;
        line-height: 1.5;
    }
    @include respond-to(sm) {
        font-size: 96px;
        line-height: 1.5;
    }
    @include respond-to(xs) {
        font-size: 70px;
        line-height: 1.5;
    }
}

.text--big {
    font-size: 150px;
    line-height: 1.5;
    @include respond-to(lg) {
        font-size: 120px;
    }
    @include respond-to(sm) {
        font-size: 90px;
    }
    @include respond-to(xs) {
        font-size: 50px;
    }
}

.text--white {
    color: #fff;
}

.text--secondary {
    color: color(white);
}

.page-content {
    padding-top: 60px;
    padding-bottom: 60px;

    p {
        margin-bottom: 1em;
        font-family: "Montserrat";
        font-weight: 400;
        line-height: 1.5;
    }
}
.page-content_without_ptop{
    //  padding-top: 60px;
    padding-bottom: 60px;

    p {
        margin-bottom: 1em;
        font-family: "Montserrat";
        font-weight: 400;
        line-height: 1.5;
    }
}
.faq-content {
    background-image: url("~assets/img/entryRules/bg.svg");
    background-size: contain;
    background-position: 0 0;
    background-repeat: repeat-y;
}

.home-section .info-slider {
    min-height: calc(100vh - 100px) !important;
}

.desktop-only {
    @include respond-to(lg) {
        display: none !important;
    }
}

.pad-only {
    display: none !important;
    @include respond-to(lg) {
        display: block !important;
    }
    @include respond-to(sm) {
        display: none !important;
    }
    @media (max-width: 768px) and (max-height: 500px) {
        display: block !important;
    }
}

.pad2-only {
    display: none !important;
    @include respond-to(sm) {
        display: block !important;
    }
    @include respond-to(xs) {
        display: none !important;
    }
    @media (max-width: 768px) and (max-height: 500px) {
        display: none !important;
    }
}

.mobile-only {
    display: none !important;
    @include respond-to(xs) {
        display: block !important;
    }
}

.content-block {
    h1,
    h2,
    h3,
    h4 {
        color: #1dcfff;
    }
    h1:not(.heading),
    h2:not(.heading),
    h3:not(.heading),
    h4:not(.heading) {
        position: relative;
        color: #1dcfff;
        font-weight: bold;
        font-size: 50px;
        line-height: 1.5;
        padding-top: 50px;
        padding-bottom: 20px;
        @include respond-to(lg) {
            font-size: 40px;
            line-height: 1.5;
        }
        @include respond-to(sm) {
            font-size: 30px;
            line-height: 1.5;
        }
        @include respond-to(xs) {
            font-size: 26px;
            line-height: 1.5;
        }
    }

    .info-slider {
        margin: 30px 0;
    }

    p {
        margin: 10px 0;
        font-family: "Montserrat";
        font-weight: 400;
    }

    img {
        margin: 20px 0;
    }
}
.content-block .animate-activities{
    img{
        margin: 20px 0;
        width: 100vw;
        margin-left: -50vw;
        left: 50%;
        position: relative;
        max-width: 100vw;
    }
}
.blog-entry {
    .info-slider {
        max-height: 600px;
        margin: 30px 0;
    }
}

.tour-item {
    .info-slider {
        max-height: 700px;
        margin: 30px 0;
        min-height: 100%;
    }
}

.watch-activity__activities-item,
.about__team-block,
.blog__list,
.tour-item__team-block {
    .img__container {
        height: 100%;
    }
}

.page-header {
    .img__container {
        height: 100%;
        position: absolute !important;
        top: 0;
    }
}

.display-flex-number {
    display: flex;
    flex-wrap: wrap;
}
.grid__container-block.container {
    @media (max-width: 575px) {
        padding-left: 0;
        padding-right: 0;
    }
    .row {
        @media (max-width: 575px) {
            margin-right: 0;
            margin-left: 0;
        }
    }
    .col-1,
    .col-2,
    .col-3,
    .col-4,
    .col-5,
    .col-6,
    .col-7,
    .col-8,
    .col-9,
    .col-10,
    .col-11,
    .col-12,
    .col,
    .col-auto,
    .col-sm-1,
    .col-sm-2,
    .col-sm-3,
    .col-sm-4,
    .col-sm-5,
    .col-sm-6,
    .col-sm-7,
    .col-sm-8,
    .col-sm-9,
    .col-sm-10,
    .col-sm-11,
    .col-sm-12,
    .col-sm,
    .col-sm-auto,
    .col-md-1,
    .col-md-2,
    .col-md-3,
    .col-md-4,
    .col-md-5,
    .col-md-6,
    .col-md-7,
    .col-md-8,
    .col-md-9,
    .col-md-10,
    .col-md-11,
    .col-md-12,
    .col-md,
    .col-md-auto,
    .col-lg-1,
    .col-lg-2,
    .col-lg-3,
    .col-lg-4,
    .col-lg-5,
    .col-lg-6,
    .col-lg-7,
    .col-lg-8,
    .col-lg-9,
    .col-lg-10,
    .col-lg-11,
    .col-lg-12,
    .col-lg,
    .col-lg-auto,
    .col-xl-1,
    .col-xl-2,
    .col-xl-3,
    .col-xl-4,
    .col-xl-5,
    .col-xl-6,
    .col-xl-7,
    .col-xl-8,
    .col-xl-9,
    .col-xl-10,
    .col-xl-11,
    .col-xl-12,
    .col-xl,
    .col-xl-auto {
        @media (max-width: 575px) {
            padding-left: 0;
            padding-right: 0;
        }
    }
}
iframe[allow="microphone"] {
    right: 2%;
}
</style>
