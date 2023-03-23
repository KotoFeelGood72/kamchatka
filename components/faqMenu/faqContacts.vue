<template>
  <div class="faqcontacts container">
    <div class="faqcontacts__title">Ответим на все ваши вопросы</div>
    <div class="faqcontacts__connect">
      <div class="faqcontacts__withus"><a @click.prevent="changeOpenFeedback" href="">Отправиться в путешествие</a></div>
      <div class="faqcontacts__icons">
        <a
          v-for="(item, index) in icons"
          :key="'icon-' + index"
          target="_blank"
          rel="nofollow"
          :href="item.url"
        >
          <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            :src="item.src"
            class="faqcontacts__icon--small"
          />
        </a>
      </div>
    </div>
    <div class="faqcontacts__tel"><a :href="'tel:' + phone" v-html="phone" /></div>
    <div class="faqcontacts__mail"><a :href="'mailto:' + email" v-html="email" /></div>
    <div class="faqcontacts__bigicons">
        <a v-for="(item, index) in socials" :key="'social-' + index"
          target="_blank"
          rel="nofollow"
          :title="$t('footer.' + [item.icon])"
          :href="item.url"
        >
          <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            :src="item.src"
            class="faqcontacts__icon--big"
          />
        </a>
    </div>
    <div class="faqcontacts__smallicons">
        <a v-for="(item, index) in socials" :key="'social-min-' + index"
          target="_blank"
          rel="nofollow"
          :href="item.url"
          >
            <nuxt-img
                loading="lazy"
                format="webp"
                quality="75"
                :src="item.srcMin"
                class="faqcontacts__icon--big"
            />
        </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqContacts',
  props: ['title', 'notShowContacts', 'classPage'],
  data() {
    return {
      phone: '+7 924 780 44 11',
      email: 'info@enjoykamchatka.ru',
      icons: [
        {
          icon: 'whatsapp',
          url: 'https://wa.me/79247804411',
          src: require('assets/img/faq/whatsapp1.svg')
        },
        {
          icon: 'telegram',
          url: 'https://telegram.im/@EnjoyKamchatka',
          src: require('assets/img/faq/telegram1.svg')
        },
        {
          icon: 'phone',
          url: 'tel:79247804411',
          src: require('assets/img/faq/viber1.svg')
        }
      ],
      socials: [
        {
          icon: 'facebook',
          url: 'https://www.facebook.com/enjoykamchatka/',
          src: require('assets/img/faq/facebook.svg'),
          srcMin: require('assets/img/faq/facebook-min.svg')
        },
        {
          icon: 'instagram',
          url: 'https://www.instagram.com/enjoykamchatka/',
          src: require('assets/img/faq/instagram.svg'),
          srcMin: require('assets/img/faq/instagram-min.svg')
        },
        {
          icon: 'youtube',
          url: 'https://www.youtube.com/channel/UCiCctSojN47lZ-O2_bAeSpw/featured',
          src: require('assets/img/faq/youtube.svg'),
          srcMin: require('assets/img/faq/youtube-min.svg')
        },
        {
          icon: 'tripadvisor',
          url: 'https://www.tripadvisor.ru/Attraction_Review-g298492-d13277122-Reviews-Enjoy_Kamchatka-Petropavlovsk_Kamchatsky_Kamchatka_Krai_Far_Eastern_District.html',
          src: require('assets/img/faq/tripadvisor.svg'),
          srcMin: require('assets/img/faq/tripadvisor-min.svg')
        },
        {
          icon: 'newYorkTimes',
          url: 'https://www.nytimes.com/2019/10/07/travel/russia-kamchatka-bears-volcanoes.html',
          src: require('assets/img/faq/nyt.svg'),
          srcMin: require('assets/img/faq/nyt-min.svg')
        }
      ]
    };
  },
  computed: {
    isShowFeedback() {
      return this.$store.getters['getIsShowFeedback']();
    }
  },
  methods: {
    changeOpenFeedback() {
      this.$store.dispatch('changeIsShowFeedback', !this.$store.getters['getIsShowFeedback']());
    }
  }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .faqcontacts {
        width: 100%;
        padding-left: 194px;
        padding-bottom: 230px;

        @include respond-to(lg) {
            padding-left: 0;
            padding-bottom: 167px;
        }

        @include respond-to(sm) {
            padding-left: 24px;
            padding-bottom: 107px;
        }

        &__title {
            width: 800px;
            height: 220px;
            font-family: 'Mpluse1p';
            font-style: normal;
            font-weight: 800;
            font-size: 80px;
            line-height: 100%;
            color: #163E97;
            margin-bottom: 35px;

            @include respond-to(lg) {
                font-size: 60px;
                width: 600px;
                height: 140px;
                margin-bottom: 63px;
            }

            @include respond-to(sm) {
                font-size: 36px;
                width: 100%;
                height: 80px;
                margin-bottom: 32px;
                max-width: 300px;
            }
        }

        &__connect {
            margin-bottom: 77px;
            display: flex;

            @include respond-to(sm) {
                flex-direction: column;
                margin-bottom: 34px;
            }
        }

        &__withus {
            font-family: 'Mpluse1p';
            font-style: normal;
            font-weight: 500;
            font-size: 30px;
            line-height: 36px;
            margin-right: 50px;
            color: #163E97;
            text-decoration: underline;

            @include respond-to(sm) {
                font-size: 20px;
            }
        }

        &__icons {

            @include respond-to(sm) {
                margin-top: 24px;
            }
        }

        &__icon {

            &--small {
                width: 40px;
                height: 40px;
                object-fit: cover;
                margin-right: 40px;
            }

            &--big {
                width: 60px;
                height: 61px;
                object-fit: cover;
                margin-right: 60px;

                @include respond-to(sm) {
                    margin-right: 16px;
                }
            }
        }

        &__tel, &__mail {
            font-style: normal;
            font-weight: 600;
            font-size: 30px;
            line-height: 120%;

            @include respond-to(sm) {
                font-size: 16px;
            }
        }

        &__mail {
            margin-top: 12px;
            margin-bottom: 52px;

            @include respond-to(sm) {
                margin-top: 17px;
            }
        }

        &__bigicons {

            @include respond-to(sm) {
                display: none;
            }
        }

        &__smallicons {
            display: none;

            @include respond-to(sm) {
                display: flex;
            }
        }
    }
</style>
