<template>
  <div class="container mt-5">
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="assets-container">
      <h3 class="mt-5">Accounts :</h3>
      <b-table hover :items="accounts"  head-variant="dark"
               striped :fields="accountFields"
               :sort-by.sync="sortAccountBy"
               :sort-desc.sync="sortDesc"
               sort-icon-left></b-table>
      <hr>
      <h3>Cashes :</h3>
      <b-table hover :items="cashes"  head-variant="dark" striped :fields="cashFields"
               :sort-by.sync="sortCashBy"
               :sort-desc.sync="sortDesc"
               sort-icon-left></b-table>
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

      // Sorting Account table
      sortAccountBy: 'bank_name',
      sortDesc: false,
      accountFields: [
        { key: 'bank_name', sortable: true },
        { key: 'account_number', sortable: true },
        { key: 'amount', sortable: true },
        { key: 'currency', sortable: false }
      ],

      // Sorting Cash Table
      sortCashBy: 'amount',
      cashFields: [
        { key: 'amount', sortable: true },
        { key: 'currency', sortable: false }
      ],
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
