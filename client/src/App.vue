<template>
  <div id="app">
    <LoadingComponent :callback="changeThePage" v-if="currentPage==='loading'"></LoadingComponent>

    <NavComponent :callback="changeThePage" v-if="currentPage!=='loading'"></NavComponent>
    <AssetComponent :callback="changeThePage" v-if="currentPage==='assets'"></AssetComponent>
    <CreateAssetComponent v-if="currentPage==='createAsset'"></CreateAssetComponent>
    <TransactionComponent :callback="changeThePage" v-if="currentPage==='trans'"></TransactionComponent>
    <CreateTransactionComponent v-if="currentPage==='createTransaction'"></CreateTransactionComponent>
  </div>
</template>

<script>
import AssetComponent from "./components/AssetComponent";
import NavComponent from "./components/NavComponent";
import CreateAssetComponent from "./components/CreateAssetComponent";
import TransactionComponent from "./components/TransactionComponent";
import CreateTransactionComponent from "./components/CreateTransactionComponent";
import LoadingComponent from "@/components/LoadingComponent";

export default {
  name: "App",
  data: function() {
    return {
      currentPage: "loading",
    };
  },
  components: {
    CreateTransactionComponent,
    AssetComponent: AssetComponent,
    NavComponent: NavComponent,
    CreateAssetComponent: CreateAssetComponent,
    TransactionComponent: TransactionComponent,
    LoadingComponent: LoadingComponent,
  },
  methods: {
    changeThePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style>
* {
  /*font-family: 'Vazir', sans-serif;*/
  font-family: 'Almarai', sans-serif;
}

*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

</style>
