<template>
  <div>
    <b-table :items="this.accountData" :fields="accountFields" striped responsive="sm">
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>

      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>بانک :</b></b-col>
            <b-col>{{ row.item.bank_name }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>شماره حساب :</b></b-col>
            <b-col>{{ row.item.account_number }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>مقدار :</b></b-col>
            <b-col>{{ row.item.amount }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>واحد پول:</b></b-col>
            <b-col>{{ row.item.currency }}</b-col>
          </b-row>

        </b-card>
      </template>
    </b-table>
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
        {key: "amount", sortable: true},
        "show_details",
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