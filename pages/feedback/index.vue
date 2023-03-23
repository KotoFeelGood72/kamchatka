<template>
  <Feedback :onClose="onClose" />
</template>


<script>
  import Feedback from '../../components/feedback/feedback';


    export default {
        name: 'FeedbackPage',
        components: {Feedback},
        methods: {
          onClose() {
            this.$router.back();
          }
        }
    };
</script>