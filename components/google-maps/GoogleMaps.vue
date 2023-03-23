<!--<template>-->
    <!--<div class="google-map" :id="mapName"/>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
    <!--name: 'google-map',-->
    <!--map: null,-->
    <!--props: ['name', 'lat', 'lon', 'address'],-->
    <!--watch: {-->
        <!--lat: function(newVal, oldVal) { // watch it-->
            <!--this.initMap();-->
        <!--},-->
        <!--'$i18n.locale'() {-->
            <!--this.setAPILanguage(this.$i18n.locale).then(() => {-->
                <!--this.initMap();-->
            <!--});-->
        <!--}-->
    <!--},-->
    <!--data() {-->
        <!--return {-->
            <!--mapName: this.name + '-map',-->
            <!--map: null,-->
            <!--bounds: null,-->
            <!--markers: []-->
        <!--};-->
    <!--},-->
    <!--mounted() {-->
        <!--this.setAPILanguage(this.$i18n.locale).then(() => {-->
            <!--this.initMap();-->
        <!--});-->
    <!--},-->
    <!--methods: {-->
        <!--setAPILanguage(lang) {-->
            <!--document.querySelectorAll('script[src^="https://maps.googleapis.com"]').forEach(script => {-->
                <!--script.remove();-->
            <!--});-->
            <!--if(google) delete google.maps;-->
            <!--let newAPI = document.createElement('script');-->
            <!--newAPI.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAU0c78z3iOmZnFbf_fd2gDavOQUWxL_VU&language=' + lang + '&callback=googleMapsAPILoaded';-->
            <!--window.googleMapsAPILoaded = () => {-->
                <!--let event = new CustomEvent('googleMapsAPILoaded');-->
                <!--window.dispatchEvent(event);-->
            <!--}-->
            <!--let apiLoaded = new Promise(resolve => {-->
                <!--window.addEventListener('googleMapsAPILoaded', () => {-->
                    <!--resolve();-->
                <!--});-->
            <!--});-->
            <!--document.querySelector('head').appendChild(newAPI);-->
            <!--return apiLoaded;-->
        <!--},-->
        <!--initMap() {-->
            <!--const bounds = new google.maps.LatLngBounds();-->
            <!--const element = document.getElementById(this.mapName);-->
            <!--const options = {-->
                <!--maxZoom: 14,-->
                <!--center: new google.maps.LatLng(this.lat, this.lon),-->
                <!--styles: [{-->
                    <!--'featureType': 'road',-->
                    <!--'stylers': [{-->
                        <!--'hue': '#5e00ff'-->
                    <!--},-->
                    <!--{-->
                        <!--'saturation': -79-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'poi',-->
                    <!--'stylers': [{-->
                        <!--'saturation': -78-->
                    <!--},-->
                    <!--{-->
                        <!--'hue': '#6600ff'-->
                    <!--},-->
                    <!--{-->
                        <!--'lightness': -47-->
                    <!--},-->
                    <!--{-->
                        <!--'visibility': 'off'-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'road.local',-->
                    <!--'stylers': [{-->
                        <!--'lightness': 22-->
                    <!--}]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'landscape',-->
                    <!--'stylers': [{-->
                        <!--'hue': '#6600ff'-->
                    <!--},-->
                    <!--{-->
                        <!--'saturation': -11-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{},-->
                <!--{},-->
                <!--{-->
                    <!--'featureType': 'water',-->
                    <!--'stylers': [{-->
                        <!--'saturation': -65-->
                    <!--},-->
                    <!--{-->
                        <!--'hue': '#1900ff'-->
                    <!--},-->
                    <!--{-->
                        <!--'lightness': 8-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'road.local',-->
                    <!--'stylers': [{-->
                        <!--'weight': 1.3-->
                    <!--},-->
                    <!--{-->
                        <!--'lightness': 30-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'transit',-->
                    <!--'stylers': [{-->
                        <!--'visibility': 'simplified'-->
                    <!--},-->
                    <!--{-->
                        <!--'hue': '#5e00ff'-->
                    <!--},-->
                    <!--{-->
                        <!--'saturation': -16-->
                    <!--}-->
                    <!--]-->
                <!--},-->
                <!--{-->
                    <!--'featureType': 'transit.line',-->
                    <!--'stylers': [{-->
                        <!--'saturation': -72-->
                    <!--}]-->
                <!--},-->
                <!--{}-->
                <!--]-->

            <!--};-->
            <!--const map = new google.maps.Map(element, options);-->
            <!--var coord = {-->
                <!--latitude: this.lat,-->
                <!--longitude: this.lon-->
            <!--};-->
            <!--var title = this.address;-->
            <!--const position = new google.maps.LatLng(coord.longitude, coord.latitude);-->
            <!--// const icon = require('assets/img/contacts/maps_marker.svg');-->
            <!--var icon = {-->
                <!--url: require('assets/img/contacts/maps_marker.svg'),-->
                <!--// This marker is 20 pixels wide by 32 pixels high.-->
                <!--size: new google.maps.Size(60, 100),-->
                <!--// The origin for this image is (0, 0).-->
                <!--origin: new google.maps.Point(0, 0),-->
                <!--// The anchor for this image is the base of the flagpole at (0, 32).-->
                <!--anchor: new google.maps.Point(0, 32),-->
                <!--scaledSize: new google.maps.Size(30, 50)-->
            <!--};-->
            <!--const marker = new google.maps.Marker({-->
                <!--position,-->
                <!--map,-->
                <!--title,-->
                <!--icon-->
            <!--});-->
            <!--// map.setCenter(coord);-->

            <!--map.fitBounds(bounds.extend(position));-->
            <!--map.setZoom(14);-->
        <!--}-->

    <!--}-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.google-map {-->
  <!--width: 100%;-->
  <!--height: 600px;-->
  <!--background: gray;-->
<!--}-->
<!--</style>-->
