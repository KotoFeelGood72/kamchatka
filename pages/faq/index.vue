<template>
    <section id="faq" class="faq">
        <client-only>
            <FaqMenu/>
            <According class="faq__accordion" :data="data"/>
        </client-only>
    </section>
</template>

<script>
import FaqMenu from '../../components/faqMenu/faqMenu';
import FaqContacts from '../../components/faqMenu/faqContacts';
import According from '../../components/according/according';
import {Api} from '../../api/api';

export default {
    name: 'faq',
    components: {
        According,
        FaqMenu,
        FaqContacts
    },
    head () {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                { hid: 'description', name: 'description', content: this.seo ? this.seo.description : '' },
                { hid: 'image', name: 'image', content: 'https://new.enjoykamchatka.ru/contacts-header.png'},
                { hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : '' },
                { hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : '' },
                { hid: 'og:image', name: 'og:image', content: 'https://new.enjoykamchatka.ru/contacts-header.png' }
            ]
        }
    },
    watch: {
        isParallax(val) {
            // console.log(val);
        }
    },
    computed: {
        isParallax() {
            return this.$store.getters['getIsParallax']();
        }
    },
    data() {
        return {
            data: {},
            seo: ''
        };
    },
    asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`faq?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            return {
                seo: response.data.seo,
                data: response.data.data.faq.map((item) => {
                    item.active = false;
                    return item;
                })
            }
        });
    },
    created() {
        let breadCrumbs = [
            {name: 'faq.title'}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";

    .faq .accordion {
        margin-bottom: 150px;
        @include respond-to(customMobile) {
            margin-bottom: 50px;
        }
    }

</style>
