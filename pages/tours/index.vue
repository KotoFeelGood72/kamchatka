<template>
    <div class="tours">
        <video class="video" playsinline autoplay muted loop>
            <source src="~/assets/video/tours.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            <source src="~/assets/video/tours.webm" type='video/webm; codecs="vp8, vorbis"'>
        </video>
        <PageHeader v-if="data && data.intro && data.intro.bannerImage" :data="data.intro.bannerImage"
                    :descriptionTitle="data.intro.bannerSubText"><span v-html="data.intro.bannerText"/>
        </PageHeader>
        <ToursComponent :data="data.tours"/>
        <div class="tours-entry activity-slug">
            <div class="container--middle-tour activity-slug__content text--small">
                    <Heading
                        v-if="toursText.h2"
                        tag="h2"
                        color="lightBlue"
                        size
                        v-html="toursText.h2"
                    />
                <div
                    v-if="this.$store.$i18n.loadedLanguages[0] === 'ru' ? toursText.text_ru : toursText.text_en"
                    class="text--small upper-video__content text-controller"
                    v-html="this.$store.$i18n.loadedLanguages[0] === 'ru' ? toursText.text_ru : toursText.text_en"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {Api} from "../../api/api";
import PageHeader from '../../components/content/pageHeaderWithDesc';
import ToursComponent from "../../components/tours/toursComponent";
import Heading from "../../components/content/heading.vue";

export default {
    name: 'Tours',
    components: {Heading, ToursComponent, PageHeader},
    props: ['columns'],
    data() {
        return {
            data: [],
            seo: '',
            toursText: {
                h2: "Наши программы",
                text_ru: `
                    <style>
                        .tours-entry .text-controller h2,
                        .tours-entry .text-controller h3,
                        .tours-entry .text-controller h4,
                        .tours-entry .text-controller h5,
                        .tours-entry .text-controller h6 {
                            font-size: 1.5rem;
                        }
                        .tours-entry .text-controller h2,
                        .tours-entry .text-controller h3,
                        .tours-entry .text-controller h4,
                        .tours-entry .text-controller h5,
                        .tours-entry .text-controller h6,
                        .tours-entry .text-controller ul,
                        .tours-entry .text-controller p {
                            padding-bottom: 20px;
                        }
                        .tours-entry .text-controller p:last-child {
                            padding-bottom: 40px;
                        }
                        .tours-entry .text-controller ul {
                            padding-left: 20px;
                        }
                        @media (max-width: 767.98px) {
                            .tours-entry .text-controller h2 {
                               margin-bottom: 0;
                            }
                            .tours-entry .text-controller p {
                                padding-bottom: 10px;
                            }
                            .tours-entry .text-controller h2,
                            .tours-entry .text-controller h3,
                            .tours-entry .text-controller h4,
                            .tours-entry .text-controller h5,
                            .tours-entry .text-controller h6 {
                                font-size: 1rem;
                            }
                        }
                    </style>
                    <h2>Индивидуальные программы туров на Камчатку</h2>
                    <p>Для тех, кто ищет интеллектуальный отдых, для тех, кто ценит сервис и комфорт, для тех, кто ждет неповторимых ощущений и незабываемых впечатлений мы организуем туры на Камчатку и Курильские острова премиум-класса.</p>
                    <p>Вы не поверите своим глазам! Ваше сердце будет биться чаще, чем обычно! Вы увидите самые необычные чудеса, созданные природой, но для этого вам не придется преодолевать огромные расстояния с рюкзаком и иметь соответствующую физическую подготовку. Мы все сделаем за вас. Организуем уникальный тур именно под ваши пожелания, доставим на место, предложим комфортабельное проживание и питание!</p>
                    <h3>Для нас нет почти ничего невозможного!</h3>
                    <p>Мы доставим вас туда, куда другие не могут! Вы почувствуете себя частью самых  неизведанных и диких уголков Камчатки и Курильских островов!</p>
                    <p>А самое главное, мы обеспечим вам полную безопасность, в том числе, если вы путешествуете с детьми и высочайший уровень сервиса, потому что мы - эксперты по Камчатке и Курильским островам!</p>
                    <p>Мы организуем туры на действующие и спящие вулканы, вы увидите настоящих медведей и других животных, живущих в дикой природе, наши вертолеты доставят вас в самые недоступные точки Камчатки, вы сможете искупаться в горячих минеральных источниках, понаблюдать за касатками с опытными дайверами, погрузиться в народную культуру и фольклор Камчатки, а также совершить туры по рекам, озерам и океану с профессиональными гидами.</p>
                    <ul>
                        <li>Мы организуем только эксклюзивные туры на Камчатку на самом высоком уровне.</li>
                        <li>Мы максимально компетентны в том, что мы делаем!</li>
                        <li>Мы оснащены самым профессиональным оборудованием и транспортом, чтобы безопасно отвезти вас на самый край земли.</li>
                    </ul>
                    <h4>Вы никогда еще такого не ощущали!</h4>
                    <p>Мы наполним вашу жизнь и воспоминания новыми цветами и эмоциями. И мы переломим стереотип о низком уровне организации и сервиса туризма в России.</p>
                    <p>Респонденты наших уникальных туров подтвердят наши слова! Если ехать на Камчатку, то только с Enjoy Kamchatka.</p>
                    <ul>
                        <li>Мы любим Камчатку и готовы передать свою любовь и знания вам!</li>
                        <li>Мы индивидуально подходим к каждому клиенту, поэтому всегда работаем через диалог!</li>
                        <li>В туре мы учтем все ваши пожелания по отелям, питанию, локациям, уровню сложности маршрутов!</li>
                    </ul>
                    <h5>Мы поможем вам преодолеть себя, постигая красоты Камчатки!</h5>
                    <p>Бескрайняя мощь гор и вулканов позволит почувствовать себя песчинкой в огромном мире. Мы поднимемся вместе с вами над облаками и вы увидите умопомрачительные красоты камчатской природы. Мы побываем с вами на Курильских островах, в заповедниках и исторических местах, понаблюдаем за редкими птицами, китами и тюленями. Даже зимой вы сможете искупаться в горячих термальных источниках, выехать на фото-тур с дикими животными и понаблюдать за настоящим действующим вулканом.</p>
                    <h6>Вы будете</h6>
                    <p>Летать, плавать, восходить, где-то даже ползти, но все это оставит в вас самые незабываемые эмоции в вашей жизни! И мы постоянно будем рядом.</p>
                    <p>И никто другой не сможет организовать для вас тур на Камчатку на таком профессиональном уровне, как  Enjoy Kamchatka. </p>
                     <p>Пляжный и экскурсионный отдых подождет, потому что вас ждут незабываемые туры на Камчатку и Курильские острова. Не многие знают, но в советские времена туризм на Камчатку был запрещен как иностранным, так и русским гражданам. И только сейчас мы подняли уровень туров до достойного премиального уровня! И мы гордимся тем, что мы можем вам предложить!</p>
                    <p>Никакие слова не передадут те впечатления, которые вы получите от тура на Камчатку с Enjoy Kamchatka. </p>
                `,
                text_en: `
                    <style>
                        .tours-entry .text-controller h2,
                        .tours-entry .text-controller h3,
                        .tours-entry .text-controller h4,
                        .tours-entry .text-controller h5,
                        .tours-entry .text-controller h6 {
                            font-size: 1.5rem;
                        }
                        .tours-entry .text-controller h2,
                        .tours-entry .text-controller h3,
                        .tours-entry .text-controller h4,
                        .tours-entry .text-controller h5,
                        .tours-entry .text-controller h6,
                        .tours-entry .text-controller ul,
                        .tours-entry .text-controller p {
                            padding-bottom: 20px;
                        }
                        .tours-entry .text-controller p:last-child {
                            padding-bottom: 40px;
                        }
                        .tours-entry .text-controller ul {
                            padding-left: 20px;
                        }
                        @media (max-width: 767.98px) {
                            .tours-entry .text-controller h2 {
                               margin-bottom: 0;
                            }
                            .tours-entry .text-controller p {
                                padding-bottom: 10px;
                            }
                            .tours-entry .text-controller h2,
                            .tours-entry .text-controller h3,
                            .tours-entry .text-controller h4,
                            .tours-entry .text-controller h5,
                            .tours-entry .text-controller h6 {
                                font-size: 1rem;
                            }
                        }
                    </style>
                    <h2>Individual programs of tours to Kamchatka</h2>
                    <p>For those who are looking for intelligent leisure, for those who appreciate service and comfort, for those who are waiting for a unique experience and an unforgettable experience, we organize tours to Kamchatka and the Kuril Islands, premium class.</p>
                    <p>You won't believe your eyes! Your heart will beat more often than usual! You will see the most unusual wonders created by nature, but for this you will not have to overcome huge distances with a backpack and have the appropriate physical preparation. We will do everything for you. We will organize a unique tour exactly what you want, we will deliver you to the place, we will offer comfortable accommodation and meals! Translated with www.DeepL.com/Translator (free version)</p>
                    <h3>Nothing is almost impossible for us!</h3>
                    <p>We will take you where others can't! You will feel yourself a part of the most unexplored and wild corners of Kamchatka and the Kuril Islands!</p>
                    <p>And most importantly, we will provide you with complete safety, including, if you travel with children and the highest level of service, because we - the experts on Kamchatka and the Kuril Islands!</p>
                    <p>We organize tours to active and dormant volcanoes, you will see real bears and other animals living in the wild, our helicopters will take you to the most inaccessible places in Kamchatka, you can swim in hot mineral springs, watch orcas with experienced divers, immerse yourself in the folk culture and folklore of Kamchatka, and take tours of rivers, lakes and the ocean with professional guides.</p>
                    <ul>
                        <li>We organize only exclusive tours in Kamchatka at the highest level.</li>
                        <li>We are as competent as possible in what we do!</li>
                        <li>We are equipped with the most professional equipment and transport to take you safely to the ends of the earth.</li>
                    </ul>
                    <h4>You've never felt that before!</h4>
                    <p>We will fill your life and memories with new colors and emotions. And we will break the stereotype about the low level of organization and service of tourism in Russia.</p>
                    <p>The respondents of our unique tours will confirm our words! If you go to Kamchatka, then only with Enjoy Kamchatka.</p>
                    <ul>
                        <li>We love Kamchatka and are ready to pass on our love and knowledge to you!</li>
                        <li>We have an individual approach to each client, so we always work through dialogue!</li>
                        <li>In the tour we will take into account all your wishes on hotels, food, locations, complexity level of routes!</li>
                    </ul>
                    <h5>We will help you overcome yourself while comprehending the beauty of Kamchatka!</h5>
                    <p>The boundless power of mountains and volcanoes will make you feel like a grain of sand in the big world. We will ascend together with you above the clouds, and you will see the mind-boggling beauty of the Kamchatka nature. We will visit Kuril islands, reserves and historical places, watch rare birds, whales and seals. Even in winter you will have a chance to bathe in hot thermal springs, go on a photo-tour with wild animals and watch a real active volcano.</p>
                    <h6>You will be</h6>
                    <p>Flying, swimming, climbing, somewhere even crawling, but all this will leave you with the most unforgettable emotions in your life! And we will be there for you all the time.</p>
                    <p>No one else will be able to organize your tour to Kamchatka on such a professional level as Enjoy Kamchatka.</p>
                     <p>Beach and sightseeing vacation will wait, because unforgettable tours to Kamchatka and the Kuril Islands are waiting for you. Not many people know, but in Soviet times, tourism to Kamchatka was forbidden to both foreign and Russian citizens. And only now we have raised the level of tours to a worthy premium level! And we are proud of what we can offer you!</p>
                    <p>No words can describe what you get from a tour to Kamchatka with Enjoy Kamchatka.</p>
                `,
            }
        };
    },
    head() {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                {hid: 'description', name: 'description', content: this.seo ? this.seo.description : ''},
                {hid: 'image', name: 'image', content: this.data && this.data.intro && this.data.intro.bannerImage ? this.data.intro.bannerImage.src : ''},
                {hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : ''},
                {hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : ''},
                {hid: 'og:image', name: 'og:image', content: this.data && this.data.intro && this.data.intro.bannerImage ? this.data.intro.bannerImage.src : ''}
            ]
        }
    },
    asyncData({route, params, store}) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return Api.get(`tours?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            try {
                return {
                seo: response.data.seo,
                data: response.data.data
            }
            } catch (error) {
                console.log(error);
            };

        });
    },
    created() {
        let breadCrumbs = [
            {name: this.data.intro.bannerText}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
    }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";

.tours-entry {
    background: #0e121a;
    h2 {
        padding: 20px 0 40px 0;
        @include respond-to(sm) {
            margin: 0 0 20px 0;
            padding-top: 30px;
        }
    }
    .text-controller {
        font-family: "Montserrat";
        font-weight: 400;
        color: #fff;
        font-size: 14px;
    }
}
.tours {
    /deep/ .row.tours {
        margin-top: -2px;
    }

    /deep/ .home-section {
        height: 100vh;

        .tours__item {
            padding-left: 0;
            padding-right: 0;
            position: relative;
            overflow: hidden;
            max-height: 540px;
            @include respond-to(md) {
                height: 390px;
                //margin-bottom: 30px;
                text-align: center;
                display: block;
            }

            .img__container {
                height: 100%;
                @include respond-to(sm) {
                    //height: auto;
                }

                /deep/ img {
                    object-fit: contain;
                    @include respond-to(md) {
                        height: 200px;
                    }
                }
            }

            &:nth-child(odd) {
                background-color: color(grayBlue);
            }

            &:nth-child(even) {
                background-color: color(granite);
            }

            .img__container {
                @include respond-to(sm) {
                    //&:not(.hover) {
                    //    display: none;
                    //}
                }
            }

            &:hover, &.hover {
                .tours__item-title {
                    @include respond-to(md) {
                        opacity: 1;
                    }
                }

                /deep/ .img__container {
                    display: none;

                    &.hover {
                        display: inline-flex;
                    }
                }

                .tours__item-img {
                    display: none!important;
                }
            }
        }
    }
        /deep/.page-header__title {
            max-width: 70%;
            @include respond-to(lg) {
                max-width: 100%;
            }
            @include respond-to(md) {
                // margin-top: -80px;
            }
            @include respond-to(sm) {
                margin-top: 0;
            }
        }
        /deep/.tours__item {
            @include respond-to(lg) {
                //max-height: 360px;
            }
            @include respond-to(md) {
                //max-height: 216px;
                width: 33.333333%;
            }
            @include respond-to(sm) {
                width: 100%;
                //max-height: 300px;
            }
        }
    }

.tours-menu {
    width: 100%;
    height: 100vh;
    background: url("~assets/img/tours/bg.png") no-repeat;
    background-size: cover;
    padding: 100px 0;
    @include respond-to(custom425) {
        padding-top: 0 !important;
        padding-bottom: 190px;
    }
}

.tours-menu__container {
    display: flex;
    justify-content: space-between;
    @include respond-to(custom425) {
        flex-direction: column;
    }
}

.tours__header {
    padding-top: 0;
}

.tours-menu__left {
    width: 100%;

    .headline {
        color: color(white);
        margin-bottom: 25px;
    }

    @include respond-to(lg) {
        padding-left: 90px;
    }
    @include respond-to(sm) {
        padding-left: 50px;
    }
    @include respond-to(custom425) {
        width: 100%;
        padding-top: 50px !important;
        padding-left: 25px
    }
}

.tours-menu__right-text {
    font-weight: 800;
}

.video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    display: block;
}

.page-header {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    @include respond-to(md) {
        // top: -50px;
    }
    @include respond-to(sm) {
        top: 0;
        min-height: 100vh;
    }

    /deep/ .img__container img, /deep/ .img__container {
        display: none !important;
        @include respond-to(md) {
            height: 300px;
        }
    }

    @include respond-to-min(sm) {
        /deep/ .container {
            margin: 0 auto;
            padding: 0;
        }
    }
}
</style>
