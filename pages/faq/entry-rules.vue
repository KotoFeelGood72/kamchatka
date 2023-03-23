<template>
  <div class="faq-content entry-rules">
    <FaqMenu />
    <div v-if="data.length" class="container--middle page-content text--small">
      <div v-for="(entry, index) in data" :key="index">
        <Heading
          v-if="entry.title && entry.underlineTitle"
          tag="p"
          color="granite"
          size="sm"
          fw="600"
          underline="bottom"
          v-html="entry.title"
        />
        <Heading
          v-if="entry.title && !entry.underlineTitle"
          tag="p"
          color="granite"
          size="sm"
          fw="600"
          v-html="entry.title"
        />
        <div v-if="entry.text" v-html="entry.text" />
        <contentImage isBack="true" v-if="entry.img" width="fullwidth" :data="entry.img" />
      </div>
      <divider type="double" align="center" />
    </div>
  </div>
</template>

<script>
import FaqMenu from "../../components/faqMenu/faqMenu";
import Heading from "../../components/content/heading";
import ContentImage from "../../components/content/contentImage";
import Divider from "../../components/content/divider";
import { Api } from "../../api/api";

export default {
  name: "entryRules",
  components: {
    FaqMenu,
    ContentImage,
    Divider,
    Heading
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
          content: "https://new.enjoykamchatka.ru/contacts-header.png"
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
          content: "https://new.enjoykamchatka.ru/contacts-header.png"
        }
      ]
    };
  },
  data() {
    return {
      data: {},
      seo: ""
    };
  },
  asyncData({ route, params, store }) {
    let lang = "";
    if (route.name.indexOf("_en") >= 0) {
      lang = "en";
    } else {
      lang = "ru";
    }
    return Api.get(`entry-rules?lang=${store.$i18n.locale}&router=${route.path}`).then(
      response => {
        return {
          seo: response.data.seo,
          data: response.data.data ? response.data.data.rules : []
        };
      }
    );
  },
  created() {
    let breadCrumbs = [{ name: "breadCrumbs.faqEntry" }];
    this.$store.dispatch("changeBreadcrumbs", breadCrumbs);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/_config.scss";
@import "~assets/scss/_mixins.scss";
.container--middle {
  @include respond-to(lg) {
    max-width: initial !important;
    width: 1020px;
    padding: 0;
  }

  @include respond-to(md) {
    width: 650px;
  }

  @include respond-to(sm) {
    padding: 0 10px;
  }
}

.faq-content {
  @include respond-to(md) {
    background-image: none;
  }
}

/deep/ p {
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

/deep/ .heading {
  font-family: "Mpluse1p";
  font-weight: 800;
  font-size: 50px;
  line-height: 1.5;
  margin-top: 80px;
  margin-bottom: 24px;
  color: #43495c;

  @include respond-to(lg) {
    font-size: 40px;
    margin-top: 50px;
    margin-bottom: 15px;
  }

  @include respond-to(md) {
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  &--underline-bottom {
    color: #2a2e39;
  }
}

/deep/ .content-image {
  margin-bottom: 70px;

  @include respond-to(md) {
    margin: 15px 0;
  }

  @include respond-to(sm) {
    margin: 30px 0;
  }
}

/deep/ .page-content > div:first-child .heading {
  font-size: 36px;
  line-height: 1.5;
  font-weight: 500;

  @include respond-to(lg) {
    font-size: 28px;
    line-height: 1.5;
    margin-top: 60px;
    margin-bottom: 0;
  }

  @include respond-to(md) {
    font-size: 22px;
    line-height: 1.5;
    margin-top: 40px;
  }

  @include respond-to(sm) {
    font-size: 18px;
    line-height: 1.5;
    margin-top: 24px;
  }

  &:after {
    margin: 20px 0;

    @include respond-to(sm) {
      margin: 16px 0;
    }
  }
}

/deep/ .page-content {
  @include respond-to(lg) {
    padding-top: 0;
  }

  @include respond-to(md) {
    padding-bottom: 0;
  }
}

/deep/ .content-divider {
  @include respond-to(md) {
    margin: 40px auto;
  }

  @include respond-to(sm) {
    margin: 20px auto;
  }
}
</style>
