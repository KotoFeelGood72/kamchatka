<template>
<client-only>
<div class="info-slikersl">
    <div class="container--ingoS--slider">
            <div v-if="data && data.length" class="info-slider">
        <div v-if="SCREEN.width <= 767 && SCREEN.height <= 1024" class="row">
            <div class="col-lg-6 info-slider__img-wrapper" ref="sliderright">
                <component
                    :is="slickComp"
                    :ref="'slick-img ' + sliderCountRef"
                    :class="'slider-thumbs ' + sliderCountRef"
                    :options="slickThumbsOptions"
                >
                    <div v-for="(thumb, index) in data" :key="'thumb-' + index">
                        <template v-if="thumb.video">
                            <div class="video-embed">
                                <a class="video-embed__link" @click.prevent="currentVideo(thumb.video)" href="#">
                                    <img-com :img="thumb.img" classImg="video-embed__img"/>
                                </a>
                            </div>
                            <!-- <videoEmbed isContainer="true" :url="thumb.video" :data="thumb.img"/> -->
                        </template>
                        <template v-else>
                            <img-com :img="thumb.img" classImg="info-slider__img"/>
                        </template>
                    </div>
                </component>
            </div>
            <div v-if="slickComp" class="col-lg-6 info-slider__content-wrapper" ref="slider">
                <div v-if="data && data.length > 1" class="info-slider__arrows info-slider__arrows_mobiler">
                    <button @click.prevent="changeSlide('prev')" class="arrow icon-arrow-left"/>
                    <button @click.prevent="changeSlide('next')" class="arrow icon-arrow-right"/>
                </div>

                <div class="info-slider__content__slider">
                    <component
                        :is="slickComp"
                        :ref="'slick-content ' + sliderCountRef"
                        :class="'slider-content ' + sliderCountRef"
                        :options="slickContentOptions"
                        @afterChange="handleAfterChange"
                    >
                        <div v-for="(slide, index) in data" :key="'slide-' + index">
                            <h3
                                class="info-slider__title"
                            >
                                <nuxt-link v-if="slide.slug"
                                           :to="$i18n.locale === 'en' ? '/' + url + slide.slug + '/' : url + slide.slug + '/'"
                                           v-html="titleSplit(slide.name)"
                                           style="border:none"
                                />
                                <a href="javascript:" style="pointer-events: none; border:none" v-html="titleSplit(slide.name)" v-else></a>
                            </h3>
                            <div
                                class="info-slider__content"
                                v-html="slide.text"
                            />
                        </div>
                    </component>

                    <div class="info-slider__counter info-slider__counter_mobiler" v-if="data && data.length > 1">
                        <span>{{ sliderCount | countSlides }}</span>
                        <span class="info-slider__counter-line"></span>
                        <span>{{ data.length | countSlides }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div v-if="slickComp" class="col-lg-6 info-slider__content-wrapper" ref="slider">
                <div class="info-slider__counter info-slider__counter_desctoper" v-if="data && data.length > 1">
                    <span>{{ sliderCount | countSlides }}</span>
                    <span class="info-slider__counter-line"></span>
                    <span>{{ data.length | countSlides }}</span>
                </div>

                <div class="info-slider__content__slider">
                    <component
                        :is="slickComp"
                        :ref="'slick-content ' + sliderCountRef"
                        :class="'slider-content ' + sliderCountRef"
                        :options="slickContentOptions"
                        @afterChange="handleAfterChange"
                    >
                        <div v-for="(slide, index) in data" :key="'slide-' + index">
                            <h3
                                class="info-slider__title"
                            >
                                <nuxt-link
                                    v-if="slide.slug || url !== undefined"
                                    :to="$i18n.locale === 'en' ?  url + slide.slug + '/' : url + slide.slug + '/'"
                                    v-html="titleSplit(slide.name)"
                                    style="border:none"
                                />
                                <a href="javascript:" style="pointer-events: none; border:none" v-html="titleSplit(slide.name)" v-else></a>
                            </h3>
                            <div
                                class="info-slider__content"
                                v-html="slide.text"
                            />
                        </div>
                    </component>

                    <div v-if="data && data.length > 1" class="info-slider__arrows info-slider__arrows_desctoper">
                        <button @click.prevent="changeSlide('prev')" class="arrow icon-arrow-left"/>
                        <button @click.prevent="changeSlide('next')" class="arrow icon-arrow-right"/>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 info-slider__img-wrapper" ref="sliderright">
                <component
                    :is="slickComp"
                    :ref="'slick-img ' + sliderCountRef"
                    :class="'slider-thumbs ' + sliderCountRef"
                    :options="slickThumbsOptions"
                >
                    <div v-for="(thumb, index) in data" :key="'thumb-' + index">
                        <template v-if="thumb.video">
                            <div class="video-embed">
                                <a class="video-embed__link" @click.prevent="currentVideo(thumb.video)" href="#">
                                    <img-com :img="thumb.img" classImg="video-embed__img"/>
                                </a>
                            </div>
                            <!-- <videoEmbed isContainer="true" :url="thumb.video" :data="thumb.img"/> -->
                        </template>
                        <template v-else>
                            <img-com :img="thumb.img" classImg="info-slider__img"/>
                        </template>
                    </div>
                </component>
            </div>
        </div>
        <Modal ref="modalVideo12" :videoLink="this.currentVideoEmbed"/>
    </div>
    </div>
</div>
</client-only>
</template>

<script>
    import VideoEmbed from "../content/videoEmbed";
    import {mapGetters} from 'vuex';

    export default {
        name: "infoSliderOutside",
        props: ["data", "url"],
        components: {
            VideoEmbed,
            // Modal,
            // Slick: () => import("vue-slick")
        },
        // mounted: function () {
        //     this.$nextTick(function () {
        //         this.slickComp = "Slick";
        //     });

        // },
        // created() {
        //     this.$store.dispatch("changeSliderCount");
        //     if(process.client) window.addEventListener("scroll", this.onScroll);
        //     this.currentVideoEmbed = this.data[0].video
        // },
        destroyed() {
            window.removeEventListener("scroll", this.onScroll);
        },
        computed: {
            ...mapGetters(['SCREEN']),
            // slickContentOptions() {
            //     return {
            //         rows: 0,
            //         slidesToShow: 1,
            //         asNavFor: ".slider-thumbs." + this.sliderCountRef,
            //         arrows: false
            //     };
            // },
            // slickThumbsOptions() {
            //     return {
            //         arrows: false,
            //         slidesToShow: 1,
            //         fade: false,
            //         rows: 0,
            //         asNavFor: ".slider-content." + this.sliderCountRef
            //     };
            // }
        },
        data() {
            return {
                // slickComp: false,
                // sliderCount: 1,
                // sliderCountRef: this.$store.getters.getSliderCount(),
                currentVideoEmbed: '',
                screen: this.$store.getters.SCREEN
            };
        },
        // filters: {
        //     countSlides: function (value) {
        //         if (!value) return "";
        //         return ("00" + value).slice(-2);
        //     }
        // },
        methods: {
            currentVideo(thumbVideo) {
                this.currentVideoEmbed = thumbVideo
                // console.log(this.currentVideoEmbed)
                this.$refs.modalVideo12.open()
            },
            // handleAfterChange(event, slick, currentSlide) {
            //     this.sliderCount = currentSlide + 1;
            // },
            // changeSlide(type) {
            //     this.$refs[`slick-content ${this.sliderCountRef}`][type]();
            //     return false;
            // },
            onScroll() {
                const rect = this.$refs.slider.getBoundingClientRect();
                if (rect.top - rect.height < 0) {
                    this.$refs.slider.classList.add("animated");
                    this.$refs.sliderright.classList.add("animated");
                }
            },
            titleSplit(title) {
                if (screen.width < 370 && title.length > 65) {
                    let split = title.slice(0, 65) + '...';
                    return split
                } else {
                    return title
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .info-slikersl{
        width:100vw;
        position: relative;
        left:calc(-1 * (100vw - 100%) / 2)
    }
    .video-embed {
        position: relative;
    }

    .video-embed {
        height: 100%;
        margin: 40px 0;

        img {
            height: 100%;
            object-fit: cover;
        }
    }

    .video-embed__link {
        display: block;
        position: relative;

        &::before {
            content: '\e908';
            font-family: 'icomoon';
            font-size: 35px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .1em;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: rgba(#FBFBFB, .2);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }


    .info-slider__content__slider {
        height: 85%;
        overflow: hidden;
    }

    .info-slider {
        overflow: hidden;
        height: 100vh;

        /deep/ .video-embed {
            margin: 0 !important;
        }

        @include respond-to(md) {
            height: auto;
            overflow: auto;
        }

        & > .row {
            height: 100%;
            margin-left: 0;
            margin-right: 0;
            min-height: 0;
            min-width: 0;
        }

        /deep/ img,
        /deep/ video {
            margin: 0;
        }
    }

    .info-slider__counter_mobiler {
        position: absolute;
        bottom: 50px;
        @media (max-height: 800px) {
            bottom: 30px;
        }
    }

    .info-slider__counter_desctoper {
        position: absolute;
        top: 1em;
    }

    .info-slider__counter {
        font-size: 50px;
        font-weight: 900;
        // position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // top: 1em;
        max-width: 300px;
        width: 100%;
        @include respond-to(lg) {
            max-width: 270px;
        }
        @include respond-to(md) {
            max-width: 240px;
        }

        &-line {
            display: inline-block;
            border-bottom: 0.07em solid;
            width: 120px;
        }

        span:first-child {
            display: inline-block;
            position: relative;
        }
    }

    .info-slider__content-wrapper {
        background-color: #21232a;
        color: #fff;
        padding: 120px 70px 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-height: 0;
        min-width: 0;
        height: 100%;

        /deep/ .slick-list {
            margin-left: -30px;
            margin-right: -30px;
        }

        /deep/ .slick-slide {
            padding-left: 30px;
            padding-right: 30px;
        }
    }

    .info-slider__img-wrapper {
        padding-left: 0;
        padding-right: 0;
        min-height: 0;
        min-width: 0;

        /deep/ .img__container,
        /deep/ .video-embed__link {
            height: 100%;
            @include respond-to(sm) {
                height: 100vw;
            }
        }

        .slick-slider {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }

        /deep/ .slick-list,
        /deep/ .slick-track {
            height: 100%;
        }
    }

    .info-slider__img-wrapper,
    .info-slider__content-wrapper {
        &.animated {
            transform: translate(0, 0) !important;
        }
    }

    /deep/ .slick-slide {
        outline: none;
    }

    .info-slider__img {
        display: block;
        width: 100% !important;
        height: 100%;
        object-fit: cover;
    }

    .info-slider__title {
        padding: 40px 0;
    }

    .info-slider__title,
    .info-slider__title a,
    .info-slider__title span {
        color: #fff;
        font-weight: 900;
        font-size: 60px;
        line-height: 75px;
        text-decoration: none;
    }

    .info-slider__title a,
    .info-slider__title span {
        border-bottom: 0.04em solid;
        outline: none;
    }

    .info-slider__content {
        font-size: 24px;
        line-height: 1.5;
        font-weight: 400;
        font-family: "Montserrat";
        color: white;

        /deep/ p {
            color: white !important;
            font-family: "Montserrat";
            font-weight: 400;
        }
    }

    .info-slider__arrows_mobiler {
        position: absolute;
        top: 1em;
        z-index: 1999;
    }

    .info-slider__arrows_desctoper {
        position: absolute;
        bottom: 50px;
        @media (max-height: 800px) {
            bottom: 30px;
        }
    }

    .info-slider__arrows {
        display: flex;
        // position: absolute;
        // bottom: 50px;
        // @media (max-height: 800px) {
        //   bottom: 30px;
        // }

        .arrow {
            background: none;
            border: none;
            color: #fff;
            font-size: 70px;
            cursor: pointer;
            transition: color 0.2s;
            margin-top: 1em;
            outline: none;
            @include respond-to(sm) {
                margin-top: 5px;
            }

            &:hover {
                color: color(lightBlue);
            }
            &::-moz-focus-inner {
                border: 0;
            }
        }

        .icon-arrow-left {
            margin-right: 2.5em;
            background-image: url("~assets/img/menu/icons/strelki/l-w.png");
            display: inline-block;
            vertical-align: text-top;
            background-repeat: no-repeat;
            background-size: contain;
            width: 70px;
            height: 70px;

            &::before {
                content: "";
            }

            &:hover {
                background-image: url("~assets/img/menu/icons/strelki/l-b.png");
                background-position: 0 -1px;
            }
        }

        .icon-arrow-right {
            background-image: url("~assets/img/menu/icons/strelki/r-w.png");
            display: inline-block;
            vertical-align: text-top;
            background-repeat: no-repeat;
            background-size: contain;
            width: 70px;
            height: 70px;

            &::before {
                content: "";
            }

            &:hover {
                background-image: url("~assets/img/menu/icons/strelki/r-b.png");
                background-position: 0;
            }
        }
    }

    @include respond-to(lg) {
        .info-slider__counter {
            font-size: 40px;
        }
        .info-slider__content-wrapper {
            padding-left: 15px;
            padding-right: 15px;
        }
        .info-slider__title,
        .info-slider__title a,
        .info-slider__title span {
            font-size: 50px;
        }
        .info-slider__content {
            font-size: 20px;
            line-height: 1.5;
        }
        .info-slider__arrows .arrow {
            font-size: 50px;
            width: 50px;
            height: 50px;
        }
    }

    @include respond-to(md) {
        .info-slider__content-wrapper {
            height: 43vh;
        }
        .info-slider__arrows {
            bottom: 30px;
        }
        .info-slider__img-wrapper {
            height: 57vh;
        }
        .info-slider__title {
            padding-bottom: 20px;
            padding-top: 0;
        }
        .info-slider__content__slider {
            height: 100%;
        }
        .info-slider__content-wrapper {
            // padding-top: 65px;
            padding: 65px 0;
        }
        .info-slider__title,
        .info-slider__title a,
        .info-slider__title span {
            font-weight: bold;
            font-size: 30px;
            line-height: 110%;
        }
        .info-slider__content {
            font-size: 16px;
            line-height: 1.5;
        }
        .info-slider__arrows .arrow {
            font-size: 40px;
            width: 40px;
            height: 40px;
        }
        .info-slider__counter {
            font-size: 30px;
        }
    }

    @include respond-to(sm) {
        .info-slider__content-wrapper,
        .info-slider__img-wrapper {
            height: 50vh;
        }
        .info-slider__arrows .arrow {
            font-size: 30px;
            width: 30px;
            height: 30px;
        }
        .info-slider__content {
            font-size: 14px;
            line-height: 1.5;
        }
        .info-slider__title {
            font-size: 26px;
            line-height: 110%;
        }
    }
</style>
