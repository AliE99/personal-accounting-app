<template>
  <div class="container mt-5">
    <hr>

    <b-alert class="mt-5"
             :show="dismissCountDown"
             dismissible
             :variant="alertKind"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged"
    >
      {{ alertMsg }}
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset">

      <b-form-group required class="container mt-5" label=" : نوع تراکنش خود را مشخص کنید">
        <b-form-radio v-model="kind" name="income" value="income">دریافتی</b-form-radio>
        <b-form-radio v-model="kind" name="expense" value="expense">پرداختی</b-form-radio>
      </b-form-group>

      <b-form-group
          class="container"
          id="input-group-1"
          label=" : مقدار"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="amount"
            type="number"
            required
            placeholder="مقدار پول مورد نظر را وارد کنید"
        ></b-form-input>
      </b-form-group>

      <b-form-group class="container" label=" : منبع تراکنش خود را مشخص کنید">
        <b-form-radio v-model="selected" name="cash" value="cash">نقدی</b-form-radio>
        <b-form-radio v-model="selected" name="account" value="account">حساب بانکی</b-form-radio>
      </b-form-group>


      <b-form-group
          class="container"
          v-if="selected === 'account'"
          id="input-group-3"
          label=" شماره حساب : "
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="source"
            type="number"
            required
            placeholder="شماره حساب مورد نظر را وارد کنید"
        ></b-form-input>
        <b-form-invalid-feedback :state="validation">
          شماره ی حساب شما باید ۱۶ رقمی باشد !
        </b-form-invalid-feedback>
      </b-form-group>


      <b-form-group label=" : واحد پول" class="container" v-if="selected==='cash'">
        <b-form-radio v-model="currency" name="rial" value="rial">ریال</b-form-radio>
        <b-form-radio v-model="currency" name="dollar" value="dollar">دلار</b-form-radio>
        <b-form-radio v-model="currency" name="euro" value="euro">یورو</b-form-radio>
        <b-form-radio v-model="currency" name="dinar" value="dinar">دینار</b-form-radio>
      </b-form-group>

      <b-button v-show="selected" type="submit" variant="primary" block pill>افزودن</b-button>
      <b-button v-show="selected" type="reset" variant="warning" block pill>دوباره</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTransactionComponent",
  data() {
    return {
      selected: "cash",

      dismissSecs: 3,
      dismissCountDown: 0,
      alertKind: "",
      alertMsg: "",

      kind: "income",
      amount: null,
      source: "cash",
      currency: "rial",
    };
  },

  methods: {
    // Submit the forms and send them to the database
    onSubmit(evt) {
      let url;
      evt.preventDefault();

      if (this.kind === "income") {
        if (this.selected === "cash") {
          url = "http://localhost:3000/cashes";
        } else if (this.selected === "account") {
          url = "http://localhost:3000/accounts";
        }
      } else {
        if (this.selected === "cash") {
          url = "http://localhost:3000/cashes/expense";
        } else if (this.selected === "account") {
          url = "http://localhost:3000/accounts/expense";
        }
      }

      // If Income

      if (this.selected === "cash") {
        axios.post(url, {
          amount: this.amount,
          currency: this.currency,
        }).then(() => {
          this.showAlert("success", "تراکنش شما با موفقیت ثبت شد !");
        }).catch((err) => {
          console.log(err.response.message);
          this.showAlert("danger", "مشکلی در ثبت تراکنش شما وجود دارد لطفاموجودی خود را چک کنید !");
        });
      } else {
        axios.post(url, {
          bank_name: "a",
          account_number: this.source,
          amount: this.amount,
        }).then(() => {
          this.showAlert("success", "تراکنش شما با موفقیت ثبت شد !");
        }).catch(() => {
          this.showAlert("danger", "مشکلی در ثبت تراکنش شما وجود دارد لطفاموجودی خود را چک کنید !");
        });
      }

    },

    // Reset the fields
    onReset(evt) {
      evt.preventDefault();
      this.amount = null;
      this.source = "cash";
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

  mounted() {

  },

  computed: {
    // validate bank account number
    validation() {
      return this.source.toString().length === 16;
    },
  },
};
</script>

<style scoped>

</style>