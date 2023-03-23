<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="block block-1">
                    <div class="logo">
                        <nuxt-link to="/">
                            <img src="~assets/img/logo.svg" alt="">
                        </nuxt-link>
                    </div>
                    <div class="timezone">
                        <TimeZone/>
                    </div>
                </div>
                <div class="block block-2">
                    <div class="title" v-html="$t('footer.sectionsTitle')"></div>
                    <FooterMenu/>
                </div>
                <div class="block block-3">
                    <div class="title" v-html="$t('footer.navSix')"></div>
                    <ContactUs :contactsData="contacts ? contacts.data.contacts[0]  : ''" :notShowContacts="false"/>
                </div>
                <div class="block block-4">
                    <Socials class="footer__socials"/>
                </div>
                <div class="block block-5">
                    <a href="https://tourism.gov.ru/reestry/reestr-turoperatorov/show.php?id=105762" target="_blank" class="rt-block rt-block--light none-link"><RussianGerb width="40px" height="40px"/> <div class="rt-block__content"><div class="rt-block__title">Мы в реестре туроператоров</div> <div class="rt-block__desc">ООО « Инджой Камчатка » РТО 018714</div></div></a>
                    <p v-html="$t('footer.copyrightRouting')"/>
                </div>
                <div class="block block-6">
                    <p><a href="https://www.artlebedev.ru/enjoy-kamchatka/" v-html="$t('footer.artLebedev')"/></p>
                    <p><a href="https://digital-lab.ru/project/kamchatka/" v-html="$t('footer.firm')"/></p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
import TimeZone from '../../shared/layouts/TimeZone';
import ContactUs from '../../shared/layouts/ContactUs';
import Socials from '../../shared/layouts/Socials';
import FooterMenu from '../../shared/layouts/FooterMenu';
import RussianGerb from '../../shared/layouts/RussianGerb.vue';
import {Api} from "../../api/api";
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
    name: 'baseFooter',
    components: {
        TimeZone,
        ContactUs,
        FooterMenu,
        Socials,
        RussianGerb,
    },
    data() {
        return {
            contactsData: ''
        }
    },
    computed: {
        ...mapState(['contacts'])
    }
};
</script>
<style lang="scss" scoped>
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";

    /* footer */

    .none-link {
        pointer-events: none;
    }

    footer{
        position: relative;
        background-color: color(black);
        padding: 90px 0 77px;
        color: color(marengo);
        overflow: hidden;

        /deep/.container {
            /*padding: 0 20px;*/


            .row {
                justify-content: space-between;
                margin: 0;
                @include respond-to(sm) {
                    margin: 0 10px;
                }
            }
            .logo {
                margin-top: 20px;
                @include respond-to(md) {
                    margin-top: 0;
                    margin-right: 40px;
                }
                @include respond-to(sm) {
                    margin-right: 0px;
                }
                img {
                    width: 120px;
                    @include respond-to(lg) {
                        width: 160px;
                    }
                    @include respond-to(md) {
                        width: 100px;
                    }
                }
            }
            .timezone {
                @include respond-to(sm) {
                    display: none;
                }
                &__title {
                    color: color(marengo);
                    font-weight: 600;
                    font-size: 26px;
                    line-height: 26px;
                    margin-top: 52px;
                    @include respond-to(lg) {
                        font-size: 22px;
                        line-height: 24px;
                        margin-top: 118px;
                    }
                    @include respond-to(md) {
                        font-size: 20px;
                        line-height: 22px;
                        margin-top: 0px;
                    }
                }
                &__time {
                    font-size: 50px;
                    line-height: 60px;
                    display: flex;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    margin-top: 8px;
                    @include respond-to(lg) {
                        font-size: 40px;
                        line-height: 44px;
                    }
                    @include respond-to(md) {
                        font-size: 30px;
                        line-height: 32px;
                    }

                }
            }
            .block {
                .title {
                    font-weight: 900;
                    font-size: 20px;
                    line-height: 24px;
                    text-transform: uppercase;
                    font-family: "Mpluse1p";
                    padding-top: 16px;
                    @include respond-to(md) {
                        font-size: 18px;
                    }
                }
            }
            .block-1 {
                @include respond-to(md) {
                    order: 3;
                    display: flex;
                    width: 100%;
                    justify-content: flex-end;
                    padding-right: 100px;
                }
                @include respond-to(sm) {
                    order: 2;
                    flex-direction: column;
                    padding-right: 0;
                    display: inline-flex;
                    width: 100px;
                    justify-content: flex-start;
                    margin-top: 18px;
                    margin-right: 16px;
                }
            }
            .block-2 {
                @include respond-to(md) {
                    order: 1;
                    width: 50%;
                }
                .footer-menu {
                    flex-direction: column;
                    margin-top: 25px;
                    @include respond-to(lg) {
                        margin-top: 17px;
                    }
                    @include respond-to(md) {
                        margin-top: 0px;
                    }
                    &__item {
                        margin-top: 21px;
                        @include respond-to(md) {
                            margin-top: 28px;
                        }
                        a {
                            font-weight: 600;
                            font-size: 26px;
                            line-height: 31px;
                            text-transform: inherit;
                            padding: 0 25px;
                            color: #ffffff;
                            @include respond-to(md) {
                                font-size: 20px;
                                line-height: 24px;
                            }
                            @include respond-to(sm) {
                                font-size: 18px;
                                line-height: 20px;
                            }
                            &:hover {
                                color: color(lightblue);
                            }
                        }
                    }
                }
            }
            .block-3 {
                position: relative;
                @include respond-to(md) {
                    order: 2;
                    width: 50%;
                }
                @include respond-to(sm) {
                    order: 3;
                    margin-top: 40px;
                    width: 55%;
                }
                .contact-us__row {
                  @include respond-to(sm) {
                    flex-wrap: wrap;
                  }
                }
                .contact-us__btn {
                    font-weight: 600;
                    font-size: 26px;
                    line-height: 26px;
                    margin-top: 47px;
                    color: color(lightBlue);
                    @include respond-to(lg) {
                        margin-top: 42px;
                    }
                    @include respond-to(md) {
                        font-size: 20px;
                        line-height: 20px;
                        margin-top: 35px;
                    }
                    @include respond-to(sm) {
                        margin-top: 32px;
                    }
                }
                .contact-us__list {
                    margin-top: 20px;
                    @include respond-to(md) {
                        margin-top: 30px;
                    }
                    @include respond-to(sm) {
                        margin-top: 20px;
                    }
                    li {
                        margin-bottom: 8px;
                        @include respond-to(md) {
                           margin-bottom: 20px;
                        }
                        @include respond-to(sm) {
                            margin-bottom: 10px;
                        }
                        a {
                            font-weight: 600;
                            font-size: 26px;
                            line-height: 31px;
                            @include respond-to(md) {
                                font-size: 20px;
                                line-height: 20px;
                            }
                            @include respond-to(sm) {
                                font-size: 18px;
                                line-height: 20px;
                            }
                        }
                    }
                }
                .contact-us__icons {
                    position: absolute;
                    top: 210px;
                    @include respond-to(md) {
                        top: 200px;
                    }
                    @include respond-to(sm) {
                        position: relative;
                        top: 0;
                        left: 0;
                    }
                    .contact-us__icon{
                        margin-right: 1em;
                        margin-left: 0;
                    }
                }
            }
            .block-4 {
                @include respond-to(md) {
                    order: 5;
                    margin-top: 100px;
                }
                @include respond-to(sm) {
                    order: 4;
                    width: 100%;
                    margin-top: 46px;
                }
                .social-icons {
                    display: flex;
                    font-size: 60px;
                    margin: 0;
                    flex-direction: column;
                    @include respond-to(md) {
                        display: flex;
                        flex-direction: row;
                        margin: 0 10px 0 0;
                    }
                    @include respond-to(sm) {
                        margin: 0;
                        justify-content: space-between;
                    }
                    .icon-youtube,
                    .icon-new-york-times {
                        @include respond-to(lg) {
                            width: 60px;
                            height: 60px;
                        }
                        @include respond-to(sm) {
                            width: 45px;
                            height: 45px;
                        }
                    }
                }
                .social-icons__item {
                    margin: 18px 0;
                    @include respond-to(lg) {
                        display: flex;
                        flex-direction: column;
                        margin: 0 0 37px 0;
                    }
                    @include respond-to(md) {
                        display: flex;
                        flex-direction: column;
                        margin: 0 16px;
                    }
                    @include respond-to(sm) {
                        margin: 0
                    }

                    &:hover {
                        &:before {
                            color: color(blue);
                        }
                    }
                    &:before {
                        color: color(marengo);
                        font-size: 60px;
                        @include respond-to(sm) {
                            font-size: 45px;
                        }
                    }
                }
            }
            .block-5 {
                width: 100%;
                margin-top: 80px;
                @include respond-to(lg) {
                    margin-top: -40px;
                    z-index: 0;
                }
                @include respond-to(md) {
                    order: 4;
                    width: auto;
                    margin-top: 100px;
                    max-width: 162px;
                }
                @include respond-to(sm) {
                    order: 5;
                    margin-top: 50px;
                    max-width: 100%;
                }
                p {
                    font-size: 12px;
                    line-height: 13px;
                }
            }
            .block-6 {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 40px;
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
        }

    }


</style>
