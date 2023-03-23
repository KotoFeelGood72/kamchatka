<template>
    <div v-if="location" class="location-single">
        <PageHeader class="location-single__header" :data="location.bannerImg">{{ location.name }}</PageHeader>
        <dynamic v-if="location.content" :template="`<div class='location-location__content content-block text--small'><div class='container--middle-tour animated_location'>` + location.content + `</div></div>`"/>
        <div class="create-map_location">
                            <yandex-map :coords="[location.geoPoint.lat, location.geoPoint.long]" zoom="5" :controls="controlYandex">
                                <ymap-marker
                                             marker-id="123"
                                             :coords="[location.geoPoint.lat, location.geoPoint.long]"
                                             :icon="markerIcon"
                                />
                            </yandex-map>
                        </div>
    </div>
</template>

<script>
import PageHeader from '../../components/content/pageHeader';
import {Api} from '../../api/api';
import Dynamic from "../../components/dynamic";
import Heading from "../../components/content/heading";
import $ from 'jquery'
export default {
    name: 'locationSlug',
    components: {
        Heading,
        Dynamic,
        PageHeader
    },
    data() {
        return {
            location: {},
            seo: '',
            coords: [56.322434, 160.844915],
            controlYandex: [],
                  markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '/mapsIcon.png',
                imageSize: [30, 30],
                imageOffset: [0, 0],
                content: '',
                contentOffset: [0, 15],
                contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            },
        };
    },
    head () {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                { hid: 'description', name: 'description', content: this.seo ? this.seo.description : '' },
                { hid: 'image', name: 'image', content: this.location && this.location.bannerImage ? this.location.bannerImage.src : ''},
                { hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : '' },
                { hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : '' },
                { hid: 'og:image', name: 'og:image', content: this.location && this.location.bannerImage ? this.location.bannerImage.src : ''}
            ]
        }
    },
    asyncData ({ route, params, error, payload, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.getBase(`pages/locations/${params.id}?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {

                seo: response.data.seo,
                location:response.data.data
            }
        });
    },
    methods: {
        init() {
            Api.getBase(`pages/locations/${this.$route.params.id}?lang=${this.$i18n.locale}&router=${this.$route.path}`).then((response) => {
                this.seo = response.data.seo;
                this.location = response.data.data;
                let breadCrumbs = [
                    {name: this.location.name}
                ];
                this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
            });
        }
    },
    watch: {
        '$route'() {
            this.init();
        }
    },
    updated(){
    let animate_item_heading = document.querySelectorAll('.animated_location h2, .animated_location p');
    for (let i = 0; i < animate_item_heading.length; i++) {
      animate_item_heading[i].style.opacity = 0;
      animate_item_heading[i].classList.add("animated-text");
    }
    [].forEach.call(document.querySelectorAll('.animate-counter'), function(div) {
     if(parseInt(div.innerText) != NaN){
            div.classList.add('detected-animation')
        }
    });
    },
    mounted() {
  let animate_item_heading = document.querySelectorAll('.animated_location h2, .animated_location p');
    for (let i = 0; i < animate_item_heading.length; i++) {
      animate_item_heading[i].style.opacity = 0;
      animate_item_heading[i].classList.add("animated-text");

    }
    [].forEach.call(document.querySelectorAll('.animate-counter'), function(div) {
        if(parseInt(div.innerText) != NaN){
            div.classList.add('detected-animation')
        }
    });
       var Visible = function() {
      [].forEach.call(
        document.querySelectorAll(
          "animate-counter, .animated_location h2, .animated_location p"
        ),
        function(div) {
          var target = div;
          var targetPosition = {
              top: window.pageYOffset + target.getBoundingClientRect().top,
              left: window.pageXOffset + target.getBoundingClientRect().left,
              right: window.pageXOffset + target.getBoundingClientRect().right,
              bottom: window.pageYOffset + target.getBoundingClientRect().bottom
            },
            windowPosition = {
              top: window.pageYOffset,
              left: window.pageXOffset,
              right: window.pageXOffset + document.documentElement.clientWidth,
              bottom: window.pageYOffset + document.documentElement.clientHeight
            };
          if (
            targetPosition.bottom > windowPosition.top &&
            targetPosition.top < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right
          ) {
        let values = parseInt(div.innerText)
        let div_values = div.innerHTML
        let div_small =  div.querySelector('small')


        if(div.classList.contains('detected-animation')){
          div.classList.remove('detected-animation')
            $({ Counter: 0 }).animate({ Counter: parseInt(div.innerText) }, {
              duration: 2500,
              easing: 'swing',
              step: function () {

                div.innerHTML=Math.ceil(this.Counter)+`<small>${div_small.innerHTML}</small>`;
              },
              complete:function(){
                  div.innerHTML = div_values.toString()
              }
            });

        }
           else if (div.classList.contains("animated-text")) {
              div.classList.remove("animated-text");
              div.classList.add("animated");
              div.classList.add("fadeInLeft");
            }
          } else {
            div.classList.add("animated-text");
            div.classList.remove("animated");
            div.classList.remove("fadeInLeft");
            div.style.opacity = 0;
          }
        }
      );
    };
    window.addEventListener("scroll", function() {
      Visible();
    });
        let breadCrumbs = [
            {name: this.location && this.location.name}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .create-map_location{
        width: 100%;
        height: 550px;
          .ymap-container {
            height: 100%;
        }
    }
    .location-single {
        background: url("~assets/img/aboutUs/bg.svg") center center #ffffff;
        background-size: 100%;
        color: #2a2e39;
        margin-top:-1px;
        .page-header {
            position: relative;
        }
        .location-single__header{
            /deep/ h1{
                       color: color(white);
      font-size: 80px;
      line-height: 1.5;
      max-width: 950px;
      @include respond-to(lg) {
        font-size: 60px;
        line-height: 1.5;
        max-width: 450px;
      }
      @include respond-to(sm) {
        font-size: 40px;
        line-height: 1.5;
      }
            }
        }
            /deep/.display-flex-number {
            max-width: 1460px;
            margin-top: 75px;
            flex-direction: column;
            @include respond-to(lg) {
                max-width: 950px;
            }
            @include respond-to(md) {
                margin-top: 32px;
            }
            &__item {
                min-width: 50%;
                padding-right: 25px;
                .heading--size-xl {
                    margin-top: 25px;
                    color: color(blueKM);
                    @include respond-to(lg) {
                        font-size: 96px;
                        line-height: 1.5
                    }
                    @include respond-to(md) {
                        font-size: 72px;
                    }
                    @include respond-to(sm) {
                        font-size: 35px;
                        margin-top: 10px;
                    }
                }
                .how-to-get__flight-types-desc {
                    color: color(marengo);
                    font-size: 34px;
                    line-height: 1.5;
                    margin-top: 15px;
                    @include respond-to(lg) {
                        font-size: 34px;
                        line-height: 1.5;
                    }
                    @include respond-to(md) {
                        font-size: 24px;
                        margin-bottom: 1.3em;
                    }
                    @include respond-to(sm) {
                        font-size: 18px;
                    }
                }
            }
        }
    }

    .location-location__content {
        padding-top: 40px;
        padding-bottom: 100px;
        /deep/img {
            margin: 20px 0;
            width: 100vw;
            margin-left: -50vw;
            left: 50%;
            position: relative;
            max-width: 100vw;
        }
    }
    /deep/ .content-block h2 {
        font-weight: 800!important;
        padding-top: 1.2em;
        line-height: 1.5;

    }

    /deep/ .content-block p {
        margin: 15px 0;
    }

</style>
