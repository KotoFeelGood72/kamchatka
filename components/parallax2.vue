<template>
  <div class="keyart" id="parallax">
    <div class="keyart_layer parallax" id="keyart-0" data-speed="10">
    </div>
    <div class="keyart_layer parallax" id="keyart-1" data-speed="50">
      <img class="parallax__logo" src="~assets/img/parallax/logo.svg" alt="Изображение">
    </div>
    <div class="keyart_layer" id="keyart-2" data-speed="100">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parallax: {
        'keyart-0': 0,
        'keyart-1': 0,
        'keyart-2': 0,
      },
      deltaY: 0,
      pageYOffset: 0,
      offset: 0
    }
  },
  methods: {
    onScroll() {
        let pageWidth = window.pageYOffset;
        this.deltaY = window.pageYOffset > this.pageYOffset;
        this.offset = window.pageYOffset - this.pageYOffset
        this.pageYOffset = window.pageYOffset;
        this.parallax['keyart-0']-=this.offset/5
        this.parallax['keyart-1']-=this.offset/2;
        this.$el.querySelector(`#keyart-0`).style.transform = `translate3d(0px, ${this.parallax['keyart-0']}px, 0px)`;
        this.$el.querySelector(`#keyart-1`).style.transform = `translate3d(0px, ${this.parallax['keyart-1']}px, 0px)`;

    },
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
      for (let key in this.parallax) {
        this.$el.querySelector(`#${key}`).style.transform = `translate3d(0px, ${this.parallax[key]}px, 0px)`;
      }
      window.addEventListener('scroll', this.onScroll, false)
      this.$store.dispatch('changeIsParallax', true);
      // console.log(this.$store.getters.getIsParallax());
      let parallax = this.$el;
      window.addEventListener('wheel', e=>{
        if (!this.viewElement(parallax)) {
          this.$store.dispatch('changeIsParallax', false);
          // console.log(this.$store.getters.getIsParallax());
          parallax.style.display = 'none';
        }
      })
    });
  }
}
</script>

<style lang="scss" scoped>

  .keyart {
    position: relative;
      height: 1000px;
  }
  #parallax {
    display: block;
    transition: 1s 0s all ease;
    .keyart_layer {
      height: 1000px;
      background-position: bottom center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;

      &.parallax {
        position: fixed;
      }
    }
    #keyart-0 {
      background-image: url('~assets/img/parallax/sky.png');
    }
    #keyart-1 {
      background-image: url('~assets/img/parallax/mount.png');
    }
    #keyart-2 {
      background-image: url('~assets/img/parallax/ground2.png');
    }
  }
  .parallax__logo {
    position: absolute;
    width: 550px;
    top: 230px;
    left: 111px;
  }

</style>
