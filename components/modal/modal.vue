<template>
  <transition name="modal">
    <div class="modal" :class="{'is-container': isContainer}" v-show="show">
      <div class="modal__overlay" @click="close" />
      <div class="modal__container container">
        <div class="modal__body">
          <slot name="body" />
          <div v-if="this.videoLink" class="modal__video-wrapper">
            <div :id="'player_'+this.videoLink"></div>
          </div>
          <button class="modal__close icon-close" @click="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: ["videoLink", "isContainer"],
  data() {
    return {
      show: false,
      autoPlayParams: "0",
      player: ""
    };
  },
  methods: {
    open(e) {
      this.show = true;
      // setTimeout(()=> this.autoPlayParams = '1',1000)
      // this.autoPlayParams = '1'
      this.onYouTubeIframeAPIReady();
    },
    close() {
      this.show = false;
      // this.autoPlayParams = '0';
      this.stopPlayer();
    },
    onPlayerReady(event) {
      // event.target.mute();
      event.target.playVideo();
    },
    stopPlayer() {
      this.player.stopVideo();
      this.player.destroy();
    },
    onYouTubeIframeAPIReady() {
      this.player = new YT.Player(`player_${this.videoLink}`, {
        height: "100%",
        width: "100%",
        videoId: this.videoLink,
        playerVars: { autoplay: 1, playsinline: 0 },
        events: {
          onReady: this.onPlayerReady
        }
      });
      if (window.innerWidth < 500 || window.innerHeight < 500) {
        var el = document.getElementById(`player_${this.videoLink}`);
        if (el.requestFullScreen) {
          el.requestFullScreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
          el.webkitRequestFullScreen();
        }
      }
    }
  },
  mounted() {
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/config";
@import "~assets/scss/mixins";

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter .modal__container,
.modal-leave-to .modal__container {
  transform: translateY(15px);
}

.modal.is-container {
  position: absolute;
  .modal__video-wrapper {
    padding-bottom: auto;
    height: 100%;
  }
  .modal__container {
    height: 100%;
    width: 100%;
    padding: 0;
  }
  .modal__body {
    height: 100%;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  transition: opacity 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  @include respond-to(sm) {
    z-index: 1999;
  }
}

.modal__container {
  transition: transform 0.3s ease;
  position: relative;
  @media (min-width: 1300px) and (min-height: 700px) {
    width: calc(100% - 140px);
  }
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__body {
  position: relative;
}

.modal__close {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  mix-blend-mode: difference;
  z-index: 20;
  color: #fff;
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.modal__video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;

  /deep/ iframe,
  #player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
