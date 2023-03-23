<template>
  <div v-if="blog" class="blog-entry">
    <PageHeader v-if="blog.banner" :data="blog.banner">{{ blog.name }}</PageHeader>
    <dynamic
      v-if="blog.content"
      :template="`<div class='text--small content-block animated-blog blog__item_ullishka'><div class='container blog__item_ullishka'>` + blog.content + `</div></div>`"
    />

<!--    <div class="container">-->
<!--      <social-sharing-->
<!--        :url="this.url"-->
<!--        :title="blog.name"-->
<!--        :description="this.seo && false ? this.seo.description : ''"-->
<!--        inline-template-->
<!--      >-->
<!--        <div class="blog__social">-->
<!--          <network network="telegram" :class="$parent.myClasses">-->
<!--            <nuxt-img-->
<!--                loading="lazy"-->
<!--                format="webp"-->
<!--                quality="75"-->
<!--                src="~assets/img/blog/svg/telegram_icon.svg"-->
<!--                alt="Телеграм"-->
<!--            />-->
<!--          </network>-->
<!--          <network network="vk" :class="$parent.myClasses">-->
<!--            <nuxt-img-->
<!--                loading="lazy"-->
<!--                format="webp"-->
<!--                quality="75"-->
<!--                src="~assets/img/blog/svg/vkontakte.svg"-->
<!--                alt="ВКонтакте"-->
<!--            />-->
<!--          </network>-->
<!--          <network network="facebook" :class="$parent.myClasses">-->
<!--            <nuxt-img-->
<!--                loading="lazy"-->
<!--                format="webp"-->
<!--                quality="75"-->
<!--                src="~assets/img/blog/svg/facebook.svg"-->
<!--                alt="Фейсбук"-->
<!--            />-->
<!--          </network>-->
<!--           <network network="twitter" :class="$parent.myClasses">-->
<!--            <nuxt-img-->
<!--                loading="lazy"-->
<!--                format="webp"-->
<!--                quality="75"-->
<!--                src="~assets/img/blog/svg/tw.svg"-->
<!--                alt="Фейсбук"-->
<!--            />-->
<!--          </network>-->
<!--           <network network="whatsapp" :class="$parent.myClasses">-->
<!--            <nuxt-img-->
<!--                loading="lazy"-->
<!--                format="webp"-->
<!--                quality="75"-->
<!--                src="~assets/img/blog/svg/wa.svg"-->
<!--                alt="Фейсбук"-->
<!--            />-->
<!--          </network>-->
<!--        </div>-->
<!--      </social-sharing>-->
<!--    </div>-->
  </div>
</template>

<script>
import PageHeader from "../../components/content/pageHeader";
import { Api } from "../../api/api";
import Dynamic from "../../components/dynamic";

export default {
  name: "blogEntry",
  components: {
    Dynamic,
    PageHeader
  },
  data() {
    return {
        blog: "",
        seo: "",
        url: ""
    };
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
          content: this.blog && this.blog.banner ? this.blog.banner.src : ""
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
          content: this.blog && this.blog.banner ? this.blog.banner.src : ""
        }
      ]
    };
  },
  asyncData({ route, params, error, payload, store }) {
    let lang = "";
    if (route.name.indexOf("_en") >= 0) {
      lang = "en";
    } else {
      lang = "ru";
    }
    return Api.get(`blog/${params.id}?lang=${store.$i18n.locale}&router=${route.path}`).then(
      response => {
      if(response.data.data.length === 0){
          error({ statusCode: 404 })
      }
        return {
          seo: response.data.seo,
          blog: response.data.data
        };
      }
    );
  },
  methods: {
    init() {
      Api.get(
        `blog/${this.$route.params.id}?lang=${this.$i18n.locale}&router=${this.$route.path}`
      ).then(response => {
        this.seo = response.data.seo;
        this.blog = response.data.data;
        let breadCrumbs = [
          { name: "breadCrumbs.blog", link: "/blog" },
          { name: this.blog.name }
        ];
        this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
      });
    },
  },
  watch: {
    $route() {
      this.init();
    }
  },
  updated() {
    let animate_item_heading = document.querySelectorAll(
      ".animated-blog h4, .animated-blog h3, .animated-blog p, .animated-blog ul, .animated-blog h1, .text--blue, .animated-blog h2"
    );
    for (let i = 0; i < animate_item_heading.length; i++) {
      animate_item_heading[i].style.opacity = 0;
      animate_item_heading[i].classList.add("animated-text");
    }
  },
  mounted() {
    let animate_item_heading = document.querySelectorAll(
      ".animated-blog h4, .animated-blog h3, .animated-blog p, .animated-blog ul, .animated-blog h1, .text--blue, .animated-blog h2"
    );
    for (let i = 0; i < animate_item_heading.length; i++) {
      animate_item_heading[i].style.opacity = 0;
      animate_item_heading[i].classList.add("animated-text");
    }

    var Visible = function() {
      [].forEach.call(
        document.querySelectorAll(
          ".animated-blog h4, .animated-blog h3, .animated-blog p, .animated-blog ul, .animated-blog h1, .text--blue, .animated-blog h2"
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
            if (div.classList.contains("animated-text")) {
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
      { name: "breadCrumbs.blog", link: "/blog" },
      { name: this.blog.name }
    ];
    this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
    this.url = window.location.href;
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/config";
@import "~assets/scss/mixins";
/deep/ .container {
  width: 1200px;
  max-width: initial;
  padding: 0;

   @include respond-to(custom) {
    max-width: 1040px !important;
  }
  @include respond-to(lg) {
    max-width: 1040px !important;
  }
  @include respond-to(md){
    max-width: 660px!important;
  }
  @include respond-to(sm) {
    max-width: 100% !important;
   padding: 0 25px;
  }
  @include respond-to(customMobile) {
    max-width: 100% !important;
    padding-left: 25px;
    padding-right: 25px;
  }
}
ul{
  font-family: "Montserrat";
    font-weight: 400;
    margin: 10px 0;
    line-height: 1.5;
}
.blog-entry {
  padding-bottom: 30px;
    .page-header {
        position: relative;
    }
  &__content {
    padding-bottom: 50px;
  }
  /deep/.page-header__title {
    line-height: 1.5;
    font-size: 70px;
    width: 700px;
    @include respond-to(md) {
      line-height: 1.5;
      font-size: 60px;
      width: 100%;
    }
    @include respond-to(sm) {
      font-size: 35px;
      line-height: 1.5;
    }
  }
  /deep/p {
    font-family: "Montserrat";
    font-weight: 400;
    margin: 10px 0;
    line-height: 1.5;
  }
  /deep/h2 {
    position: relative;
    color: #0052d4;
    font-weight: bold;
    font-size: 50px;
    line-height:1.5;
    margin-top: 50px;
    margin-bottom: 20px;
    @include respond-to(lg) {
      font-size: 40px;
      line-height: 1.5;
    }
    @include respond-to(sm) {
      font-size: 30px;
      line-height: 1.5;
    }
    @include respond-to(xs) {
      font-size: 26px;
      line-height: 1.5;
    }
    &::after {
      content: "";
      position: absolute;
      background-image: url("~assets/img/blogEntry/union.svg");
      height: 40px;
      width: 100%;
      background-repeat: no-repeat;
      left: -35%;
      top: 0;
      @include respond-to(md) {
        left: -50%;
      }
      @include respond-to(sm) {
        left: -60%;
      }
      @include respond-to(customMobile) {
        display: none;
      }
    }
  }

  &__header {
    width: 100%;
    height: 100vh;
    background: url("~assets/img/blogEntry/bg-header.png") no-repeat;
    background-size: cover;
    padding: 100px 0;
    display: flex;
    margin-top: 60px;

    @include respond-to(custom425) {
      height: 50vh;
      padding-top: 0 !important;
      padding-bottom: 190px;
    }
  }

  &__header-container {
    margin-top: auto;
    margin-bottom: auto;

    h1 {
      margin: 0 !important;
      color: color(white) !important;
    }
  }
}

.blog-entry__socials {
  div:first-child {
    margin-left: 0;
  }
  div {
    margin-left: 20px;
    img {
      max-width: 100%;
    }
  }
}

/deep/ .page-header {
  height: 100vh;

  &__title {
    line-height: 1.5;
    font-size: 70px;
    width: 700px;

    @include respond-to(md) {
      line-height: 1.5;
      font-size: 60px;
      width: 100%;
    }
  }
}
/deep/.info-slider__counter span:first-child{
    line-height: 1.5;
    @include respond-to(md) {
      line-height: 1.5;
    }
}
/deep/ .content-block {
  .info-slider {
    margin-top: 75px;
    margin-bottom: 90px;
    min-height: 900px;

    @include respond-to(lg) {
      min-height: 640px;
      margin-top: 50px;
      margin-bottom: 50px;
    }

    @include respond-to(md) {
      min-height: initial;
      margin-top: 30px;
      margin-bottom: 30px;
      max-height: initial;
    }

    @include respond-to(sm) {
      margin-bottom: 0;
    }

    &__content-wrapper {
      padding: 195px;
      padding-bottom: 60px;

      @include respond-to(lg) {
        padding: 130px;
        padding-bottom: 60px;
      }

      @include respond-to(md) {
        padding: 60px;
        height: 384px;
      }

      @include respond-to(sm) {
        padding-left: 25px;
        padding-right: 25px;
        height: 384px;
      }
    }

    &__arrows {
      bottom: 80px;

      @include respond-to(lg) {
        bottom: 60px;
      }

      @include respond-to(md) {
        bottom: 34px;
      }
      @include respond-to(sm) {
       bottom:initial;
        top:10px;
      }

      .arrow {
        font-size: 60px;
        line-height: 1.5;
        width: 70px;
        height: 70px;

        @include respond-to(lg) {
          width: 60px;
          height: 60px;
        }

        @include respond-to(sm) {
          width: 30px;
          height: 30px;
          margin-top:30px;
        }

        &.icon-arrow-left {
          @include respond-to(lg) {
            margin-right: 100px;
          }

          @include respond-to(sm) {
            margin-right: 60px;
          }
        }
      }
    }

    &__title {
       font-size:30px;
      line-height:1.5;
      @include respond-to(lg) {
        padding-bottom: 36px;
        padding-top: 26px;
        font-size: 25px;
        line-height: 1.5;
      }
   @include respond-to(md) {
            font-size: 20px;
            line-height: 1.5;
          }
      @include respond-to(sm) {
        padding-bottom: 14px;
        padding-top: 26px;
        font-size: 17px;
        line-height: 1.5;
      }

      a {
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 4;*/
        /*-webkit-box-orient: vertical;*/
        overflow: hidden;
        border: none;
        font-size:30px;
        line-height: 1.5;
         @include respond-to(lg) {
            font-size: 25px;
            line-height: 1.5;
          }
          @include respond-to(md) {
            font-size: 20px;
            line-height: 1.5;
          }
          @include respond-to(sm) {
            font-size: 17px;
            line-height: 1.5;
          }
      }
    }

    &__content {
      font-size: 16px;
      line-height: 1.5;

      @include respond-to(sm) {
        font-size: 14px;
        line-height: 1.5;
      }
    }

    .icon-arrow-right {
      &:hover {
        background-image: url("~assets/img/menu/icons/strelki/r-b.svg");
      }
    }

    .icon-arrow-left {
      &:hover {
        background-image: url("~assets/img/menu/icons/strelki/l-b.svg");
      }
    }

    .slick-current {
      @include respond-to(sm) {
        height: initial;
      }
    }

    &__img-wrapper {
      min-height: 100px;

      @include respond-to(sm) {
        height: 100vw;
      }
    }
  }

  .container > img {
    max-width: initial;
    width: 100vw;
    position: relative;
    margin-left: -50vw;
    left: 50%;
    height: 800px;
    object-fit: cover;
    margin-top: 80px;
    margin-bottom: 0;

    & + * {
      margin-top: 70px;
    }

    @include respond-to(lg) {
      margin-top: 46px;
      height: 600px;

      & + * {
        margin-top: 50px;
      }
    }

    @include respond-to(md) {
      height: 400px;

      & + * {
        margin-top: 40px;
      }
    }

    @include respond-to(sm) {
      margin-top: 10px;
      height: 375px;

      & + * {
        margin-top: 40px;
      }
    }
  }
}

/deep/ .text--small {
  line-height: 1.5;
  @include respond-to(md) {
    font-size: 16px;
    line-height: 1.5;
  }

  @include respond-to(sm) {
    font-size: 14px;
    line-height: 1.5;
  }
}

/deep/ .container {
  h2 {
    padding: 0;
    margin-top: 114px;
    line-height: 1.5;
    @include respond-to(lg) {
      margin-top: 60px;
    }

    @include respond-to(md) {
      font-size: 30px;
      margin-top: 52px;
      margin-bottom: 15px;

      &:after {
        background-size: contain;
        height: 25px;
        left: -35%;
      }
    }

    @include respond-to(sm) {
      font-size: 26px;
      margin-top: 30px;
      margin-bottom: 5px;

      &:after {
        display: none;
      }
    }

    &:nth-of-type(2) {
      &:after {
        display: none;
      }
    }
  }

  .text--blue {
    color: #163e97 !important;
    font-weight: 500;
    font-family: "Montserrat";
    line-height: 1.5;

    & > p {
      color: #163e97 !important;
      font-weight: 500;
      font-family: "Montserrat";
      line-height: 1.5;
    }

    @include respond-to(lg) {
      margin: 30px 0;
      font-size: 18px;
      line-height: 1.5;

      & > p {
       font-size: 18px;
        line-height: 1.5;
      }
    }

    @include respond-to(md) {
      margin: 16px 0;
      font-size: 16px;
      line-height: 1.5;

      & > p {
        font-size: 16px;
        line-height: 1.5;
      }
    }

    @include respond-to(sm) {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.5;

      & > p {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}

/deep/ .page-header .container {
  width: 1530px;
  max-width: 1530px;

  @include respond-to(lg) {
    width: 1020px;
    max-width: 1020px;
  }

  @include respond-to(md) {
    width: 650px;
    max-width: 650px;
  }

  @include respond-to(sm) {
    width: 325px;
    max-width: 325px;
  }
}
</style>

<style lang="scss">
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
.blog__social {
  display: flex;
  margin-top: 120px;
  margin-bottom: 200px;

  @include respond-to(lg) {
    margin-top: 70px;
    margin-bottom: 90px;
  }
  @include respond-to(sm) {
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
  }
  @include respond-to(lg) {
    margin-top: 50px;
    margin-bottom: 75px;
  }

  @include respond-to(lg) {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  span {
    outline: none;
    margin-right: 60px;
    cursor: pointer;

    @include respond-to(lg) {
      margin-right: 20px;
    }
  }

  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    display: block;

    @include respond-to(lg) {
      width: 110px;
      height: 110px;
    }

    @include respond-to(md) {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
