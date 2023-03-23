<template>
    <ParticleEffectButton
      :visible.sync="btnOps.visible"
      :animating.sync="btnOps.animating"
      :options="btnOps"
      cls="btn-cls"
      @click="btnOps.visible=!btnOps.visible"
    >
      <slot></slot>
    </ParticleEffectButton>
</template>

<script>

export default {
  data() {
    return {
      btnOps: {
        type: "circle",
        easing: "easeOutQuart",
        size: 6,
        particlesAmountCoefficient: 4,
        oscillationCoefficient: 2,
        color: function () {
          return Math.random() < 0.5 ? "#000000" : "#ffffff";
        },
        onComplete: () => {
          console.log("complete");
        },
        onBegin: () => {
          console.log("begin");
        },
        visible: true,
        animating: false
      },
    }
  }
};
</script>