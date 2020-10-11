<template>
  <div class="mt-5">
    <hr>
    <h3 >تراکنش ها :</h3>
    <div class="">
      <b-table class="" :items="transaction" :fields="transactionFields" striped responsive="true" hover small>

        <template v-slot:cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template v-slot:cell(createdAt)="data">
          {{ new Date(data.item.createdAt).toLocaleDateString("fa-IR") }}
          {{ new Date(data.item.createdAt).toLocaleTimeString("fa-IR") }}
        </template>


        // Collapse
        <template v-slot:cell(details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="outline-info">
            {{ row.detailsShowing ? "پنهان" : "نمایش" }}
          </b-button>

        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>نوع :</b></b-col>
              <b-col>{{ row.item.kind }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>مقدار :</b></b-col>
              <b-col>{{ row.item.amount }}</b-col>
            </b-row>


            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>منبع:</b></b-col>
              <b-col>{{ row.item.source }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>تاریخ :</b></b-col>
              <b-col>{{ new Date(row.item.createdAt).toLocaleDateString("fa-IR") }}/
                {{ new Date(row.item.createdAt).toLocaleTimeString("fa-IR") }}
              </b-col>
            </b-row>

          </b-card>
        </template>
      </b-table>
      <b-button class="fixed-bottom" @click="changeThePage('createTransaction')" block pill variant="primary">ثبت دخل و خرج
      </b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransactionComponent",
  data() {
    return {
      transaction: {},
      transactionFields: [
        {key: "kind", sortable: true, label: "تراکنش"},
        {key: "amount", sortable: true, label: "مقدار"},
        {key: "createdAt", label: "تاریخ", sortable: true},
        "details",
      ],
    };
  },

  mounted() {
    axios.get("http://localhost:3000/transactions").then(transaction => {
      this.transaction = transaction.data;
    }).catch(err => {
      alert(err);
    });
  },

  methods: {
    changeThePage(page) {
      this.callback(page);
    },
  },

  props: {
    callback: {
      type: Function,
    },
  },
};
</script>

<style scoped>

</style>