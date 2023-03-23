<template>
  <div class="keyart" id="parallax">
    <div
      v-for="(layer, i) in layers"
      :key="i"
      ref="layer"
      class="keyart_layer parallax"
    >
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['layers'],
  methods: {
    onScroll() {
      this.layers.forEach((layer, i) => {
        const node = this.$refs.layer[i];
        const offset = window.pageYOffset * -layer.strength;
        node.style.transform = `translate3d(0px, ${offset}px, 0px)`;
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.layers.forEach((layer, i) => {
        const node = this.$refs.layer[i];
        node.style.backgroundImage = layer.background.image;
        node.style.backgroundPosition = layer.background.position;
      });
      window.addEventListener('scroll', this.onScroll, false);
      this.onScroll();
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/config";
  @import "~assets/scss/mixins";

  .keyart {
    position: relative;
      height: 1200px;
  }
  #parallax {
    display: block;
    transition: 1s 0s all ease;
    .keyart_layer {
      height: 1200px;
      background-position: bottom center;
      background-size: cover;
      background-repeat: repeat-x;
      width: 100%;

      &.parallax {
        position: fixed;
      }
    }
  }
  @include respond-to(sm) {
    .keyart {
      height: 100vh;
    }
    #parallax .keyart_layer{
        background-position: center;
        height: 100%;
    }
  }
</style>
