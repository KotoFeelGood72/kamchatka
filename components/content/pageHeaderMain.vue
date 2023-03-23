<template>
    <div class="page-header">
        <img-com :img="data" classImg="page-header__overlay"/>
        <div class="container">
            <h1 class="page-header__title" >
              <slot/>
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pageHeader',
    props: ['data'],
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";
    .page-header > * {
        position: relative;
    }
    .page-header {
        position: absolute;
        bottom: 30px;
        left: 0;
				width: 100%;
    }
</style>
