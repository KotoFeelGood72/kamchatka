<template>
    <div class="social-icons" :class="classPage">
        <a v-for="(item, index) in socials" :key="'social-' + index"
           class="social-icons__item"
           target="_blank"
           rel="nofollow"
           :href="item.url"
           :title="$t('footer.' + [item.titleKey])"
           :class="'icon-' + item.icon"/>
    </div>
</template>
<script>
export default {
    name: 'Socials',
    props: ['classPage'],
    data() {
        return {
            socials: [
                {
                    icon: 'facebook',
                    titleKey: 'facebook',
                    url: 'https://www.facebook.com/enjoykamchatka/',
                },
                {
                    icon: 'instagram',
                    titleKey: 'instagram',
                    url: 'https://www.instagram.com/enjoykamchatka/',
                },
                {
                    icon: 'youtube',
                    titleKey: 'youtube',
                    url: 'https://www.youtube.com/channel/UCiCctSojN47lZ-O2_bAeSpw/featured',
                },
                {
                    icon: 'tripadvisor',
                    titleKey: 'tripadvisor',
                    url: 'https://www.tripadvisor.ru/Attraction_Review-g298492-d13277122-Reviews-Enjoy_Kamchatka-Petropavlovsk_Kamchatsky_Kamchatka_Krai_Far_Eastern_District.html',
                },
                {
                    icon: 'new-york-times',
                    titleKey: 'newYorkTimes',
                    url: 'https://www.nytimes.com/2019/10/07/travel/russia-kamchatka-bears-volcanoes.html',
                }
            ]
        };
    },
};
</script>

<style lang="scss">
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";

    .social-icons {
        font-size: 60px;
        margin: 42px 0 20px;
        display: flex;
        justify-content: space-between;
        max-width: 436px;
        @include respond-to(lg) {
            max-width: 354px;
        }
        @include respond-to(md) {
            max-width: 285px;
        }


        /*.icon-youtube {
            display: inline-block;
            background-image: url('~assets/img/menu/icons/youtube.svg');
            vertical-align: text-top;
            background-repeat: no-repeat;
            background-size: cover;
            width: 60px;
            height: 60px;
            &:before {
                content: '';
            }

            &:hover {
                background-image: url('~assets/img/menu/icons/hover_svg/youtube.svg');
            }
        }*/
        .icon-new-york-times {
            display: inline-block;
            background-image: url('~assets/img/menu/icons/new-york-times.svg');
            background-repeat: no-repeat;
            background-size: cover;
            width: 60px;
            height: 60px;
            &:before {
                content: '';
            }
            &:hover {
                background-image: url('~assets/img/menu/icons/hover_svg/new-york-times.svg');
            }
        }
    }
    .social-icons__item {
        text-decoration: none;
        color: #fff;
        vertical-align: middle;
        margin: 0;
        position: relative;

       /* &.icon-youtube {
            background-image: url('~assets/img/menu/icons/youtube.svg');
            &:hover {
                background-image: url('~assets/img/menu/icons/hover_svg/youtube.svg');
            }
        }*/
    }
    /*.home-footer__row {
        .social-icons__item {
            &.icon-youtube {
                background-image: url('~assets/img/menu/icons/youtube-white.svg');
            }
        }
    }*/

    @include respond-to(lg) {
        .social-icons {
            font-size: 45px;

            .icon-youtube,
            .icon-new-york-times {
                 width: 45px;
                 height: 45px;
             }
        }

    }

    @include respond-to(md) {
        .social-icons {
            font-size: 35px;

            .icon-youtube,
            .icon-new-york-times {
                width: 35px;
                height: 35px;
            }
        }
    }

    .header__menu-socials {
        margin-top: 50px;
        .social-icons__item {
            color: #43495C;
            &:hover {
                color: #1DCFFF;
            }
        }
    }

</style>
