<template>
    <div class="feedback-modal">
        <div class="feedback-modal__bg" :class="{'success': isSuccess}">
            <img v-if="!isMobile" src="~@/assets/img/search/close.png" alt v-on:click="toggleFeedback" />
            <div v-if="!isSuccess" class="feedback-modal__container">
                <img v-if="isMobile" src="~@/assets/img/search/close.png" alt v-on:click="toggleFeedback" />
                <Heading
                    class="feedback-modal__headline"
                    tag="H2"
                    size="lg"
                    color="white"
                    v-html="$t('feedback.titleForm')"
                    :stepAnimate="true"
                />
                <FormFeedback @isSuccess="isSuccessFunc" idForm="1" />
            </div>
            <div v-if="isSuccess" class="feedback__success">
                <img src="~@/assets/img/search/close.png" alt v-on:click="toggleFeedback" />
                <div class="feedback__success-text">
                    <Heading tag="H2" :stepAnimate="true" v-html="$t('feedback.successForm')" />
                    <p v-html="$t('feedback.successForm2')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Heading from "../content/headingStep";
import FormFeedback from "./section/formFeedback";

export default {
    name: "feedback",
    components: { FormFeedback, Heading },
    props: ['onClose'],
    data() {
        return {
            isSuccess: false,
            titleForm: "",
            scrollPosition: 0,
            isMobile: false
        };
    },
    mounted() {
        window.onresize = () => {
            if (window.innerWidth < 769) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        };
        this.scrollPosition =
            window.pageYOffset || document.documentElement.scrollTop;
        document
            .getElementsByTagName("body")[0]
            .classList.add("t-body_scroll-locked_menu");
    },
    destroyed() {
        document
            .getElementsByTagName("body")[0]
            .classList.remove("t-body_scroll-locked_menu");
    },
    methods: {
        isSuccessFunc() {
            this.isSuccess = true;
            setTimeout(() => {
                this.toggleFeedback();
            }, 6000);
        },
        toggleFeedback: function() {
            if (this.onClose) this.onClose()
            else this.$emit("toggleFeedback");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/config";
@import "~assets/scss/mixins";

.feedback__success {
    width: 100%;
    height: 100%;
    position: relative;

    h2 {
        color: white;
        margin: 0 0 20px;
        font-size: 60px;
        line-height: 1.5;

        @include respond-to(xs) {
            font-size: 30px;
            margin: 0 0 15px;
        }
    }

    p {
        font-family: 'Montserrat';
        font-weight: 400;
        color: white;
        font-size: 20px;
        line-height: 1.5;
    }
}

.feedback__success-text {
    position: absolute;
    top: 28%;
    left: 20%;

    width: 395px;

    @include respond-to(sm) {
        top: 20%;
        left: 15%;
    }

    @include respond-to(xs) {
        width: 270px;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
    }
}

img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 30px;
    right: 30px;
    cursor: pointer;
    z-index: 2;
    @include respond-to(sm) {
        top: 20px;
        width: 20px;
        height: 20px;
        right: 20px;
    }
}

.feedback-modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    background: #2a2e39;
    z-index: 2000;

    .feedback-modal__bg {
        background: url("~assets/img/feedback/bg.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 25px;
        right: 25px;
        top: 25px;
        bottom: 25px;

        @include respond-to(sm) {
            left: 15px;
            right: 15px;
            top: 15px;
            bottom: 15px;
        }
        @include respond-to(xs) {
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }

    .feedback-modal__container {
        max-width: 780px;
        width: 100%;
        margin: 0 auto;
        padding: 0 15px;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 93vh;
        padding-bottom: 50px;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
            display: none;
        }

        @include respond-to(sm) {
            padding: 50px 15% 70px;
        }

        @include respond-to(xs) {
            padding: 8px 10% 10px;
        }
    }
    .feedback-modal__headline {
        margin-top: 60px;
        margin-bottom: 40px !important;
        font-size: 60px;
        font-weight: 700;
        line-height: 1.5;

        @include respond-to(md) {
            font-size: 36px;
        }

        @include respond-to(xs) {
            font-size: 25px;
            margin-top: 0;
            margin-bottom: 24px !important;
        }
    }
}
</style>
