<template>
    <ul v-if="menuItems.length" class="footer-menu">
        <li class="footer-menu__item" v-for="(item, index) in menuItems" :key="'menu-item-' + index"><nuxt-link :to="`${localePath(item.link)}/`" v-html="$t(item.name)"/></li>
    </ul>
</template>
<script>
export default {
    name: 'FooterMenu',
    data() {
        return {
            menuItems: [
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
    }
};
</script>

<style lang="scss">
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";

    .footer-menu {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        margin-left: -25px;
        margin-right: -25px;
    }

    .footer-menu__item {
        a {
            display: block;
            padding: .5em 25px;
            text-transform: uppercase;
            text-decoration: none;
            font-weight: 900;
            color: color(marengo);
            -webkit-transition: all .6s ease-in-out;
            -moz-transition: all .6s ease-in-out;
            -o-transition: all .6s ease-in-out;
            transition: all .6s ease-in-out;
            &:hover {
                color:#0091FF!important;
                -webkit-transition: all 10ms ease-in-out;
                -moz-transition: all 10ms ease-in-out;
                -o-transition: all 10ms ease-in-out;
                transition: all 10ms ease-in-out;
            }
        }
    }
</style>
