<template lang="html">
    <div class="loading-page" v-if="loading">
        <div class="preloader__wrapper">
            <img
                src="~assets/img/preload/loading.gif"
                alt class="preload__img"
            />
            <div class="preloader__progress" style="width: 0"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            loading: false,
            progressWidth: 0,
            loadingProgress: 0,
        }),
        methods: {
            start () {
             this.loading = true;
                let width = 0;
                let timer = setInterval(() => {
                    if (width > 100) clearInterval(timer);
                    width += 2;
                    if (document.querySelector(".preloader__progress")) {
                        document.querySelector(
                            ".preloader__progress"
                        ).style.width = `${width}%`;
                    }
                }, 15);
            },
            finish () {
                setTimeout(() => {
                    this.loading = false
                }, 100);
            },
        },

    }
</script>

<style scoped lang="scss">
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        &__progress {
            height: 2px;
            background-color: #537786;
            transition: 0.4s 0s all ease;
        }
    }
</style>
