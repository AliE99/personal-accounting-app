<template>
  <div class="container mt-5">
    <hr>
    <h4 class="container" align="right"> : تراکنش ها</h4>
    <div class="">
      <b-alert class="mt-5"
               :show="dismissCountDown"
               dismissible
               :variant="alertKind"
               @dismissed="dismissCountDown=0"
               @dismiss-count-down="countDownChanged"
      >
        {{ alertMsg }}
      </b-alert>

      <b-table class="" :items="transaction" :fields="transactionFields" striped responsive="sm"
               head-variant="dark" small hover>


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

            <b-button size="sm" @click="deleteTransaction(row.item._id)" variant="danger">حذف تراکنش</b-button>
          </b-card>
        </template>
      </b-table>
      <b-button class="fixed-bottom" @click="changeThePage('createTransaction')" block pill variant="primary">ثبت دخل و
        خرج
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

      dismissSecs: 3,
      dismissCountDown: 0,
      alertKind: "",
      alertMsg: "",

      transaction: {},
      transactionFields: [
        {key: "kind", sortable: true, label: "تراکنش"},
        {key: "amount", sortable: true, label: "مقدار"},
        {key: "createdAt", label: "تاریخ", sortable: true},
        {key: "details", label: "مشخصات"},
      ],
    };
  },

  mounted() {

    // Load data every time
    this.reRenderPage();
  },

  methods: {
    changeThePage(page) {
      this.callback(page);
    },
    deleteTransaction(id) {
      const url = `http://localhost:3000/transactions/delete/${id}`;
      if (confirm("آیا میخواهید تراکنش مورد نظر را حذف کنید ؟")) {
        axios.delete(url).then(() => {
          this.showAlert("success", "تراکنش  شما با موفقیت حذف شد !");
          this.reRenderPage();
        }).catch(err => {
          this.showAlert("danger", "مشکلی در حذف تراکنش شما وجود دارد لطفا مجددا تلاش کنید !");
          alert(err);
        });

      }
    },

    // Alert for success or reject saving data
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(kind, msg) {
      this.alertMsg = msg;
      this.alertKind = kind;
      this.dismissCountDown = this.dismissSecs;
    },

    reRenderPage() {
      axios.get("http://localhost:3000/transactions").then(transaction => {
        this.transaction = transaction.data;
      }).catch(err => {
        alert(err);
      });
    },
  },

  props: {
    callback: {
      type: Function,
    },
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */

</style>