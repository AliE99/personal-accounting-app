<template>
  <div class="container">
    <p class="mt-5" align="center">Loading...</p>
  </div>

</template>

<script>
const {W} = window;

export default {
  name: "LoadingComponent",

  mounted() {
    W.setHooks({
          wappWillStart: (start) => {
            W.initializeAsync().then(() => {
              start();
              this.doneLoading();
            });
          },
        },
    );
  },

  methods: {
    doneLoading() {
      this.callback("assets");
    },
  },

  props: {
    callback: {
      type: Function,
    },
  },
};
</script>

<style scoped>

</style>