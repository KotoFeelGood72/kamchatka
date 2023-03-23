<template>
    <div class="tripadvisor-review">
        <div class="tripadvisor-review__reviewer">
            <img
                class="tripadvisor-review__reviewer-avatar"
                :src="require(`~/assets/img/reviewer-avatars/${avatar}`)"
                alt=""
            />
            <div class="tripadvisor-review__reviewer-right">
                <div class="tripadvisor-review__reviewer-name">{{reviewer}}</div>
                <div class="tripadvisor-review__reviewer-date">{{date}}</div>
            </div>
        </div>
        <div class="tripadvisor-review__stars">
            <div class="star" v-for="(star, key) in 5" :key="star + key"></div>
        </div>
        <div class="tripadvisor-review__title">{{title}}</div>
        <!-- <vue-custom-scrollbar> -->
            <div class="tripadvisor-review__text" v-html="text"></div>
        <!-- </vue-custom-scrollbar> -->
    </div>
</template>

<script>
export default {
    name: "TripadvisorReview",
    props: {
        title: {
            type: String
        },
        text: {
            type: String
        },
        date: {
            type: String
        },
        reviewer: {
            type: String
        },
        avatar: {
            type: String
        },
    }
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
    font-size: 20px;
    font-weight: 700;
}
.tripadvisor-review__reviewer-date {
    margin-top: 2px;
}
.tripadvisor-review__stars {
    display: flex;
    position: relative;
    height: 30px;
    margin-top: 12px;
}
.tripadvisor-review__title {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
}
.tripadvisor-review__text {
    margin-top: 20px;
    font-size: 16px;
    max-height: 345px;
}
.star {
    margin: 50px 0;
    height: 0;
    width: 0;
    border-right: 50px solid transparent;
    border-bottom: 35px solid #1DCFFF;;
    border-left: 50px solid transparent;
    transform: rotate(35deg) scale(0.2);
    position: absolute;
    top: -52px;
    &:nth-child(1) {
        left: -38px;
    }
    &:nth-child(2) {
        left: 0px;
    }
    &:nth-child(3) {
        left: 38px;
    }
    &:nth-child(4) {
        left: 76px;
    }
    &:nth-child(5) {
        left: 114px;
    }
}
.star:before,
.star:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
}
.star:before {
    top: -26px;
    left: -32px;
    border-bottom: 40px solid #1DCFFF;;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    transform: rotate(-35deg);
}
.star:after {
    top: 2px;
    left: -53px;
    border-right: 50px solid transparent;
    border-bottom: 35px solid #1DCFFF;;
    border-left: 50px solid transparent;
    transform: rotate(-70deg);
}

</style>
