import Vue from 'vue';
import Vuex from 'vuex';
import {Api} from "../api/api";

Vue.use(Vuex);

const store = () => new Vuex.Store({

    state: {
        lang: 'ru',
        breadcrumbs: [],
        isShowFeedback: false,
        sliderCount: 0,
        transition: 'down',
        isParallax: false,
        isBlog: false,
        isTransparent: false,
        screen: {
            width: 0,
            height: 0,
        },
        isRouter:false,
        contacts: {}

    },

    mutations: {
        set(state, {type, value}) {
            state[type] = value;
        },
        changeRouter(state){
            state.isRouter = true
        },
        changeRouterfalse(state){
            state.isRouter = false
        },
        SCREENM: (state, payload) => {
            state.screen.mobile = payload
        },
        SCREENW: (state, payload) => {
            state.screen.width = payload
        },
        SCREENH: (state, payload) => {
            state.screen.height = payload;
        },
        TRANSPARENT: (state, payload) => {
            state.isTransparent = payload;
        },

    },

    getters: {
        getLang: state => () => state.lang,
        getIsShowFeedback: state => () => state.isShowFeedback,
        getBreadcrumbs: state => () => state.breadcrumbs,
        getSliderCount: state => () => state.sliderCount,
        getIsParallax: state => () => state.isParallax,
        SCREEN: state => {
            return state.screen
        },
        getRouterStatus: state=>()=>state.isRouter,
        getIsTransparent: state => () => state.isTransparent,
    },

    actions: {
        async nuxtServerInit({ commit }, {route, params, store  }) {
            let lang = '';
            if (route?.name?.indexOf('_en') >= 0) {
                lang = 'en';
            } else {
                lang = 'ru';
            }
            const contactsData = (await Api.get(`contacts?lang=${store.$i18n.locale}&router="/tours/"`)).data
            commit('set', {type: 'contacts', value: contactsData});

        },
        changeLang({commit}, value) {
            commit('set', {type: 'lang', value: value});
        },
        changeSliderCount({commit, state}, value) {
            commit('set', {type: 'sliderCount', value: state.sliderCount + 1});
        },
        changeIsShowFeedback({commit}, value) {
            commit('set', {type: 'isShowFeedback', value: value});
        },
        changeBreadcrumbs({commit}, value) {
            commit('set', {type: 'breadcrumbs', value: value});
        },
        changeIsParallax({ commit }, value) {
            commit('set', {type: 'isParallax', value: value});
        },
        changeIsTransparent({ commit }, value) {
            commit('set', {type: 'isTransparent', value: value});
        }
    }
});

export default store
