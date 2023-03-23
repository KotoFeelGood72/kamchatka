<template>
    <header id="headerHome" class="header-home home-section">
        <div class="section-grid">
            <div class="header-home__tours section-grid__item">
                <video class="logoVideo" playsinline autoplay muted>
                    <source src="~/assets/video/logo.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                    <source src="~/assets/video/logo.webm" type='video/webm; codecs="vp8, vorbis"'>
                </video>
                <div class="section-grid__link-wrapper">
                    <nuxt-link :to="$i18n.locale === 'en' ? tours.link : tours.link" v-html="tours.title"/>
                </div>
            </div>
            <div class="header-home__time section-grid__item">
                <div class="section-grid__title section-grid__title--sm">
                    <TimeZone/>
                </div>
            </div>
            <div class="header-home__video section-grid__item section-grid__item--bg">
                <img-com v-if="data" :img="data.img"/>
                <a href="#" class="play-video" @click.prevent="$refs.modalVideo.open()"/>
            </div>
            <div class="header-home__contacts section-grid__item">
                <div class="section-grid__title section-grid__title--sm">
                    <nuxt-link :to="$i18n.locale === 'en' ? ourContacts.link : ourContacts.link" v-html="ourContacts.title" ref="contacts" />
                </div>
            </div>
            <div class="header-home__application section-grid__item">
                <img src="~assets/img/home/Enjoy.svg" alt="">
                <div class="section-grid__link-wrapper">
                    <a @click.prevent="changeOpenFeedback" href="" v-html="applicationText.title"/>
                </div>
            </div>
            <div class="header-home__activity section-grid__item section-grid__item--bg">
                <img-com v-if="activities" :img="activities.img"/>
                <div class="section-grid__title">
                    <nuxt-link :to="$i18n.locale === 'en' ? activities.link : activities.link" v-html="activities.title"/>
                </div>
            </div>
        </div>

        <Modal v-if="data" ref="modalVideo" :videoLink="data.url"/>
    </header>
</template>

<script>
import TimeZone from '../shared/layouts/TimeZone';
import Modal from '../components/modal/modal';
import Menu from '../shared/layouts/Menu';
import {Api} from "../api/api";

export default {
    name: 'HomeHeader',
    props: ['data'],
    components: {
        Menu,
        TimeZone,
        Modal
    },
    computed: {
        currentRouteName() {
            return this.$store.$i18n.loadedLanguages[0];
        },
        currentRoutePath() {
            return this.$route.path;
        }
    },
    data() {
        return {
            tours: '',
            activities: '',
            ourContacts:'',
            applicationText:'',
            dataBlocks: null,
        }
    },
    methods: {
        showMenuFunc() {
            this.$emit('showMenu');
        },
        changeOpenFeedback() {
            this.$store.dispatch('changeIsShowFeedback', !this.$store.getters['getIsShowFeedback']());
        },
        highlight() {
            const boundary = window.innerHeight / 2;
            highlight(this.$refs.contacts.$el);
            function highlight($el) {
                const rect = $el.getBoundingClientRect();
                const delta = (rect.top + rect.height / 2) / boundary
                $el.classList.remove('hover');
                if (window.matchMedia("(max-width: 1024px)").matches) {
                    if (delta < 1.3 && delta > 0.7) {
                        $el.classList.add('hover');
                    }
                }
            }
        },
        asyncBlocks() {
            const lang = this.currentRouteName === 'ru' ? 'ru' : 'en';
            Api.get(`mainBlocks?lang=${lang}&router=${this.currentRoutePath}`)
              .then((response) => {
                  this.dataBlocks = response.data.data.blocks
              })
         }
    },
    destroyed() {
        window.removeEventListener('scroll', this.highlight)
    },
    mounted(){
        if(navigator.platform.match('Mac') !== null) {
            document.querySelector('.header-home__tours').style.backgroundColor = '#004eac'
            }
        this.asyncBlocks()
    },
    created() {
        if(process.client) {
            window.addEventListener('scroll', this.highlight)
        }
        // this.blocks.map((item) => {
        //     if (item.code === 'tours') {
        //         this.tours = item;
        //     }
        //     if (item.code === 'activities') {
        //         this.activities = item;
        //     }
        //     if(item.code === 'small_top') {
        //         this.ourContacts = item
        //     }
        //      if(item.code === 'application'){
        //         this.applicationText = item
        //     }
        //
        // })
    },
    watch: {
        'dataBlocks'(newValue, oldValue) {
            newValue.map((item) => {
                if (item.code === 'tours') {
                    this.tours = item;
                }
                if (item.code === 'activities') {
                    this.activities = item;
                }
                 if(item.code === 'small_top') {
                this.ourContacts = item
            }
             if(item.code === 'application'){
                this.applicationText = item
            }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .header-home {
        /deep/.header__menu-burger {
            top: 50px;
        }
        video {
            max-width: 555px;
            @include respond-to(lg) {
                max-width: 360px;
            }
            @include respond-to(md) {
                max-width: 262px;
                margin-top: 13px;
            }
            @include respond-to(sm) {
                max-width: 232px;
            }
        }
    }

    .section_heading__new--hover {
        a{
            -webkit-transition: all 10ms ease-in-out;
            -moz-transition: all 10ms ease-in-out;
            -o-transition: all 10ms ease-in-out;
            transition: all 10ms ease-in-out;

            &:hover{
                color:#0091FF;
                -webkit-transition: all 10ms ease-in-out;
                -moz-transition: all 10ms ease-in-out;
                -o-transition: all 10ms ease-in-out;
                transition: all 10ms ease-in-out;
            }
        }
    }

    .header-home__tours, .header-home__application {
        font-size: 24px;
        img {
            display: block;
            width: 100%;
            max-height: 70%;
            height: 70%;
            margin-bottom: 30px;
            object-fit: contain;
        }
        a {
            text-decoration: none;
            border-bottom: .07em solid;
            font-weight: 600;
        }
    }

    .header-home__tours {
        background-color: #0045a0;
        @include respond-to(lg) {
            font-size: 18px;
        }
        @include respond-to(sm) {
            justify-content: space-between;
            background-color: #0045a0;
        }
        a {
            color: color(lightBlue);
        }
        .section-grid__link-wrapper {
            margin-top: 60px;
            @include respond-to(lg) {
                margin-top: 40px;
            }
            @include respond-to(md) {
                margin-top: 15px;
                font-size: 16px;
            }
            @include respond-to(sm) {
                margin-top: 0px;
            }
        }
    }

    .play-video {
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255,255,255,.14);
        display: block;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        border-radius: 50%;
        text-decoration: none;
        z-index: 9;
        &::before {
            content: '\e908';
            font-family: 'icomoon';
            font-size: 35px;
            padding-left: .1em;
        }
    }

    .header-home__activity {
        align-items: center;
        justify-content: flex-start;
        .section-grid__title {
            @include respond-to(sm) {
                margin: 12px 0 0 0;
            }
        }
        a {
            text-align: center;
        }
    }

    .header-home__time {
        background-color: color(grayBlue);
        align-items: flex-start;
        text-align: left;
        @include respond-to(lg) {
            font-size: 30px;
        }
        @include respond-to(md) {
            align-items: center;
        }
        @include respond-to(sm) {
            align-items: center;
            min-height: 240px;
            padding: 0;
        }
        .section-grid__title {
            @include respond-to(sm) {
                margin: 28px 0 0 0;
            }
        }
        .timezone {
            font-size: inherit;
        }

        /deep/ .timezone__title {
            color: color(marengo);
            font-size: 28px;
            line-height: 28px;
            @include respond-to(md) {
                font-size: 32px;
                line-height: 32px;
            }
        }
        /deep/ .timezone__time {
            @include respond-to(md) {
                font-size: 70px;
            }
        }
    }

    .header-home__contacts {
        // background-color: color(grayBlue);
        background-color:#1C1E24;
        @include respond-to(lg) {
            font-size: 30px;
        }
        a {
            font-weight: 900;
            color: color(marengo);
            text-decoration: none;
            &:hover, &.hover {
                color: #1DCFFF;
            }
        }
    }

    .header-home__application {
        @include respond-to(lg) {
            font-size: 18px;
        }
        @include respond-to(sm) {
            justify-content: space-between;
        }
            background-color: #FF604C;
        a {
            color: #FF8D71;
            &:hover {
                color: #FBFBFB;
            }
        }
        img {
            @include respond-to(md) {
                max-width: 250px;
            }
            @include respond-to(sm) {
                max-width: 174px;
            }
        }
    }





</style>
