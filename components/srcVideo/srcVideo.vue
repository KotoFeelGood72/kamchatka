<template>
	<video :class="classVideo" playsinline autoplay muted loop>
		<source :src="require(`~/assets/video/${videoName}.mp4`)" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
		<source :src="require(`~/assets/video/${videoName}.webm`)" type='video/webm; codecs="vp8, vorbis"'>
	</video>
</template>

<script>
	export default {
		props: ['videoName', 'classVideo'],
	}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
.video-main-page {
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        position: relative;
        top: 0;
        left: 0;
        margin-bottom: -6px;
        @include respond-to(sm) {
            object-position: 65% 0;
        }
    }
</style>
