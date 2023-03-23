<template>
    <div class="animButton-container">
      <ParticleEffectButton
          class="animButton"
          :visible.sync="btnOps.visible"
          :options="btnOps"
          :cls="['animButton-btn', active ? 'animButton--active' : 'animButton--disabled', `animButton--${color}`]">
        <slot></slot>
      </ParticleEffectButton>
      <div v-if="!active" class="blocked"></div>
    </div>
</template>

<script>

export default {
  props: {
    active: {
      type: Boolean,
      default: true
    },
    finish: {
      type: Boolean,
      default: true
    },
    color: {
      default: 'blue'
    }
  },
  data() {
    return {
      btnOps: {
        type: "triangle",
        easing: "easeOutQuart",
        size: 6,
        duration: 200,
        direction: 'top',
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function () {
          return Math.random() < 0.5 ? "#000000" : "#ffffff";
        },
        onComplete: () => {
          if (!this.btnOps.visible) this.$emit('endAnim');
          this.btnOps.visible = true;
        },
        onBegin: () => {
          this.btnOps.animating = false;
        },
        visible: true,
        animating: false
      }
    }
  },
  methods: {
    clickBtn() {
      if (active && finish) {

      }
    }
  }
}
</script>

<style lang="sass">
  .animButton
    width: 100%
    &-container
      position: relative
      width: 100%
      max-width: 360px
      .blocked
        width: 100%
        height: 100%
        top: 0
        left: 0
        position: absolute
        z-index: 1

    .particles-button
      &.animButton
        &-btn
          background: #21232A
          border-radius: 140px
          height: 80px
          font-size: 30px
          cursor: pointer
          line-height: 120%
          padding: 0
          display: flex
          justify-content: center
          align-items: center
        &--blue
          color: #1DCFFF
        &--white
          color: white
        &--disabled
          color: #43495C
        &--active
          &:hover
            color: #4364f7
            // background-color: #2A2E39
    .particles-wrapper
      width: 100%
  .error-page__button .animButton .particles-button.animButton-btn
    color: #fbfbfb
    &:hover
      color: #1DCFFF
    &:active
      color: #4364F7
    @media (max-width: '1279px')
      width: 310px;
      height: 70px;
      margin: 0 auto
    @media (max-width: '500px')
      width: 100%;
      font-size: 20px;
</style>
