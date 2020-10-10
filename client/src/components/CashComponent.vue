<template>
  <div class="container">
    <h3>Cashes :</h3>
    <b-table hover :items="this.cashData" head-variant="dark" striped :fields="cashFields" responsive="sm"
             :sort-by.sync="sortCashBy"
             :sort-desc.sync="sortDesc"
             sort-icon-left></b-table>
  </div>
</template>

<script>
export default {
  name: "CashComponent",
  data() {
    return {
      cashes : this.cashData,
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
};
</script>

<style scoped>
</style>