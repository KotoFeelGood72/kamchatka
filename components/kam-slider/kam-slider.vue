<template>
	<div class="global-slider_w">
		<div class="global_slider swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(slide, index) in data" :key="'slide-' + index">
					<div class="global_slide_w">
						<div class="global_slideContent">
							<div class="global_slideCount"></div>
							<div class="global_slideTxt">
								<h3 class="size-big">
									<nuxt-link
										v-if="slide.slug || url !== undefined"
										:to="$i18n.locale === 'en' ?  url + slide.slug + '/' : url + slide.slug + '/'"
										v-html="slide.name"
									/>
								</h3>
								<p class="size-medium" v-html="slide.text"/>
							</div>
							<div class="global_slideNavigation">
								<div class="global_slideNavPrev"><Icon icon="bi:chevron-left" /></div>
								<div class="global_slideNavNext"><Icon icon="bi:chevron-right" /></div>
							</div>
						</div>
						<div class="global_slideImg_w">
							<div class="global_slideVideo" v-if="slide.video">
								<a :href="slide.video" data-fancybox>
									<img-com :img="slide.img" classImg="video-embed__img"/>
								</a>
							</div>
							<div class="global_slideImg" v-else>
								<img-com :img="slide.img" classImg="video-embed__img"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
// import { Icon } from '@iconify/vue2';
export default {
		props: ["data", "url"],
		mounted() {
			this.globalSLider = new Swiper('.global_slider', {
				speed: 600,
				slidesPerView: '1',
				effect: 'fade',
				navigation: {
					nextEl: '.global_slideNavNext',
					prevEl: '.global_slideNavPrev'
				},
				pagination: {
					el: '.global_slideCount',
					type: 'fraction',
					renderFraction: function (currentClass, totalClass) {
						return `<span class="double_count ${currentClass}"></span>
							<span class="global_slider--separator"></span>
							<span class=" double_count ${totalClass}"></span>`;
					}
				}
			});

		},
		components: {
			// Icon,
		}
	}
</script>

<style lang="scss">
@import "~@/assets/scss/mixins";
@import "~@/assets/scss/config";
.global-slider_w {
	background-color: $gray-blue;
}

.global_slide_w {
	@include flex-start;
	height: 100vh;
	background-color: $gray-blue;

}
.global_slideContent {
	padding: 120px 70px 60px;
	width: 50%;
	height: 100%;
	position: relative;
}
.global_slideCount {
	font-size: 50px;
	color: $white;
	font-weight: 900;
	@include flex-start;


}
.global_slideTxt {
	padding: 70px 0 100px 0;
	max-height: 650px;
	overflow-y: auto;
	h3 {
		margin-bottom: 40px;
	}
	h3, p {
		max-width: 600px;
	}
}
.global_slideNavigation {
	position: absolute;
	bottom: 100px;
	@include flex-start;
	div {
		width: 70px;
		height: 70px;
		border-radius: 100%;
		border: 2px solid $white;
		color: $white;
		@include flex-center;
		cursor: pointer;
		transition: all .3s ease;

		&.swiper-button-disabled {
			pointer-events: none;
			opacity: .7;
		}
		&:hover {
			color: $light-blue;
			border-color: inherit;
		}
		svg {
			width: 25px;
			height: 25px;
		}
		&:first-child {
			margin-right: 100px;
		}
	}
}
.global_slideNavPrev {
}
.global_slideNavNext {
}
.global_slideImg_w {
	width: 50%;
	min-width: 50%;
	height: 100%;
	.img__container {
		height: 100%;
	}
	img {
		height: 100%;
		object-fit: cover;
	}
}
.global_slideVideo, .global_slideImg {
	height: 100%;
}
.global_slider--separator {
		width: 120px;
		border-bottom: .07em solid $white;
		@include flex-center;
		margin: 0 30px;
	}


.double_count {
	&:before {
		content: '0';
	}
}
</style>
