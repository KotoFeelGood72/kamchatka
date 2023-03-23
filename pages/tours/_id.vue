<template>
    <section v-if="data" class="tour-item tour-item-list_styler">
        <div class="container">
            <div class="activity-watch__header">
                <HeadingStatic tag="h1" size="lg" color="white" v-html="data.name"/>
                <imgAnimation :img="data.bannerImg" :isAnimationT="true"/>
            </div>
        </div>
        <div class="container--middle-tour tour-item__await-you">
            <dynamic-info
                v-if="this.data.topContentBlock"
                :template="`<div class='tour-item__top'><div class='container__tours'>` + allTopContentWithoutLastDiv + `</div></div>`"
            />
        </div>
        <div class="container" v-if="data.locations && data.locations.length">
            <h1 class="location-title">{{ $t("tour.locationsProgram") }}</h1>
        </div>
        <div class="container grid__container-block">
            <grid-loc
                class="activity-grid"
                v-if="data.locations && data.locations.length"
                :data="data.locations"
                :isPopup="true"
            />
        </div>
        <div class="container--middle-tour tour-item__selected-date">
            <div class="middle_heading_padding" v-if="data.datesInfoContent" v-html="data.datesInfoContent"/>
            <anim-button @endAnim="changeOpenFeedback" color="white">{{ $t('tour.request') }}</anim-button>
            <!-- <h2 v-html="$t('tour.textBottomDatesTitle')" />
            <p class="mw-600" v-html="$t('tour.textBottomDatesDesc')" /> -->
        </div>
        <div class="container--middle-tour tour-item__await-you">
            <dynamic-info :template="`<div><div>` + data.middleContentBlock + `</div></div>`"/>
        </div>
        <div class="container">
            <div v-if="data.team && data.team.length" class="tour-item__teams row">
                <div
                    v-for="(team, index) in data.team"
                    :key="'team-' + index"
                    class="tour-item__team col-md-6 col-12"
                >
                    <div class="tour-item__team-block">
                        <img-com :img="team.img"/>
                        <div class="tour-item__team-container">
                            <p class="tour-item__team-name" v-if="team.name" v-html="team.name"/>
                            <p class="tour-item__team-text" v-if="team.text" v-html="team.text"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container--middle-tour tour-item__await-you">
            <dynamic-info :template="`<div><div>` + data.middleContentBlock2 + `</div></div>`"/>
        </div>
        <div class="container">
            <!-- <h2 class="tour-item-h2" v-if="data.stages && data.stages.length" v-html="$t('tour.stages')" /> -->
            <div v-if="data.stages && data.stages.length" class="tour-item__stages">
                <div
                    v-for="(stage, index) in data.stages"
                    :key="'stage-' + index"
                    class="tour-item__stage row"
                >
                    <div class="tour-item__stage-left col-lg-6 col-12">
                        <!-- <p
                          class="text--header tour-item__stage-day"
                          v-html="(index + 1) < 10 ? ($t('tour.stageDay') + ' <span>0' +  (index+1)) +'</span>' : $t('tour.stageDay') + ' ' + (index + 1)"
                        /> -->
                        <div>
                            <p class="tour-item__stage-name" v-html="stage.name"/>
                            <div class="tour-item__stage-text" v-html="stage.text"/>
                        </div>
                    </div>
                    <div v-if="slickComp" class="tour-item__stage-right col-12">
                        <component
                            :is="slickComp"
                            :ref="'slick-img-stage-' + index"
                            class="slick-stages"
                            :options="slickContentOptions"
                        >
                            <div v-for="(thumb, index2) in stage.gallery" :key="'thumb-' + index2">
                                <img-com :img="thumb"/>
                            </div>
                        </component>
                    </div>
                </div>
            </div>
            <div class="tour-item__first-step-enjoy">
                <h2 v-if="data.prices && data.prices.title" v-html="data.prices.title"/>
                <p class="fw-500" v-if="data.prices && data.prices.text" v-html="data.prices.text"/>
                <div
                    class="tour-item__price row"
                    v-if="data.prices && data.prices.list && data.prices.list.length"
                >
                    <div
                        v-for="(price, index) in data.prices.list"
                        :key="index"

                        class="tour-item-container__items col-xl-3 col-lg-4 col-sm-6 col-md-6 col-12"
                    >
                        <div class="tour-item-container__items__block" @click.prevent="changeOpenFeedback">
                            <p class="tour-item__price-desc" v-html="price.description"/>
                            <p class="tour-item__price-value">{{ price.value }}</p>
                        </div>
                    </div>
                    <!-- <li v-for="(price, index) in data.prices.list" :key="index">
                      <p class="tour-item__price-desc" v-html="price.description" />
                      <p class="tour-item__price-value">{{price.value}} ₽</p>
                    </li>-->
                </div>

                <div class="block-after-price">
                    <h3 v-html="blockAfterPrice"></h3>
                </div>

                <anim-button
                    v-if="data.prices"
                    class="anim-button_gradient"
                    @endAnim="changeOpenFeedback"
                    color="white"
                >{{ $t('tour.book') }}
                </anim-button>
            </div>
            <!-- <button v-if="data.prices" @click="changeOpenFeedback">{{ $t('tour.book') }}</button> -->
        </div>

        <div class="block-after-price container">
            <h1 v-html="blockAfterButton"></h1>
        </div>


        <dynamic
            :template="`<div class='tour-item__result'><div class='container--middle-tour'>` + data.bottomContentBlock + `</div class='container'></div>`"
        />

        <div class="container tour-item__activities">
            <h2 v-if="data.activities && data.activities.length" v-html="$t('tour.interested')"/>
            <grid
                class="mt-40"
                v-if="data.activities && data.activities.length"
                :data="data.activities"
                :isPopup="true"
                :urlParent="false"
            />
        </div>
        <div class="container tour-item__navigation">
            <div v-if="data.previousTour || data.nextTour" class="tour-item__change">
                <div v-if="data.previousTour" class="tour-item__change-item">
                    <nuxt-link
                        :to="$i18n.locale === 'en' ? '/tours/' + data.previousTour.slug + '/' : '/tours/' + data.previousTour.slug + '/'"
                    >
                        <!-- <arrow-long v-if="screen.width < 767"/> -->
                        <!--            {{screen.width > 767 ? data.previousTour.name : ($i18n.locale === 'en' ? 'Previous' : 'Назад')}}-->
                        {{ data.previousTour.name }}
                    </nuxt-link>
                </div>
                <div v-if="data.nextTour" class="tour-item__change-item">
                    <nuxt-link
                        :to="$i18n.locale === 'en' ? '/tours/' + data.nextTour.slug + '/' : '/tours/' + data.nextTour.slug + '/'"
                    >
                        <!--            {{screen.width > 767 ? data.nextTour.name : ($i18n.locale === 'en' ? 'Next' : 'Вперед')}}-->
                        {{ data.nextTour.name }}
                        <!-- <arrow-long :rotate="true" v-if="screen.width < 767"/> -->
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import InfoSlider from "../../components/infoSlider/infoSlider";
// import infoSliderOutside from "../../components/infoSlider/infoSliderOutside";
import VideoEmbed from "../../components/content/videoEmbed";
import PageHeader from "../../components/content/pageHeader";
import contentImage from "../../components/content/contentImage";
import {Api} from "../../api/api";
import Heading from "../../components/content/heading";
import HeadingStatic from "../../components/content/headingStep";
import Dynamic from "../../components/dynamic";
import DynamicInfo from "../../components/dynamicInfoSlider";
import animButton from "../../components/button/button";
import Grid from "../../components/grid/grid";
import GridLoc from '../../components/grid/gridLocations';
// import ArrowLong from "../../components/icons/arrow-long";
import imgAnimation from '../../components/img/imgAnimation'
import $ from "jquery";

export default {
    name: "tourSlug",
    components: {
        ArrowLong,
        Grid,
        GridLoc,
        Dynamic,
        Heading,
        HeadingStatic,
        PageHeader,
        VideoEmbed,
        // InfoSlider,
        // infoSliderOutside,
        contentImage,
        animButton,
        DynamicInfo,
        imgAnimation,
        // Slick: () => import("vue-slick")
    },
    asyncData({route, params, error, payload, store}) {
        let lang = "";
        if (route.name.indexOf("_en") >= 0) {
            lang = "en";
        } else {
            lang = "ru";
        }
        return Api.get(`tours/${params.id}?lang=${store.$i18n.locale}&router=${route.path}`).then(
            response => {
                try {
                    console.log(response.data.data)
                    if (response.data.data.length === 0) {
                        error({statusCode: 404})
                    }
                    return {
                        seo: response.data.seo,
                        data: response.data.data
                    };
                } catch(e) {
                    console.log(e)
                }
            }
        );
    },
    data() {
        return {
            data: "",
            seo: "",
            // slickComp: false,
            screen: this.$store.getters.SCREEN,
            count_background: 0,
            blockAfterPrice: '',
            blockAfterButton: '',
            allTopContentWithoutLastDiv: null,
        };
    },
    head() {
        return {
            title: this.seo ? this.seo.title : "",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.seo ? this.seo.description : ""
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.seo ? this.seo.keywords : ""
                },
                {
                    hid: "image",
                    name: "image",
                    content:
                        this.data && this.data.bannerImg ? this.data.bannerImg.src : ""
                },
                {
                    hid: "og:title",
                    name: "og:title",
                    content: this.seo ? this.seo.title : ""
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: this.seo ? this.seo.description : ""
                },
                {
                    hid: "og:keywords",
                    name: "og:keywords",
                    content: this.seo ? this.seo.keywords : ""
                },
                {
                    hid: "og:image",
                    name: "og:image",
                    content:
                        this.data && this.data.bannerImg ? this.data.bannerImg.src : ""
                }
            ]
        };
    },
    computed: {
        // slickContentOptions() {
        //     return {
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //         infinite: true
        //     };
        // },
    },
    watch: {
        $route() {
            this.init();
        }
    },
    methods: {
        init() {
            Api.get(
                `tours/${this.$route.params.id}?lang=${this.$i18n.locale}&router=${this.$route.path}`
            ).then(response => {
                this.seo = response.data.seo;
                this.data = response.data.data;
                let breadCrumbs = [
                    {name: "breadCrumbs.tour", link: "/tours"},
                    {name: this.data.name}
                ];
                this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
            });
        },
        changeOpenFeedback() {
            this.$store.dispatch(
                "changeIsShowFeedback",
                !this.$store.getters["getIsShowFeedback"]()
            );
        },
        parserHtmlTopContentBlock() {
            let parser = new DOMParser();
            let doc = parser.parseFromString(this.data.topContentBlock, 'text/html');
            console.log(doc)
            let blockAfterPrice = doc.body.removeChild(doc.body.lastChild);

            this.blockAfterPrice = blockAfterPrice?.querySelector('h3')?.innerHTML || '';
            this.blockAfterButton = blockAfterPrice?.querySelector('h1')?.innerHTML || '';
            this.allTopContentWithoutLastDiv = doc.body.innerHTML;
            console.log(this.data)
        }
    },

    updated() {
        let animate_item_heading = document.querySelectorAll(
            ".tour-item h2, .tour-item h3, .tour-item ul, .tour-item p, .info-slider__content, .tour-item__stage-text"
        );
        for (let i = 0; i < animate_item_heading.length; i++) {
            animate_item_heading[i].style.opacity = 0;
            animate_item_heading[i].classList.add("animated-text");
            animate_item_heading[0].classList.add("animated");
            animate_item_heading[1].classList.add("animated");
            animate_item_heading[1].classList.add("fadeInLeft")
            animate_item_heading[0].classList.add("fadeInLeft");
        }
        let videoLink = document.querySelectorAll('.inner_video>a')
        Array.from(videoLink).map((el) => {
            el.dataset.fancybox
            console.log(el.dataset.fancybox = '', 'Good')
        })
    },
    mounted() {
        let animate_item_heading = document.querySelectorAll(
            ".tour-item h2, .tour-item h3, .tour-item ul, .tour-item p, .info-slider__content, .tour-item__stage-text"
        );
        for (let i = 0; i < animate_item_heading.length; i++) {
            animate_item_heading[i].style.opacity = 0;
            animate_item_heading[i].classList.add("animated-text");
            animate_item_heading[0].classList.add("animated");
            animate_item_heading[0].classList.add("fadeInLeft");
            if(animate_item_heading[1] !== undefined) {
                animate_item_heading[1].classList.add("animated");
                animate_item_heading[1].classList.add("fadeInLeft");
            }
        }
        var Visible = function () {
            [].forEach.call(
                document.querySelectorAll(
                    ".tour-item h2, .tour-item h3, .tour-item ul, .tour-item p, .info-slider__content, .tour-item__stage-text"
                ),
                function (div) {
                    var target = div;
                    var targetPosition = {
                            top: window.pageYOffset + target.getBoundingClientRect().top,
                            left: window.pageXOffset + target.getBoundingClientRect().left,
                            right: window.pageXOffset + target.getBoundingClientRect().right,
                            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                        },
                        windowPosition = {
                            top: window.pageYOffset,
                            left: window.pageXOffset,
                            right: window.pageXOffset + document.documentElement.clientWidth,
                            bottom: window.pageYOffset + document.documentElement.clientHeight
                        };
                    if (
                        targetPosition.bottom > windowPosition.top &&
                        targetPosition.top < windowPosition.bottom &&
                        targetPosition.right > windowPosition.left &&
                        targetPosition.left < windowPosition.right
                    ) {
                        if (div.classList.contains("animated-text")) {
                            div.classList.remove("animated-text");
                            div.classList.add("animated");
                            div.classList.add("fadeInLeft");
                        }
                    } else {
                        div.classList.add("animated-text");
                        div.classList.remove("animated");
                        div.classList.remove("fadeInLeft");
                        // div.style.opacity = 0;
                    }
                }
            );
        };

        window.addEventListener("scroll", function () {
            Visible();
        });
        if (document.querySelector('.tour-item__price')) {
            document.querySelector('.tour-item__price').addEventListener('scroll', function () {
                Visible();
            })
        }

        let breadCrumbs = [
            {name: "breadCrumbs.tour", link: "/tours"},
            {name: this.data ? this.data.name : ""}
        ];
        this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
        // this.$nextTick(function () {
        //     this.slickComp = "Slick";
        // });
        this.parserHtmlTopContentBlock();

    },


};

</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
// Fix__rublia

/deep/ .inner_video {
    width: 100%;
    height: 500px;
    position: relative;
    margin: 30px 0;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @include respond-to(sm) {
        max-height: 300px;
        margin: 15px 0;
    }
    &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        pointer-events: none;
        background-color: rgba(255, 255, 255, 0.14);
    }
    a {
        width: 100%;
        height: 100%;
        display: block;
        &:hover {
            &:before {
                transform: translate(-50%, -50%) scale(1.2);
            }
            &:after {
                transform: scale(1.1) translate(-45%, -45%);
            }
        }
    //&:after {
    //    position: absolute;
    //    top: 50%;
    //    left: calc(50% - 4px);
    //    transform: translate(-50%, -50%);
    //    border-radius: 50%;
    //    width: 100px;
    //    height: 100px;
    //    background-color: rgba(255, 255, 255, 0.14);
    //    content: '';
    //    pointer-events: none;
    //    transition: all .3s ease;
    //    @include respond-to(sm) {
    //        width: 70px;
    //        height: 70px;
    //    }
    //}
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url('~assets/img/you-logo.png');
        background-size: contain;
        background-position: center center;
        width: 70px;
        height: 50px;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        color: white;
        transition: all .3s ease;
        @include respond-to(sm) {
            font-size: 25px;
        }
    }
    }
}

.tour-item-container__items__block {
    cursor: pointer;
    transition: all .3s ease;
    &:hover {
        * {

            color: #1dcfff;
        }
    }
}
.middle_heading_padding {
    margin-bottom: 100px;
}

.container--middle-tour {
    padding: 0 10px;

    /deep/ .container {
        max-width: 100%
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
    @include respond-to(md) {
        max-width: 660px !important;
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

.rubly {
    font-family: -apple-system;
}


.slick-stages {
    height: 100%;

    img {
        min-height: 550px;
    }
}

.tour-item__stage {
    margin-bottom: 60px;
    min-height: 700px;
    @include respond-to(custom) {
        min-height: 600px;
    }
    @include respond-to(md) {
        margin-bottom: 32px;
    }
    @include respond-to(sm) {
        margin-bottom: 30px;
    }

    .tour-item__stage-day {
        margin: 40px 0 30px 0;
        font-weight: 900;
        font-family: "Mpluse1p";
        @include respond-to(custom) {
            font-size: 40px !important;
            line-height: 1.5 !important;
        }
        @include respond-to(md) {
            font-size: 30px !important;
            line-height: 1.5 !important;
            margin: 25px 0 28px 0;
        }
        @include respond-to(sm) {
            margin: 10px 0 28px 0;
        }

        /deep/ span {
            margin-left: 30px;
            @include respond-to(md) {
                margin-left: 22px;
            }
        }
    }

    .tour-item__stage-name {
        font-size: 30px;
        line-height: 1.5;
        font-weight: 800;
        margin-top: 42px;
        font-family: "Mpluse1p";
        @include respond-to(custom) {
            font-size: 30px;
            line-height: 1.5;
            margin-top: 42px;
        }
        @include respond-to(lg) {
            font-size: 25px;
            line-height: 1.5;
            margin-top: 42px;
        }
        @include respond-to(md) {
            font-size: 20px;
            line-height: 1.5;
            margin-top: 25px;
            margin-bottom: 12px;
        }
        @include respond-to(sm) {
            font-size: 17px;
            line-height: 1.5;
            margin-top: 25px;
            margin-bottom: 12px;
        }
    }

    .tour-item__stage-left {
        padding-right: 8%;
        max-height: 700px;
        overflow: hidden;
        @include respond-to(custom) {
            max-height: 600px;
        }
        @include respond-to(md) {
            max-height: none;
        }
    }

    .tour-item__stage-right {
        position: absolute;
        max-width: 50%;
        right: 0;
        padding-right: 0;
        padding-left: 0;
        @include respond-to(md) {
            max-width: initial;
            position: relative;
            right: auto;
            width: 100vw;
            left: 50%;
            margin-left: -50vw;
            margin-top: 75px;
        }
        @include respond-to(sm) {
            margin-top: 100px;
        }

        /deep/ .img__container img {
            height: 700px;
            object-fit: cover;
            @include respond-to(custom) {
                height: 600px;
            }
            @include respond-to(md) {
                height: 384px;
            }
        }

        /deep/ .slick-slide {
            height: 700px;
            @include respond-to(custom) {
                height: 600px;
            }
            @include respond-to(md) {
                height: 384px;
            }
        }

        /deep/ .slick-track {
            @include respond-to(md) {
                min-width: 100vw;
            }
        }
    }

    /deep/ .slick-arrow {
        width: 70px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
        outline: 0;
        border: 0;
        position: absolute;
        top: 30px;
        z-index: 9;
        background: #21232a;
        border-radius: 50%;
        cursor: pointer;
        @include respond-to(custom) {
            width: 60px;
            height: 60px;
        }
        @include respond-to(sm) {
            width: 30px;
            height: 30px;
        }

        &:hover {
            &.slick-prev:before,
            &.slick-next:before {
                background: url("~assets/img/icons/arrow-blue.svg") no-repeat;
                background-size: contain;
            }
        }

        &.slick-prev {
            left: -344px;
            @include respond-to(custom) {
                left: -230px;
            }
            @include respond-to(md) {
                left: 5%;
                top: 5%;
            }
            @include respond-to(sm) {
                left: calc(50% - 60px);
                top: -50px;
            }
        }

        &.slick-prev:before,
        &.slick-next:before {
            content: "";
            background: url("~assets/img/icons/arrow.svg") no-repeat;
            width: 14px;
            height: 24px;
            display: inline-flex;
            background-size: contain;
            @include respond-to(custom) {
                width: 12px;
                height: 20px;
            }
            @include respond-to(sm) {
                width: 6px;
                height: 10px;
            }
        }

        &.slick-prev:before {
            margin-left: -5px;
            @include respond-to(sm) {
                margin-left: -2px;
            }
        }

        &.slick-next {
            left: -175px;
            @include respond-to(custom) {
                left: -100px;
            }
            @include respond-to(md) {
                left: 20%;
                top: 5%;
            }
            @include respond-to(sm) {
                left: calc(50% + 30px);
                top: -50px;
            }
        }

        &.slick-next:before {
            margin-right: -5px;
            transform: scale(-1, 1);
            @include respond-to(sm) {
                margin-right: -2px;
            }
        }

        &:hover {
            color: color(lightBlue);
        }
    }

    .icon-arrow-left {
        margin-right: 2.5em;
    }

    .tour-item-slider__arrows {
        position: absolute;
        left: 35%;
        top: 0;
    }
}

.fw-500 {
    font-weight: 500;
}

.activity-watch__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    // background: #171920;
    padding: 100px 0;
    @include respond-to(lg) {
        padding: 90px 0;
    }
    @include respond-to(sm) {
        padding: 115px 0 70px;
    }

    /deep/ h1 {
        min-width: 165px;
    }

    /deep/ img,
    /deep/ .img__container {
        max-width: 500px;
        max-height: 500px;
        width: 100%;
        height: 100%;
        @include respond-to(lg) {
            max-width: 280px;
        }
        @include respond-to(md) {
            max-width: 250px;
            margin: 30px auto 0;
        }
    }
}

.tour-item {
    overflow-x: hidden;
    // /deep/.container .container {
    //   max-width: inherit !important;
    // }
    .tour-item-h2 {
        font-weight: bold;
        font-size: 60px;
        line-height: 1.5;
        letter-spacing: 1.1px;
        @include respond-to(lg) {
            font-size: 36px;
            line-height: 1.5;
            margin-bottom: 0;
        }
        @include respond-to(md) {
            font-size: 24px;
            line-height: 1.5;
            padding-top: 0px;
            letter-spacing: 0.4px;
        }
        @include respond-to(sm) {
            font-size: 20px;
            line-height: 1.5;
        }
    }

    /deep/ iframe {
        margin-top: 60px;
        margin-bottom: 30px;
        height: calc(100vh - 100px);
        @include respond-to(lg) {
            margin-top: 35px;
            max-height: 640px;
        }
        @include respond-to(sm) {
            margin-top: 28px;
            max-height: 325px;
            margin-bottom: 0;
        }
    }

    .tour-item__top {
        margin-top: 70px;
        @include respond-to(lg) {
            margin-top: 10px;
        }
    }

    .tour-item__selected-date {
        margin-top: 70px;
        @include respond-to(lg) {
            margin-top: 30px;
        }

        /deep/ p {
            margin: 15px 0 28px;
            @include respond-to(lg) {
                margin: 10px 0 24px;
            }
        }

        /deep/ .animButton-container {
            margin-bottom: 112px;
            @include respond-to(lg) {
                max-width: 310px;
                margin-bottom: 60px;
            }
            @include respond-to(sm) {
                max-width: 217px;
                margin-bottom: 50px;
            }

            .particles-button.animButton-btn {
                @include respond-to(lg) {
                    font-size: 26px;
                    height: 70px;
                }
                @include respond-to(sm) {
                    font-size: 18px;
                    height: 50px;
                }
            }
        }

        /deep/ h2 {
            @include respond-to(lg) {
                font-size: 36px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 28px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 20px;
                line-height: 1.5;
            }
        }
    }

    .tour-item__await-you {
        margin-top: 75px;
        @include respond-to(sm) {
            margin-top: 52px;
        }

        /deep/ h3 {
            font-size: 60px;
            line-height: 1.5;
            @include respond-to(lg) {
                font-size: 37px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 24px;
                line-height: 1.5;
            }
        }

        /deep/ .info-slider {
            margin: 50px 0 0;
            @include respond-to(lg) {
                margin: 30px 0 0;
            }
        }

        /deep/ .container {
            padding: 35px 0 25px;
            @include respond-to(lg) {
                padding: 20px 0 25px;
            }
        }

        /deep/ h2 {
            padding-top: 25px;
            margin-bottom: 14px;
        }

        /deep/ p {
            margin: 0;
        }
    }

    .tour-item__stages {
        margin-top: 60px;
        @include respond-to(custom) {
            margin-top: 34px;
        }
    }

    .tour-item__stage-text {
        font-size: 22px;
        line-height: 1.5;
        font-family: "Montserrat";
        font-weight: 400;
        margin-top: 24px;
        // display: -webkit-box;
        //  -webkit-line-clamp: 9;
        //  -webkit-box-orient: vertical;
        //  overflow: hidden;
        @include respond-to(custom) {
            font-size: 18px;
            line-height: 1.5;
            // -webkit-line-clamp: 11;
        }
        @include respond-to(md) {
            font-size: 16px;
            line-height: 1.5;
            margin-top: 12px;
            // -webkit-line-clamp: inherit;
        }
        @include respond-to(sm) {
            font-size: 14px;
            line-height: 1.5;
            margin-top: 12px;
        }
    }

    .tour-item__first-step-enjoy {
        margin-top: 230px;
        @include respond-to(lg) {
            margin-top: 130px;
        }
        @include respond-to(sm) {
            margin-top: 60px;
        }

        h2 {
            font-size: 60px;
            line-height: 1.5;
            max-width: 1200px;
            @include respond-to(lg) {
                font-size: 36px;
                line-height: 1.5;
                max-width: 1000px;
            }
            @include respond-to(sm) {
                font-size: 26px;
                line-height: 1.5;
                max-width: 600px;
            }
        }

        p:not(.fw-500) {
            max-width: 470px;
            @include respond-to(sm) {
                font-size: 16px;
                line-height: 1.5;
                margin: 15px 0;
            }
            margin: 15px 0;
        }

        /deep/ .animButton-container {
            @include respond-to(lg) {
                max-width: 310px;
                margin-bottom: 60px;
            }
            @include respond-to(sm) {
                width: 217px;
            }

            .particles-button.animButton-btn {
                @include respond-to(lg) {
                    font-size: 26px;
                    height: 70px;
                }
                @include respond-to(sm) {
                    font-size: 18px;
                    height: 50px;
                }
            }
        }

        .tour-item__price {
            padding-left: 10px;
            margin-bottom: 75px;
            margin-top: 40px;

            @include respond-to(lg) {
                margin-top: 35px;
                margin-bottom: 50px;
            }
            @include respond-to(customMobile) {
                flex-wrap: nowrap;
                overflow-x: scroll;
                margin-left: -25px;
                margin-right: -25px;
            }

            // .tour-item-container__morethree {
            //   justify-content: space-between;
            // }
            // .tour-item-container__morethree div {
            //   margin-top: 30px;
            // }
            // .tour-item-container__lessthree div {
            //   margin-left: 30px;
            // }
            // .tour-item-container__lessthree div:first-child {
            //   margin-left: 0px;
            // }
            .tour-item-container__items {
                height: 360px;
                margin-top: 10px;
                margin-bottom: 30px;
                @include respond-to(xlg) {
                    height: 320px;
                }
                @include respond-to(md) {
                    height: 310px;
                }
                @include respond-to(sm) {
                    height: 290px;
                }
                @include respond-to(customMobile) {
                    flex-basis: 75%;
                }
            }

            .tour-item-container__items__block {
                width: 100%;
                height: 100%;
                padding: 15px 23px;
                position: relative;
            }

            .tour-item-container__items {
                &:nth-child(1n) {
                    .tour-item-container__items__block {
                        background: url('~assets/img/tours/content/cartitemone.jpg') no-repeat center center;
                    }
                }

                &:nth-child(2n) {
                    .tour-item-container__items__block {
                        background: url('~assets/img/tours/content/cartitemtwo.jpg') no-repeat center center;
                    }
                }

                &:nth-child(3n) {
                    .tour-item-container__items__block {
                        background: url('~assets/img/tours/content/cartitemtree.jpg') no-repeat center center;
                    }
                }
            }

            .tour-item__price-value {
                // Fix_font-size
                font-size: 45px;
                color: #1DCFFF;
                position: absolute;
                bottom: 15px;
                font-family: Helvetica, -apple-system;
                // left:0;
                // right:0;
                // text-align: center;
                @include respond-to(sm) {
                    // Fix_font-size
                    font-size: 35px;
                    line-height: 1.5;
                    margin: 0;
                }
            }

            // li {
            //   display: flex;
            //   justify-content: space-between;
            //   align-items: flex-end;
            //   max-width: 620px;
            //   width: 100%;
            //   padding-left: 30px;
            //   position: relative;
            //   list-style-type: none;
            //   margin-bottom: 8px;
            //   @include respond-to(sm) {
            //     flex-direction: column;
            //     align-items: flex-start;
            //   }
            //   p {
            //     @include respond-to(sm) {
            //       font-size: 22px;
            //       line-height: 24px;
            //     }
            //   }
            //   &:before {
            //     content: "";
            //     width: 12px;
            //     height: 12px;
            //     background-color: #1dcfff;
            //     border-radius: 50%;
            //     position: absolute;
            //     left: 0;
            //     top: 38px;
            //     @include respond-to(sm) {
            //       top: 20px;
            //     }
            //   }
            // }
            // .tour-item__price-value {
            //   font-size: 50px;
            //   line-height: 42px;
            //   @include respond-to(sm) {
            //     font-size: 40px;
            //     line-height: 40px;
            //     margin: 0;
            //   }
            // }
        }
    }

    .tour-item__result {
        margin-top: 146px;
        @include respond-to(lg) {
            margin-top: 126px;
        }
        @include respond-to(lg) {
            margin-top: 66px;
        }

        /deep/ h2 {
            max-width: 680px;
            margin-bottom: 15px;
        }

        /deep/ p {
            margin: 0;
            max-width: 850px;
        }
    }

    .tour-item__activities {
        margin-top: 140px;
        @include respond-to(sm) {
            margin-top: 66px;
        }
    }

    .tour-item__navigation {
        padding: 0;
        @include respond-to(sm) {
            padding: 0 25px;
        }

        .tour-item__change {
            @include respond-to(sm) {
                flex-wrap: wrap;
                .tour-item__change-item {
                    width: 100%;
                    max-width: 100%;
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:first-child {
                        a {
                            justify-content: flex-start;

                            svg {
                                margin-right: 12px;
                            }
                        }
                    }

                    &:last-child {
                        a {
                            justify-content: flex-end;

                            svg {
                                margin-left: 12px;
                            }
                        }
                    }

                    &.next {
                        background: #000;

                        a {
                            color: #43495c;
                        }

                        /deep/ svg {
                            margin-right: 16px;
                            margin-left: -28px;
                        }
                    }

                    &.previews {
                        background: #364868;

                        a {
                            color: #171920;
                        }

                        /deep/ svg {
                            margin-left: 16px;
                            margin-right: -58px;
                            transform: rotate(180deg);

                            path {
                                fill: #171920;
                            }
                        }
                    }

                    a {
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 1.5;
                        border-bottom: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    .tour-item__change {
        display: flex;
        padding: 50px 0;
        justify-content: space-between;
        @include respond-to(sm) {
            padding: 18px 0;
        }

        .tour-item__change-item {
            @include respond-to(md) {
                max-width: 300px;
            }

            a {
                font-size: 22px;
                line-height: 1.5;
                color: color(lightblue);
                border-bottom: 2px solid color(lightblue);
                text-decoration: none;

                &:hover {
                    color: #1dcfff;
                    border-color: #1dcfff;
                }
            }
        }
    }

    .activity-grid {
        margin-top: 64px;
        @include respond-to(lg) {
            margin-top: 35px;
        }
        @include respond-to(md) {
            margin-top: 44px;
        }
    }

    * {
        word-break: break-word;
    }

    button:not(.arrow) {
        max-width: 360px;
        width: 100%;
        height: 80px;
        background: #21232a;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 30px;
        line-height: 120%;
        color: #fbfbfb;
        border-radius: 140px;
        justify-content: center;
        border: none;
        cursor: pointer;
        outline: none;

        &:hover {
            color: #1dcfff;
        }
    }

    /deep/ h1:not(.heading):not(.page-header__title),
    /deep/ h2,
    /deep/ h3,
    /deep/ h4,
    /deep/ h5 {
        font-size: 40px;
        line-height: 1.5;
        color: #1dcfff;
        margin-top: 45px;
        @include respond-to(lg) {
            font-size: 30px;
            line-height: 1.5;
            margin-top: 4px;
        }
        @include respond-to(md) {
            font-size: 24px;
            line-height: 1.5;
            margin-top: 4px;
        }
        @include respond-to(sm) {
            margin-top: 25px;
            font-size: 18px;
            line-height: 1.5;
        }
    }

    /deep/ div {
        color: #fbfbfb;
        font-size: 24px;
        line-height: 1.5;
    }

    /deep/ p {
        margin: 15px 0;
        color: #fbfbfb;
        font-size: 24px;
        line-height: 1.5;
        font-family: "Montserrat";
        font-weight: 400;
        max-width: 1200px;
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

    background-color: #171920;
    background-image: url("~assets/img/tours/backKam.png");
    background-position: right;
    background-repeat: repeat-y;
    @include respond-to(md) {
        background-size: 700px;
    }
    @include respond-to(sm) {
        background-size: 300px;
    }

    .tour-item__team {
        max-height: 400px;
        height: 100%;
        margin-bottom: 30px;

        .tour-item__team-block {
            position: relative;
            height: 400px;
            overflow: hidden;
        }

        img {
            width: 100%;
            max-height: 400px;
        }

        &:hover {
            .tour-item__team-container {
                height: 100%;
            }

            .tour-item__team-text {
                font-size: 20px;
                line-height: 1.5;
                opacity: 0.8;
                font-size: 24px;
                line-height: 1.5;
                font-family: "Montserrat";
                opacity: 0.8;
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
        }

        .tour-item__team-container {
            height: 70px;
            position: absolute;
            bottom: 0;
            width: 100%;
            transition: height 1s;
            background: #2a2e39;
            padding: 0 30px;
        }

        .tour-item__team-text {
            font-size: 0;
            line-height: 1.5;
            color: #fbfbfb;
            opacity: 0;
            transition: opacity 2s;
            @include respond-to(md) {
                display: -webkit-box;
                -webkit-line-clamp: 15;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }

        .tour-item__team-name {
            font-size: 30px;
            line-height: 1.5;
            color: #fbfbfb;
            @include respond-to(custom) {
                font-size: 24px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 20px;
                line-height: 1.5;
            }
        }
    }

    /deep/ .info-slider {
        @include respond-to(lg) {
            max-height: 600px;
        }
        @include respond-to(md) {
            max-height: initial;
            position: relative;
            overflow: inherit;
        }

        &:before {
            content: "";
            background: color(grayBlue);
            position: absolute;
            left: 0;
            height: 700px;
            width: 700px;
            display: block;
            @include respond-to(lg) {
                height: 600px;
            }
            @include respond-to(md) {
                left: -300px;
                width: 200vw;
                top: 0;
                bottom: 0;
                height: initial;
            }
        }

        .info-slider__img-wrapper {
            position: absolute;
            max-width: 50%;
            right: 0;
            padding-right: 0;
            padding-left: 0;
            height: 700px;
            @include respond-to(lg) {
                height: 600px;
            }
            @include respond-to(md) {
                max-width: initial;
                position: relative;
                right: auto;
                width: 100vw;
                left: 50%;
                margin-left: -50vw;
                height: 384px;
            }
            @include respond-to(sm) {
                height: 375px;
            }

            .img__container img {
                object-fit: cover;
            }
        }

        .info-slider__content-wrapper {
            padding-left: 0;
            @include respond-to(md) {
                // height: 384px;
                max-height: 700px;
                height: 100%;
            }
            // @    include respond-to(xs) {
                // height: 400px;
            // }

            .info-slider__counter {
                font-size: 50px;
                line-height: 1.5;
                top: 35px;
                @include respond-to(lg) {
                    font-size: 40px;
                    line-height: 1.5;
                    top: 45px;
                }
                @include respond-to(md) {
                    font-size: 30px;
                    line-height: 1.5;
                    top: 25px;
                }
                @include respond-to(sm) {
                    top: initial;
                    bottom: 30px;
                }
            }

            .info-slider__title {
                padding-top: 0;
                margin-top: 8px;
                margin-bottom: 0;
                padding-bottom: 0;
                @include respond-to(lg) {
                    margin-top: 12px;
                }
                @include respond-to(md) {
                    margin-top: 20px;
                }
                @include respond-to(sm) {
                    margin-top: 26px;
                }

                a {
                    font-family: "Mpluse1p";
                    font-weight: 500;
                    font-size: 30px;
                    line-height: 1.5;
                    border-bottom: 0;
                    display: inline-flex;
                    @include respond-to(lg) {
                        font-size: 25px;
                        line-height: 1.5;
                    }
                    @include respond-to(md) {
                        font-size: 20px;
                        line-height: 1.5;
                    }
                    @include respond-to(sm) {
                        font-size: 17px;
                        line-height: 1.5;
                    }
                }
            }

            .info-slider__content {
                font-size: 22px;
                line-height: 1.5;
                margin-top: 15px;
                max-width: 600px;
                //   display: -webkit-box;
                //  -webkit-line-clamp: 9;
                //  -webkit-box-orient: vertical;
                //  overflow: hidden;
                @include respond-to(lg) {
                    font-size: 18px;
                    line-height: 1.5;
                    max-width: 430px;
                }
                @include respond-to(md) {
                    font-size: 16px;
                    line-height: 1.5;
                    max-width: 650px;
                    margin-top: 6px;
                }
                @include respond-to(sm) {
                    font-size: 14px;
                    line-height: 1.5;
                    max-width: 100%;
                    margin-top: 10px;
                }
            }

            .info-slider__arrows {
                bottom: 30px;
                @include respond-to(sm) {
                    bottom: initial;
                    top: 15px;
                }

                .icon-arrow-left {
                    @include respond-to(lg) {
                        margin-right: 2em;
                    }
                    @include respond-to(md) {
                        margin-right: 2.5em;
                    }
                    @include respond-to(sm) {
                        margin-right: 2em;
                    }
                }
            }

            .arrow {
                &:hover {
                    color: color(lightBlue);
                }

                @include respond-to(lg) {
                    width: 60px;
                    height: 60px;
                }
                @include respond-to(sm) {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
}

.watch-activity {
    background-image: url("~assets/img/upcomingTours/bg-main-section.png");
    background-color: #000;

    &__nav {
        display: flex;
        justify-content: space-between;

        @include respond-to(xs) {
            margin: 0 -15px;
        }

        &-item {
            color: color(blue);
            font-size: 20px;
            font-weight: 600;

            @include respond-to(md) {
                font-size: 16px;
                max-width: 50%;
                line-height: 1.5;
            }

            @include respond-to(xs) {
                width: 50%;
                background-color: #000;
                color: #43495c;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
                font-size: 16px;

                span {
                    display: none;
                }

                &:after {
                    content: "previous";
                }

                &:last-child {
                    background-color: #364868;
                    color: #171920;

                    &:after {
                        content: "next";
                    }
                }
            }
        }
    }

    &__activities {
        &-name {
            position: absolute;
            left: 0;
            bottom: 50px;
            background: color(granite);
            min-height: 100px;
            padding: 0 30px;
            display: flex;
            align-items: center;

            span {
                font-weight: bold;
                font-size: 26px;
                line-height: 1.5;
                border-bottom: 1px solid;
                color: color(craiola);
            }
        }

        &-image {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
            display: block;
        }

        &-item {
            background: #ccc;
            width: 100%;
            height: 490px;
            position: relative;
            margin-bottom: 30px;
            display: block;

            @include respond-to(md) {
                height: 400px;
            }
        }
    }
}

/deep/ .image-full-screen {
    width: 100vw;
    left: 50%;
    position: relative;
    margin-left: -50vw;
    max-width: 100vw;
}

.anim-button_gradient /deep/ .animButton .particles-button.animButton-btn {
    background: linear-gradient(90deg, #0052D4 0%, #4364F7 52.81%, #6FB1FC 97.54%), #FFFFFF;
    -webkit-transition: background 0.2s linear;
    -moz-transition: background 0.2s linear;
    -o-transition: background 0.2s linear;
    transition: background 0.2s linear;
    margin-top: 75px;

    &:hover {
        color: #ffffff;
        background-position: 360px;
        @include respond-to(md) {
            background-position: 310px;
        }
        @include respond-to(sm) {
            background-position: 217px;
        }
    }
}

.tour-item .block-after-price {
    margin-top: 75px;
    @include respond-to(md) {
        margin-top: 35px;
    }

    /deep/ h1:not(.heading):not(.page-header__title) {
        margin-top: 150px;
        @include respond-to(sm) {
            margin-top: 75px;
        }
    }
}

.tour-item[data-v-4127a8c6] h1:not(.heading):not(.page-header__title).location-title {
    margin-top: 75px;
    margin-bottom: 34px;
    @include respond-to(md) {
        margin-top: 60px;
        margin-bottom: 40px;
    }
}
</style>
