<template>
  <div id="app">
    <NavComponent :callback="changeThePage"></NavComponent>
    <AssetComponent :callback="changeThePage" v-if="currentPage==='assets'"></AssetComponent>
    <CreateAssetComponent v-if="currentPage==='createAsset'"></CreateAssetComponent>
    <TransactionComponent v-if="currentPage==='trans'"></TransactionComponent>
  </div>
</template>

<script>
import AssetComponent from "./components/AssetComponent";
import NavComponent from "./components/NavComponent";
import CreateAssetComponent from "./components/CreateAssetComponent";
import TransactionComponent from "./components/TransactionComponent";

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
    CreateAssetComponent: CreateAssetComponent,
    TransactionComponent: TransactionComponent,
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
