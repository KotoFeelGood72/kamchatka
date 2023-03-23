<template>
    <section id="upcoming-tours" class="upcoming-tours">
        <parallax :layers="layers">
        <PageHeader v-if="data && data.intro && data.intro.bannerImage" ><span v-html="data.intro.bannerText"/></PageHeader>
        </parallax>

        <div class="container">
            <InfoSlider v-if="data && data.tours" url="/tours/" :data="data.tours"/>

        </div>
    </section>
</template>

<script>
import InfoSlider from '../components/infoSlider/infoSlider.vue';
import {Api} from '../api/api';
import PageHeader from "../components/content/pageHeader";
import parallax from '../components/parallax/index';

export default {
    name: 'upcomingTours',
    components: {
        PageHeader,
        InfoSlider,
        parallax
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
            data: [],
            seo: '',
             layers: [
                {
                strength: .25,
                background: {
                    image: 'url("/parallax/upcomingtours/1.png")',
                }
                },
                {
                strength: .5,
                background: {
                    image: 'url("/parallax/upcomingtours/2.png")'
                }
                },
                {
                strength: .66,
                background: {
                    image: 'url("/parallax/upcomingtours/3.png")'
                }
                },
                {
                strength: .77,
                background: {
                    image: 'url("/parallax/upcomingtours/4.png")'
                }
                },
                {
                strength: .91,
                background: {
                    image: 'url("/parallax/upcomingtours/5.png")'
                }
                }
            ]
        };
    },
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`upcoming-tours?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                data:response.data.data
            }
        });
    },
    created() {
        let breadCrumbs = [{
            name: 'upcoming-tours.title'
        }];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};

</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .upcoming-tours {
        background-color: #000;
        overflow-x: hidden;
        .page-header {
            position: relative;
        }
        /deep/.page-header {
            &__title {
                font-size: 80px;
                line-height: 1.5;
                @include respond-to(lg) {
                    font-size: 60px;
                    line-height: 1.5;
                }
                @include respond-to(md) {
                    font-size: 40px;
                    line-height: 1.5;
                }
            }
        }
        /deep/.info-slider {
            max-height: 900px;
            height:900px;
            min-height:300px;
            @include respond-to(lg) {
                max-height: 640px;
            }
            @include respond-to(md) {
                max-height: initial;
                position: relative;
                overflow: inherit;
            }
            &:before {
                content: '';
                background: color(grayBlue);
                position: absolute;
                left: 0;
                height: 900px;
                width: 900px;
                display: block;
                @include respond-to(lg) {
                    height: 640px;
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
                height: 100%;
                max-height: 900px;
                background: #000;
                @include respond-to(lg) {
                    height: 640px;
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
                .img__container img{
                    object-fit: contain;
                }
            }
            .info-slider__content-wrapper {
                padding-left: 0;
                @include respond-to(md) {
                    height: 384px;
                }
                .info-slider__counter {
                    font-size: 50px;
                    line-height: 1.5;
                    top: 35px;
                    @include respond-to(lg) {
                        font-size: 40px;
                        line-height: 1.5;
                        top: 45px
                    }
                    @include respond-to(md) {
                        font-size: 30px;
                        line-height: 1.5;
                        top: 25px
                    }
                    @include respond-to(sm) {
                        top:initial;
                        bottom:20px;
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
                        font-size: 40px;
                        line-height: 1.5;
                        border-bottom: 0;
                        display: inline-flex;
                        @include respond-to(lg) {
                            font-size: 30px;
                            line-height: 1.5;
                        }
                        @include respond-to(md) {
                            font-size: 26px;
                            line-height: 1.5;
                        }
                        @include respond-to(sm) {
                            font-size: 20px;
                            line-height: 1.5;
                        }
                    }
                }
                .info-slider__content {
                    font-size: 22px;
                    line-height: 1.5;
                    margin-top: 15px;
                    max-width: 600px;
                    display: -webkit-box;
                    -webkit-line-clamp: 15;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    @include respond-to(lg) {
                        font-size: 18px;
                        line-height: 1.5;
                        max-width: 430px;
                        -webkit-line-clamp: 10;
                    }
                    @include respond-to(md) {
                        font-size: 16px;
                        line-height: 1.5;
                        max-width: 650px;
                        margin-top: 6px;
                        -webkit-line-clamp: 6;
                    }
                    @include respond-to(sm) {
                        font-size: 14px;
                        line-height: 1.5;
                        max-width: 100%;
                        margin-top: 10px;
                    }
                    @include respond-to(xs) {
                         display: -webkit-box;
                        -webkit-line-clamp: 7;
                        -webkit-box-orient: vertical;
                        overflow: hidden;

                    }
                }
                .info-slider__arrows {
                    bottom: 30px;
                    @include respond-to(sm) {
                        bottom:initial;
                        top: 15px
                    }
                    .icon-arrow-left {
                        background-image: url("~assets/img/menu/icons/strelki/l-w.png");
                        display: inline-block;
                        vertical-align: text-top;
                        background-repeat: no-repeat;
                        background-size: contain;
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
                    .icon-arrow-right {
                        background-image: url("~assets/img/menu/icons/strelki/r-w.png");
                        display: inline-block;
                        vertical-align: text-top;
                        background-repeat: no-repeat;
                        background-size: contain;
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
        &__container{
            padding: 0;
        }
        &__headline{
            padding: 260px 0;
            @include respond-to(lg) {
                padding: 150px 0;
            }
            @include respond-to(sm) {
                padding: 200px 0;
            }
            @include respond-to(xs) {
                padding: 0;
                height: 350px;
            }

        }
        &__title{
            @include respond-to(xs) {
                padding-top: 140px;
            }
        }
        &__slider {
            background-color: #21232A;

        }
    }

</style>
