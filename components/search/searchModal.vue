<template>
    <div v-if="isShow" class="search-modal">
        <div class="search-modal__bg">
            <nuxt-img loading="lazy" format="webp" quality="75" src="~@/assets/img/search/close.png" alt="" v-on:click="toggleSearch" />
            <div class="search-modal__container">
                <div class="search-modal__wrap" :class="{'is-data': searchCount}">
                    <div class="search-modal__wrap-container">
                        <input v-debounce:300="searchQuery" v-model="searchWord" type="text" :placeholder="$t('search.search')">
                        <div v-if="searchCount" class="search-modal__data">
                            <div class="search-modal__scroll">
                                <div class="search__element" v-for="(elem,id) in searchData" :key="'search' + id">
                                    <nuxt-link class="search__element-name" :to="$i18n.locale === 'en' ?  href(elem) : href(elem)">{{ elem.name }}</nuxt-link>
                                    <p class="search__element-text" v-html="elem.text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Api} from '../../api/api';
// import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';
// import './scrollBarSearch.scss';
export default {
    name: 'searchModal',
    data() {
        return {
            searchWord: '',
            searchCount: 0,
            searchData: [],
            isHideElements: false,
            isShow: 'false',
            searchEntityCode: {blog: '/blog', activities: '/activities', tours: '/tours', locations: '/locations', faq:'/faq', protected_areas: '/faq/protected-areas/', how_to_dress: '/faq/how-to-dress/', safety_tips: '/faq/safety-tips/', where_to_stay: '/faq/where-to-stay/', how_to_get: '/faq/how-to-get/', entry_rules: '/faq/entry-rules/'}
        };
    },
    watch: {
        '$route'(to, from) {
            this.$emit('toggleSearch', '', true);
        }
    },
    created() {
        document.getElementsByTagName('body')[0].classList.add('t-body_scroll-locked_menu');
    },
    destroyed() {

            document.getElementsByTagName('body')[0].classList.remove('t-body_scroll-locked_menu');

    },
    mounted() {
        window.addEventListener('resize', this.handleResize);

    },
    methods: {
        handleResize() {
            if (document.documentElement.clientWidth < 769) {
                this.isHideElements = true;
            }
        },
        href(elem) {
            if(elem.slug){
                 return this.searchEntityCode[elem.type] + '/' + elem.slug + '/';
            }
            else{
                 return this.searchEntityCode[elem.type];
            }

        },
        toggleSearch: function() {
            this.$emit('toggleSearch');
        },
        searchQuery() {
            if (this.searchWord.length < 3) {
                this.searchData = [];
                this.searchCount = 0;
                return false;
            }
            Api.getBase(`search/?q=${this.searchWord}&count=16&lang=${this.$i18n.locale}&router=${this.$route.path}`).then(response => {
                let searchData = response.data;
                if (searchData) {
                    this.searchData = searchData.items.filter((item) => {
                        return item.type !== 'clients' && item.type !== 'team' && item.type !== null;
                    });
                    this.searchCount = this.searchData.length;
                } else {
                    this.searchData = [];
                    this.searchCount = 0;
                }
            }).catch(() => {
                console.log(`Запрос /api/v1/search/?q=${this.searchWord} упал `);
            });
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";
    ::-webkit-scrollbar {
        width: 3px;
        height: 0
    }
    ::-webkit-scrollbar-track {
        height: 1px
    }
    ::-webkit-scrollbar-thumb {
        background: #1DCFFF;
        border-radius: 10px;
    }
    .search-modal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        overflow: hidden;
        background: #2A2E39;
        z-index: 1999;
        height: 100%;
        padding: 25px;
        &__bg {
            background: url("~assets/img/search/searchBg.png") no-repeat;
            background-size: cover;
            position: absolute;
            left: 25px;
            right: 25px;
            top: 25px;
            bottom: 25px;
        }
        &__data {
            height: 100%;
            max-height: 430px;
            padding-right: 20px;
            padding-top: 30px;
            @media (max-width: 320px) {
                max-height: 360px;
            }
            @media (min-width: 375px) and (min-height: 800px) and (max-height: 830px) {
                max-height: 600px;
            }
            @media (max-height: 800px) and (min-width: 1280px) {
                max-height: 310px;
            }
            @media (max-height: 500px) {
                max-height: 135px;
            }
            @media (min-height: 376px) and (max-height: 380px) and (max-width: 830px) {
                max-height: 200px;
            }
            @media (max-width: 500px) and (min-width: 376px){
                padding-top: 29px;
                max-height: 520px;
            }
            @media (max-width: 500px) and (max-height: 700px) {
                padding-top: 29px;
                max-height: 330px;
            }
            @media (max-width: 320px) and (max-height: 600px) {
                max-height: 300px;
            }
            @media (min-height: 900px) and (max-width: 1280px) {
                max-height: 600px;
            }
            @media (min-height: 768px) and (min-width: 500px) and (max-width: 1440px){
                max-height: 350px;
                padding-top: 48px;
            }
            @media (min-height: 1024px) and (max-width: 768px) {
                max-height: 740px;
                padding-top: 40px;
            }
            @media (min-height: 1024px) and (min-width: 1366px) {
                max-height: 610px;
            }
            @media (min-height: 1024px) and (max-width: 1280px) {
                max-height: 760px;
                padding-top: 60px;
            }
            @media (min-height: 1278px) and (min-width: 767px) {
                max-height: 1080px;
                padding-right: 60px;
            }
            @media (min-width: 1600px) {
                max-height: 470px;
            }
        }
        .search-modal__container {
            width: 100%;
            margin: 0 auto;
            position: relative;
            .search-modal__wrap {
                margin-top: 265px;
                @media (max-width: 768px) {
                    margin-top: 242px;
                }
                @media (max-width: 1280px) {
                    margin-top: 142px;
                    padding: 0 40px;
                }
                @media (min-width: 1024px) {
                    padding: 0 111px 0 111px;
                }
                @media (max-height: 500px) and (max-width: 830px) {
                    margin-top: 100px;
                }
                @media (max-height: 375px) and (max-width: 830px) {
                    margin-top: 60px;
                }
                @media (max-width: 500px) {
                    margin-top: 113px;
                    padding: 0 15px;
                }
                &.is-data {
                    font-family: 'Montserrat';
                    overflow: scroll;
                }
                &-container {
                    max-width: 1140px;
                    margin: 0 auto;
                }
                .search-modal__after-input {
                    display: flex;
                    justify-content: space-between;
                    .search-modal__empty {
                        font-size: 16px;
                        line-height: 1.5;
                        text-align: right;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        color: #FEFEFE;
                        opacity: 0.6;
                        @include respond-to(sm) {
                            font-size: 12px;
                        }
                    }
                }
                .search__element {
                    margin-top: 40px;
                    &:first-child {
                        margin-top: 0
                    }
                    @include respond-to(sm) {
                        margin-bottom: 20px;
                    }
                    .search__element-name {
                        font-weight: normal;
                        font-size: 30px;
                        line-height: 1.5;
                        display: block;
                        margin-bottom: 10px;
                        color: #fbfbfb;
                        @media (max-width: 768px) {
                            font-size: 24px;
                            line-height: 1.5;
                        }
                        @media (max-width: 500px) {
                            font-size: 18px;
                            line-height: 1.5;
                        }
                        &:hover {
                            color: #1DCFFF;
                        }
                    }
                    .search__element-text {
                        font-weight: normal;
                        font-size: 22px;
                        line-height: 1.5;
                        color: #fbfbfb;
                        @media (max-width: 1280px) {
                            font-size: 20px;
                            line-height: 1.5;
                        }
                        @media (max-width: 768px) {
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        @media (max-width: 500px) {
                            font-size: 15px;
                            line-height: 1.5;
                        }

                    }
                }
            }
        }
        input {
            width: 100%;
            border: none;
            border-bottom: 1px solid #1DCFFF;
            outline: none;
            background: transparent;
            font-family: 'Mpluse1p', sans-serif;
            font-weight: 400;
            font-size: 50px;
            line-height: 1.5;
            color: #fbfbfb;
            @media (max-width: 1279px) {
                font-size: 30px;
                line-height: 1.5;
            }
            @media (max-width: 768px) {
                font-size: 24px;
            }
            @media (max-width: 500px) {
                font-size: 18px;
                line-height: 1.5;
            }
            &::placeholder {
                color: #43495C;
            }
        }
        img {
            position: absolute;
            width: 40px;
            height: 40px;
            top: 30px;
            right: 50px;
            cursor: pointer;
            z-index: 2;
            @include respond-to(sm) {
                top: 20px;
                width: 20px;
                height: 20px;
                right: 20px;
            }
        }
    }
</style>
