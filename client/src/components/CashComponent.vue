<template>
  <div class="">
    <h4 align="right">: پول نقد </h4>
    <b-table hover :items="this.cashData" head-variant="dark" striped :fields="cashFields" responsive="sm" small
             :sort-by.sync="sortCashBy"
             :sort-desc.sync="sortDesc"
             sort-icon-left>

      <template v-slot:cell(amount)="data">
        {{ data.item.amount | numFormat }}
      </template>

    </b-table>
  </div>
</template>

<script>

export default {
  name: "CashComponent",
  data() {
    return {
      cashes: this.cashData,
      // Sorting Cash Table
      sortCashBy: "amount",
      sortDesc: false,
      cashFields: [
        {key: "amount", sortable: true, label: "موجودی"},
        {key: "currency", sortable: false, label: "واحد"},
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