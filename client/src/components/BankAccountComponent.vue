<template>
  <div class="container mt-5">
    <h3 class="mt-5">حساب بانکی :</h3>
    <b-alert show variant="secondary">ارزش کل : {{ this.total_amount[0].total_amount }}</b-alert>
    <b-table hover :items="this.accountData" head-variant="dark"
             striped :fields="accountFields"
             :sort-by.sync="sortAccountBy"
             :sort-desc.sync="sortDesc"
             sort-icon-left></b-table>
    <hr>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BankAccountComponent",

  data() {
    return {
      total_amount: [],
      // Sorting Account table
      sortAccountBy: "bank_name",
      sortDesc: false,
      accountFields: [
        {key: "bank_name", sortable: true},
        {key: "account_number", sortable: true},
        {key: "amount", sortable: true},
      ],
    };
  },
  props: {
    accountData: {
      type: Array,
    },
  },

  mounted() {
    axios.get("http://localhost:3000/accounts/total").then(total => {
      this.total_amount = total.data;
    });
  },
};
</script>

<style scoped>

</style>