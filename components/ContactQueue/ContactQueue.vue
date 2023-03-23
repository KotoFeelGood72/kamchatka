<template>
  <div class="landing-clients-container">
    <h3 :class="[{ 'landign_scape_textAbout': isAboutPage }, 'landign_scape_text', 'section-grid__title']">{{$t('home.titlerQueue')}}</h3>
    <div class="landing-clients-list">

      <div
        class="circle-list circle-list--looped"
        data-appear-animation-group=""
      >
        <ul class="circle-list__list">
          <li class="firstitem">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lt"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_first_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/1.svg"
                  /><img
                    v-else
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/testf.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem2">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_second_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/2.svg"
                  />
                    <img
                      v-else
                      class="is-hidden--no-js"
                      draggable="false"
                      width="140"
                      height="140"
                      alt=""
                      data-appear-animation-name=""
                      data-plugin="appear "
                      src="~assets/img/queue/testse.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem4">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="British Airways"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/4.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="British Airways"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/four.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem5">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoverfive"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="ABLV"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/5.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="ABLV"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/five.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem6">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoversix"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="airBaltic"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/6.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="airBaltic"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/six.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem7">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoveseven"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="VTB"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/7.svg"
                  /><img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="VTB"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/sven.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem8">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                  v-if="is_for_hoveeight"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="bite"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/8.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="bite"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/eight.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem9">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                  v-if="is_for_hovernine"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="bite"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/9.png"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="bite"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/9_hover.png"
                  />
                </div>
              </div>
            </div>
          </li>

          <!-- THIS THTTHTHTHTHT HTRTTRETERTRT R -->

           <li class="firstitem">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lt"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_first_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/1.svg"
                  /><img
                    v-else
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/testf.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem2">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_second_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt=""
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/2.svg"
                  />
                    <img
                      v-else
                      class="is-hidden--no-js"
                      draggable="false"
                      width="140"
                      height="140"
                      alt=""
                      data-appear-animation-name=""
                      data-plugin="appear "
                      src="~assets/img/queue/testse.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem4">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hover"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="British Airways"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/4.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="British Airways"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/four.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem5">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoverfive"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="ABLV"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/5.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="ABLV"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/five.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem6">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoversix"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="airBaltic"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/6.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="airBaltic"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/six.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem7">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--lb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                    v-if="is_for_hoveseven"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="VTB"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/7.svg"
                  /><img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="VTB"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/sven.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem8">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                  v-if="is_for_hoveeight"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="bite"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/8.svg"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="bite"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/eight.svg"
                  />
                </div>
              </div>
            </div>
          </li>
          <li class="firstitem9">
            <div
              class="circle-list-item circle-list-item--large circle-list-item--rb"
            >
              <svg
                class="circle-list-item__outline"
                aria-hidden="true"
                width="140"
                height="140"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="69"
                  fill="none"
                  vector-effect="non-scaling-stroke"
                ></circle>
              </svg>
              <div class="circle-list-item__image">
                <div class="circle-list-item__image__content">
                  <img
                  v-if="is_for_hovernine"
                    class="is-hidden--no-js"
                    draggable="false"
                    width="140"
                    height="140"
                    alt="bite"
                    data-appear-animation-name=""
                    data-plugin="appear "
                    src="~assets/img/queue/9.png"
                  />
                    <img
                      v-else
                      class=""
                      draggable="false"
                      width="140"
                      height="140"
                      alt="bite"
                      data-appear-animation-name=""
                      appear=""
                      src="~assets/img/queue/9_hover.png"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      is_first_hover:true,
      is_second_hover:true,
      is_three_hover:true,
      is_for_hover:true,
      is_for_hoverfive:true,
      is_for_hoversix:true,
      is_for_hoveseven:true,
      is_for_hoveeight:true,
      is_for_hovernine:true,
    }
  },

  props: [
        'isAboutPage'
    ],
  mounted() {

    document.querySelectorAll('.firstitem').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_first_hover = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_first_hover = true
    })
    })


    document.querySelectorAll('.firstitem2').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_second_hover = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_second_hover = true
    })
    })


      document.querySelectorAll('.firstitem3').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_three_hover = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_three_hover = true
    })
    })

     document.querySelectorAll('.firstitem4').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hover = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hover = true
    })
    })

     document.querySelectorAll('.firstitem5').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hoverfive = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hoverfive = true
    })
    })

     document.querySelectorAll('.firstitem6').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hoversix = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hoversix = true
    })
    })

     document.querySelectorAll('.firstitem7').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hoveseven = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hoveseven = true
    })
    })

     document.querySelectorAll('.firstitem8').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hoveeight = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hoveeight = true
    })
    })

     document.querySelectorAll('.firstitem9').forEach((item)=>{
      item.addEventListener('mouseover',()=>{

        this.is_for_hovernine = false
    })
    item.addEventListener('mouseout',()=>{
        this.is_for_hovernine = true
    })
    })
  },
};
</script>


<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
ol,
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.landing-clients-container {
  padding-top: 85px;
  padding-bottom: 80px;
  background: #1c1e24;
}
.landign_scape_text{
  padding-left:65px;
  font-family: 'Mpluse1p';
  color:#fff;
  margin-bottom:90px;
  font-weight: bold;
  -webkit-transition: all 10ms ease-in-out;
  -moz-transition: all 10ms ease-in-out;
  -o-transition: all 10ms ease-in-out;
  transition: all 10ms ease-in-out;
}
@include respond-to(sm) {
  .landign_scape_text{
    margin-bottom:35px;
    padding-left:20px;
  }
}
.landing-clients-container .circle-list__list {
  -webkit-animation: landing-clients-animation 12s linear infinite;
  animation: landing-clients-animation 12s linear infinite;
}
@media (max-width: 667px) and (min-aspect-ratio: 13/9),
  only screen and (max-width: 979px) and (max-height: 415px) and (min-aspect-ratio: 13/9) {
  .landing-clients-container .circle-list__list {
    -webkit-animation: landing-clients-animation-sm 10s linear infinite;
    animation: landing-clients-animation-sm 10s linear infinite;
  }
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .landing-clients-container {
    padding-top: 145px;
    padding-bottom: 160px;
  }
}
@media only screen and (min-width: 980px) {
  .landing-clients-container .circle-list__list {
    -webkit-animation: landing-clients-animation-xxl 17s linear infinite;
    animation: landing-clients-animation-xxl 17s linear infinite;
  }
}
@media only screen and (min-width: 1440px) and (min-height: 800px) {
  .landing-clients-container {
    padding-top: 165px;
    padding-bottom: 165px;
  }
}
.landing-clients-title,
.landing-clients-title:last-child {
  margin: 0 0 20px;
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .landing-clients-title,
  .landing-clients-title:last-child {
    margin: 0 0 40px;
  }
}
@media only screen and (min-width: 1440px) and (min-height: 800px) {
  .landing-clients-title,
  .landing-clients-title:last-child {
    margin: 0 0 55px;
  }
}
@-webkit-keyframes landing-clients-animation {
  0% {
    transform: translateX(-51%);
  }
  to {
    transform: translateX(-352.8%);
  }
}
@keyframes landing-clients-animation {
  0% {
    transform: translateX(-54%);
  }
  to {
    transform: translateX(-352.8%);
  }
}
@-webkit-keyframes landing-clients-animation-sm {
  0% {
    transform: translateX(-28%);
  }
  to {
    transform: translateX(-188%);
  }
}
@keyframes landing-clients-animation-sm {
  0% {
    transform: translateX(-28%);
  }
  to {
    transform: translateX(-188%);
  }
}
@-webkit-keyframes landing-clients-animation-xxl {
  0% {
    transform: translateX(-7%);
  }
  to {
    transform: translateX(-186%);
  }
}
@keyframes landing-clients-animation-xxl {
  0% {
    transform: translateX(-7%);
  }
  to {
    transform: translateX(-187%);
  }
}

.circle-list--padding {
  padding-top: 60px;
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list--padding {
    padding-top: 90px;
  }
}
@media only screen and (min-width: 1440px) and (min-height: 800px) {
  .circle-list--padding {
    padding-top: 120px;
  }
}
.circle-list {
  position: relative;
}
.circle-list__button {
  margin: -40px auto 0;
  display: flex;
}
.circle-list__list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.circle-list__list li {
  position: relative;
}
.circle-list .circle-list__list {
  margin: 20px 0 0 20px;
}
.circle-list li {
  margin: -20px 0 0 -20px;
  flex: 0 0 calc(50% + 20px);
  width: calc(50% + 20px);
}
.circle-list li _:-ms-input-placeholder,
:root .circle-list li {
  min-width: calc(50% + 20px);
  max-width: calc(50% + 20px);
}
@-moz-document url-prefix() {
  .circle-list li {
    max-width: calc(50% + 20px);
  }
}
@media (min-aspect-ratio: 13/9), only screen and (min-width: 568px) {
  .circle-list .circle-list__list {
    margin: 20px 0 0 20px;
  }
  .circle-list li {
    margin: -20px 0 0 -20px;
    flex: 0 0 calc(25% + 20px);
    width: calc(25% + 20px);
  }
  .circle-list li _:-ms-input-placeholder,
  :root .circle-list li {
    min-width: calc(25% + 20px);
    max-width: calc(25% + 20px);
  }
  @-moz-document url-prefix() {
    .circle-list li {
      max-width: calc(25% + 20px);
    }
  }
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list .circle-list__list {
    margin: 40px 0 0 40px;
  }
  .circle-list li {
    margin: -40px 0 0 -40px;
    flex: 0 0 calc(50% + 40px);
    width: calc(50% + 40px);
  }
  .circle-list li _:-ms-input-placeholder,
  :root .circle-list li {
    min-width: calc(50% + 40px);
    max-width: calc(50% + 40px);
  }
  @-moz-document url-prefix() {
    .circle-list li {
      max-width: calc(50% + 40px);
    }
  }
  .circle-list__button {
    margin-top: -16%;
  }
}
@media only screen and (min-width: 980px) {
  .circle-list .circle-list__list {
    margin: 20px 0 0 20px;
  }
  .circle-list li {
    margin: -20px 0 0 -20px;
    flex: 0 0 calc(25% + 20px);
    width: calc(25% + 20px);
  }
  .circle-list li _:-ms-input-placeholder,
  :root .circle-list li {
    min-width: calc(25% + 20px);
    max-width: calc(25% + 20px);
  }
  @-moz-document url-prefix() {
    .circle-list li {
      max-width: calc(25% + 20px);
    }
  }
  .circle-list__button {
    margin-top: -8.5%;
  }
}
@media only screen and (min-width: 1200px) and (min-height: 600px) {
  .circle-list .circle-list__list {
    margin: 40px 0 0 40px;
  }
  .circle-list li {
    margin: -40px 0 0 -40px;
    flex: 0 0 calc(25% + 40px);
    width: calc(25% + 40px);
  }
  .circle-list li _:-ms-input-placeholder,
  :root .circle-list li {
    min-width: calc(25% + 40px);
    max-width: calc(25% + 40px);
  }
  @-moz-document url-prefix() {
    .circle-list li {
      max-width: calc(25% + 40px);
    }
  }
}
.circle-list--looped .circle-list__list {
  margin: 20px 0 0 20px;
}
.circle-list--looped li {
  margin: -20px 0 0 -20px;
  flex: 0 0 calc(33.33333% + 20px);
  width: calc(33.33333% + 20px);
}
.circle-list--looped li _:-ms-input-placeholder,
:root .circle-list--looped li {
  min-width: calc(33.33333% + 20px);
  max-width: calc(33.33333% + 20px);
}
@-moz-document url-prefix() {
  .circle-list--looped li {
    max-width: calc(33.33333% + 20px);
  }
}
.circle-list--looped .circle-list__list {
  flex-wrap: nowrap;
}
@media (min-aspect-ratio: 13/9), only screen and (min-width: 568px) {
  .circle-list--looped .circle-list__list {
    margin: 20px 0 0 20px;
  }
  .circle-list--looped li {
    margin: -20px 0 0 -20px;
    flex: 0 0 calc(20% + 20px);
    width: calc(20% + 20px);
  }
  .circle-list--looped li _:-ms-input-placeholder,
  :root .circle-list--looped li {
    min-width: calc(20% + 20px);
    max-width: calc(20% + 20px);
  }
  @-moz-document url-prefix() {
    .circle-list--looped li {
      max-width: calc(20% + 20px);
    }
  }
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list--looped .circle-list__list {
    margin: 40px 0 0 40px;
  }
  .circle-list--looped li {
    margin: -40px 0 0 -40px;
    flex: 0 0 calc(33.33333% + 40px);
    width: calc(33.33333% + 40px);
  }
  .circle-list--looped li _:-ms-input-placeholder,
  :root .circle-list--looped li {
    min-width: calc(33.33333% + 40px);
    max-width: calc(33.33333% + 40px);
  }
  @-moz-document url-prefix() {
    .circle-list--looped li {
      max-width: calc(33.33333% + 40px);
    }
  }
}
@media only screen and (min-width: 980px) {
  .circle-list--looped .circle-list__list {
    margin: 20px 0 0 20px;
  }
  .circle-list--looped li {
    margin: -20px 0 0 -20px;
    flex: 0 0 calc(20% + 20px);
    width: calc(20% + 20px);
  }
  .circle-list--looped li _:-ms-input-placeholder,
  :root .circle-list--looped li {
    min-width: calc(20% + 20px);
    max-width: calc(20% + 20px);
  }
  @-moz-document url-prefix() {
    .circle-list--looped li {
      max-width: calc(20% + 20px);
    }
  }
}
@media only screen and (min-width: 1200px) and (min-height: 600px) {
  .circle-list--looped .circle-list__list {
    margin: 40px 0 0 40px;
  }
  .circle-list--looped li {
    margin: -40px 0 0 -40px;
    flex: 0 0 calc(20% + 40px);
    width: calc(20% + 40px);
  }
  .circle-list--looped li _:-ms-input-placeholder,
  :root .circle-list--looped li {
    min-width: calc(20% + 40px);
    max-width: calc(20% + 40px);
  }
  @-moz-document url-prefix() {
    .circle-list--looped li {
      max-width: calc(20% + 40px);
    }
  }
}
.circle-list-item {
  position: relative;
  padding-top: 100%;
  color: #191b1d;
  text-align: center;
  outline: none;
}
.circle-list-item__outline {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  stroke: hsla(0, 0%, 100%, 0.4);
  stroke-width: 1px;
  transition-property: border-color;
}
.circle-list-item--heading .circle-list-item__outline {
  stroke: #191b1d;
}
.circle-list-item__image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-list-item__image__content {
  width: 60px;
}
.circle-list-item__image .icon,
.circle-list-item__image img {
  width: 100%;
  height: auto;
}
.circle-list-item.circle-list-item--fwa .circle-list-item__image__content {
  width: 70px;
}
.circle-list-item__count {
  position: absolute;
  left: 15%;
  top: 15%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background: #fff;
  border: 1px solid rgba(25, 27, 29, 0.4);
  transition-property: background-color, border-color, color;
  color: rgba(25, 27, 29, 0.4);
  line-height: 30px;
  text-align: center;
}
@media only screen and (max-width: 567px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 568px) and (max-aspect-ratio: 13/9) and (max-width: 979px),
  only screen and (min-width: 668px) and (min-height: 416px) and (max-width: 979px) {
  .circle-list-item--rt .circle-list-item__count {
    transform: translate(50%, -50%);
  }
  .circle-list-item--rb .circle-list-item__count {
    transform: translate(50%, 50%);
  }
  .circle-list-item--lb .circle-list-item__count {
    transform: translate(-50%, 50%);
  }
  .circle-list-item--rb .circle-list-item__count,
  .circle-list-item--rt .circle-list-item__count {
    left: auto;
    right: 15%;
  }
  .circle-list-item--lb .circle-list-item__count,
  .circle-list-item--rb .circle-list-item__count {
    top: auto;
    bottom: 15%;
  }
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list-item__image__content {
    width: 110px;
  }
  .circle-list-item.circle-list-item--fwa .circle-list-item__image__content {
    width: 120px;
  }
  .circle-list-item__count {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
}
@media (min-width: 980px) and (max-height: 599px),
  only screen and (min-width: 980px) and (max-width: 1199px) {
  .circle-list-item__image__content {
    width: 94px;
  }
  .circle-list-item.circle-list-item--fwa .circle-list-item__image__content {
    width: 104px;
  }
}
/* .circle-list-item--hoverable:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: #191b1d;
  transition-property: opacity, transform;
  opacity: 0;
}
.circle-list-item--hoverable.is-hovered,
.has-hover .circle-list-item--hoverable:hover {
  color: #fff;
}
.circle-list-item--hoverable.is-hovered:before,
.has-hover .circle-list-item--hoverable:hover:before {
  transform: scale(1.16667);
  opacity: 1;
} */
.circle-list-item--large .circle-list-item__image__content {
  width: 70px;
}
.circle-list-item--large.circle-list-item--fwa
  .circle-list-item__image__content {
  width: 80px;
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list-item--large .circle-list-item__image__content {
    width: 140px;
  }
  .circle-list-item--large.circle-list-item--fwa
    .circle-list-item__image__content {
    width: 150px;
  }
}
@media screen and (min-width: 1440px){
  .circle-list-item--large .circle-list-item__image__content {
    width: 190px;
  }
}
@media (min-width: 980px) and (max-height: 599px),
  only screen and (min-width: 980px) and (max-width: 1199px) {
  .circle-list-item--large .circle-list-item__image__content {
    width: 120px;
  }
  .circle-list-item--large.circle-list-item--fwa
    .circle-list-item__image__content {
    width: 130px;
  }
}
.circle-list-item--small.circle-list-item--fwa
  .circle-list-item__image__content,
.circle-list-item--small .circle-list-item__image__content {
  width: 60px;
}
@media only screen and (min-width: 980px) {
  .circle-list-item--small.circle-list-item--fwa
    .circle-list-item__image__content {
    width: 70px;
  }
}
.circle-list--small .circle-list__list {
  margin: 10px 0 0 10px;
}
.circle-list--small li {
  margin: -10px 0 0 -10px;
}
@media only screen and (min-width: 568px) and (max-aspect-ratio: 13/9),
  only screen and (min-width: 668px) and (min-height: 416px),
  only screen and (min-width: 980px) {
  .circle-list--small .circle-list__list {
    margin: 16px 0 0 16px;
  }
  .circle-list--small li {
    margin: -16px 0 0 -16px;
  }
}
@media only screen and (min-width: 980px) {
  .circle-list--small .circle-list__list {
    margin: 20px 0 0 20px;
  }
  .circle-list--small li {
    margin: -20px 0 0 -20px;
  }
}
.circle-list--scrollable-fixed .circle-list__list,
.circle-list--scrollable .circle-list__list {
  flex-wrap: nowrap;
  padding-bottom: 20px;
  padding-top: 10px;
}
.circle-list--scrollable-fixed li,
.circle-list--scrollable li {
  flex: 1 1 auto;
  width: auto;
  min-width: 120px;
}
.circle-list--scrollable-fixed li _:-ms-input-placeholder,
.circle-list--scrollable li _:-ms-input-placeholder,
:root .circle-list--scrollable-fixed li,
:root .circle-list--scrollable li {
  min-width: 0;
  max-width: 100%;
}
@-moz-document url-prefix() {
  .circle-list--scrollable-fixed li,
  .circle-list--scrollable li {
    max-width: none;
  }
}
.circle-list--scrollable-fixed li {
  max-width: 120px;
}
.landign_scape_textAbout{
  color:#1DCEFE;
  font-size:55px;
  //padding-left:180px
}
@media(max-width:1440px){
  .landign_scape_textAbout{

    padding-left:210px;
  }
}
@media(max-width:768px){
  .landign_scape_textAbout{
    font-size: 40px;
    margin-bottom:60px;
    padding-left:20px;
  }
}
@media(max-width:450px){
  .landign_scape_textAbout{
    font-size: 25px;
    margin-bottom:35px;
    padding-left:20px;
  }
}
</style>
