<template>
    <div class="contact-us" :class="classPage" v-if="contactsData">
        <div class="contact-us__row">
            <a
								@click.prevent="changeOpenFeedback"
                href=""
                class="contact-us__btn"
                v-html="contactsData && contactsData.title ? contactsData.title : $t('footer.contactUsTitle')"
            />
            <div class="contact-us__icons">
                <a
                   v-if="contactsData && contactsData.socialLinks && contactsData.socialLinks.whatsapp"
                   target="_blank"
                   rel="nofollow"
                   class="contact-us__icon icon-whatsapp"
                   :href="contactsData.socialLinks.whatsapp"
                /><a
                     v-if="contactsData && contactsData.socialLinks && contactsData.socialLinks.telegram"
                     target="_blank"
                     rel="nofollow"
                     class="contact-us__icon icon-telegram"
                     :href="contactsData.socialLinks.telegram"
            />
            </div>
        </div>
        <!-- Телефон и емейл для футера-->
        <div v-if="!notShowContacts" class="contact-us__list" v-html="contactsData.text"></div>
    </div>
</template>
<script>
export default {
    name: 'ContactUs',
    props: ['contactsData', 'notShowContacts', 'classPage','menuContacts'],
    data() {
        return {
            phone: '+7 924 780 44 11',
            email: 'info@enjoykamchatka.ru',
            icons: [
                {
                    icon: 'whatsapp',
                    url: 'https://wa.me/79247804411'
                },
                {
                    icon: 'telegram',
                    url: 'https://telegram.im/@EnjoyKamchatka'
                },
                {
                    icon: 'phone',
                    url: 'tel:79247804411'
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

<style lang="scss">
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
    .contact-us {
        font-size: 30px;
        a, a::before {
            color: #fff;
            text-decoration: none;
        }
    }

    .contact-us__row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .contact-us__btn {
        border-bottom: .05em solid;
        margin-right: 1.7em;
        white-space: nowrap;
        @include respond-to(sm) {
            margin-right: 100%
        }
    }

    .contact-us__icons {
        margin: .8em 0;
        font-size: 1.33em;
        display: flex;
        align-items: center;
        @include respond-to(sm) {
            font-size: 1.2em;
            margin-top: 1em;
        }
    }

    .contact-us__icon {
        margin-right: 1em;
        &::before {
            content: '';
            width: 45px;
            height: 45px;
            display: inline-flex;
            transition: 0.3s;
            opacity: 0.85;
            //color: #1DCFFF;
            //font-size: 30px;
            //font-weight: 400;
            @include respond-to(md) {
                width: 40px;
                height: 40px;
            }
        }
        &:hover {
            &:before {
                opacity: 1;
            }
        }
        &.icon-telegram::before {
            content: '';
            background: url("~assets/img/menu/icons/telegram-color.svg") no-repeat;
            background-size: cover;
        }
        &.icon-whatsapp::before {
            content: '';
            transform: scale(0.85);
            background: url("~assets/img/menu/icons/whatsapp-color.svg") no-repeat;
            background-size: cover;
        }
    }

    .contact-us__list {
        list-style-type: none;
        margin-top: 1.5em;
        a, p {
            font-weight: 600;
            font-size: 26px;
            line-height: 31px;
            text-transform: inherit;
            color: #ffffff;
            margin-bottom: .5em;
            @include respond-to(lg) {
                font-size: 20px;
                line-height: 20px;
                margin-bottom: 20px;
            }
            @include respond-to(sm) {
                font-size: 18px;
                margin-bottom: 10px;
            }
        }
        li {
            margin-bottom: .5em;
        }
        @media(max-height: 770px) {
            margin-top: 1em;
        }
    }

    @include respond-to(lg) {
        .contact-us {
            font-size: 25px;
        }
    }

    @include respond-to(md) {
        .contact-us {
            font-size: 20px;
        }
    }

    .header__menu-contacts {
        .contact-us__row {
            margin-top: 40px;
        }
        .contact-us__btn {
            margin-right: 30px!important;
            font-size: 24px;
            line-height: 29px;
            color: #1dcfff;
        }
        .contact-us__icon {
            &:before {
                color: #1dcfff;
            }
        }
        .contact-us__list {
            margin-top: 20px!important;
            a {
                color: #1dcfff;
                font-weight: 600;
                font-size: 24px;
                line-height: 29px;
                @include respond-to(sm) {
                    font-size: 20px;
                    line-height: 24px;
                }
            }
        }
    }
</style>
