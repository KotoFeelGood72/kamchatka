<!--<template>-->
    <!--<v-pagination v-model="offset" :page-count="pageSize" :labels="paginationAnchorIco"/>-->
<!--</template>-->

<!--<script>-->
<!--import vPagination from 'vue-plain-pagination';-->
<!--export default {-->
    <!--name: 'pagination',-->
    <!--props: ['currentPage', 'pageSize'],-->
    <!--components: {vPagination},-->
    <!--data() {-->
        <!--return {-->
            <!--offset: this.currentPage,-->
            <!--paginationAnchorIco: {-->
                <!--first: '',-->
                <!--prev: '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">\n' +-->
                <!--'                            <g opacity="0.85">\n' +-->
                <!--'                                <circle r="29" transform="matrix(-1 8.74228e-08 8.74228e-08 1 30 30)" stroke="#150F1E"\n' +-->
                <!--'                                        stroke-width="2"/>\n' +-->
                <!--'                                <path\n' +-->
                <!--'                                        d="M14.2222 30.7778C13.7926 30.3482 13.7926 29.6518 14.2222 29.2222L21.2225\n' +-->
                <!--'                                     22.2218C21.6521 21.7923 22.3486 21.7923 22.7782 22.2218C23.2078 22.6514\n' +-->
                <!--'                                      23.2078 23.3479 22.7782 23.7775L16.5556 30L22.7782 36.2225C23.2078\n' +-->
                <!--'                                       36.6521 23.2078 37.3486 22.7782 37.7782C22.3486 38.2078 21.6521\n' +-->
                <!--'                                        38.2078 21.2225 37.7782L14.2222 30.7778ZM45 31.1L15 31.1L15 28.9L45 28.9L45 31.1Z"\n' +-->
                <!--'                                        fill="#150F1E"/>\n' +-->
                <!--'                            </g>\n' +-->
                <!--'                        </svg>',-->
                <!--next: '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">\n' +-->
                <!--'                            <g opacity="0.85">\n' +-->
                <!--'                                <circle r="29" transform="matrix(1 0 0 -1 30 30)" stroke="#150F1E" stroke-width="2"/>\n' +-->
                <!--'                                <path\n' +-->
                <!--'                                        d="M45.7778 29.2222C46.2074 29.6518 46.2074 30.3482 45.7778 30.7778L38.7775\n' +-->
                <!--'                                     37.7782C38.3479 38.2078 37.6514 38.2078 37.2218 37.7782C36.7922\n' +-->
                <!--'                                      37.3486 36.7922 36.6521 37.2218 36.2225L43.4444 30L37.2218 23.7775C36.7922\n' +-->
                <!--'                                      23.3479 36.7922 22.6514 37.2218 22.2218C37.6514 21.7922 38.3479 21.7922\n' +-->
                <!--'                                      38.7775 22.2218L45.7778 29.2222ZM15 28.9H45V31.1H15V28.9Z"\n' +-->
                <!--'                                        fill="#150F1E"/>\n' +-->
                <!--'                            </g>\n' +-->
                <!--'                        </svg>',-->
                <!--last: ''-->
            <!--}-->
        <!--};-->
    <!--},-->
    <!--methods: {-->
        <!--upPage() {-->
            <!--let t;-->
            <!--let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);-->
            <!--if (top > 0) {-->
                <!--window.scrollBy(0, ((top + 100) / -10));-->
                <!--t = setTimeout(() => this.upPage(), 20);-->
            <!--} else clearTimeout(t);-->
            <!--return false;-->
        <!--}-->
    <!--},-->
    <!--watch: {-->
        <!--offset() {-->
            <!--this.$emit('getData', this.offset);-->
            <!--this.upPage();-->
        <!--}-->
    <!--}-->
<!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
    <!--.pagination {-->
        <!--display: flex;-->
        <!--width: 100%;-->
        <!--justify-content: space-between;-->
        <!--align-items: center;-->
        <!--padding-top: 100px;-->
        <!--padding-bottom: 100px;-->

        <!--@media all and (max-width: 700px) {-->
            <!--padding-top: 56px;-->
            <!--padding-bottom: 88px;-->
        <!--}-->

        <!--@media all and (max-width: 700px) {-->
            <!--svg {-->
                <!--width: 40px;-->
                <!--height: 40px;-->
            <!--}-->
        <!--}-->

        <!--&__main {-->
            <!--display: flex;-->
            <!--align-items: center;-->

            <!--li {-->
                <!--margin: 0 20px;-->
            <!--}-->

            <!--a {-->
                <!--font-size: 30px;-->
                <!--line-height: 50px;-->
                <!--/* or 167% */-->

                <!--/* 150F1E_kit pre_main page */-->
                <!--color: #150F1E;-->
                <!--opacity: 0.85;-->

                <!--&:hover {-->
                    <!--color: #259AFF-->
                <!--}-->

                <!--@media all and (max-width: 700px) {-->
                    <!--font-size: 20px;-->
                <!--}-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</style>-->
