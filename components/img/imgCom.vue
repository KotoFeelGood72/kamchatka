<template>
    <div v-if="img" class="img__container">
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="desktop-only"
            :class="classImg"
            :src="img.src" :alt="img.alt"

        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="pad-only"
            :class="classImg"
            :src="img.pad ? img.pad : img.src"
            :alt="img.alt"

        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="pad2-only"
            :class="classImg"
            :src="img.pad2 ? img.pad2 : img.src"
            :alt="img.alt"

        />
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            class="mobile-only"
            :class="classImg"
            :src="img.mob ? img.mob : img.src"
            :alt="img.alt"

        />
    </div>
</template>

<script>
export default {
    name: "imgCom",
    props: ['img', 'classImg']
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
.content-image--fullwidth {
    img {
        width: 100vw;
        max-width: 100vw;
        margin-left: 50%;
        transform: translateX(-50%);
    }
}
</style>

