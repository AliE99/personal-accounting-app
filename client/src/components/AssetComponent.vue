<template>
  <div class="container mt-5">
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="assets-container">
      <h3>Accounts :</h3>
      <b-table hover :items="accounts" :fields="['bank_name', 'amount', 'currency']" head-variant="dark" striped></b-table>
      <hr>
      <h3>Cashes :</h3>
      <b-table hover :items="cashes" :fields="['amount', 'currency']" head-variant="dark" striped></b-table>
      <hr>
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
  async mounted() {
    getAssets().then(data => {
      this.accounts = data.account;
      this.cashes = data.cash;
      console.log(data);
    }).catch(err => {
      console.log(`Error : ${err}`);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
