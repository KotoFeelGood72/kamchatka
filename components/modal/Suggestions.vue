<template>
    <transition name="slide-fade">
        <div v-if="this.showModal" class="modal_questions">
<!--            <div @click="closeModal" class="close">-->
<!--                <div></div>-->
<!--                <div></div>-->
<!--            </div>-->
            <svg @click="closeModal" class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g data-name="Layer 2">
                    <path d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" data-name="close"/>
                </g>
            </svg>
<!--            <div class="logo">-->
<!--                <span>-->
<!--                    <img src="~assets/img/header/logo_black_symbol.svg" alt/>-->
<!--                </span>-->
<!--            </div>-->
<!--            <div class="dots">-->
<!--                <div class="dot" v-for="(item, index) in dots" :key="index"></div>-->
<!--            </div>-->
            <div class="info">
                <div class="turs" v-if="this.$i18n.locale === 'ru'">
                    <div v-for="(item, index) in turs.ru" :key="index">
                        <a :href="item.link">
                            {{item.name}}
                        </a>
                    </div>
                </div>
                <div class="turs" v-else>
                    <div v-for="(item, index) in turs.en" :key="index">
                        <a :href="item.link">
                            {{item.name}}
                        </a>
                    </div>
                </div>
                <div class="border_btn">
                    <a href="/create-tour/" class="feedback-button">
                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000">
                                <path d="M483.6 923.2 903.3 500 483.6 76.8l-2.5 2v162L738.3 500 481.1 759.2v161.5l2.5 2.5z"/>
                                <path d="M99.2 923.2 519.4 500 99.2 76.8l-2 2v162L353.9 500 97.2 759.2v161.5l2 2.5z"/>
                        </svg>
                        {{this.$i18n.locale === 'ru' ? this.btn_ru : btn_en}}
                    </a>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "questions",
    props: ['timeShowModal'],
    data() {
        return {
            showModal: false,
            btn_ru: 'Собери свой тур',
            btn_en: 'Collect your tour',
            dots: 30,
            turs: {
                "ru": [
                    {
                        name: 'VIP Программа',
                        link: '/tours/vip-tour-kamchatka/',
                    },
                    {
                        name: 'Аренда Вертолёта',
                        link: '/tours/arenda-vertolyeta/',
                    },
                    {
                        name: 'Комфорт Тур Лето',
                        link: '/tours/komfort-tur/',
                    },
                    {
                        name: 'Круиз Курилы',
                        link: '/tours/kuril-islands-cruise/',
                    },
                    {
                        name: 'Комфорт Тур Зима',
                        link: '/tours/komfort-tur-zima/',
                    },
                    {
                        name: 'Heli Fishing',
                        link: '/tours/heli-fishing/',
                    },
                ],
                "en": [
                    {
                        name: 'All Kamchatka',
                        link: '/tours/vsya-kamchatka/',
                    },
                    {
                        name: 'Helicopter Excursions',
                        link: '/tours/vertoletnaya-ekskursiya/',
                    },
                    {
                        name: 'Snowmobile Safari',
                        link: '/tours/snegokhodnoe-safari/',
                    },
                    {
                        name: 'Comfort tour winter',
                        link: '/tours/komfort-tur-zima/',
                    },
                    {
                        name: 'Rafting fishing',
                        link: '/tours/splavnaya-rybalka/',
                    },
                    {
                        name: 'Comfort tour summer',
                        link: '/tours/komfort-tur/',
                    },
                ],
            }
        }
    },
    methods: {
      closeModal() {
          this.showModal = false;
      }
    },

    mounted() {
        setTimeout(() => {
            this.showModal = !this.showModal;
        }, this.timeShowModal)
    }
}
</script>
<style lang="scss" scoped>
.modal_questions {
    z-index: 2000;
    position: fixed;
    bottom: 21%;
    right: calc(1% + 10px);
    width: 300px;
    height: initial;
    background: #FFFFFF;
    border-radius: 0;
    padding: 40px 10px 10px 10px;
    box-shadow: hwb(193deg 12% 0% / 63%) 0 8px 24px;
    .close {
        cursor: pointer;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5px;
        right: 10px;
        transition: .2s ease-in all;
        &:hover {
            fill: red;
            transition: .2s ease-in all;
        }
    }
    //.close {
    //    cursor: pointer;
    //    position: absolute;
    //    right: 2%;
    //    top: 0;
    //    background: transparent;
    //    border-radius: 0;
    //    width: 30px;
    //    height: 30px;
    //    transition: .2s all ease-in;
    //    &:hover div:first-child,
    //    &:hover div:last-child {
    //        background: #bd0b00;
    //    }
    //    div:first-child,
    //    div:last-child {
    //        width: 17px;
    //        height: 2px;
    //        position: absolute;
    //        background: #343434;
    //        top: 46%;
    //    }
    //    div:first-child {
    //        right: 19%;
    //        transform: rotate(45deg);
    //    }
    //    div:last-child {
    //        left: 24%;
    //        transform: rotate(-45deg);
    //    }
    //}
    .dots {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 12px auto;
        .dot {
            width: 4px;
            height: 4px;
            background: #000000;
            border-radius: 50%;
        }
    }
    .logo {
        text-align: center;
    }
    .info {
        .turs {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            div {
                width: 47%;
                background: #343434;
                border-radius: 0;
                color: #fff;
                height: 62px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 15px;
                text-transform: uppercase;
                text-align: center;
                font-size: 13px;

                position: relative;
                transition: all 400ms cubic-bezier(0.77, 0, 0.175, 1);
                user-select: none;

                a {
                    color: #fff;
                    height: 100%;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                }

                &:after,
                &:before {
                    content: '';
                    position: absolute;
                    transition: inherit;
                    z-index: -1;
                }
                &:before {
                    top: 0;
                    left: 50%;
                    height: 100%;
                    width: 0;
                    /*border: 1px solid #343434;*/
                    border-radius: 0;
                }
                &:after {
                    bottom: 0;
                    left: 0;
                    height: 0;
                    width: 100%;
                    background: #fff;
                    border-radius: 0;
                    z-index: 10;
                }
                &:hover {
                    a {
                        color: #343434;
                        z-index: 30;
                    }
                    border: 1px solid #343434;
                    transition-delay: .1s;
                    background: transparent;
                    &:before {
                        left: 0;
                        width: 100%;
                        z-index: 20;
                    }
                    &:after {
                        top: 0;
                        height: 100%;
                    }
                }
            }
        }
    }
}
.border_btn {
    border: 2px solid #1dcfff;
    border-radius: 20px;
    padding: 2px;
    width: 85%;
    margin: 0 auto;

    &:hover {
        border: 2px solid #343434;
    }
    .feedback-button {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;
        font-size: 16px;
        border-radius: 17px;
        border: none;
        line-height: 36px;
        padding: 0;
        font-weight: 900;
        background: #1dcfff;
        color: #343434;
        text-transform: uppercase;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;

        text-decoration: none;
        overflow: hidden;
        transition: all .4s;
        z-index: 1;

        svg {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            fill: #343434;
        }

        &:before {
            content: '';
            display: block;
            position: absolute;
            background-color: #343434;
            z-index: -1;
            color: #fff;
            top: 50%;
            left: 50%;
            width: 200%;
            height: 0;
            transform: translate3d(-50%, -50%, 0) rotate(45deg);
            transition: all .45s;
        }
        &:hover {
            color: #fff;
            &:before {
                height: 500%;
                width: 100%;
            }
            svg {
                fill: #fff;
            }
        }
    }

}
@media (max-width: 769.98px) {
    .modal_questions {
        width: 250px;
        img {
            width: 50px;
            height: 50px;
        }
        .info {
            height: initial;
            h4,
            ul,
            button {
                font-size: 14px;
            }
            .turs {
                div {
                    height: 52px;
                    margin-bottom: 10px;
                    font-size: 12px;
                }
            }
            .border_btn {
                width: 100%;
            }
        }
    }
}

.slide-fade-enter-active {
    transition: all .8s ease;
}
.slide-fade-leave-active {
    transition: all .14s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
</style>
