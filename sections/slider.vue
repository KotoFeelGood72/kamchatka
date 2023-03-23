<template>
    <section  class="home-section active">
        <InfoSlider v-if="data.length" :data="data" :url="'/activities/'"/>
    </section>
</template>

<script>
import InfoSlider from '../components/infoSlider/infoSlider.vue';

export default {
    name: 'HomeSlider',
    props: ['data'],
    components: {
        InfoSlider
    }
};
</script>
<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .home-section {
        background: #171920;
        /deep/.info-slider {
            &__content-wrapper {
                transform: translate(-100%, 0);
                transition: 0.6s;
                @include respond-to(lg) {
                    padding: 0 50px;
                }
                @include respond-to(md) {
                    // height: 42vh;
                    height: 384px;
                }
                @include respond-to(sm) {
                    padding: 0 25px;
                    height: 384px;
                }
                .slick-slide {
                    @include respond-to(sm) {
                        padding: 0;
                    }
                }
                .slick-list {
                    @include respond-to(sm) {
                        margin: 0;
                    }
                }
            }
            &__img-wrapper {
                transform: translate(100%, 0);
                transition: 0.6s;
                @include respond-to(md) {
                    height: 58vh;
                }
                @media screen and (max-device-width:414px) and (max-device-height:900px){
                     height: 44vh;
                }
                @media screen and (max-device-width:414px) and (max-device-height:720px){
                     height: 54vh;
                }

            }
            &__counter {
                max-width: 315px;
                @include respond-to(lg) {
                    max-width: 255px;
                }
                @include respond-to(md) {
                    top: 27px;
                    max-width: 245px;
                }
                @include respond-to(sm) {
                     top:initial;
                    bottom: 30px;
                }
            }
            &__title {
                padding-top: 130px;
                max-width: 600px;
                @include respond-to(custom) {
                    line-height: 42px;
                    padding-top: 40px;
                    padding-bottom: 20px;
                }
                @include respond-to(lg) {
                    line-height: 42px;
                    padding-top: 180px;
                    padding-bottom: 20px;
                }
                @include respond-to(md) {
                    max-width: 470px;
                    padding-top: 88px;
                }
                @include respond-to(md) {
                    font-size: 26px;
                    line-height: 29px;
                    padding-top: 100px;
                    padding-bottom: 15px;
                }
                a {
                    font-size: 70px;
                    line-height: 77px;
                    @include respond-to(custom) {
                        font-size: 60px;
                    }
                    @include respond-to(lg) {
                        font-size: 40px;
                        line-height: 44px;
                    }
                    @include respond-to(md) {
                        font-size: 30px;
                        line-height: 33px;
                    }
                    @include respond-to(md) {
                        font-size: 26px;
                        line-height: 29px;
                    }
                }
            }
            &__content {
                max-width: 600px;
                margin-top: 5px;
                line-height: 1.5;
                @include respond-to(lg) {
                    max-width: 450px;
                    margin-top: 7px;
                    line-height: 1.5;
                    font-size: 16px;
                }
                @include respond-to(md) {
                    margin-top: 0px;
                    max-width: 650px
                }
                @include respond-to(sm) {
                    font-size: 14px;
                    line-height: 1.5;
                }
            }
            &__arrows {
                bottom: 75px;
                @include respond-to(lg) {
                    bottom: 100px;
                }
                @include respond-to(md) {
                    bottom: 35px;
                }
                @include respond-to(sm) {
                   bottom:initial;
                   top: 15px;
                }

                .arrow {
                    @include respond-to(lg) {
                        width: 60px;
                        height: 60px;
                    }
                    @include respond-to(sm) {
                        width: 30px;
                        height: 30px;
                    }
                    &.icon-arrow-left {
                        margin-right: 1.8em;
                        @include respond-to(md) {
                            margin-right: 2.5em;
                        }
                        @include respond-to(sm) {
                            margin-right: 2em;
                        }
                    }
                }
            }
        }
        &.active {
            /deep/.info-slider {
                .info-slider__content-wrapper {
                    // transform: translate(0, 0);
                }
                .info-slider__img-wrapper {
                    // transform: translate(0, 0);
                }
            }
        }
    }
</style>
