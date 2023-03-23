<template>
  <div class="parallax">
    <div class="parallax__layer parallax__layer--back">
      <nuxt-img
          loading="lazy"
          format="webp"
          quality="75"
          class="parallax__image"
          src="~assets/img/parallax/sky.png"
      />
    </div>
    <div class="parallax__layer parallax__layer--middle">
        <img src="~assets/img/parallax/logo.svg" alt="" class="parallax__logo">
      <nuxt-img
          loading="lazy"
          format="webp"
          quality="75"
          class="parallax__image"
          src="~assets/img/parallax/mount.png"
      />
    </div>
    <div class="parallax__layer parallax__layer--base">
      <nuxt-img
          loading="lazy"
          format="webp"
          quality="75"
          class="parallax__image"
          src="~assets/img/parallax/ground2.png"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {

      };
  },
  methods: {
    viewElement(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
      );
    }
  },
  mounted() {
    this.$nextTick(()=>{
        // debugger
      this.$store.dispatch('changeIsParallax', true);
      let parallax = this.$el;
      // console.log(this.$route.path);
      // console.log('qwertt');
      window.addEventListener('wheel', e=>{
        if (!this.viewElement(parallax) && this.$route.path == "/") {
          this.$store.dispatch('changeIsParallax', false);
          parallax.style.display = 'none';
        }
      })
    });
  }
}
</script>

<style lang="scss" scoped>

  .parallax {
    position: relative;
    perspective: 1px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;

    &__logo {
      width: 600px;
      position: absolute;
      left: -5%;
      top: -4%;
      z-index: 1;
    }

    &__image {
      position: absolute;
      max-width: none;
      object-fit: cover
    }

    &__layer {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 130%;

      &--base {
        transform: translateZ(0);
        .parallax__image {
          bottom: -14%;
          left: -24%;
          width: 134vw;
        }
      }

      &--back {
        transform: translateZ(-0.6px);
        .parallax__image {
          top: -29%;
          left: -64%;
          width: 220vw;
          height: 100%;
        }
      }

      &--middle {
        transform: translateZ(-0.4px);
        .parallax__image {
          bottom: 15%;
          left: -24%;
          width: 143vw;
          height: 100%;
        }
      }
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: white
  }
</style>
