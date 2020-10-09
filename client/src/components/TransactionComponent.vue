<template>
  <div class="container mt-5">
    <b-table striped hover :items="transaction"></b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransactionComponent",
  data() {
    return {
      transaction: {
        income:{},
        expense:{},
      },
    };
  },
  mounted() {
    axios.get("http://localhost:3000/transactions").then(transaction => {
      this.transaction = transaction.data;
    }).catch(err => {
      alert(err);
    });
  },
};
</script>

<style scoped>

</style>