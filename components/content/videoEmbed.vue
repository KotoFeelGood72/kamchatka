<template>
    <div class="video-embed" :class="{'video-is-container': isContainer}">
        <a class="video-embed__link" :href="url + '&autoplay=1'" data-fancybox>
            <img-com :img="data" classImg="video-embed__img"/>
        </a>
    </div>
</template>

<script>
import Modal from '../../components/modal/modal';
export default {
    name: 'videoEmbed',
    components: {
        Modal
    },
    props: [
        'url',
        'data',
        'isContainer'
    ],
};
</script>

<style lang="scss" scoped>

.ytp-large-play-button.ytp-button.ytp-large-play-button-red-bg {
    display: none!important;
}
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";

    .video-embed {
        position: relative;
    }

    .video-embed.video-is-container {
        height: 100%;
        margin: 40px 0;
        img {
            height: 100%;
            object-fit: cover;
        }
    }

    .video-embed__link {
        display: block;
        position: relative;

        &::before {
            content: '\e908';
            font-family: 'icomoon';
            font-size: 35px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .1em;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: rgba(#FBFBFB, .2);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
