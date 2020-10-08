<template>
  <div id="app">
    <NavComponent :callback="changeThePage"></NavComponent>
    <AssetComponent v-if="currentPage==='assets'"></AssetComponent>
  </div>
</template>

<script>
import AssetComponent from "./components/AssetComponent";
import NavComponent from "./components/NavComponent";

export default {
  name: "App",
  data: function() {
    return {
      currentPage: "assets",
    };
  },
  components: {
    AssetComponent: AssetComponent,
    NavComponent: NavComponent,
  },
  methods: {
    changeThePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style>

</style>
