<template>
    <ul class="change-lang">
			<li v-for="locale in $i18n.locales" :key="locale.code">
        <a :class="{'selected': $i18n.locale === locale.code}"
            :href="switchLocalePath(locale.code).endsWith('/') ? switchLocalePath(locale.code) : switchLocalePath(locale.code)+'/'">
            {{ locale.name }}
						</a>
			</li>
    </ul>
</template>

<script>
    export default {
        name: "lang"
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/config";
    @import "~@/assets/scss/mixins";
    .change-lang {
			margin-right: 30px;
			list-style: none;
			@include flex-start;
			@include respond-to(sm) {
				margin-right: 15px;
			}

			li {
				&:not(:last-child) {
					margin-right: 30px;
					@include respond-to(sm) {
						margin-right: 10px;
					}
				}
        a {
            color: $white;
						text-shadow: $text-shadow;
            font-size: 30px;
            @include respond-to(sm) {
                font-size: 18px;
            }
            &.selected {
                pointer-events: none;
                color: #1dcfff;
            }
        }
			}
    }
</style>
