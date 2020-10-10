<template>
  <div class="container mt-5">
    <h3 class="mt-5">Accounts :</h3>
    <b-table hover :items="this.accountData" head-variant="dark"
             striped :fields="accountFields"
             :sort-by.sync="sortAccountBy"
             :sort-desc.sync="sortDesc"
             sort-icon-left></b-table>
    <hr>
  </div>
</template>

<script>
export default {
  name: "BankAccountComponent",
  data() {
    return {
      accounts: this.accountData,
      // Sorting Account table
      sortAccountBy: "bank_name",
      sortDesc: false,
      accountFields: [
        {key: "bank_name", sortable: true},
        {key: "account_number", sortable: true},
        {key: "amount", sortable: true},
        {key: "currency", sortable: false},
      ],
    };
  },
  props: {
    accountData: {
      type: Array,
    },
  },
};
</script>

<style scoped>
</style>