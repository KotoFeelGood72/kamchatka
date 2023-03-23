<template>
    <div class="timezone">
        <span class="timezone__title" v-html="$t('footer.timeTitle')"/>
        <span class="timezone__time" v-html="time"/>
    </div>
</template>
<script>
export default {
    name: 'TimeZone',
    data() {
        return {
            time: '00:00'
        };
    },
    created() {
        this.changeTime();
    },
    methods: {
        changeTime() {
            this.time = new Date().toLocaleString(
                'en-GB',
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Kamchatka'
                }
            );
            setTimeout(() => {
                this.changeTime();
            }, 5000);
        }
    }
};
</script>

<style lang="scss">
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";
    @import "wow.js/css/libs/animate.css";
    .timezone {
        font-size: 30px;
        font-weight: 900;
        color: #fff;
    }

    .timezone__title {
        display: block;
    }
    .timezone__time {
        display: block;
        line-height: 1.5;
        font-size: 2.33em;
        color: color(lightBlue);
    }
</style>
