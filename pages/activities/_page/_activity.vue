<template>
    <div v-if="activity" class="activity-location">
        <PageHeader class="activity-location__header" v-if="activity.bannerImage" :data="activity.bannerImage">{{ activity.name }}</PageHeader>
        <dynamic v-if="activity.content" :template="`<div class='text--small activity-location__content content-block'><div class='container--middle-tour animate-activities'>` + activity.content + `</div></div>`"/>
        <!-- <animated-number :value='20000' :formatValue='formatToPrice' :duration='4000'/> -->
        <div class="container activity-location__bottom">
            <Heading v-if="activity.locations && activity.locations.length" class="location-title" tag="h2">{{ $t('locations') }}</Heading>
            <grid v-if="activity && activity.locations && activity.locations.length" :data="activity.locations" urlParent="/locations/"/>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../../components/content/pageHeader';
import {Api} from '../../../api/api';
import Heading from "../../../components/content/heading";
import Dynamic from "../../../components/dynamic";
import Grid from "../../../components/grid/grid";
import AnimatedNumber from "animated-number-vue";
import $ from 'jquery';
export default {
    name: 'activitySlug',
    components: {
        Grid,
        Dynamic,
        Heading,
        PageHeader,
        AnimatedNumber
    },
    data() {
        return {
            activity: {},
            seo: '',

        };
    },
    head () {
        return {
            title: this.seo ? this.seo.title : '',
            meta: [
                { hid: 'description', name: 'description', content: this.seo ? this.seo.description : '' },
                { hid: 'image', name: 'image', content: this.activity && this.activity.bannerImage ? this.activity.bannerImage.src : ''},
                { hid: 'og:title', name: 'og:title', content: this.seo ? this.seo.title : '' },
                { hid: 'og:description', name: 'og:description', content: this.seo ? this.seo.description : '' },
                { hid: 'og:image', name: 'og:image', content: this.activity && this.activity.bannerImage ? this.activity.bannerImage.src : ''}
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
        console.log(`activity/${params.activity}?lang=${store.$i18n.locale}&router=${route.path}`)
        return Api.get(`activity/${params.activity}?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            if(response.data.data.length === 0){
                error({ statusCode: 404 })
            }
            return {
                seo: response.data.seo,
                activity:response.data.data
            }
        });

    },
    methods: {
        init() {
            Api.get(`activity/${this.$route.params.activity}?lang=${this.$i18n.locale}&router=${this.$route.path}`).then((response) => {
                this.seo = response.data.seo;
                this.activity = response.data.data;
                let breadCrumbs = [
                    {name: 'breadCrumbs.activities', link: '/activities'},
                    {name:this.activity.category.name, link: `/activities/${this.activity.category.slug}`},
                    {name: this.activity.name}
                ];
                this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
            });
        },
        formatToPrice(value) {
            return `<h3> ${Number(value).toFixed(0)}</h1>`;
        }
    },
    watch: {
        '$route'() {
            this.init();
        }
    },
    updated(){
        [].forEach.call(document.querySelectorAll('.animate-counter'), function(div) {
            if(parseInt(div.innerText) != NaN){
                div.classList.add('detected-animation')
            }
        });
        let activities__item = document.querySelectorAll('.animate-activities p, .animate-activities h1')
        for(let i = 0; i<activities__item.length; i++){
            activities__item[i].style.opacity = 0;
            activities__item[i].classList.add('animate-text')
        }

    },
    mounted() {
        let activities__item = document.querySelectorAll('.animate-activities p, .animate-activities h1')
        for(let i = 0; i<activities__item.length; i++){
            activities__item[i].style.opacity = 0;
            activities__item[i].classList.add('animate-text')
        }
        [].forEach.call(document.querySelectorAll('.animate-counter'), function(div) {
            if(parseInt(div.innerText) != NaN){
                div.classList.add('detected-animation')
            }
        });
        var Visible = function () {
            [].forEach.call(document.querySelectorAll('.animate-counter, .animate-activities p, .animate-activities h1'), function(div) {
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
                if (targetPosition.bottom > windowPosition.top &&
                    targetPosition.top < windowPosition.bottom &&
                    targetPosition.right > windowPosition.left &&
                    targetPosition.left < windowPosition.right) {
                    let values = parseInt(div.innerText)
                    let div_values = div.innerHTML
                    let div_small =  div.querySelector('small')
                    if(div.classList.contains('detected-animation')){
                        div.classList.remove('detected-animation')
                        $({ Counter: 0 }).animate({ Counter: parseInt(div.innerText) }, {
                            duration: 2500,
                            easing: 'swing',
                            step: function () {
                                if(div_small){
                                    div.innerHTML=Math.ceil(this.Counter)+`<small>${div_small.innerHTML}</small>`;
                                }
                                else{
                                    div.innerHTML=Math.ceil(this.Counter);
                                }

                            },
                            complete:function(){
                                div.innerHTML = div_values.toString()
                            }
                        });

                    }
                    else if(div.classList.contains('animate-text')){
                        div.classList.remove("animate-text");
                        div.classList.add("animated");
                        div.classList.add("fadeInLeft");
                    }
                }
                else{
                    div.classList.add("animate-text");
                    div.classList.remove("animated");
                    div.classList.remove("fadeInLeft");
                    div.style.opacity = 0;
                }
            });
        };
        window.addEventListener('scroll', function() {
            Visible ();
        });
        let breadCrumbs = [
            {name: 'breadCrumbs.activities', link: '/activities'},
            {name:this.activity.category.name, link: `/activities/${this.activity.category.slug}`},
            {name: this.activity ? this.activity.name: ''}
        ];
        this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
        this.$store.commit('TRANSPARENT', true);

    },
    created() {
        this.$store.commit('TRANSPARENT', true);
    }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/config";
@import "~assets/scss/mixins";

.activity-location {
    background-image: url('~assets/img/activity/gora_activity bg.svg');
    background-color: #FBFBFB;
    background-position-y: 56%;
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom: 100px;
    /*color: color(white);*/
    .location-title {
        /*color: #FBFBFB;*/
    }
    .lil_peep_Rip_prESS_F{
        color:red
    }
    .activity-location__header{
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
    .page-header {
        position: relative;
    }
    /deep/.page-header {
        height: 100vh;
        &__title {
            @include respond-to(lg) {
                font-size: 80px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 60px;
                line-height: 1.5;
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
    .content-block {
        margin-top: 35px;
        @include respond-to(lg) {
            margin-top: 12px;
        }
        @include respond-to(md) {
            font-size: 16px;
            line-height: 1.5;
            margin-top: 22px;
        }
        @include respond-to(sm) {
            font-size: 14px;
            line-height: 1.5;
            margin-top: 44px;
        }
        /deep/p {
            font-family: 'Montserrat';
            font-weight: 400;
            font-size: 26px;
            line-height: 1.5;
            max-width: 1460px;
            @include respond-to(lg) {
                font-size: 18px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 16px;
                line-height: 1.5;
                margin: 0;
            }
            @include respond-to(sm) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
        /deep/h1 {
            max-width: 1200px;
            line-height: 1.5;
            @include respond-to(lg) {
                padding-bottom: 12px;
            }
            @include respond-to(md) {
                font-size: 30px;
                line-height: 1.5;
                padding-top: 15px;
            }
            @include respond-to(sm) {
                font-size: 22px;
                line-height: 1.5;
                padding-bottom: 16px;
            }
        }
    }
    .activity-location__bottom {
        margin-top: 110px;
        @include respond-to(lg) {
            margin-top: 48px;
        }
        @include respond-to(sm) {
            padding: 0;
        }
        .location-title {
            font-size: 70px;
            line-height: 1.5;
            margin-bottom: 36px;
            @include respond-to(lg) {
                font-size: 40px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 30px;
                line-height: 1.5;
                margin-bottom: 25px;
            }
            @include respond-to(sm) {
                font-size: 22px;
                line-height: 1.5;
                padding-left: 25px;
            }
        }
    }
}
</style>
