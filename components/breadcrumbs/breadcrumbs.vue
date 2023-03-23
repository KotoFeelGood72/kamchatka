<template>
    <section class="container">
        <div class="breadcrumbs">
            <nuxt-link :to="$i18n.locale === 'en' ? '/' : '/'"><span>Enjoykamchatka</span></nuxt-link>
            <div v-for="(breadcrumb, index) in breadcrumbData" :key="index">
                <nuxt-link v-if="index !== breadcrumbData.length -1" :to="$i18n.locale === 'en' ? breadcrumb.link + '/' : breadcrumb.link + '/'"><span>{{$t(breadcrumb.name)}}</span></nuxt-link>
                <span v-if="index === breadcrumbData.length -1">{{ $t(breadcrumb.name) }}</span>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'breadcrumbs',
        computed: {
            'breadcrumbData'() {
                return this.$store.getters['getBreadcrumbs']();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .breadcrumbs {
        color: #FBFBFB;
        margin: 10px 0;
        height: 60px;
        position: absolute;
        top: 100px;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        display: flex;
        align-items: center;
        z-index: 999;
        @include respond-to(sm) {
            height: 20px;
            margin: 0;
            max-width: 300px;
            flex-wrap: wrap;
        }
        div {
            display: flex;
            > a, > span {
                &:before {
                    content: '—';
                    margin: 0 5px;
                    color: #fff;
                    font-size: 16px;
                    @include respond-to(sm) {
                        font-size: 12px;
                    }
                }
            }
        }
        a, span {
            display: flex;
            align-items: center;
        }
        a > span,
        div > span{
            font-size: 16px;
            line-height: 1.5;
            color: #FBFBFB;
            /*border-bottom: 1px solid;*/
            white-space: nowrap;
            display: flex;
            flex-direction: row;
            @include respond-to(sm) {
                font-size: 12px;
                line-height: 1.5;
            }
        }
        div > span,
        span{
            /*border-bottom: 1px solid transparent;*/
        }
    }
</style>
