<template>
    <div class="contacts">
        <parallax :layers="layers" />
        <PageHeader class="header__padding"><span v-html="data.intro.bannerText"/></PageHeader>
        <div class="contacts__wrap">
            <div class="container contacts__info">
                <Heading tag="h2" color="white"><span v-html="data.intro.title"></span></Heading>
                <div v-for="(item, index) in data.contacts" :key="index" :class="'block-'+index">
                    <div v-if="item.showSocial" class="contacts__row">
                        <ContactUs v-animate-onscroll.repeat="'animated fadeInLeft'" style="animation-delay: 0.3s" :contactsData="item" :notShowContacts="true" classPage="text animated-trim"/>
                    </div>
                    <Heading v-if="!item.showSocial" tag="h2" color="lightBlue">{{ item.title }}</Heading>
                    <p v-animate-onscroll.repeat="'animated fadeInLeft'" style="animation-delay: 0.3s" v-if="item.smallText" class="text--small animated-trim" v-html="item.smallText"/>
                    <p v-animate-onscroll.repeat="'animated fadeInLeft'" style="animation-delay: 0.3s" v-if="item.text" class="text contacts__data animated-trim" v-html="item.text + (item.additionalText ? item.additionalText : '')"/>
                    <p v-animate-onscroll.repeat="'animated fadeInLeft'" style="animation-delay: 0.3s" class="text--small text--blue animated-trim" v-if="item.smallBlueText" v-html="item.smallBlueText"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Heading from '../components/content/heading';
import ContactUs from '../shared/layouts/ContactUs';
import {Api} from '../api/api';
import PageHeader from "../components/content/pageHeader";
import parallax from '../components/parallax/index';
// import VueAnimateOnScroll from "vue-animate-onscroll";
// import Vue from "vue";
Vue.use(VueAnimateOnScroll);

export default {
    name: 'contacts',
    components: {
        PageHeader,
        Heading,
        ContactUs,
        parallax
    },
    data() {
        return {
            layers: [
                {
                strength: .25,
                background: {
                    image: 'url("/parallax/contacts/1.png")'
                }
                },
                {
                strength: .5,
                background: {
                    image: 'url("/parallax/contacts/2.png")',
                    position: 'bottom 0 center'
                }
                },
                {
                strength: .66,
                background: {
                    image: 'url("/parallax/contacts/3.png")'
                }
                },
                {
                strength: .83,
                background: {
                    image: 'url("/parallax/contacts/4.png")'
                }
                }
            ]
        }
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
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`contacts?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                data:response.data.data
            }
        });
    },
    created() {
        let breadCrumbs = [{
            name: 'contactsPage.title'
        }];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};

</script>
<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
    .animated-trim{
        opacity: 0;
    }
    .contacts {
        background-image: url('~assets/img/contacts/bg-section.png');
        background-color: color(black);
        background-repeat: no-repeat;
        background-position: 100% 50%;
        background-size: contain;
    }


    .heading--color-lightBlue {
        margin-top: 80px;
        @include respond-to(md) {
            margin-top: 56px;
        }
    }

    .contacts__info {
        color: color(white);
        padding-top: 114px;
        padding-bottom: 120px;
        @include respond-to(lg) {
            padding-top: 50px;
        }
        @include respond-to(sm) {
            padding-bottom: 80px;
            padding-top: 40px;
        }
        /deep/.heading{
            line-height: 1.5;
            @include respond-to(md) {
                font-size: 30px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 26px;
            }

        }
        /deep/.contacts__data {
            p {
                line-height: 1.5;
                @include respond-to(sm) {
                    font-size: 22px;
                   line-height: 1.5;
                }
            }
        }
        &:first-child {
            margin-bottom: 0;
        }
        p {
            font-weight: 400;
            margin-top: 25px;
            line-height: 1.5;
            @include respond-to(lg) {
                margin-top: 14px;
            }
            @include respond-to(md) {
                font-size: 16px;
                line-height: 1.5;
                margin-top: 12px;
            }
            @include respond-to(sm) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
        /deep/ .contacts__data {
            margin-top: 50px;
            margin-bottom: 105px;
            @include respond-to(lg) {
                margin-top: 28px;
            }
            @include respond-to(md) {
                margin-top: 25px;
                margin-bottom: 50px;
            }
            & > p {
                margin-bottom: 20px;
                font-size: 40px;
                line-height: 1.5;
                @include respond-to(lg) {
                    font-size: 30px;
                    line-height: 1.5;
                }
                @include respond-to(md) {
                    font-size: 22px;
                    line-height: 1.5;
                    margin-bottom: 15px;
                }
            }

            a {
                color: #fff;
            }

            a[target=_blank] {
                color: color(blue);
                text-decoration: underline;
                white-space: nowrap;
                margin-top: .5em;
                margin-bottom: .5em;
                display: inline-block;
            }
        }
        /deep/.block-1 {
            .contacts__data{
                margin-top: 36px;
                margin-bottom: 100px;
                @include respond-to(lg) {
                    margin-top: 14px;
                }
                @include respond-to(md) {
                    margin-top: 5px;
                    margin-bottom: 50px;
                }
                @include respond-to(sm) {
                    margin-top: 25px;
                }
                p {
                    font-size: 32px;
                    line-height: 1.5;
                    @include respond-to(lg) {
                        font-size: 28px;
                        line-height: 1.5;
                    }
                    @include respond-to(md) {
                        font-size: 22px;
                        line-height: 1.5;
                    }
                    &:first-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
        /deep/.block-2 {
            p {
                margin-bottom: 40px;
                @include respond-to(lg) {
                    margin-bottom: 30px;
                }
                @include respond-to(sm) {
                    margin-bottom: 15px;
                }
            }
        }
    }

    /deep/ .contact-us__row {
        margin-top: 78px;
        font-size: 24px;
        align-items: flex-end;
        @include respond-to(md) {
            margin-top: 54px;
        }
        @include respond-to(sm) {
            display: block;
            margin-top: 50px;
        }

        a,
        a::before {
            color: color(blue);
        }
        // Если удалить весь блок .contact-us__icon иконки станут флетовыми
        .contact-us__icon {
            &::before {
                content: '';
                width: 55px;
                height: 55px;
                display: inline-flex;
                //color: #1DCFFF;
                //font-size: 30px;
                //font-weight: 400;
            }
            &.icon-telegram:before {
                background: url("~assets/img/menu/icons/telegram-color.svg") no-repeat;
                background-size: cover;
            }
            &.icon-whatsapp:before {
                transform: scale(0.85);
                background: url("~assets/img/menu/icons/whatsapp-color.svg") no-repeat;
                background-size: cover;
            }
        }
        /deep/.contact-us__btn {
            font-size: 40px;
            line-height: 1.5;
            margin-right: 1em;
            @include respond-to(lg) {
                font-size: 28px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 26px;
            }
            @include respond-to(sm) {
                font-size: 24px;
            }
        }
    }

    /deep/ .contact-us__icons {
        font-size: 2.33em;
        margin: 0;
        @include respond-to(lg) {
            font-size: 1.8em;
        }
        @include respond-to(sm) {
            display: block;
            margin-top: 30px;
            margin-bottom: 35px;
            font-size: 1.7em;
        }
        .contact-us__icon {
            margin: 0 0.4em;
            @include respond-to(sm) {
                margin: 0 0.7em 0 0;
            }
        }
    }

    .contacts__wrap {
        background: #0f121b;
        position: relative;
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

</style>
