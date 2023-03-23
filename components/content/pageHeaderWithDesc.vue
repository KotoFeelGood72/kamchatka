<template>
    <div class="page-header">
        <img-com :img="data" classImg="page-header__overlay"/>
        <div class="container">
            <h1 class="page-header__title" ><slot/></h1>
            <div class="container__description_title">
                 <h2>{{descriptionTitle}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pageHeader',
    props: ['data', 'descriptionTitle'],
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";
        .container{
            display: flex;
            justify-content: space-between;
             @include respond-to(md) {
                flex-direction: column;
             }
             @include respond-to(sm){
                flex-direction: row;
            }
            @include respond-to(xs){
                flex-direction: column;
            }
        }
        .container__description_title{
            width:680px;
            max-width:100%;
            h2{
                font-size: 70px;
                line-height: 80px;
                color:#fbfbfb;
                max-width: 450px;
                margin-top:50px;
                 @include respond-to(xlg) {
                     font-size:55px;
                     line-height: 60px;
                     max-width:350px;
                     margin-top:50px;
                 }
                    @include respond-to(lg) {
                       margin-top:30px;

                  }
                  @include respond-to(md) {
                       margin-top:30px;
                       font-size:40px;
                       line-height: 50px;
                       max-width: 450px;
                  }
                  @include respond-to(sm){
                         max-width: 210px;
                         margin-top:0px;
                         font-size:30px;
                         line-height: 40px;
                         margin-top:10px;
                  }
                @include respond-to(xs){
                         font-size:26px;
                         line-height: 30px;
                         max-width:300px;


                }

            }
             @include respond-to(xlg) {
                    width:350px;
                 }
            @include respond-to(lg) {
                    width:450px;
            }
              @include respond-to(sm){
                    width: 210px;
            }
             @include respond-to(xs){
                    width:300px;
                }
        }
    .page-header {
        position: absolute;
        min-height: calc(100vh - 100px);
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .page-header > * {
        position: relative;
    }
    .header__padding {
        padding-top: 19vh;
        padding-bottom: 40vh;
        @include respond-to(customMobile) {
            padding-top: 10vh;
            padding-bottom: 30vh;
        }
        h1 {
            @include respond-to(customMobile) {
                font-size: 40px;
            }
        }
    }

    .page-header__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center bottom;
    }

    .page-header__title {
        font-size: 108px;
        font-weight: 600;
        color: white;
        @include respond-to(lg) {
            font-size: 70px;
        }
        @include respond-to(sm) {
            font-size: 35px;
        }
    }

</style>
