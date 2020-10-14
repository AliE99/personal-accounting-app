<template>
  <div class="">
    <h4 align="right"> : حساب های بانکی </h4>
    <b-button class="mb-1 p-2" block variant="success" disabled>ارزش کل : {{total_money | numFormat}}</b-button>
    <b-alert class="mt-5"
             :show="dismissCountDown"
             dismissible
             :variant="alertKind"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged"
    >
      {{ alertMsg }}
    </b-alert>
    <b-table :items="this.accountData" :fields="accountFields" striped responsive="sm" head-variant="dark" small hover>

      <template v-slot:cell(amount)="data">
        {{ data.item.amount | numFormat }}
      </template>

      <template v-slot:cell(details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2" variant="outline-info">
          {{ row.detailsShowing ? "بستن" : "نمایش" }}
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
            <b-col sm="3" class="text-sm-right"><b>موجودی :</b></b-col>
            <b-col>{{ row.item.amount }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>واحد پول:</b></b-col>
            <b-col>{{ row.item.currency }}</b-col>
          </b-row>

          <b-button size="sm" @click="deleteAccount(row.item._id)" variant="danger">حذف حساب بانکی</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "BankAccountComponent",
  data() {
    return {
      total_money:0,

      // Alert
      dismissSecs: 3,
      dismissCountDown: 0,
      alertKind: "",
      alertMsg: "",

      accounts: this.accountData,
      // Sorting Account table
      sortAccountBy: "amount",
      sortDesc: true,
      accountFields: [
        {key: "bank_name", sortable: true, label: "بانک"},
        {key: "amount", sortable: true, label: "موجودی"},
        {key: "details", label: "مشخصات"},
      ],
    };
  },
  methods: {
    deleteAccount(id) {
      const url = `http://localhost:3000/accounts/delete/${id}`;
      if (confirm("آیا میخواهید حساب مورد نظر را حذف کنید ؟")) {
        axios.delete(url).then(() => {
          this.showAlert("success", "حساب بانکی  شما با موفقیت حذف شد !");
          setTimeout(()=>{
            window.location.reload();
          }, 3000);
        }).catch(err => {
          this.showAlert("danger", "مشکلی در حذف حساب بانکی شما وجود دارد لطفا مجددا تلاش کنید !");
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
  },
  props: {
    accountData: {
      type: Array,
    },
  },
  mounted() {
    axios.get("http://localhost:3000/accounts/total").then(total=>{
      this.total_money = total.data[0].total_amount;
    })
  },
};
</script>

<style scoped>
</style>