<template>
    <header class="header header-anim-hidden" :class="{'header-fixed': isFixed, 'header--transparent': isTransparent, 'black': headerBlack}">
        <div class="container">
					<div class="header_main">
							<div class="header__logo">
									<nuxt-link v-if="$route.path !== '/' && $route.path !== '/en/'" :to="localePath('/')">
											<img src="~assets/img/header/logo.svg" alt/>
									</nuxt-link>
									<span @click="clickLogo" v-else>
											<img src="~assets/img/header/logo.svg" alt/>
									</span>
							</div>
							<div class="header-center">
									<ul class="header-menu">
											<li class="header__menu-item" v-for="(item, index) in menu" :key="'menu-' + index">
													<nuxt-link :to="localePath(item.link) + '/'" v-html="$t(item.name)"/>
											</li>
									</ul>
									<a class="feedback-button" href="" @click.prevent="changeOpenFeedback">
											{{$t("feedback.button")}}
									</a>
							</div>
							<lang class="lang-header"/>
							<Menu/>
					</div>
        </div>
    </header>
</template>
<script>
    import Menu from "./Menu";
    import Lang from "./lang";

    export default {
        name: "baseHeader",
        data() {
            return {
                isTransparent: false,
                screen: this.$store.getters.SCREEN,
                menu: [
                    { name: "footer.navOne", link: "/tours/" },
                    { name: "footer.navTwo", link: "/activities/" },
                    { name: "footer.navThree", link: "/about/" },
                    { name: "footer.navFour", link: "/faq/" },
                    { name: "footer.navFive", link: "/blog/" },
                    { name: "footer.navSix", link: "/contacts/" }
                ]
						}
        },
        watch: {
            thisIsTransparent(val) {
                this.isTransparent = val;
            },
        },
        computed: {
            thisIsTransparent() {
                return this.$store.getters["getIsTransparent"]();
            }
        },
        props: ["isFixed", "headerBlack"],
        components: {Lang, Menu},
        methods: {
            changeOpenFeedback() {
                this.$store.dispatch(
                    "changeIsShowFeedback",
                    !this.$store.getters["getIsShowFeedback"]()
                );
            },
            clickLogo() {
                window.scrollTo(0, 0);
            },
            checkIsTransparent() {
                let path = this.$route.path;
                let isTransparent =
                    path.startsWith("/activities") ||
                    path.startsWith("/activity") ||
                    path.startsWith("/blog") ||
                    path.startsWith("/faq") ||
                    path.startsWith("/about") ||
                    path.startsWith("/contacts") ||
                    path.endsWith("/tours/") ||
                    path.endsWith("/activities/") ||
                    path.endsWith("/upcoming-tours/") ||
                    path.endsWith("/en") ||
                    path === "/";
                this.$store.dispatch("changeIsTransparent", isTransparent);
                this.isTransparent = isTransparent;
            }
        },
        mounted() {
            this.checkIsTransparent();
            function headerHiddens() {
                let headerAnimationHidden = document.querySelector('.header-anim-hidden');
                let prevScroll = window.scrollY;

                window.addEventListener('scroll', () => {
                    let currentScroll = window.scrollY;
                    let headerHidden = headerAnimationHidden.className.includes('header_hidden');

                    if (currentScroll == 0 && headerHidden) {
                        headerAnimationHidden.classList.remove('header_hidden');
                    }
                    if (currentScroll > prevScroll && !headerHidden && currentScroll > 100) {
                        headerAnimationHidden.classList.add('header_hidden');
                    }
                    if (currentScroll < prevScroll && headerHidden) {
                        headerAnimationHidden.classList.remove('header_hidden');
                    }
                    prevScroll = currentScroll;
                });
            }

            headerHiddens();
        }
    };
</script>
<style lang="scss" scoped>
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";

    .header {
        transition: all .3s ease;
				.container {
					@include respond-to(sm) {
						padding: 0 10px;
					}
				}
        .header__logo {
            margin-right: 60px;
						max-width: 76px;
						@include respond-to(sm) {
							margin-right: 10px;
							max-width: 60px
						}
						span {
							@include flex-center;
						}
        }
    }
    .header-center, .header-menu {
			@include flex-start;
      margin-right: 40px;
			flex-grow: 1;
			@include respond-to(xlg) {
				justify-content: flex-end;
			}
			@include respond-to(sm) {
				margin-right: 10px;
			}
    }
		.header-menu {
			@include respond-to(xlg) {
					display: none;
			}
		}

    .header__menu-item {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-right: 30px;
        }

        a {
					color: white;
					text-shadow: 2px 2px rgba(23, 25, 32, 0.4);
					font-size: 30px;
					transition: all 0.5s ease;
					font-weight: bold;
					&:hover, &.nuxt-link-exact-active {
							color: $light-blue;
					}
        }
    }

    .header {
        height: $header_height;
				@include flex-center;
        position: relative !important;
        @include respond-to(sm) {
						height: $header_mobile_height;
        }
				&.header_hidden {
						transform: translateY(-100%);
				}
				&.header--transparent {
						background: transparent;
				}
				&.header-fixed {
						position: fixed!important;
						top: 0;
						left: 0;
						width: 100%;
						z-index: 1999;
				}
        &.black {
            background-color: rgba(23, 25, 32, 0.8);
        }
    }


    .feedback-button {
        font-size: 17px;
        border-radius: 140px;
        padding: 16px 40px;
        font-weight: 900;
        background: $light-blue;
        color: $white;
        transition: all .3s ease;
				@include respond-to(sm) {
					font-size: 12px;
					padding: 8px 12px;
				}
        &:hover {
            background: $red;
            color: $white;
        }
    }


		.header_main {
			@include flex-space;
			width: 100%;
		}
</style>
