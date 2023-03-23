<template>
    <div v-if="img" class="img__container">
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="desktop-only"
            :class="[{ 'hover_whenhover' : isAnimationT}, classImg]"
            :src="img.src"
            :alt="img.alt"
        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="pad-only"
            :class="[{ 'hover_whenhover' : isAnimationT}, classImg]"
            :src="img.pad ? img.pad : img.src"
            :alt="img.alt"
        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="pad2-only"
            :class="[{ 'hover_whenhover' : isAnimationT}, classImg]"
            :src="img.pad2 ? img.pad2 : img.src"
            :alt="img.alt"
        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="mobile-only hover_imgcom"
            :class="classImg" :src="img.mob ? img.mob : img.src"
            :alt="img.alt"
        />

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {

        name: "imgAnimation",
        props: ['img', 'classImg', 'isAnimationT'],

    }
</script>

<style lang="scss" scoped>
    .img__container {
        width: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .hover_imgcom{
-webkit-animation: rotating 3s linear infinite;
  -moz-animation: rotating 3s linear infinite;
  -ms-animation: rotating 3s linear infinite;
  -o-animation: rotating 3s linear infinite;
  animation: rotating 3s linear infinite;
    }
    // .hover_whenhover:hover{

    // }
    @keyframes rotating {
  from {
    -ms-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -ms-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
    -o-transform: rotateY(360deg);
    transform: rotateY(360deg);
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
    .img__container:hover .hover_whenhover{
 -webkit-animation: rotating 3s linear infinite;
  -moz-animation: rotating 3s linear infinite;
  -ms-animation: rotating 3s linear infinite;
  -o-animation: rotating 3s linear infinite;
  animation: rotating 3s linear infinite;
    }
</style>
