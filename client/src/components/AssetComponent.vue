<template>
  <div class="container mt-5">
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="assets-container">
      <h3 class="mt-5">Accounts :</h3>
      <b-table hover :items="accounts" :fields="['bank_name', 'amount', 'currency']" head-variant="dark"
               striped></b-table>
      <hr>
      <h3>Cashes :</h3>
      <b-table hover :items="cashes" :fields="['amount', 'currency']" head-variant="dark" striped></b-table>
      <hr>
    </div>
    <div class="container">
      <b-button  @click="changeThePage('createAsset')" block pill variant="outline-primary" >ایجاد یک دارایی جدید</b-button>
    </div>
  </div>
</template>

<script>

import getAssets from "../services/AssetService";

export default {
  name: "AssetComponent",
  data() {
    return {
      accounts: {},
      accItem: [],
      cashes: {},
      error: "",
    };
  },
  props: {
    callback: {
      type: Function,
    },
  },
  async mounted() {
    getAssets().then(data => {
      this.accounts = data.account;
      this.cashes = data.cash;
      console.log(data);
    }).catch(err => {
      console.log(`Error : ${err}`);
    });
  },
  methods: {
    changeThePage(page) {
      console.log("hi");
      this.callback(page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
