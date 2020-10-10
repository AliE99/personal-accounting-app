<template>
  <div class="container mt-5">
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="container mt-5">
      <BankAccountComponent :accountData="accounts"></BankAccountComponent>
      <CashComponent :cashData="cashes"></CashComponent>
      <hr>
    </div>
    <div class="container">
      <b-button class="fixed-bottom" @click="changeThePage('createAsset')" block pill variant="primary">ایجاد یک دارایی جدید
      </b-button>
    </div>
  </div>
</template>

<script>

import getAssets from "../services/AssetService";
import BankAccountComponent from "@/components/BankAccountComponent";
import CashComponent from "@/components/CashComponent";

export default {
  name: "AssetComponent",
  components: {CashComponent, BankAccountComponent},
  data() {
    return {
      accounts: [],
      cashes: [],
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
    }).catch(err => {
      console.log(`Error : ${err}`);
    });

  },
  methods: {
    changeThePage(page) {
      this.callback(page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
