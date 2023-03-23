<template>
	<div class="tripadvisor-review">
			<div class="tripadvisor-review__reviewer">
					<img
							class="tripadvisor-review__reviewer-avatar"
							:src="require(`~/assets/img/reviewer-avatars/${avatar}`)"
							alt=""
					/>
					<div class="tripadvisor-review__reviewer-right">
							<div class="tripadvisor-review__reviewer-name size-small">{{reviewer}}</div>
							<div class="tripadvisor-review__reviewer-date">{{date}}</div>
					</div>
			</div>
			<ul class="tripadvisor-review__stars">
					<li class="star" v-for="(star, key) in 5" :key="star + key"><Icon icon="ic:baseline-star" /></li>
			</ul>
			<div class="tripadvisor-review__title size-small">{{title}}</div>
			<div class="tripadvisor-review__text global-type_scrollbar" v-html="text"></div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
	components: {
		Icon,
	},
	props: ['title', 'text', 'date', 'reviewer', 'avatar'],
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
.tripadvisor-review {
	width: 100%;
	padding-right: 54px;
	@include respond-to(md) {
			padding-right: 0;
	}
}
.tripadvisor-review__reviewer {
	display: flex;
	margin-bottom: 12px;
	font-size: 16px;
}
.tripadvisor-review__reviewer-avatar {
	width: 60px;
	height: 60px;
	border-radius: 100%;
}
.tripadvisor-review__reviewer-right {
	margin-left: 20px;
}
.tripadvisor-review__reviewer-name {
	margin-bottom: 2px;
}
.tripadvisor-review__stars {
	list-style: none;
	@include flex-start;
	flex-wrap: wrap;
	margin: -10px -10px 0 0;
	li {
		padding: 10px 10px 0 0;
		font-size: 23px;
		color: $light-blue;
	}
}
.tripadvisor-review__title {
	margin: 10px 0 20px 0;
}
.tripadvisor-review__text {
	max-height: 345px;
	overflow-y: auto;
	padding-right: 30px;
}


</style>
