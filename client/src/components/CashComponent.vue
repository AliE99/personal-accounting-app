<template>
  <div class="container">
    <h3>پول نقد :</h3>
    <b-alert show variant="secondary">ارزش کل : {{ this.total_amount[0].total_amount }}</b-alert>
    <b-table hover :items="this.cashData" head-variant="dark" striped :fields="cashFields"
             :sort-by.sync="sortCashBy"
             :sort-desc.sync="sortDesc"
             sort-icon-left></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CashComponent",
  data() {
    return {
      total_amount:[],
      // Sorting Cash Table
      sortCashBy: "amount",
      sortDesc: false,
      cashFields: [
        {key: "amount", sortable: true},
        {key: "currency", sortable: false},
      ],
    };
  },
  props: {
    cashData: {
      type: Array,
    },
  },
  mounted() {
    axios.get("http://localhost:3000/cashes/total").then(total => {
      this.total_amount = total.data;
    });
  },
};
</script>

<style scoped>

</style>