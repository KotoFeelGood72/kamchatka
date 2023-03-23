<template>
    <div class="content-divider"
         :class="classes">
        <div v-if="slotPassed" :class="this.container === 'middle' ? 'container--middle' : 'container'">
            <div class="row">
                <div class="col-8 col-md-6">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'divider',
    props: [
        'align',
        'container',
        'type'
    ],
    computed: {
        classes: function() {
            let classes = [];
            if (this.type) {
                classes.push('content-divider--' + this.type);
            }
            if (this.align) {
                classes.push('content-divider--' + this.align);
            }
            if (this.$slots.default) {
                classes.push('content-divider--has-slot');
            }
            return classes.join(' ');
        },
        slotPassed() {
            return !!this.$slots.default;
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/mixins";
    @import "~@/assets/scss/config";

    .content-divider {
        background-image: url('~assets/img/faq/union.svg');
        background-size: 45% 100%;
        background-repeat: no-repeat;
        background-position: 0 50%;
        min-height: 4em;
        width: 100vw;
        margin-top: 2.5em;
        margin-bottom: 2.5em;
        margin-left: 50%;
        transform: translateX(-50%);

        @include respond-to(sm) {
            background-size: 35%;
        }
        @include respond-to(xs) {
            background-size: 22%;
        }
    }

    .content-divider--lightblue {
        background-image: url('~assets/img/faq/divider-lightblue.svg');
    }

    .content-divider--has-slot {
        margin-top: 4.5em;
    }

    .content-divider--double {
        background-image: url('~assets/img/entryRules/wave.svg');
    }
    .content-divider--mount {
        background-image: url('~assets/img/howToGet/lightning.svg');
        min-height: 10em;
        background-size: 55% 100%;
        @include respond-to(sm) {
            background-size: 40%;
        }
    }
    .content-divider--center {
        margin: 6em auto;
        width: 70%;
        transform: none;
        height: 10em;
        background-position: center;
        background-size: contain;
    }
    .content-divider--right {
        background-position: right;
    }
</style>
