<template>
    <div class="page-header">
        <img-com :img="data" classImg="page-header__overlay"/>
        <div class="container">
            <h1 class="page-header__title" ><slot/></h1>
        </div>
    </div>
</template>

<script>

export default {
    name: 'pageHeader',
    props: [
        'data',
        'isGrid'
    ],
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";
    .page-header > * {
        position: relative;
    }
    .page-header {
        position: absolute;
        min-height: calc(100vh - 100px);
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .header__padding {
        padding-top: 19vh;
        padding-bottom: 40vh;
        @include respond-to(customMobile) {
            padding-top: 10vh;
            padding-bottom: 30vh;
        }
        h1 {
            @include respond-to(customMobile) {
                font-size: 40px;
            }
        }
    }

    .page-header__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center bottom;
    }

    .page-header__title {
        font-size: 100px;
        font-weight: 900;
        color: white;
        @include respond-to(lg) {
            font-size: 70px;
        }
        @include respond-to(sm) {
            font-size: 35px;
        }
    }

</style>
