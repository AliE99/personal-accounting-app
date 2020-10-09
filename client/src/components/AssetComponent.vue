<template>
  <div class="container mt-5">
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="assets-container">
      <BankAccountComponent :accountData="accounts"></BankAccountComponent>
      <CashComponent :cashData="cashes"></CashComponent>
      <hr>
    </div>
    <div class="container">
      <b-button @click="changeThePage('createAsset')" block pill variant="outline-primary">ایجاد یک دارایی جدید
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
      accounts: {},
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
