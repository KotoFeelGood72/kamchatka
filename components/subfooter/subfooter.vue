<template>
    <div class="container--middle subfooter">
        <h3 class="subfooter__heading text--middle" v-html="$t('faq.answerQuestions')"/>
        <ContactUs/>
        <Socials/>
    </div>
</template>

<script>
import ContactUs from '../../shared/layouts/ContactUs';
import Socials from '../../shared/layouts/Socials';

export default {
    name: 'subFooter',
    components: {
        Socials,
        ContactUs
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .subfooter {
        padding-top: 140px;
        padding-bottom: 140px;
        font-size: 30px;
        font-weight: 700;
    }

    .subfooter__heading {
        font-weight: 900;
        color: color(blueScreen);
        margin-bottom: 100px;
    }

    /deep/ .contact-us__row {
        a, a::before {
            color: color(blueScreen);
        }
    }

    /deep/ .contact-us__list {
        margin-bottom: 2em;
        a {
            color: color(granite);
        }
    }

    /deep/ .social-icons {
        a, a::before {
            color: color(blueScreen);
        }
    }
</style>
