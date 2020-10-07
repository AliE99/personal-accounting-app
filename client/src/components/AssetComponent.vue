<template>
  <div class="container">
    <h1>Latest Assets</h1>
    <hr>
    <p v-if="error">{{ error }}</p>
        <div class="assets-container">
          <div class="account" v-for="account in accounts" v-bind:item="account" :key="account._id">
            <p>{{account.bank_name}} : {{ account.amount }} {{ account.currency }}</p>
          </div>
          <!--      <p>{{ cashes }}</p>-->
        </div>
    <p>{{ accounts }}</p>
  </div>
</template>

<script>

import getAssets from "../services/AssetService";

export default {
  name: "AssetComponent",
  data() {
    return {
      assets: [],
      accounts: {},
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
