<template>
    <div v-if="isLoad" class="error-page">
        <picture>
            <source srcset="~assets/img/error/bg375.png"
            media="(min-height: 416px) and (max-width: 767px)"/>
            <source srcset="~assets/img/error/bg1920.png"
            media="(max-height: 768px) and (min-width: 1024px)"/>
            <source srcset="~assets/img/error/bg768.png"
            media="(min-height: 416px) and (max-width: 1279px)"/>
            <source srcset="~assets/img/error/bg1920.png"
            media="(min-width: 1280px)"/>
            <source srcset="~assets/img/error/bg1280.png"
            media="(max-height: 415px) and (max-width: 1279px)"/>
            <nuxt-img loading="lazy" format="webp" quality="75" src="~assets/img/error/bg1920.png" alt=""/>
        </picture>
        <animButton @endAnim="changeActive" class="error-page__button">{{$t('buttonHome')}}</animButton>
    </div>
</template>

<script>
    import animButton from "../components/button/button";
    export default {
        name: "error",
        components: {animButton},
        data() {
            return {
                isLoad: false
            }
        },
        methods: {
            changeActive() {
                let url = this.$i18n.locale === 'en' ? '/' : '/';
                this.$router.push(url);
            }
        },
        mounted() {
            this.isLoad = true;
        },
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .error-page {
        height: 100vh;
        position: relative;
        overflow: hidden;
        & img {
            object-fit: cover;
            width: 100%;
            position: absolute;
            bottom: 0;
            @media (max-width: 500px){
                bottom: 50px;
            }
            @media (max-width: 500px) and (max-height: 800px){
                height: auto;
            }
            @media (min-height: 767px) {
                height: 100%
            }
        }
    }
    .error-page__button {
        position: absolute;
        bottom: 140px;
        left: 50%;
        transform: translateX(-50%);
        @include respond-to(sm) {
            bottom: 130px;
        }

        @media(max-height: 500px) {
            height: 70px!important;
            bottom: 20px;
            font-size: 12px;
            width: 100%;
            max-width: 100%;
        }
        @include respond-to(customMobile) {
            height: 70px!important;
            bottom: 0;
            width: 100%;
            max-width: 100%;
            max-height: 100vh;
            /deep/.particles-button {
                border-radius: 0!important;
                height: 70px!important;
            }
        }
    }
</style>
