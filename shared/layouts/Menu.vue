<template>
    <div class="asd">
        <div v-if="menuStatus" class="menu-shadow"/>
        <div class="burger_btn" @click="menuButton">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="header__menu" :class="{'active': menuStatus}">
            <transition name="base-header">
                <div v-on-clickaway="clearFocus" class="header__menu-container" v-if="menuStatus">
                    <p class="header__menu-item" v-for="(item, index) in menu" :key="'menu-' + index">
                        <nuxt-link :to="localePath(item.link) + '/'" v-html="$t(item.name)"/>
                    </p>
                    <lang class="lang-menu"/>
                    <ContactUs :contactsData="contacts ? contacts.data.contacts[0]  : ''" :menuContacts="true" :notShowContacts="false"/>
                    <Socials classPage="header__menu-socials"/>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import ContactUs from "./ContactUs";
    import Socials from "./Socials";
    import SearchModal from "../../components/search/searchModal";
    import {mixin as clickaway} from "vue-clickaway";
    import Lang from "./lang";
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        name: "Menu",
        mixins: [clickaway],
        components: {Lang, SearchModal, Socials, ContactUs},
        data() {
            return {
                menuStatus: false,
                isShowSearch: false,
                isMobile: false,
                socials: [
                    {
                        icon: "facebook",
                        url: "#"
                    },
                    {
                        icon: "instagram",
                        url: "#"
                    },
                    {
                        icon: "youtube",
                        url: "#"
                    },
                    {
                        icon: "tripadvisor",
                        url: "#"
                    }
                ],
                menu: [
                    {
                        name: "footer.navOne",
                        link: "/tours/"
                    },
                    {
                        name: "footer.navTwo",
                        link: "/activities/"
                    },
                    {
                        name: "footer.navThree",
                        link: "/about/"
                    },
                    {
                        name: "footer.navFour",
                        link: "/faq/"
                    },
                    {
                        name: "footer.navFive",
                        link: "/blog/"
                    },
                    {
                        name: "footer.navSix",
                        link: "/contacts/"
                    }
                ]
            };
        },
        mounted() {
            document
                .getElementsByTagName("body")[0]
                .classList.remove("t-body_scroll-locked_menu");
            this.isMobileWidth();
            window.onresize = () => {
                this.isMobileWidth();
            };
        },
        watch: {
            $route() {
                if (this.menuStatus) {
                    this.menuButton(false, true);
                }
            }
        },
        computed: {
            ...mapState(['contacts'])
        },
        methods: {
            clearFocus(ev) {
                if (!this.isShowSearch) {
                    ev.preventDefault();
                    this.menuButton(false, true);
                    return false;
                }
            },
            isMobileWidth() {
                if (window.innerWidth < 769) {
                    this.isMobile = true;
                } else {
                    this.isMobile = false;
                }
            },
            menuButton(event, isNotShow) {
                document
                    .querySelector(".burger_btn")
                    .classList.toggle("open");
                this.menuStatus = isNotShow ? !isNotShow : !this.menuStatus;
                if (!this.menuStatus) {
                } else {
                }
                this.$emit("showMenu");
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";

    .menu-shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1998;
    }

    .header__menu {
        position: fixed;
        top: 0;
        right: 0;
        opacity: 0;
        max-width: 576px;
        width: 100%;
        height: 100%;
        z-index: 1999;
        transition: all 0.5s ease-in-out;
        transform: translate(100%);
        background: #171920;
        &.active {
            position: fixed;
            opacity: 1;
            transform: translateX(0);
            background: #171920;
        }
        /deep/.contact-us__icon {
            margin-left: 0;
            margin-right: 1.6em;
        }
    }

    .panel-btn {
        position: relative;
        width: 50px;
        height: 40px;
        cursor: pointer;
        z-index: 2001;
        -webkit-tap-highlight-color: transparent;
        transition: all .5s ease;
    }

    .burger_btn {
        position: relative;
        width: 50px;
        height: 50px;
				cursor: pointer;

				&.open {
					z-index: 2000;
					&:hover {
						span {
							border-color: $light-blue;
						}
					}
					span {
						max-width: 100%!important;
						&:nth-child(1) {
							transform: rotate(45deg);
							top: 41%;
							left: 2%;
						}
						&:nth-child(3) {
							transform: rotate(-45deg);
							bottom: 42%;
						}
						&:nth-child(2) {
							opacity: 0;
							visibility: hidden;
						}
					}
				}
				@include respond-to(sm) {
					width: 40px;
					height: 35px;
				}

				&:hover {
					span {
						&:nth-child(1), &:nth-child(2) {
							max-width: 100%;
						}
						&:nth-child(3) {
							max-width: 70%;
						}
					}
				}

        span {
            width: 100%;
            border-bottom: 8px solid $white;
            display: block;
            position: absolute;
            left: 0;
						box-shadow: 2px 2px rgba(23, 25, 32, 0.4);
						transition: all .4s ease;
						max-width: 100%;
						@include respond-to(sm) {
							border-width: 6px;
						}

            &:nth-child(1) {
							top: 0;
							max-width: 95%;
            }
            &:nth-child(2) {
							top: 50%;
							transform: translateY(-50%);
							max-width: 60%;
            }
            &:nth-child(3) {
							bottom: 0;
            }
        }
    }

    .header__menu-container {
        background: #21232a;
        overflow-y: auto;
        background: url("~assets/img/menu/menuBg.png") no-repeat;
        background-size: cover;
        padding: 70px 70px 30px 70px;
        height: 100%;
        @include respond-to(lg) {
            padding: 30px 60px;
        }
        @include respond-to(sm) {
            padding: 20px 30px;
        }
    }

    .header__menu-icons {
        display: flex;
        justify-content: space-between;
        height: 45px;
        align-items: center;
        margin-bottom: 60px;
        @include respond-to(lg) {
            margin-bottom: 30px;
        }

        svg {
            path {
                stroke: white;
            }

            &:hover {
                path {
                    stroke: #1dcfff;
                }

                rect {
                    fill: #1dcfff;
                }
            }
        }
    }

    .header__menu-item {
        margin-bottom: 25px;

        .nuxt-link-exact-active {
            color: #1dcfff;
        }

        a {
            text-decoration: none;
            color: white;
            font-size: 30px;
            line-height: 36px;
            font-weight: bold;

            &:hover {
                color: #1dcfff;
            }
        }

        &:last-child {
            margin-bottom: 50px;
            @include respond-to(lg) {
                margin-bottom: 20px;
            }
        }

        @include respond-to(lg) {
            margin-bottom: 25px;
        }
    }

    /deep/ .social-icons__item {
        margin: 0;
    }
    /deep/.contact-us {
        a {
            color: #1DCFFF;
            font-size: 24px;
            line-height: 29px;
            font-weight: 500;
            @include respond-to(sm) {
                font-size: 22px;
            }
        }
        .contact-us__icon {
            &::before {
                content: '';
                width: 40px;
                height: 40px;
                display: inline-flex;
                opacity: 0.85;
                transition: 0.3s;
            }
            &.icon-telegram:before {
                background: url("~assets/img/menu/icons/telegram-color.svg") no-repeat;
                background-size: cover;
            }
            &.icon-whatsapp:before {
                background: url("~assets/img/menu/icons/whatsapp-color.svg") no-repeat;
                transform: scale(0.85);
                background-size: cover;
            }
            &:hover {
                &:before {
                    opacity: 1;
                }
            }
        }

    }
</style>
