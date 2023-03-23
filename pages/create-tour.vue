<template>
    <div id="createTour" class="create-tour mobile-block" :class="{'success' : success}">
        <div class="container">
            <div class="create-tour__top" v-if="!success">
                <div class="create-tour__steps">
                    <div class="create-tour__step" :class="{'pointer': index + 1 <= stepMax}" @click="changeActive(false,step)" v-for="(step, index) in steps" :key="'step-' + index">
                        <Heading :createrTour="true" v-if="activeStep === index + 1" color="blue-simple" class="create-tour__step-title"
                                 size="lg" v-html="step.title"/>
                        <Heading :createrTour="true" v-else color="gray" class="create-tour__step-title gray" size="lg" v-html="step.title"/>
                        <p v-if="activeStep === index + 1" class="create-tour__step-desc text--blue"
                           v-html="$t(step.desc)"/>
                        <p v-else class="create-tour__step-desc " v-html="$t(step.desc)"/>
                    </div>
                </div>
            </div>
            <div class="create-tour__container">
                <div v-if="activeStep === 1 && !success" class="create-tour__dates">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="md" color="white" v-html="$t('createTour.step1Title')"/>
                    <div class="create-tour__dates-container">
                        <div class="create-tour__date">
                            <label for="dateFrom" v-html="$t('createTour.step1From')"/>
                            <date-picker id="dateFrom" @change="selectStartDate" :format="$i18n.locale === 'en' ? 'MM.DD.YYYY' : 'DD.MM.YYYY'" :lang="$i18n.locale === 'en' ? 'en' : 'ru'" v-model="dateFrom" :placeholder="$t('createTour.step1Placeholder')" :disabled-date="nowDateFunc" :input-attr="{readonly: 'readonly'}"></date-picker>
                        </div>
                        <div class="create-tour__date">
                            <label for="dateTo" v-html="$t('createTour.step1To')"/>
                            <date-picker id="dateTo" @change="selectFinishDate" :format="$i18n.locale === 'en' ? 'MM.DD.YYYY' : 'DD.MM.YYYY'" :lang="$i18n.locale === 'en' ? 'en' : 'ru'" v-model="dateTo" :placeholder="$t('createTour.step1Placeholder')" :disabled-date="startDateFunc"></date-picker>
                        </div>
                    </div>
                </div>
                <div v-if="activeStep === 2 && !success" class="create-tour__peoples">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="md" color="white" v-html="$t('createTour.step2Title')"/>
                    <div>
                        <label v-html="$t('createTour.step2label')"/>
                        <div class="create-tour__people-container">
                            <div class="create-tour__people">
                                <p v-html="people"/>
                                <svg @click="showPeoples = !showPeoples" width="24" height="28" viewBox="0 0 24 28"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3.49988 9.45002C3.49988 14.1251 7.32491 17.9501 11.9999 17.9501C16.675 17.9501 20.5 14.1251 20.5 9.45002C20.5 4.77498 16.675 0.949951 11.9999 0.949951C7.32491 0.949951 3.49988 4.77498 3.49988 9.45002ZM18.5 9.45002C18.5 13.025 15.575 15.9501 11.9999 15.9501C8.42492 15.9501 5.49989 13.025 5.49989 9.45002C5.49989 5.87499 8.42492 2.94997 11.9999 2.94997C15.575 2.94997 18.5 5.87499 18.5 9.45002Z"
                                        fill="#1DCFFF"/>
                                    <path
                                        d="M2.09982 27.0502C4.74984 24.4002 8.24986 22.9502 11.9999 22.9502C15.7499 22.9502 19.2499 24.4002 21.9 27.0502L23.325 25.6252C20.3 22.6252 16.2749 20.9502 11.9999 20.9502C7.72486 20.9502 3.69983 22.6252 0.674805 25.6252L2.09982 27.0502Z"
                                        fill="#1DCFFF"/>
                                </svg>
                            </div>
                            <div v-if="showPeoples" class="create-tour__people-change">
                                <div class="people-change">
                                    <p>{{ $t('createTour.step2Adults') }}</p>
                                    <p class="people-change__right"><span @click="changeAdults('minus')">-</span><span
                                        v-html="adults"/><span @click="changeAdults('plus')">+</span></p>
                                </div>
                                <div class="people-change">
                                    <p>{{ $t('createTour.step2Children') }}</p>
                                    <p class="people-change__right"><span @click="changeChildren('minus')">-</span><span
                                        v-html="children"/><span @click="changeChildren('plus')">+</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="activeStep === 3 && !success" class="create-tour-formats">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="md" color="white" v-html="$t('createTour.step3Title')"/>
                    <div class="row">
                        <div v-for="(format, index) in formats" :key="'formats-' + index" @click="activeFormat = format.id, activeFormatName = format.name"
                             class="create-tour-format col-lg-4" :class="{'active': activeFormat === format.id}">
                            <div class="create-tour-format__top">
                                <div class="create-tour-format__check" @click="activeFormat = format.id, activeFormatName = format.name">
                                    <div :class="{'active': activeFormat === format.id}"/>
                                </div>
                                <p class="create-tour-format__title" v-html="format.name"/>
                            </div>
                            <img-com v-if="format.img && !format.active" :img="format.img"/>
                            <div v-if="format.active" class="create-tour-format__bottom">
                                <p v-for="(includ, index) in format.included" :key="'includ' + index"
                                   v-html="'- '+ includ"/>
                            </div>
                            <p class="create-tour-format__more" v-if="!format.active" @click="format.active = true" v-html="$t('tours.more')"/>
                            <p class="create-tour-format__more" v-if="format.active" @click="format.active = false" v-html="$t('tours.hide')"/>
                        </div>
                    </div>
                </div>
                <div v-if="activeStep === 4 && locations.length && !success" class="create-tour-locations">
                    <h2>{{ $t('createTour.step4Title') }} <span class="create-tour-locations__number">({{ locations.length }})</span></h2>
                    <div class="create-tour-locations__slider" v-if="screen.width >= 768 && screen.width < 1280 && selectedLocationToView != null">
                        <div class="create-tour-locations__arrows">
                            <a class="create-tour-locations__arrows-previous" href="" @click.prevent="selectLocationToView('previous')"><arrow_long/>Previous</a>
                            <a class="create-tour-locations__arrows-next" href="" @click.prevent="selectLocationToView('next')">Next<arrow_long/></a>
                        </div>
                        <div class="create-tour-locations__slide">
                            <div class="create-tour-locations__slide-add" @click="selectLocation(locations[selectedLocationToView].id)">
                                <svg v-if="!selectLocations.includes(locations[selectedLocationToView].id)" width="30" height="30"
                                     viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M17 13V0H13V13H0V17H13V30H17V17H30V13H17Z" fill="#1DCFFF"/>
                                </svg>
                                <svg v-if="selectLocations.includes(locations[selectedLocationToView].id)" width="30" height="4"
                                     viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H30V4H0V0Z" fill="#FF5912"/>
                                </svg>
                            </div>
                            <img-com :img="locations[selectedLocationToView].img"/>
                            <div class="create-tour-locations__slide-desc">
                                <h2 v-html="locations[selectedLocationToView].name"/>
                                <p v-html="locations[selectedLocationToView].text"/>
                                <a href="" @click.prevent="selectedLocationToView = null">Закрыть</a>
                            </div>
                        </div>
                    </div>
                    <div class="create-tour-locations__container">
                        <client-only>
                            <vue-custom-scrollbar class="create-tour-locations__left" ref="cs_locations">
                                <div class="create-tour-locations__items">
                                    <div class="create-tour-location" v-for="(location, index) in locations"
                                         :key="'location-' + index">
                                        <object @click="learnMoreOfLocation(index)"><img-com :img="location.img" v-if="screen.width < 768" /></object>
                                        <object @click="changeActiveLocation(location, index)"><img-com :img="location.img" v-if="screen.width >= 768" /></object>

                                        <div class="create-tour-location__add" @click="selectLocation(location.id)">
                                            <svg v-if="!selectLocations.includes(location.id)" width="30" height="30"
                                                 viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M17 13V0H13V13H0V17H13V30H17V17H30V13H17Z" fill="#1DCFFF"/>
                                            </svg>
                                            <svg v-if="selectLocations.includes(location.id)" width="30" height="4"
                                                 viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0H30V4H0V0Z" fill="#FF5912"/>
                                            </svg>
                                        </div>
                                        <div class="create-tour-location__title">
                                            <p v-if="screen.width < 768" v-html="location.name" @click="learnMoreOfLocation(index)"/>
                                            <p v-else @click="changeActiveLocation(location, index)" v-html="location.name"/>
                                        </div>
                                        <transition>
                                            <div v-if="screen.width < 768 && location.text && location.show_more" class="create-tour-location__desc">
                                                <p v-html="location.text"></p>
                                                <a @click.prevent="learnMoreOfLocation(index)" class="create-tour-location__desc__more">Закрыть</a>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </vue-custom-scrollbar>
                        </client-only>
                        <div class="create-tour-locations__right">
                            <yandex-map :coords="coords" zoom="5" :controls="controlYandex">
                                <ymap-marker v-for="(mark, index) in ymapMarkers" :key="'mark-' + index"
                                             marker-id="123"
                                             :coords="[mark.geoPoint.lat, mark.geoPoint.long]"
                                             :icon="markerIcon"
                                />
                            </yandex-map>
                        </div>
                    </div>
                </div>
                <div class="create-tour__review" v-if="activeStep === 5 && !success">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="md" color="white" v-html="$t('createTour.step5Title')"/>
                    <div class="create-tour__review-block">
                        <p class="create-tour__review-title" v-html="$t('createTour.step5Desc')"/>
                        <p class="create-tour__review-desc" v-if="dateFrom && dateTo">{{ dateFrom.toLocaleDateString()}} - {{ dateTo.toLocaleDateString() }}</p>
                    </div>
                    <div class="create-tour__review-block">
                        <p class="create-tour__review-title" v-html="$t('createTour.step5Desc2')"/>
                        <p class="create-tour__review-desc" v-if="people" v-html="people"/>
                    </div>
                    <div class="create-tour__review-block">
                        <p class="create-tour__review-title" v-html="$t('createTour.step5Desc3')"/>
                        <p class="create-tour__review-desc" v-html="getNameFormat"/>
                    </div>
                    <div class="create-tour__review-block">
                        <p class="create-tour__review-title" v-html="$t('createTour.step5Desc4')"/>
                        <p class="create-tour__review-desc" v-if="!getLocationNames.length" v-html="$t('notSpecified')"></p>
                        <p class="create-tour__review-desc" v-else v-for="(location, index) in getLocationNames" :key="'location-' + index" v-html="location"/>
                    </div>

                </div>
                <div class="create-tour__feedback" v-if="activeStep === 6 && !success">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="md" color="white" v-html="$t('createTour.step6Title')"/>
                    <FormFeedback
                        :notDateAndCountPeople="true"
                        @isSuccess="successForm" idForm="3"
                        :dataForm3="{adult: adults, children : children, locations: locations.filter((item)=> {if(selectLocations.includes(item.id)){return item.name}}), dateFrom: dateFrom, dateTo: dateTo, format: activeFormatName}"/>
                </div>
                <div v-if="success" class="create-tour__success">
                    <Heading :stepAnimate="true" :createrTour="true" tag="h2" size="lg" color="white" v-html="$t('createTour.successTitle')"/>
                    <Heading :stepAnimate="true" :createrTour="true" tag="h3" size="sm" color="white" v-html="$t('createTour.successDesc')"/>
                    <nuxt-img quality="75" loading="lazy" format="webp" src="~assets/img/form/success.png" :alt="$t('createTour.successTitle')"/>
                    <nuxt-link class="mobile" :to="$i18n.locale === 'en' ? '/' : '/'" v-html="$t('createTour.successLink')"/>
                </div>
            </div>
            <!-- Desctiop -->
            <div class="change-step-flex">
            <div v-if="activeStep!== 1 && activeStep !== 6 && !success" class="change-steps mobile-back">
                <animButton @endAnim="backActive" :class="{'disabled': activeStep == 1}">{{$t('createTour.prevButton')}}</animButton>
                <!-- <button @click="changeActive">Далее</button> -->
            </div>
            <div v-if="activeStep !== 6 && !success" v-bind:class="{'hideBackIcon': activeStep!== 1}" class="change-steps mobile">
                <animButton @endAnim="changeActive" :class="{'disabled': !getPermissionToGo}">{{$t('createTour.nextButton')}}</animButton>
                <!-- <button @click="changeActive">Далее</button> -->
            </div>
            </div>
            <!-- <div v-if="activeStep !== 6 && !success" class="change-steps mobile">
                <animButton @endAnim="changeActive" :class="{'disabled': !getPermissionToGo}">Далее</animButton>
                <button @click="changeActive">Далее</button>
            </div> -->
        </div>
        <!-- Mobile -->
        <!-- <div v-if="activeStep !== 6 && !success" class="change-steps change-steps-mobile mobile">
            <animButton @endAnim="changeActive">Далее</animButton>
            <button @click="changeActive">Далее</button>
        </div> -->
        <div v-if="activeLocation" class="popup-active-location">
            <div class="popup-active-location__overlay"/>
            <div class="popup-active-location__body">
                <span @click="closePopupLocation" class="popup-active-location__body-close">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="28.2847" y="0.472656" width="6" height="40" transform="rotate(45 28.2847 0.472656)" fill="#FBFBFB"/>
                        <rect x="32.5269" y="28.7568" width="6" height="40" transform="rotate(135 32.5269 28.7568)" fill="#FBFBFB"/>
                    </svg>
                </span>
                <img-com :img="activeLocation.img"/>
                <Heading :createrTour="true" tag="h2" color="white" size="sm">{{ activeLocation.name }}</Heading>
                <div v-html="activeLocation.text"/>
               <!-- <a target="_blank" :href="$i18n.locale === 'en' ? '/en/locations/' + activeLocation.slug + '/' : '/locations/' + activeLocation.slug + '/'" v-html="$t('tours.more')"/> -->
            </div>
        </div>
    </div>
</template>

<script>
import Heading from '../components/content/headingStep';
import {Api} from '../api/api';
//import vueCustomScrollbar from 'vue-custom-scrollbar';
// import '../assets/scss/_scrollBar.scss';
import FormFeedback from '../components/feedback/section/formFeedback';
import animButton from '../components/button/button'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import { mapState } from 'vuex';
import arrow_long from  "@/assets/img/icons/arrow_long.svg?inline";

export default {
    name: 'createTour',
    components: {FormFeedback, Heading, animButton, DatePicker, arrow_long},
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
    data() {
        return {
            coords: [56.322434, 160.844915],
            adaltesStep2to6:[],
            childrenStep2to6:[],
            ymapMarkers: [],
            controlYandex: [],
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: false,
            },
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '/mapsIcon.png',
                imageSize: [30, 30],
                imageOffset: [0, 0],
                content: '',
                contentOffset: [0, 15],
                contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            },
            activeStep: 1,
            numberOfStepsActivated: [1],
            stepMax: 6,
            people: '',
            adults: 0,
            success: false,
            locations: [],
            selectLocations: [],
            selectedLocationToView: null,
            showPeoples: true,
            activeLocation: false,
            activeFormat: '',
            activeFormatName:'',
            dateFrom: null,
            scrollPosition: false,
            dateTo: null,
            //formats: [],
            children: 0,
            steps: [
                {
                    title: '01',
                    desc: 'createTour.step1'
                },
                {
                    title: '02',
                    desc: 'createTour.step2'
                },
                {
                    title: '03',
                    desc: 'createTour.step3'
                },
                {
                    title: '04',
                    desc: 'createTour.step4'
                },
                {
                    title: '05',
                    desc: 'createTour.step5'
                },
                {
                    title: '06',
                    desc: 'createTour.step6'
                }
            ],
            seo: '',
            nowDate: '',
            startTourDate: '',
            finishTourDate: ''
        };
    },
    async asyncData ({ route, params, store }) {
        let lang = '';
        if (route.name.indexOf('_en') >= 0) {
            lang = 'en';
        } else {
            lang = 'ru';
        }
        return await Api.getBase(`tour-formats?lang=${store.$i18n.locale}&router=${route.path}`).then((response) => {
            response.data.data = response.data.data.map((item) => {
                item.active = false;
                return item;
            });
            return {
                seo: response.data.seo,
                formats: response.data.data,
                // activeFormat: response.data.data[0].id
            }
        });
    },
    mounted() {
        if(this.$i18n.locale == 'ru'){
            this.adaltesStep2to6 = ['взрослый','взрослых','взрослых']
            this.childrenStep2to6 = ['ребенок','ребенка','детей']
        }
        else{
            this.adaltesStep2to6 = ['adult','adults','adults']
            this.childrenStep2to6 = ['child','children','children']
        }
        //    adaltesStep2to6:[],
        //     childrenStep2to6:[],
        // if(this.$i18n.locale )
        //console.log(this.formats)
        //document.addEventListener('input', function(event) {
        //    if(this.activeStep === 6) {
        //        let requiredFields = document.querySelectorAll('.create-tour__feedback form input[required]'),
        //            requiredFieldsFilled = document.querySelectorAll('.create-tour__feedback form input[required]:not(:invalid)');
        //        if (requiredFields.length === requiredFieldsFilled.length) {
        //        }
        //    }
        //}.bind(this))
        //console.log(this.$refs)
        window.addEventListener('resize', function () {
            //console.log(this.$refs)
            //if(this.$refs.ps_locations && this.screen.width < 768) this.$refs.ps_locations.destroy()
            //else new PerfectScrollbar(this.$refs.ps_locations)
        }.bind(this))
        let elements = document.querySelectorAll('.mx-input');
        for(let elem of elements) {
            elem.setAttribute("readonly", "readonly");
        }
    },
    created() {
        //let breadCrumbs = [
        //    {name: 'Создание тура'}
        //];
        //this.$store.dispatch('changeBreadcrumbs', breadCrumbs);
        this.initDatePickers();
    },
    updated() {
        if(this.$refs.ps_locations && this.screen.width < 768) this.$refs.ps_locations.destroy()
        // if(this.activeStep == 4 && this.screen.width < 768) {
        //     window.addEventListener('touchstart', function (event) {
        //        event.stopPropagation();
        //     }, true);
        // }
    },
    watch: {
        activeStep(value, previous) {
            if(window.innerWidth < 768) {

                let stepsContainer = document.querySelector('.create-tour__steps'),
                    stepsContainerRect = stepsContainer.getBoundingClientRect(),
                    stepsAll = document.querySelectorAll('.create-tour__steps .create-tour__step'),
                    widthStepsTaken = 0;
                for(let i = 0; i < value; i++) {
                    let marginLeft = (i == 0 ) ? 0 : 45;
                    widthStepsTaken += stepsAll[i].getBoundingClientRect().width + marginLeft;
                }
                if(value !== 1) stepsContainer.scrollLeft = widthStepsTaken - stepsContainerRect.width + (stepsContainerRect.width/2 - stepsAll[value - 1].getBoundingClientRect().width/2);
                else stepsContainer.scrollLeft = 0;
                //console.log(widthStepsTaken, stepsContainerRect.width, stepsContainer.scrollLeft);
            }
        }
    },
    computed: {
        ...mapState(['screen']),
        'getNameFormat'() {
            let format = this.formats.filter((item) => {
                if (item.id === this.activeFormat) {
                    return true
                }
            })
            if (format.length) {
                return format[0].name
            } else {
                return ''
            }
        },
        'getLocationNames'() {
            let location = [];
            this.locations.map((item) => {
               if (this.selectLocations.includes(item.id)) {
                   location.push(item.name);
               }
            });
            return location;
        },
        getPermissionToGo() {
            switch (this.activeStep) {
                case 1:
                    if(this.dateTo !== null && this.dateFrom !== null)
                        return true
                    break;
                case 2:
                    if(this.people !== "")
                        return true
                    break;
                case 3:
                    if(this.activeFormat !== "")
                        return true
                    break;
                case 4:
                    return true
                    break;
                case 5:
                    return true
                    break;
            }
            return false
        }
    },
    methods: {
        selectLocationToView(direction) {
            if(direction === 'next' && this.locations.length - 1 > this.selectedLocationToView) this.selectedLocationToView++
            else if(this.selectedLocationToView > 0) this.selectedLocationToView--
        },
        initDatePickers() {
            let nowDate = new Date();
            let nowDateStr = nowDate.toISOString().substr(0, 10);
            this.nowDate = this.startTourDate = nowDateStr;
        },
        nowDateFunc(date) {
            if (this.finishTourDate) {
                if (date < new Date(this.nowDate+ 'T00:00:00.000')) {
                    return date < new Date(this.nowDate+ 'T00:00:00.000');
                } else {
                    return date > new Date(this.finishTourDate);
                }
            } else {
                return date < new Date(this.nowDate+ 'T00:00:00.000');
            }
        },
        startDateFunc(date) {
            if (typeof this.startTourDate === 'string') {
                return date < new Date(this.startTourDate+ 'T00:00:00.000');
            } else {
                return date < this.startTourDate;
            }
        },
        selectStartDate(value) {
            this.startTourDate = value;
        },
        selectFinishDate(value) {
            this.finishTourDate = value;
        },
        num2str(n, text_forms) {
            n = Math.abs(n) % 100; var n1 = n % 10;
            if (n > 10 && n < 20) { return text_forms[2]; }
            if (n1 > 1 && n1 < 5) { return text_forms[1]; }
            if (n1 == 1) { return text_forms[0]; }
            return text_forms[2];
        },
        learnMoreOfLocation(i) {
            this.$set(this.locations[i], 'show_more', (this.locations[i].show_more) ? false : true)
        },
        changeActiveLocation(location, index = null) {
            if(this.screen.width > 1280) {
                this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                document.getElementsByTagName('body')[0].classList.add('t-body_scroll-locked_menu');
                this.activeLocation = location;
            }else{
                this.selectedLocationToView = index
            }
        },
        closePopupLocation() {
            this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            document.getElementsByTagName('body')[0].classList.remove('t-body_scroll-locked_menu');
            this.activeLocation = false
        },
        successForm() {
          this.success = true;
        },
        changeActive(event, step) {
            if (!step) {
                if(this.numberOfStepsActivated.indexOf(this.activeStep) !== -1) this.numberOfStepsActivated.push(this.activeStep + 1)
                //console.log(this.numberOfStepsActivated, this.numberOfStepsActivated.find((number) => number === this.activeStep))
                if (this.activeStep === 3) {
                    Api.getBase(`locations?dateFrom=${this.dateFrom ? this.dateFrom.toLocaleDateString() : ''}&dateTo=${this.dateTo ? this.dateTo.toLocaleDateString() : ''}&formatId=${this.activeFormat}&lang=${this.$i18n.locale}`).then((response) => {
                        this.locations = response.data.data;
                        this.activeStep = this.activeStep + 1;
                        if (this.activeStep > this.stepMax) {
                            this.stepMax = this.activeStep;
                        }
                    });
                }else {
                    this.activeStep = this.activeStep + 1;
                    if (this.activeStep > this.stepMax) {
                        this.stepMax = this.activeStep;
                    }
                }
            } else {
                let stepActive = parseInt(step.title.split('0')[1]);
                if(this.getPermissionToGo && this.numberOfStepsActivated.indexOf(stepActive) !== -1)
                    if (stepActive <= this.stepMax) {
                        if (stepActive === 3) {
                            Api.getBase(`locations?dateFrom=${this.dateFrom ? this.dateFrom.toLocaleDateString() : ''}&dateTo=${this.dateTo ? this.dateTo.toLocaleDateString() : ''}&formatId=${this.activeFormat}&lang=${this.$i18n.locale}`).then((response) => {
                                this.locations = response.data.data;
                                this.activeStep = stepActive;
                                if (this.activeStep > this.stepMax) {
                                    this.stepMax = this.activeStep;
                                }
                            });
                        } else {
                            this.activeStep = stepActive;
                            if (this.activeStep > this.stepMax) {
                                this.stepMax = this.activeStep;
                            }
                        }
                    }
            }
        },
        backActive(){
               if (this.activeStep === 3) {
                    Api.getBase(`locations?dateFrom=${this.dateFrom ? this.dateFrom.toLocaleDateString() : ''}&dateTo=${this.dateTo ? this.dateTo.toLocaleDateString() : ''}&formatId=${this.activeFormat}&lang=${this.$i18n.locale}`).then((response) => {
                        this.locations = response.data.data;
                        this.activeStep = this.activeStep - 1;
                        if (this.activeStep > this.stepMax) {
                            this.stepMax = this.activeStep;
                        }
                    });
                }else {
                    this.activeStep = this.activeStep - 1;
                    if (this.activeStep > this.stepMax) {
                        this.stepMax = this.activeStep;
                    }
                }
        },
        selectLocation(id) {
            if (this.selectLocations.includes(id)) {
                this.selectLocations.splice(this.selectLocations.indexOf(id), 1);
                this.ymapMarkers = this.ymapMarkers.filter((item) => {
                    if (item.id !== parseInt(id)) {
                        return item;
                    }
                });
            } else {
                this.selectLocations.push(id);
                this.ymapMarkers.push(this.locations.filter((item) => {
                    if (item.id === parseInt(id)) {
                        return item;
                    }
                })[0]);
            }
        },
        changeAdults(type) {
            if (type === 'minus') {
                if (this.adults !== 0) {
                    this.adults = this.adults - 1;
                }
            } else {
                this.adults = this.adults + 1;
            }
            this.changePeople();
        },
        changePeople() {
            this.people = '';
            if (this.adults !== 0) {
                this.people = this.adults + ' ' + this.num2str(this.adults, this.adaltesStep2to6) + '; ';
            }
            if (this.children !== 0) {
                this.people += this.children + ' ' + this.num2str(this.children, this.childrenStep2to6);
            }
        },
        changeChildren(type) {
            if (type === 'minus') {
                if (this.children !== 0) {
                    this.children = this.children - 1;
                }
            } else {
                this.children = this.children + 1;
            }
            this.changePeople();
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/config";
    @import "~assets/scss/mixins";
    .change-step-flex{
        display:flex;
        width:800px;
        max-width:100%;
        @media screen and (max-width:865px){
            flex-wrap:wrap
        }
    }
    .container {
        @include respond-to(md) {
            margin: 0;
            padding: 0 60px;
            max-width: unset;
        }
        @include respond-to(sm) {
            padding: 0 25px;
            overflow: hidden;
        }
    }
    .create-tour__container {
        h2 {
            font-weight: 500;
            font-size: 50px;
            margin: 60px 0 42px;
            @include respond-to(fullhd) {
                font-size: 35px;
                margin: 57px 0 32px;
            }
            @include respond-to(sm) {
                font-size: 24px;
                font-weight: 500;
                line-height: 1.5;
                margin: 30px 0 18px;
            }
        }
    }

    .popup-active-location {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1999;
        overflow-y: scroll;
        .popup-active-location__overlay {
            background: #171920;
            opacity: 0.7;
            width: 100%;
            position: absolute;
            height: 100%;
        }
        .popup-active-location__body {
            padding: 30px;
            max-width: 750px;
            width: 100%;
            background: #21232A;
            position: relative;
            box-shadow: 10px 14px 20px rgba(0, 0, 0, 0.25);
            @include respond-to (fullhd){
                max-width: 480px;
                padding: 20px;
            }
            @include respond-to(customMobile) {
                margin-top: 60px;
            }
            .img__container {
                @include respond-to (fullhd){
                    height: 180px;
                }
            }
            img {
                max-height: 350px;
                width: 100%;
            }
            h2 {
                margin-top: 25px;
                @include respond-to (fullhd){
                    font-size: 20px;
                    margin-bottom: 6px;
                    font-family: 'Mpluse1p';
                    font-weight: normal;
                }
            }
            /deep/p {
                color: white;
                margin-bottom: 20px;
                @include respond-to (fullhd){
                    font-size: 16px;
                    font-family: 'Montserrat';
                    font-weight: normal;
                    line-height: 1.5;
                }
            }
            /deep/div {
                color: white;
            }
            a {
                color: #1DCFFF;
                font-weight: 500;
                font-size: 20px;
                line-height: 1.5;
                &:hover {
                    color: white;
                }
                @include respond-to (fullhd){
                    font-size: 16px;
                }

            }
        }
        .popup-active-location__body-close {
            position: absolute;
            right: -42px;
            top: -42px;
            width: 32px;
            height: 32px;
            cursor: pointer;
            @include respond-to(customMobile) {
                right: 0;
                top: 20px;
            }
            @include respond-to(fullhd){
                width: 20px;
                height: 20px;
                top: -30px;
                right: -30px;
            }
            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    .create-tour__success {
        @include respond-to(sm) {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        h2, h3 {
            @include respond-to(sm) {
                width: 260px;
            }
        }
        h2 {
            margin-top: 0;
            margin-bottom: 30px;
            font-size: 70px;
            line-height: 1.5;
            @include  respond-to(fullhd) {
                font-size: 50px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            @include respond-to(md) {
                font-size: 60px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 40px;
                line-height: 1.5;
                margin-bottom: 10px;
            }
        }
        h3 {
            margin-top: 0;
            margin-bottom: 70px;
            font-size: 32px;
            font-weight: normal;
            @include  respond-to(fullhd) {
                font-size: 22px;
                line-height: 1.5;
            }
            @include respond-to(md) {
                font-size: 28px;
                line-height: 1.5;
            }
            @include respond-to(sm) {
                font-size: 18px;
                line-height: 1.5;
                font-weight: normal;
                margin-bottom: 130px;
            }
        }
        img {
            display: block;
            margin-bottom: 80px;
            @include respond-to(fullhd) {
                width: 218px;
                margin-bottom: 100px;
            }
        }
        a {
            display: inlin-block;
            font-weight: 500;
            font-size: 30px;
            line-height: 120%;
            color: #1DCFFF;
            text-decoration-line: underline;
            @include respond-to(sm) {
                font-weight: 600;
                font-size: 20px;
                line-height: 120%;
                text-decoration: none;
            }
        }
    }

    .create-tour__review-block {
        margin-bottom: 35px;
        @include respond-to(sm) {
            margin-bottom: 50px;
        }
        &:last-child {
            margin-bottom: 0;
        }
        .create-tour__review-title {
            color: #1DCFFF;
            font-weight: 500;
            font-size: 24px;
            line-height: 1.5;
            margin-bottom: 10px;
        }
        .create-tour__review-desc {
            color: #FBFBFB;
            font-size: 18px;
            line-height: 1.5;
        }
    }

    input[type=date]::-webkit-clear-button, /* blue cross */
    input[type=date]::-webkit-inner-spin-button, /* up */
    input[type=date]::-webkit-outer-spin-button {
        display: none;
    }

    .create-tour {
        background-color: #171920;
        min-height: calc(100vh - 100px);
        &.success {
            display: flex;
            align-items: center;
        }
        &__feedback {
            /deep/ .row {
                @include respond-to-min(md) {
                    justify-content: space-between;
                }
            }
            /deep/ .feedback {
                &__field {
                    flex: none;
                    @include respond-to(sm) {
                        width: 100%;
                        margin-bottom: 50px;
                    }
                    &-comment {
                        @include respond-to-min(md) {
                            max-width: 100%;
                        }
                    }
                    input,
                    textarea {
                        -webkit-appearance: none;
                        border-radius: 0;
                    }
                }
                &-modal {
                    &__form {
                        @include respond-to(fullhd) {
                            max-width: 655px;
                        }
                    }
                    &__submit-btn {
                        //transform: translateY(-100%);
                        width: fit-content;
                        @include respond-to(sm) {
                            position: fixed;
                            //top: 100%;
                            left: 0;
                            bottom: 0;
                            margin: 0;
                            width: 100vw;
                            border-radius: 0;
                            z-index: 999;
                            height: 70px;
                        }

                        .animButton {
                            width: 360px;
                            @include respond-to(sm) {
                                width: 100%;
                            }
                            &-container {
                                @include respond-to(sm) {
                                    max-width: unset;
                                }

                            }
                            .particles-button {
                                &.animButton-btn {
                                    @include respond-to(sm) {
                                        border-radius: 0;
                                        height: 70px;
                                        font-size: 20px;
                                        max-width: unset;
                                    }
                                    //color: color(marengo);
                                }
                            }
                        }
                    }
                    &__checked {
                        label {
                            @include respond-to(sm) {
                                font-size: 12px;
                            }
                            a {
                                color: color(lightBlue);
                            }
                        }
                        &-elem {
                            width: 40px;
                            height: 40px;
                        }
                        &_group {

                        }
                    }
                }
            }
        }
    }

    /deep/input[type=date]::-webkit-calendar-picker-indicator /* datepicker*/
    {
        color: rgba(0, 0, 0, 0);
        opacity: 1;
        display: block;
        background: url('~assets/img/date/dateIcon.png') no-repeat;
        width: 28px;
        height: 30px;
        position: relative;
        top: 3px;
        right: -12px;
        cursor: pointer;
    }

    .create-tour__top {
        display: flex;
        align-items: center;
    }

    .create-tour-locations__container {
        display: flex;
    }

    .create-tour-locations {
        &__slider {
            width: 100vw;
            position: absolute;
            margin: 0 -60px;
            z-index: 999;
        }
        &__arrows {
            position: absolute;
            top: 330px;
            transform: translateY(-100%);
            z-index: 9;
            width: 100%;
            display: flex;
            justify-content: space-between;
            a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 187.5px;
                height: 64px;
            }
            &-previous {
                background-color: #000;
                color: #43495C;
                svg {
                    margin-right: 16px;
                }
            }
            &-next {
                background-color: #364868;
                color: #171920;
                svg {
                    transform: scale(-1);
                    margin-left: 16px;
                    path {
                        fill: #171920;
                    }
                }
            }
        }
        &__slide {
            height: 648px;
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: #21232A;
            /deep/ .img__container {
                height: 330px;
            }
            &-add {
                position: absolute;
                right: 0;
                top: 0;
                width: 80px;
                height: 80px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background-color: #21232A;
                svg {
                    width: 48px;
                    height: 48px;
                }
            }
            &-desc {
                padding: 30px 60px;
                background-color: #21232A;
                display: flex;
                flex-direction: column;
                flex: 1;
                h2, p {
                    color: #FBFBFB;
                }
                h2 {
                    margin: 0 0 12px;
                    font-size: 36px;
                }
                p {
                    font-size: 16px;
                    font-weight: normal;
                    line-height: 1.5;
                    font-family: 'Montserrat';
                }
                a {
                    font-weight: 500;
                    font-size: 20px;
                    line-height: 1.5;
                    color: #fff;
                    margin: auto auto 0;
                }
            }
        }
        &__number {
            color: color(blue);
        }
        h2 {
            color: white;
        }
    }
    .create-tour-locations__right {
        width: 100%;
        height: 480px;
        @include respond-to(sm) {
            display: none;
        }

        .ymap-container {
            height: 100%;
        }
    }

    .create-tour-location-modal {
        background: #21232A;
        padding: 30px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1999;

        &__scroll {
            max-height: 455px;
            overflow-y: auto;
        }

        img {
            width: 100%;
            margin-bottom: 30px;
            max-height: 300px;
        }

        &__name {
            font-weight: 500;
            font-size: 36px;
            line-height: 1.5;
            color: #FBFBFB;
            margin-bottom: 15px;
        }

        &__desc {
            font-size: 16px;
            line-height: 1.5;
            color: #FBFBFB;
        }
    }

    .create-tour-location-modal__close {
        color: #1DCFFF;
        font-weight: 500;
        font-size: 20px;
        line-height: 1.5;
        text-align: center;
        position: absolute;
        cursor: pointer;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        border-bottom: 1px solid;
    }

    .create-tour-locations__left {
        max-width: 495px;
        width: 100%;
        margin: initial;
        margin-right: 30px;
        padding-right: 15px;
        position: relative;
        height: 480px;
        @include respond-to(md) {
            max-width: 255px;
            flex-shrink: 0;
        }
        @include respond-to(md) {
            width: 240px;
            margin-bottom: 30px;
            margin-right: 25px;
        }
        @include respond-to(sm) {
            padding: 0;
            margin: 0;
            height: auto;
            max-width: 100%;
            width: 100%;
        }
        /deep/ .ps__rail-y {
            background-color: transparent;
            width: 4px;
            opacity: 1;
            .ps__thumb-y {
                width: 100%;
                background-color: color(blue);
            }
        }
    }

    .create-tour-locations__items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .create-tour-location {
        width: 225px;
        height: 225px;
        position: relative;
        display: flex;
        flex-direction: column;
        user-select: none;
        margin-bottom: 30px;
        @include respond-to(sm) {
            margin-bottom: 0;
        }
        & + .create-tour-location {
            @include respond-to(sm) {
                margin-top: 24px;
            }
        }
        //@include respond-to(xs) {
        //    height: 250px;
        //    width: 100%;
        //}
        @include respond-to(sm) {
            height: auto;
            width: 100%;
        }

        .img__container {
            width: 100%;
            height: 160px;
        }

        &__desc {
            background-color: color(blueGray);
            display: flex;
            flex-direction: column;
            align-items: center;
            @include respond-to(sm) {
                padding: 0 20px 20px;
            }
            a {
                width: fit-content;
                margin-top: 10px;
            }
            p, a {
                color: white;
            }
            p {
                @include respond-to(sm) {
                    font-size: 13px;
                    line-height: 1.5;
                }
            }
        }
        .create-tour-location__add {
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #21232A;
            cursor: pointer;
        }

        .create-tour-location__title {
            height: 65px;
            background: #21232A;
            padding: 0 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
            @include respond-to(sm) {
                margin-top: auto;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                color: white;

                &:hover {
                    color: #1DCFFF;
                }
            }
        }
    }
    .create-tour-formats {
        /deep/.row {
            flex-wrap: wrap;
            margin-left: 0;
            margin-right: 0;
            @include respond-to(md) {
                width: 100%;
                overflow-x: auto;
                flex-wrap: nowrap;
                padding-bottom: 20px;
            }
            @include respond-to(sm) {
                padding-bottom: 0;
            }
        }
    }

    .create-tour-format {
        width: 585px;
        height: 480px;
        background: #21232A;
        border:3px solid transparent;
        padding: 30px;
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
        flex: none;
        @include respond-to(fullhd) {
            width: 370px;
            height: 350px;
            margin-bottom: 0;
            padding: 20px;
        }
        @include respond-to(sm) {
            width: 273px;
            height: 273px;
        }
        & + .create-tour-format {
            margin-left: 30px;
            @include respond-to(md) {
                margin-left: 20px;
            }
            @include respond-to(sm) {
                margin-left: 10px;
            }
        }
        /deep/ img {
            height: 294px;
            width: 100%;
            object-fit: contain;
            object-position: center;
            @include respond-to(fullhd) {
                height: 178px;
                margin-top: 20px;
            }
            @include respond-to(sm) {
                height: 140px;
                margin-top: 6.5px;
            }
        }
        &__more {
            width: 100%;
            color: #1DCFFF;
            font-weight: 500;
            font-size: 20px;
            line-height: 120%;
            cursor: pointer;
            margin-bottom: 0;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: auto;
            @include respond-to(fullhd) {
                font-size: 16px;
            }
            &:hover {
                color: white;
            }
        }
        &.active {
            box-shadow: 10px 14px 20px rgba(0, 0, 0, 0.25);
            border:3px solid #1DCFFF
        }
        @include respond-to(md) {
            margin-right: 0;
        }

        .create-tour-format__top {
            display: flex;
            align-items: center;
        }

        .create-tour-format__check {
            border: 2px solid #1DCFFF;
            width: 46px;
            height: 46px;
            flex-shrink: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            cursor: pointer;
            @include respond-to(fullhd) {
                width: 30px;
                height: 30px;
            }
            @include respond-to(sm) {
                width: 40px;
                height: 40px;
            }
            div {
                width: 20px;
                height: 20px;
                background: #2A2E39;
                @include respond-to(fullhd) {
                    width: 12px;
                    height: 12px;
                }
                @include respond-to(sm) {
                    width: 16px;
                    height: 16px;
                }
                &.active {
                    background: #1DCFFF;
                }
            }
        }

        .create-tour-format__title {
            color: #1DCFFF;
            font-weight: 500;
            font-size: 24px;
            line-height: 1.5;
            @include respond-to(fullhd) {
                font-size: 18px;
                line-height: 1.5;
            }
        }

        .create-tour-format__bottom {
            margin-left: 65px;
            margin-top: 20px;
            @include respond-to(fullhd) {
                margin-left: 40px;
                margin-top: 10px;
            }
            @include respond-to(sm) {
                margin: 10px 0 0;
            }
            p {
                font-size: 18px;
                line-height: 1.5;
                color: white;
                margin: 0;
                @include respond-to(fullhd) {
                    font-size: 16px;
                    line-height: 1.5;
                }
                @include respond-to(sm) {
                    font-size: 12px;
                    line-height: 1.5;
                }
            }
        }
    }

    .create-tour__people-change {
        max-width: 390px;
        width: 100%;
        @include respond-to(fullhd) {
            max-width: 370px;
        }
        .people-change {
            width: 100%;
            height: 60px;
            background: #21232A;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            @include respond-to(md) {
                padding: 0 16px;
            }
            p {
                color: white;
                @include respond-to(sm) {
                    font-size: 18px;
                }
            }

            .people-change__right {
                max-width: 128px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 500;
                font-size: 28px;
                line-height: 1.5;

                span {
                    &:first-child, &:last-child {
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .create-tour__peoples {
        label {
            display: block;
            font-weight: 600;
            font-size: 20px;
            line-height: 1.5;
            margin-bottom: 14px;
            color: #43495C;
            @include respond-to(md) {
                margin-bottom: 15px;
            }
        }
    }

    .create-tour__people {
        max-width: 390px;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2A2E39;
        padding: 0 16px;
        @include respond-to(fullhd) {
            max-width: 370px;
        }
        p {
            color: white;
        }

        svg {
            cursor: pointer;

            &:hover {
                path {
                    fill: white;
                }
            }
        }
    }

    .change-steps {
        margin-top: 50px;
        width: 100%;
        @include respond-to(sm) {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        &-mobile {
            display: none;
        }
        /deep/ .animButton-container {
            &.disabled {
                pointer-events: none;
                .animButton {
                    .particles-button {
                        &.animButton-btn {
                            color: #43495C;

                        }
                    }
                }
            }
        }
        button {
            background: #21232A;
            border-radius: 140px;
            color: rgb(96, 104, 133);
            border: none;
            height: 80px;
            flex-shrink: 0;
            font-size: 30px;
            outline: none;
            cursor: pointer;
            line-height: 120%;
            max-width: 360px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                color: #1DCFFF;
            }
        }
    }

    .create-tour__dates {
        .create-tour__dates-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 425px;
            flex-wrap: wrap;
        }

        //h2 {
        //    margin-bottom: 42px;
        //    @include respond-to(md) {
        //        margin-bottom: 40px;
        //    }
        //}

        label {
            display: block;
            font-weight: 600;
            font-size: 20px;
            line-height: 1.5;
            margin-bottom: 14px;
            color: #43495C;
        }

        /deep/ input {
            width: 195px;
            height: 60px;
            background: #2A2E39;
            padding: 0 16px;
            border: none;
            outline: none;
            color: white;
            font-size: 18px;
            line-height: 1.5;
            @include placeholder {
                color: color(marengo);
                font-family: 'Mpluse1p';
                @include respond-to(sm) {
                    font-size: 18px;
                }
            }
            @include respond-to(xs) {
                width: 100%;
            }
        }

        .create-tour__date {
            margin-right: 10px;
            margin-bottom: 30px;
            @include respond-to(xs) {
                margin-right: 0;
                width: 100%;
            }
            @include respond-to(sm) {
                margin-bottom: 38px;
            }
            &:last-child {
                margin-right: 0;
            }
            /deep/ .mx-datepicker {
                @include respond-to(sm) {
                    width: 100%;
                    max-width: 325px;
                }
                .mx-icon-calendar  {
                    right: 16px;
                }
            }
        }
    }

    .create-tour__steps {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: 50px;
        user-select: none;
        @include respond-to(sm) {
            margin-top: 24px;
        }
        @include respond-to(md) {
            white-space: nowrap;
            flex-wrap: nowrap;
            overflow-x: auto;
            display: flex;
            align-items: flex-start;
            //margin-top: 50px;
        }
        &::-webkit-scrollbar {
            @include respond-to(sm) {
                width: 0;
            }
        }
        .create-tour__step {
            display: inline-block;
            width: min-content;
            & + .create-tour__step {
                margin-left: 70px;
                @include respond-to(sm) {
                    margin-left: 45px;
                }
                @include respond-to(fullhd) {
                    margin-left: 50px;
                }
            }
            &.pointer {
                cursor: pointer;
            }
            h2 {
                margin: 0;
                @include respond-to(fullhd) {
                    margin: 0;
                    font-size: 60px;
                }
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .create-tour__step-title {
            margin-bottom: 9px;
            &.gray {
                color: #43495C;
            }
        }

        .create-tour__step-desc {
            font-size: 18px;
            line-height: 1.5;
            color: #43495C;
            margin: 0;
            word-break: normal;
            @include respond-to(fullhd) {
                font-size: 16px;
                line-height: 1.5;
                white-space: normal;
                word-break: unset;
            }
        }
    }

    .mobile {
        @include respond-to(sm) {
            position: fixed;
            border-bottom:2px solid #171920;
            left: 0;
            bottom:0;
            width: 100%;
            height: 70px;
            z-index: 1999;
            background: #21232A;
            display: flex!important;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            /deep/.particles-button {
                font-size: 20px;
            }
            button {
                color: #43495C;
                height: 100%;
                &:hover {
                    color: #1DCFFF;
                    background: #21232A;
                }
            }
        }
    }
    .hideBackIcon{
          @include respond-to(sm) {
              bottom: 70px;
              }
    }
      .mobile-back {
        @include respond-to(sm) {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 70px;
            z-index: 1999;
            background: #21232A;
            display: flex!important;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            /deep/.particles-button {
                font-size: 20px;
            }
            button {
                color: #43495C;
                height: 100%;
                &:hover {
                    color: #1DCFFF;
                    background: #21232A;
                }
            }
        }
    }
  /deep/.breadcrumbs {
      display: none;
  }
</style>
