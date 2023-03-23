<template>
    <component :is="this.tag ? this.tag : 'h2'">
        <slot/>
    </component>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'heading',
    props: [
        'tag',
        'size',
        'fw',
        'align',
        'underline',
        'margin',
        'color',
        'stepAnimate',
        'modalProps'
    ],
    computed: {
        ...mapGetters(['getRouterStatus']),
        classes: function() {
            let classes = ['heading'];
            let map = ['color', 'size', 'fw', 'align', 'underline', 'margin'];

            map.forEach((prop) => {
                if (this[prop]) {
                    classes.push('heading--' + prop + '-' + this[prop]);
                }
            });
            return classes.join(' ');
        }
    }
};
</script>

<style lang="scss">
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";
    @import "wow.js/css/libs/animate.css";
       .animate-route{
                animation-delay: 5s;
        }
        .animate-load{
    animation-delay: 2.5s;
        }
    .animate-trim{
        opacity: 0;
    }
    .heading {
        font-weight: 800;
        font-size: 50px;
        line-height: 1;
        &, a {
            color: color(marengo);
        }
        @include respond-to(lg) {
            font-size: 40px;
            line-height: 100%;
        }
        @include respond-to(sm) {
            font-size: 30px;
            line-height: 100%;
        }
        @include respond-to(xs) {
            font-size: 26px;
            line-height: 100%;
        }
    }
    .heading--color-white {
        &, a {
            color: color(white);
        }
    }
    .heading--color-blue {
        &, a {
            color: color(blueScreen);
        }
    }
    .heading--color-blue-simple {
        &, a {
            color: color(blue);
        }
    }
    .heading--color-bluekm {
        &, a {
            color: color(blueKM);
        }
    }
    .heading--color-gray {
        &, a {
            color: color(grayBlue);
        }
    }
    .heading--color-granite {
        &, a {
            color: color(granite);
        }
    }
    .heading--color-lightBlue {
        &, a {
            color: color(lightBlue);
        }
    }
    .heading--color-white {
        &, a {
            color: color(white);
        }
    }

    .heading--underline-bottom {
        &::after {
            content: '';
            display: block;
            height: 10px;
            background-color: color(lightBlue);
            border-radius: 10px 0px;
            margin: 30px 0;
        }
    }
    .heading--underline-top {
        &::before {
            content: '';
            display: block;
            height: 10px;
            background-color: color(lightBlue);
            border-radius: 10px 0px;
            margin: 30px 0;
        }
    }

    .heading--size {
        &-xs {
            font-size: 26px;
            margin-top: 1.5em;
            margin-bottom: 1.5em;
        }
        &-sm {
            font-size: 36px;
            line-height: 1.1;
            @include respond-to(lg) {
                font-size: 24px;
            }
            @include respond-to(sm) {
                font-size: 20px;
            }
            @include respond-to(xs) {
                font-size: 18px;
            }
        }
        &-md {
            font-size: 40px;
            @include respond-to(lg) {
                font-size: 30px;
            }
            @include respond-to(sm) {
                font-size: 24px;
            }
            @include respond-to(xs) {
                font-size: 16px;
            }
        }
        &-lg {
            font-size: 70px;
            @include respond-to(lg) {
                font-size: 30px;
            }
            @include respond-to(sm) {
                font-size: 28px;
            }
        }
        &-custom {
            font-size: 100px;
            line-height: 100px;
            @include respond-to(lg) {
                font-size: 80px;
                line-height: 80px;
            }
            @include respond-to(sm) {
                font-size: 60px;
                line-height: 140%;
            }
            @include respond-to(xs) {
                font-size: 40px;
                line-height: 140%;
            }
        }
        &-xl {
            margin-top: .75em;
            margin-bottom: -.1em;
            font-size: 150px;
            @include respond-to(lg) {
                font-size: 100px;
            }
            @include respond-to(sm) {
                font-size: 70px;
            }
            @include respond-to(xs) {
                font-size: 40px;
            }
        }
    }

    .heading--fw {
        &-600 {
            font-weight: 600;
        }
    }

    .heading--align-center {
        text-align: center;
    }

    small {
        font-size: .6em;
        margin-left: .35em;
    }

    .heading--margin-sm {
        margin-top: .2em;
        margin-bottom: .2em;
        &.heading--size-xl {
            margin-bottom: -.1em;
        }
    }
</style>
