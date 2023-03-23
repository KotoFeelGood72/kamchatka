<template>
    <footer class="home-section home-footer">
        <div class="home-footer__overlay active">
<!--            <img class="home-footer__overlay-img" src="@/assets/img/home/footer-bg.jpg" alt="">-->
        </div>
        <div class="container home-footer__content">
            <div class="row home-footer__row home-footer__row_first">
                <div class="col-md-4 mobile-hide"></div>
                <div class="col-md-4 d-none d-md-block">
                    <TimeZone/>
                </div>
                <div class="col-md-4">
                    <img @click="$emit('clickLogo')" class="home-footer__logo" src="@/assets/img/logo.svg" alt="">
                </div>
            </div>
            <div class="home-footer__row">
                <ContactUs :contactsData="contacts ? contacts.data.contacts[0]  : ''" :notShowContacts="false"/>
            </div>
            <div class="row home-footer__row home-footer__mdadaptive">
                <div class="col-md-8 home-footer__copyright" v-html="$t('footer.copyright')"/>
                <div class="col-md-6 home-footer__socials">
                <a href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=105762" target="_blank" class="rt-block rt-block--light none-link">
                    <RussianGerb width="40px" height="40px"/>
                    <div class="rt-block__content"><div class="rt-block__title">Мы в реестре туроператоров</div> <div class="rt-block__desc">ООО « Инджой Камчатка » РТО 018714</div></div>
                </a>
                    <Socials/>
                </div>
                <div class="home-footer__development">
                    <p><a href="https://www.artlebedev.ru/enjoy-kamchatka/" v-html="$t('footer.artLebedev')"/></p>
                    <p><a href="https://digital-lab.ru/project/kamchatka/" v-html="$t('footer.firm')"/></p>
                </div>
            </div>
        </div>

    </footer>
</template>

<script>
import TimeZone from '../shared/layouts/TimeZone';
import FooterMenu from '../shared/layouts/FooterMenu';
import ContactUs from '../shared/layouts/ContactUs';
import Socials from '../shared/layouts/Socials';
import RussianGerb from '../shared/layouts/RussianGerb.vue'
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
    name: 'HomeFooter',
    components: {
        TimeZone,
        Socials,
        ContactUs,
        FooterMenu,
        RussianGerb
    },
    computed: {
        ...mapState(['contacts'])
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .none-link {
        pointer-events: none;
    }

    .home-footer {
        position: relative;
        padding-top: 60px;
        padding-bottom: 60px;
        overflow: hidden;
        min-height: calc(100vh - 100px);

        & > .container {
            position: relative;
        }
    }


    .home-footer__content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
        color: #fff;
    }
    .home-footer__mdadaptive{
        @include respond-to(md) {
            flex-direction: column;
            align-items: stretch!important;
            margin-top:150px;
        }
         @include respond-to(sm) {
            margin-top:0px;
        }

    }
    .home-footer__row {
        align-items: center;
        &_first {
            @include respond-to-min(md) {
                .d-md-block {
                    justify-content: center;
                    display: flex!important;
                    order: 3;
                }
            }
            @include respond-to(md) {
                align-items: flex-end;
                .mobile-hide {
                    display: none;
                }
            }
        }
    }

    .home-footer__copyright {
        font-size: 12px;
        font-weight: 300;
        margin-bottom: 30px;
          @include respond-to(md) {
              order:2;
          }
    }
    .home-footer__development {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 15px;
        margin-top: 60px;
        @include respond-to(md) {
            order: 5;
        }
        @include respond-to(sm) {
            flex-direction: column;
            margin-top: 0;
        }
        p {
            font-size: 12px;
            line-height: 13px;
            @include respond-to(sm) {
                margin-top: 10px;
            }
            a {
                color: inherit;
            }
        }
    }

    .home-footer__socials {
        flex: 0 0 60%;
        max-width: 90%;
          @include respond-to(md) {
              order:1;
          }
    }

    @keyframes changewidth {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(1.6);
        }
    }

    .home-footer__overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url("~@/assets/img/home/footer-bgtest.jpg") 100% 100%;
        transition: all 60s ease-in;
        transform-origin: right center;
        background-size: cover;
        &.active {
            transform: scale(1.6);
            animation-duration: 60s;
            animation-name: changewidth;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }
    }

    .home-footer__overlay img {
        object-fit: cover;
        transition: all 100s;
        &.active {
            transform: scale(1.3);
        }
    }

    .home-footer__logo {
        display: block;
        margin: 20px auto;
        width: 180px;
        max-width: 180px;
        height: 140px;
        max-height: 140px;
        cursor: pointer;
    }

    .footer-menu {
        margin-top: 15px;
    }

    /deep/ .footer-menu__item {
        a {
            color: #fff;
        }
    }

    .contact-us {
        padding: 40px 0;
        @media(max-height: 770px) {
            padding: 20px 0;
        }
    }

    @include respond-to(lg) {
        .timezone {
            font-size: 25px;
        }
    }

    @include respond-to(md) {
        .timezone {
            font-size: 20px;
        }
    }
    /deep/.contact-us__list {
        a, p {
            font-size: 30px;
            font-weight: 500;
            @include respond-to(lg) {
                font-size: 20px;
            }
        }
    }
</style>
