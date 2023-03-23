<template>
    <div class="accordion" v-if="dataItems.length">
        <div class="container">
            <div v-for="(item, index) in data" :key="'according-' + index" class="accordion__item" :class="{'active': item.active}">
                <div class="accordion__item-head" @click="changeActive(item)">
                    <span v-if="item.question" v-html="item.question"/>
                    <span v-if="item.name" v-html="item.name"/>
                    <span v-if="item.title" v-html="item.title"/>
                </div>
                <div class="accordion__item-body">
                    <div v-if="item.answer" v-html="item.answer"/>
                    <img-com :img="item.img"/>
                    <div v-if="item.text" v-html="item.text"/>
                    <a class="accordion__item-btn border-b" @click.prevent="changeActive(item)" href="#">{{$t('faq.collapse')}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'according',
    props: ['data'],
    data() {
        return {
            dataItems: this.data || []
        };
    },
    watch: {
        'data'() {
            this.setActive();
        }
    },
    created() {
        if (this.dataItems.length) {
            this.setActive();
        }
    },
    methods: {
        setActive() {
            this.dataItems = this.data.map((item) => {
                item.active = false;
                return item;
            });
        },
        changeActive(item) {
            item.active = !item.active;
            this.dataItems = [].concat(this.dataItems);
        }
    }
};
</script>


<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
    .accordion {
        counter-reset: faq-counter;
        margin: 30px 0;
        /deep/.img__container {
            margin-bottom: 40px;
        }
        &_icon{
            .accordion__item-head::before{
                content: '';
                background-image: url('~assets/img/howToDress/icon-rock.svg');
                height: 25px;
                background-repeat: no-repeat;
                background-position: 50%;
                @include respond-to(xs) {
                    background-size: contain;
                    margin-right: 20px;
                }
            }
        }
        &_border-top{
            .accordion__item {
                &:first-child{
                    border-top: 3px solid color(blue);
                }
            }
        }
    }
    .accordion__item {
        border-bottom: 3px solid color(blue);
        @include respond-to(sm) {
            border-width: 2px !important;
        }
        @include respond-to(xs) {
            border-width: 1px !important;
        }

        &.active {
            .accordion__item-head {
                &::after {
                    transform: rotateZ(180deg);
                }
            }
            .accordion__item-body {
                display: block;
            }
        }
    }
    .accordion__item-head {
        min-height: 250px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        font-size: 36px;
        font-weight: bold;
        color: color(blueScreen);
        line-height: 1.5;
        cursor: pointer;
        @include respond-to(lg) {
            font-size: 28px;
            min-height: 200px;
        }
        @include respond-to(sm) {
            font-size: 20px;
            min-height: 120px;
        }
        @include respond-to(xs) {
            font-size: 14px;
            min-height: 100px;
        }
        &::before {
            content: counter(faq-counter, decimal-leading-zero);
            counter-increment: faq-counter;
            font-family: 'Mpluse1p';
            font-size: 100px;
            font-weight: 900;
            color: color(blue);
            width: 360px;
            padding-left: 40px;
            flex-shrink: 0;
            box-sizing: border-box;
            @include respond-to(lg) {
                font-size: 90px;
                width: 235px;
                padding-left: 0;
            }
            @include respond-to(sm) {
                font-size: 70px;
                padding-left: 0;
                width: 155px;
            }
            @include respond-to(xs) {
                font-size: 30px;
                width: 50px;
                padding-left: 0;
            }
        }
        &::after {
            content: '\e900';
            font-family: 'icomoon';
            font-size: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 70px;
            height: 70px;
            border: 3px solid color(blueScreen);
            border-radius: 50%;
            margin-right: 50px;
            transition: transform .2s ease-out;
            @include respond-to(lg) {
                margin-right: 25px;
            }
            @include respond-to(sm) {
                margin-right: 20px;
                width: 60px;
                height: 60px;
                border-width: 2px;
                font-size: 7px;
            }
            @include respond-to(sm) {
                margin-right: 0;
                width: 30px;
                height: 30px;
                border-width: 1px;
            }
        }
        span {
            flex: 1 1 100%;
            padding-right: 5%;
        }
    }

    .accordion__item-body {
        display: none;
        padding-left: 360px;
        padding-bottom: 180px;
        padding-right: 15%;
        font-size: 24px;
        line-height: 1.5;
        color: color(granite);
        animation: accordion-body-show 1.5s ease;

        @include respond-to(lg) {
            padding-left: 235px;
            padding-bottom: 80px;
            font-size: 18px;
        }
        @include respond-to(sm) {
            padding-left: 155px;
            padding-bottom: 60px;
            padding-right: 50px;
            font-size: 16px;
        }
        @include respond-to(xs) {
            padding-left: 50px;
            padding-bottom: 50px;
            font-size: 12px;
        }

        p {
            font-family: "Montserrat";
            font-weight: 400;
            margin-bottom: 1em;
        }
        /deep/img{
            display: block;
            margin: auto;
            max-width: 500px;
            max-height: 500px;
        }

    }

    @keyframes accordion-body-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .accordion__item-btn {
        font-family: 'Mpluse1p';
        font-weight: 500;
        font-size: 24px;
        margin-top: 60px;
        display: inline-block;
        color: color(blueScreen);
        @include respond-to(lg) {
            font-size: 16px;
            margin-top: 40px;
        }
        @include respond-to(sm) {
            margin-top: 30px;
        }
        @include respond-to(sm) {
            margin-top: 20px;
        }
    }

    .accordion__item-body {
        padding-right: 13%;
        font-size: 30px;
        padding-bottom: 187px;
        font-family: 'Montserrat';
        font-weight: normal;

        @include respond-to(lg) {
            font-size: 18px;
            padding-bottom: 80px;
        }

        @include respond-to(md) {
            font-size: 16px;
            padding-bottom: 60px;
            padding-left: 153px;
        }
        @include respond-to(sm) {
            font-size: 12px;
            padding-bottom: 52px;
            padding-left: 52px;
        }
    }

    .accordion {

        @include respond-to(lg) {
            margin-top: 0;
        }

        .container {
            padding: 0;

            @include respond-to(sm) {
                padding-left: 24px;
                padding-right: 24px;
            }
        }
    }

    .accordion__item-head {

        @include respond-to(md) {
            font-size: 20px;
        }
        @include respond-to(sm) {
            font-size: 14px;
        }
    }

    .accordion__item-head {

        @include respond-to(md) {
            height: 120px;
            min-height: initial;
        }
        @include respond-to(sm) {
            height: 100px;
            min-height: initial;
        }
    }

    .accordion__item-head::before {

        @include respond-to(md) {
            font-size: 70px;
            width: 153px;
        }
        @include respond-to(sm) {
            font-size: 30px;
            width: 52px;
        }
    }

    .accordion__item-head::after {

        @include respond-to(md) {
            width: 60px;
            height: 60px;
        }
        @include respond-to(sm) {
            width: 30px;
            height: 30px;
        }
    }

    .accordion {

        @include respond-to(md) {
            margin-bottom: 80px !important;
        }
    }

    .faq__accordion {
        .accordion__item-head {
            font-weight: normal;
        }
    }

    .how-to-dress__accordion {
        .accordion__item-body {
            padding: 80px 195px;
            @include respond-to(lg) {
                padding: 50px 0;
            }
            @include respond-to(md) {
                padding: 44px 0;
            }
            @include respond-to(sm) {
                padding: 24px 0;
            }
        }
        .accordion__item-head {
            font-weight: normal;
            &:after {
                margin-right: 0;
            }
            &:before {
                background-position: left;
            }
            @include respond-to(md) {
                font-size: 20px;
                &:before {
                    margin-right: 16px;
                    background-size: contain;
                }
            }
            @include respond-to(sm) {
                font-size: 14px;
                &:before {
                    margin-right: 16px;
                }
            }
        }
    }

</style>
