<template>
  <div id="app">
    <NavComponent :callback="changeThePage"></NavComponent>
    <hr>
    <AssetComponent :callback="changeThePage" v-if="currentPage==='assets'"></AssetComponent>
    <CreateAssetComponent v-if="currentPage==='createAsset'"></CreateAssetComponent>
  </div>
</template>

<script>
import AssetComponent from "./components/AssetComponent";
import NavComponent from "./components/NavComponent";
import CreateAssetComponent from "./components/CreateAssetComponent";

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
    CreateAssetComponent:CreateAssetComponent,
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
