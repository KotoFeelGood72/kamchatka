<template>
    <section v-if="loaded" class="home-section section-about-us">
        <div id="homeAboutUs" class="about-us section-grid">
            <div v-if="upcoming" class="about-us__tours section-grid__item section-grid__item--bg">
                <img-com :img="upcoming.img"/>
                <div class="section-grid__title">
                    <nuxt-link :to="'/create-tour/'" v-html="$t('tours.createTour')"/>
                </div>
            </div>
            <div class="about-us__faq section-grid__item" ref="faq">
                <div class="section-grid__link-wrapper">
                    <svg width="295" height="124" viewBox="0 0 295 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d)">
                            <path d="M2.29125 117H22.9313V71.08H60.5313V53.32H22.9313V21.16H67.5713V3.39999H2.29125V117ZM67.78 117H88.9L98.5 87.88H138.34L148.1 117H169.22L129.38 3.39999H107.62L67.78 117ZM103.62 71.08L113.86 40.68C115.78 34.28 118.34 23.08 118.34 23.08H118.66C118.66 23.08 121.22 34.28 123.14 40.68L133.22 71.08H103.62ZM174.946 59.56C174.946 92.68 199.266 118.92 233.666 118.92C246.946 118.92 258.786 114.92 268.386 107.72L280.866 120.2L292.706 107.08L279.906 95.56C287.586 85.64 292.386 73.32 292.386 59.56C292.386 26.92 268.066 1.47999 233.666 1.47999C199.426 1.47999 174.946 26.92 174.946 59.56ZM196.226 59.56C196.226 37.16 212.226 20.36 233.666 20.36C254.946 20.36 271.106 37.16 271.106 59.56C271.106 67.56 268.866 75.24 264.866 81.48L252.546 69.16L240.866 82.12L253.506 93.96C248.066 97.96 240.706 100.04 233.666 100.04C212.226 100.04 196.226 82.44 196.226 59.56Z" fill="#43495C"/>
                        </g>
                        <defs>
                            <filter id="filter0_d" x="0.29126" y="0.47998" width="294.415" height="122.72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                            </filter>
                        </defs>
                    </svg>

                    <nuxt-link :to="$i18n.locale === 'en' ? '/faq/' : '/faq/'"/>
                </div>
            </div>
            <div class="about-us__blog section-grid__item section-grid__item--bg">
                <img src="~assets/img/home/blog-bg.svg" alt="">
                <div class="section-grid__content">
                  <nuxt-link :to="$i18n.locale === 'en' ? blogContentAdmin.link : blogContentAdmin.link"><h2 class="section-grid__title" v-html="blogContentAdmin.title"/></nuxt-link>
                    <div class="blog-entries section_heading__new_blog--hover">
                        <ul class="blog-entries__list">
                            <li v-for="(entry, index) in data" :key="'entry-' + index">
                                <nuxt-link :to="$i18n.locale === 'en' ? '/blog/' + entry.slug + '/' : '/blog/' + entry.slug + '/'" v-html="entry.name"> </nuxt-link>
                            </li>
                        </ul>
                        <nuxt-link class="blog-entries__all" :to="$i18n.locale === 'en' ? blogContentAdmin.link : blogContentAdmin.link" v-html="blogContentAdmin.linkText"/>
                    </div>
                </div>
            </div>
            <div class="about-us__contacts section-grid__item" ref="contacts">
                <div class="section-grid__title section-grid__title--sm">
                    <nuxt-link :to="$i18n.locale === 'en' ? + ourContacted.link : ourContacted.link" v-html="ourContacted.title"/>
                </div>
            </div>
            <div class="about-us__application section-grid__item">
                <img src="~assets/img/home/Enjoy.svg" alt="">
                <div class="section-grid__link-wrapper">
                    <a @click.prevent="changeOpenFeedback" href="" v-html="applicationText.title"/>
                </div>
            </div>
            <div v-if="about" class="about-us__we section-grid__item section-grid__item--bg">
                <img-com :img="about.img"/>
                <div class="section-grid__title">
                    <nuxt-link :to="$i18n.locale === 'en' ? about.link : about.link" v-html="about.title"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ImgCom from "../components/img/imgCom";
import {Api} from "../api/api";
export default {
    name: 'AboutUsHome',
    components: {ImgCom},
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
            data: null,
            blocks: null,
            loaded: false,
            upcoming: '',
            about: '',
            ourContacted:'',
            blogContentAdmin:'',
            applicationText:''
        }
    },
    methods: {
        changeOpenFeedback() {
            this.$store.dispatch('changeIsShowFeedback', !this.$store.getters['getIsShowFeedback']());
        },
        highlight() {
            const boundary = window.innerHeight / 2;
            highlight(this.$refs.faq);
            highlight(this.$refs.contacts);
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
                if(response.status === 200) {
                    this.blocks = response.data.data.blocks
                    this.loaded = true;
                }
            })
        },
        asyncBlog() {
            const lang = this.currentRouteName === 'ru' ? 'ru' : 'en';
            Api.get(`mainBlog?lang=${lang}&router=${this.currentRoutePath}`)
                .then((response) => {
                    if(response.status === 200) {
                        this.data = response.data.data.blog
                        this.loaded = true;
                    }
                })
        },
    },
    mounted() {
        this.asyncBlocks();
        this.asyncBlog();
    },
    destroyed() {
        window.removeEventListener('scroll', this.highlight)
    },
    created() {
        if(process.client) {
            window.addEventListener('scroll', this.highlight)
        }
    },
    watch: {
        'blocks'() {
            this.blocks.map((item) => {
                if (item.code === 'about-us') {
                    this.about = item;
                }
                if (item.code === 'upcoming-tours') {
                    this.upcoming = item;
                }
                  if (item.code === 'small_bottom'){
                this.ourContacted = item
            }
            if (item.code === 'blog'){
                this.blogContentAdmin = item
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


    .about-us__tours {
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        @include respond-to(sm) {
            padding: 25px;
        }
        /deep/.section-grid__title {
            @include respond-to(md) {
                font-size: 30px;
                margin-top: 0;
                max-width: 150px;
            }
            @include respond-to(sm) {
                line-height: 28px;
            }
        }
    }


    .about-us__faq {
        background-color:#1C1E24;
        /deep/svg {
            width: 200px;
        }
    }

    .about-us__blog {
        background-color: #163E97;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: left;
        @include respond-to(md) {
            justify-content: center;
            align-items: center;
            font-size: 50px;
        }
        .section-grid__title {
            @include respond-to(md) {
                font-size: 50px;
                margin: 0;
            }
        }
    }

    .about-us__contacts {
        background-color:#1C1E24;
        a {
            font-weight: 900;
            color: color(marengo);
        }
    }

    .about-us__application {
        font-size: 24px;
        background-color: #FF604C;
        @include respond-to(md) {
            font-size: 16px;
        }
        @include respond-to(sm) {
            justify-content: space-between;
        }
        img {
            display: block;
            width: 100%;
            max-height: 70%;
            height: 70%;
            margin-bottom: 30px;
            object-fit: contain;
            @include respond-to(md) {
                margin-top: 16px;
                margin-bottom: 40px;
            }
            @include respond-to(sm) {
                width: 170px;
                margin: 10px 0 0ß 0;
            }
        }
        a {
            color: #FF8D71;
            text-decoration: none;
            border-bottom: .07em solid;
            font-weight: 600;
        }
    }

    .about-us__we {
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.4);
            z-index: 1;
        }
        @include respond-to(md) {
            align-items: flex-start;
            justify-content: flex-start;
            padding: 50px 8%;
        }
        @include respond-to(sm) {
            align-items: flex-start;
            justify-content: flex-start;
            padding: 25px 8%;
        }
        .section-grid__title {
            @include respond-to(md) {
                font-size: 30px;
                margin-top: 0;
            }
        }
    }


    .blog-entries {
        font-size: 24px;
        @media screen and (max-width: 1500px) {
            font-size: 20px;
        }
        @include respond-to(lg) {
            font-size: 20px;
        }
        @include respond-to(md) {
            display: none;
        }
        a {
            color: #fff;
            border-bottom: 1px solid;
        }
    }

    .blog-entries__list {
        list-style-type: none;
        margin-top: 4vh;
        margin-bottom: 5.5vh;
        li {
            margin-bottom: 2vh;
        }
    }

</style>
