<template>
    <div class="content-image" :class="this.width ? 'content-image--' + this.width : ''">
        <img
            loading="lazy"
            v-if="!isBack"
            :src="require( '@/assets/img/' + this.src )"
        />
        <img-com v-if="isBack && data" :img="data" classImg="watch-activity__activities-image"/>
    </div>
</template>

<script>
export default {
    name: 'contentImage',
    props: [
        'width',
        'src',
        'alt',
        'isBack',
        'data'
    ]
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";

    .content-image {
        margin-top: 2.5em;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .content-image--fullwidth {
        img {
            width: 100vw;
            max-width: 100vw;
            margin-left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
