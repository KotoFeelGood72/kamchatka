<template>
    <client-only>
        <div v-if="activity.intro" class="activity-slug">
            <PageHeader
                v-if="activity.intro.bannerImage"
                :data="activity.intro.bannerImage"
                class="activity-slug__header"
            >{{activity.intro.bannerText}}</PageHeader>
            <div class="container--middle-tour activity-slug__content text--small">
                <Heading
                    v-if="activity.intro.title"
                    tag="h2"
                    color="lightBlue"
                    size
                    v-html="activity.intro.title"
                />
                <div
                    v-if="activity.intro.text"
                    class="text--small upper-video__content text-controller"
                    v-html="activity.intro.text"
                />
                <div v-if="activity.intro.video && activity.intro.videoImg" class="activity-slug__video">
                    <videoEmbed isContainer="true" :url="activity.intro.video" :data="activity.intro.videoImg" />
                </div>
                <ContentImage
                    isBack="true"
                    v-for="(img, i) in activity.intro.images"
                    :key="'images-' + i"
                    :data="img"
                />
                <Heading
                    class="under-ing__heading"
                    v-if="activity.intro.bottomTitle"
                    tag="h2"
                    color="lightBlue"
                    size
                    v-html="activity.intro.bottomTitle"
                />
                <div
                    v-if="activity.intro.bottomText"
                    class="text--small text-controller"
                    v-html="activity.intro.bottomText"
                />
            </div>
            <div class="container grid__container-block">
                <Heading v-if="$t('home.activity')" tag="h2" color="black" size v-html="$t('home.activity')" />
                <grid
                    v-if="activity && activity.activities && activity.activities.length"
                    :data="activity.activities"
                />
            </div>
            <div class="container tour-item__navigation">
                <div v-if="activity.previous || activity.next" class="tour-item__change">
                    <div v-if="activity.previous" class="tour-item__change-item previews">
                        <nuxt-link
                            :to="$i18n.locale === 'en' ? '/activities/' + activity.previous.slug + '/' : '/activities/' + activity.previous.slug + '/'"
                        >
                            <!-- <arrow-long v-if="screen.width < 767" /> -->
                            {{screen.width > 767 ? activity.previous.name : $i18n.locale === 'en' ? 'Previous' : 'Назад'}}
                        </nuxt-link>
                    </div>
                    <div v-if="activity.next" class="tour-item__change-item next">
                        <nuxt-link
                            :to="$i18n.locale === 'en' ? '/activities/' + activity.next.slug + '/' : '/activities/' + activity.next.slug + '/'"
                        >
                            {{screen.width > 767 ? activity.next.name : $i18n.locale === 'en' ? 'Next' : 'Вперед'}}
                            <!-- <arrow-long v-if="screen.width < 767" /> -->
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>
<script>
import PageHeader from "../../components/content/pageHeader";
import Heading from "../../components/content/heading";
import { Api } from "../../api/api";
import ContentImage from "../../components/content/contentImage";
import VideoEmbed from "../../components/content/videoEmbed";
import Grid from "../../components/grid/grid";

export default {
  name: "activityactivity-slug",
  components: {
    Grid,
    VideoEmbed,
    ContentImage,
    Heading,
    PageHeader,
    ArrowLong
  },
  head() {
    return {
      title: this.seo ? this.seo.title : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo ? this.seo.description : ""
        },
        {
          hid: "image",
          name: "image",
          content:
            this.data && this.data.intro && this.data.intro.bannerImage
              ? this.data.intro.bannerImage.src
              : ""
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.seo ? this.seo.title : ""
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.seo ? this.seo.description : ""
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            this.data && this.data.intro && this.data.intro.bannerImage
              ? this.data.intro.bannerImage.src
              : ""
        }
      ]
    };
  },
  data() {
    return {
      activity: {},
      seo: "",
      screen: this.$store.getters.SCREEN
    };
  },
  asyncData({ route, params, error, payload, store }) {
    let lang = "";
    if (route.name.indexOf("_en") >= 0) {
      lang = "en";
    } else {
      lang = "ru";
    }
    return Api.get(
      `activities/${params.id}?lang=${store.$i18n.locale}&router=${route.path}`
    ).then(response => {
      if(response.data.data.length === 0){
        error({ statusCode: 404 })
      }
       return {
        seo: response.data.seo,
        activity: response.data.data
      }
    });
  },
  methods: {
    init() {
      Api.get(
        `activities/${this.$route.params.id}?lang=${this.$i18n.locale}&router=${this.$route.path}`
      ).then(response => {
        this.seo = response.data.seo;
        this.activity = response.data.data;
        let breadCrumbs = [
          { name: "breadCrumbs.activities", link: "/activities" },
          {
            name:
              this.activity.intro && this.activity.intro.bannerText
                ? this.activity.intro.bannerText
                : "Активность"
          }
        ];
        this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
      });
    }
  },
  watch: {
    $route() {
      this.init();
    }
  },
  created() {
    this.$store.commit("TRANSPARENT", true);
    let breadCrumbs = [
      { name: "breadCrumbs.activities", link: "/activities" },
      {
        name:
          this.activity.intro && this.activity.intro.bannerText
            ? this.activity.intro.bannerText
            : "Активность"
      }
    ];
    this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
  },
  mounted() {
    this.$store.commit("TRANSPARENT", true);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
@import "wow.js/css/libs/animate.css";
.text-controller{
   font-family: "Montserrat";
        font-weight: 400;
        color: #2a2e39;
}
.upper-video__content {
  margin-bottom: 94px;
  @include respond-to(lg) {
    margin-bottom: 52px;
  }
  @include respond-to(md) {
    margin-bottom: 62px;
  }
  @include respond-to(sm) {
    margin-bottom: 46px;
  }
}
.under-ing__heading {
  margin-top: 115px;
  @include respond-to(lg) {
    margin-top: 59px;
  }
  @include respond-to(md) {
    margin-top: 78px;
  }
  @include respond-to(sm) {
    margin-top: 48px;
  }
}
.activity-slug {
  /*background-color: color(black);*/
  background-image: url("~assets/img/activity/gora_activity bg.svg");
  background-color: #fbfbfb;
  background-position-y: 56%;
  background-size: contain;
  background-repeat: no-repeat;
  padding-bottom: 0;
  /deep/.page-header {
    height: 100vh;
  }
    .page-header {
        position: relative;
    }
  .activity-slug__header {
    /deep/h1 {
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
  .activity-slug__content {
    padding-top: 100px;
    @include respond-to(lg) {
      padding-top: 75px;
    }
    @include respond-to(md) {
      padding-top: 40px;
    }
    /deep/.heading {
      max-width: 1200px;
      line-height: 1.5;
      @include respond-to(md) {
        font-size: 30px;
        line-height: 1.5;
      }
      @include respond-to(sm) {
        font-size: 22px;
        line-height: 1.5;
      }
    }
    .text--small {
      margin-top: 26px;
      max-width: 1280px;
      @include respond-to(md) {
        font-size: 16px;
        line-height: 1.5;
        margin-top: 22px;
      }
      @include respond-to(sm) {
        font-size: 14px;
        line-height: 1.5;
        margin-top: 14px;
      }
      /deep/div,
      p {
        font-family: "Montserrat";
        font-weight: 400;
      }
    }
    .activity-slug__video,
    .content-image {
      /deep/.video-embed {
        margin: 0px 0 0px;
      }
      margin: 0px 0 0px;
      @include respond-to(lg) {
        // margin: 52px 0 59px;
      }
      @include respond-to(md) {
        // margin: 62px 0 78px;
      }
      @include respond-to(sm) {
        // margin: 46px 0 48px;
      }
      /deep/.img__container {
        width: 100vw;
        margin-left: -50vw;
        left: 50%;
        position: relative;
        img {
          display: block;
        }
      }
    }
  }
  .grid__container-block {
    margin-top: 94px;
    @include respond-to(md) {
      margin-top: 56px;
    }
    /deep/.heading {
      font-size: 70px;
      line-height: 1.5;
      margin-bottom: 36px;
      @include respond-to(md) {
        font-size: 50px;
        line-height: 1.5;
        margin-bottom: 18px;
      }
      @include respond-to(sm) {
        font-size: 30px;
        line-height: 1.5;
        padding-left: 25px;
      }
    }
  }
  .tour-item__navigation {
    padding: 0;
    .tour-item__change {
      @include respond-to(sm) {
        .tour-item__change-item {
          width: 50%;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;

          &.next {
            background: #000;
            a {
              color: #43495c;
            }
            /deep/svg {

              margin-left: 20px;
                transform: rotate(180deg);
            }
          }
          &.previews {
            background: #364868;
            a {
              color: #171920;
            }
            /deep/svg {
              // margin-left: 16px;
              margin-right: 20px;
                transform: rotate(0deg);
              path {
                fill: #171920;
              }
            }
          }

          a {
            font-weight: 600;
            font-size: 16px;
            line-height: 1.5;
            border-bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .tour-item__change {
    display: flex;
    padding: 50px 0;
    justify-content: space-between;
    @include respond-to(sm) {
      padding: 18px 0;
    }

    .tour-item__change-item {
      @include respond-to(md) {
        max-width: 300px;
      }
      a {
        font-size: 22px;
        line-height: 1.5;
        color: color(lightblue);
        border-bottom: 2px solid color(lightblue);
        text-decoration: none;

        &:hover {
          color: #1dcfff;
          border-color: #1dcfff;
        }
      }
    }
  }
}
</style>
