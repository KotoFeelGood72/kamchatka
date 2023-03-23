<template>
	<section>
			<div class="main-top-block">
				<src-video v-if="nameVideo" :videoName="nameVideo" classVideo="video-main-page"/>
				<page-header v-if="loadedPage" class="header__padding">
						<div v-html="data.mainBanner.title"></div>
						<h3 v-html="data.mainBanner.text"/>
				</page-header>
			</div>
			<div v-if="loadedTours">
				<tours critical :data="dataPage.tours"></tours>
			</div>
			<about-us-home :critical="true"/>
			<div v-if="dataPage.loadedActivities">
				<kam-slider :data="dataPage.dataActivities"/>
			</div>
			<contact-queue :critical="true" />
			<!-- <tripadvisor-reviews :critical="true" /> -->
			<tripSlider/>
			<home-footer/>
	</section>
</template>

<script>
import { Api } from "../api/api";
import { mapGetters } from "vuex";

// Block main page

import srcVideo from "../components/srcVideo/srcVideo";
import PageHeader from "../components/content/pageHeaderMain";
import Tours from '../components/tours/toursComponent';
import AboutUsHome from '../sections/about-us';
import ContactQueue from '../components/ContactQueue/ContactQueue';
import HomeFooter from '../sections/footer';
// import TripadvisorReviews from '../components/content/TripadvisorReviews';
import kamSlider from "../components/kam-slider/kam-slider";
import tripSlider from "../components/Advisor/slider";


export default {
    computed: {
        ...mapGetters(["getRouterStatus", "SCREEN"]),
        isShowFeedback() {
            return this.$store.getters["getIsShowFeedback"]();
        },
        currentRouteName() {
            return this.$store.$i18n.loadedLanguages[0];
        },
        currentRoutePath() {
            return this.$route.path;
        }
    },
    name: "home",
    components: {
				srcVideo,
        PageHeader,
        Tours,
        AboutUsHome,
        ContactQueue,
        HomeFooter,
        tripSlider,
				kamSlider
    },
    data() {
        return {
            loadedTours: false,
            loadedPage: false,
            dataPage: {
                loadedActivities: false,
                dataActivities: null,
                seo: null,
                homeHeader: null,
                tours: null,
                blocks: null,
            },
            pageLoaded: false,
            nameVideo: '',
            addEvent: true,
            initialY: null,
            showMenu: false,
        };
    },
    head() {
        return {
            title: this.seo ? this.seo.title : "",
            meta: [
                {hid: "description", name: "description", content: this.seo ? this.seo.description : "",},
                {hid: "image", name: "image", content: this.dataPage && this.dataPage.homeHeader ? this.dataPage.homeHeader.img.src : "",},
                {hid: "og:title", name: "og:title", content: this.seo ? this.seo.title : "",},
                {hid: "og:description", name: "og:description", content: this.seo ? this.seo.description : "",},
                {hid: "og:image", name: "og:image", content: this.dataPage && this.dataPage.homeHeader ? this.dataPage.homeHeader.img.src : "",},
                {hid: "cmsmagazine", name: "cmsmagazine", content: "9dece2e20769e5fefc2f5dec3eee83ae",},
                {hid: "yandex-verification", name: "yandex-verification", content: this.$i18n.locale === "ru" ? "a85d5b9f54b2958d" : "81bc8d9d86628e2b",},
            ],
        };
    },
    methods: {
        clickLogo() {
            window.scrollTo(0, 0);
        },
        showMenuFunc() {
            this.showMenu = !this.showMenu;
        },
        isMobile() {
            return window.innerWidth < 768;
        },
        asyncActivities() {
            const lang = this.currentRouteName === 'ru' ? 'ru' : 'en';
            Api.get(`mainActivities?lang=${lang}&router=${this.currentRoutePath}`)
                .then((response) => {
                    if(response.status === 200) {
                        this.dataPage.dataActivities = response.data.data.activities
                        this.dataPage.loadedActivities = true;
                    }
                })
        },
        asyncTours() {
            const lang = this.currentRouteName === 'ru' ? 'ru' : 'en';
            Api.get(`mainTours?lang=${lang}&router=${this.currentRoutePath}`)
                .then((response) => {
                    if(response.status === 200) {
                        this.dataPage.tours = response.data.data.tours
                        this.loadedTours = true;
                    }
                })
        },
    },
    async asyncData({route, params, store}) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
            return await Api.get(`main?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
                return {
                    seo: response.data.seo,
                    data: response.data.data,
                    homeHeader: response?.data?.data?.video[0],
                    loadedPage: true
                }
            }
        );
    },
    mounted() {
        if(this.SCREEN.width > 500) {
            this.nameVideo = 'home-timelaps';
        } else {
            this.nameVideo = "home-timelaps-mobiles";
        }
        this.asyncActivities();
        this.asyncTours();
    },
};
</script>

<style lang="scss">
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";

.main-top-block {
    position: relative;
}

.info-slider {
    min-height: 100vh;
}

.section-grid {
    display: grid;
    grid-template-columns: 5fr 3fr 3fr 5fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
    "block-1 block-2 block-2 block-3"
    "block-1 block-2 block-2 block-6"
    "block-1 block-4 block-5 block-6";
    height: 100%;
    &.about-us {
        @include respond-to(md) {
            grid-template-areas:
        "block-1 block-1 block-1 block-3 block-3 block-3"
        "block-6 block-6 block-6 block-6 block-6 block-6"
        "block-4 block-4 block-5 block-5 block-2 block-2";
        }
        @include respond-to(sm) {
            grid-template-areas:
        "block-1"
        "block-3"
        "block-6"
        "block-4"
        "block-5"
        "block-2";
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
        }
    }
    @include respond-to(lg) {
        grid-template-columns: 7fr 4.166666666666667fr 4.166666666666667fr 6fr;
    }
    @include respond-to(md) {
        grid-template-areas:
      "block-1 block-1 block-1 block-3 block-3 block-3"
      "block-2 block-2 block-2 block-2 block-2 block-2"
      "block-4 block-4 block-5 block-5 block-6 block-6";
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1.1fr 1.5fr 1fr;
    }
    @include respond-to(sm) {
        grid-template-areas:
      "block-1"
      "block-3"
      "block-2"
      "block-4"
      "block-5"
      "block-6";
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
}

.section-grid__item {
    position: relative;
		@include flex-start;
    flex-direction: column;
    text-align: center;
    padding: 30px 15%;
    overflow: hidden;
    @include respond-to(sm) {
        min-height: 300px;
    }
    &:nth-child(1) {
        grid-area: block-1;
    }
    &:nth-child(2) {
        grid-area: block-3;
        justify-content: center;
    }
    &:nth-child(3) {
        grid-area: block-2;
    }
    &:nth-child(4) {
        grid-area: block-4;
        justify-content: center;
    }
    &:nth-child(5) {
        grid-area: block-5;
        justify-content: center;
    }
    &:nth-child(6) {
        justify-content: center;
        grid-area: block-6;
    }
    & > div {
        z-index: 2;
        & > a {
            &::before {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
            }
        }
    }
}

.section-grid__title {
    font-size: 50px;
    font-weight: 900;
    line-height: 1.5;
    margin-top: 0.6em;
    margin-bottom: 0.6em;
    color: #fff;
    @include respond-to(lg) {
        font-size: 40px;
    }
    @include respond-to(md) {
        font-size: 30px;
    }
    a {
        color: #fff;
        text-decoration: none;
        display: block;
    }
}

.section-grid__title--sm {
    font-size: 40px;
    @include respond-to(lg) {
        font-size: 30px;
    }
    @include respond-to(sm) {
        font-size: 40px;
    }
}

.section-grid__item--bg {
    img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

@include respond-to(sm) {
    .section-grid {
        height: auto;
    }
}


.page-header__title {
    h1 {
        font-size: 35px;
        font-weight: 900;
        line-height: 1.5;
        color: white;
        @include respond-to(xs) {
            font-size: 24px;
            line-height: 1.5;
        }
    }
}

.page-header__title h3 {
    font-size: 23px;
    font-weight: 900;
    line-height: 1.5;
    color: white;
    margin-top: 20px;
    @include respond-to(xs) {
        font-size: 14px;
        margin-top: 10px;
        line-height: 1.5;
    }
}

</style>
