<template>
  <div class="container mb-5">

    <hr>

    <b-form-group required class="container mt-5" label=" : نوع دارایی خود را مشخص کنید">
      <b-form-radio v-model="selected" name="cash" value="cash">پول نقد</b-form-radio>
      <b-form-radio v-model="selected" name="account" value="account">حساب بانکی</b-form-radio>
    </b-form-group>

    <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="alertKind"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
    >
      {{ alertMsg }}
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset">
      <div class="container" v-if="selected==='account'">

        <b-form-group
            id="input-group-1"
            label="بانک"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="account.bank_name"
              type="text"
              required
              placeholder="نام بانک موردنظر خود را وارد کنید"
          ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-2"
            label="شماره حساب"
            label-for="input-2"
        >
          <b-form-input
              id="input-2"
              v-model="account.account_number"
              type="number"
              required
              placeholder="شماره حساب خود را وارد کنید"
              :state="validation"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            شماره ی حساب شما باید ۱۶ رقمی باشد !
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="input-group-3"
            label="مقدار"
            label-for="input-3"
        >
          <b-form-input
              id="input-3"
              v-model="account.amount"
              type="number"
              required
              placeholder="مقدار پول مورد نظر خود را وارد کنید"
          ></b-form-input>
        </b-form-group>

      </div>

      <div class="container" v-if="selected==='cash'">

        <b-form-group
            id="input-group-5"
            label="مقدار"
            label-for="input-5"
        >
          <b-form-input
              id="input-5"
              v-model="cash.amount"
              type="number"
              required
              placeholder="Enter Your Amount of Money"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="واحد پول">
          <b-form-radio v-model="cash.currency" name="rial" value="rial">ریال</b-form-radio>
          <b-form-radio v-model="cash.currency" name="dollar" value="dollar">دلار</b-form-radio>
          <b-form-radio v-model="cash.currency" name="euro" value="euro">یورو</b-form-radio>
          <b-form-radio v-model="cash.currency" name="dinar" value="dinar">دینار</b-form-radio>
        </b-form-group>

      </div>

      <b-button v-show="selected" type="submit" variant="primary" block pill>افزودن</b-button>
      <b-button v-show="selected" type="reset" variant="danger" block pill>دوباره</b-button>
    </b-form>
  </div>
</template>

<script>
const axios = require("axios");
const {W} = window;
export default {
  name: "CreateAssetComponent",

  data() {
    return {
      selected: "cash",
      dismissSecs: 3,
      dismissCountDown: 0,
      alertKind: "",
      alertMsg: "",
      // Account model
      account: {
        bank_name: "",
        account_number: null,
        amount: null,
      },
      // Cash model
      cash: {
        amount: null,
        currency: "",
      },
    };
  },

  methods: {
    // Submit the forms and send them to the database
    onSubmit(evt) {
      evt.preventDefault();
      if (this.selected === "cash") {
        axios.post("https://present-absent.wapp.weblite.me/cashes", {userId: W.user.getId(), ...this.cash}).then(() => {
          this.showAlert("success", "دارایی شما با موفقیت ذخیره شد !");
        }).catch(err => {
          this.showAlert("danger", "مشکلی در ذخیره دارایی شما وجود دارد لطفا مقادیر صحیح وارد کنید !");
          alert(err);
        });
      } else {
        axios.post("https://present-absent.wapp.weblite.me/accounts", {userId: W.user.getId(), ...this.account}).then(() => {
          this.showAlert("success", "دارایی شما با موفقیت ذخیره شد !");
        }).catch(err => {
          this.showAlert("danger", "مشکلی در ذخیره دارایی شما وجود دارد لطفا مقادیر صحیح وارد کنید !");
          alert(err);
        });
      }
    },

    // Reset the fields
    onReset(evt) {
      evt.preventDefault();
      this.account.bank_name = "";
      this.account.account_number = 0;
      this.account.amount = null;
      this.account.currency = "";
      this.cash.amount = null;
      this.cash.currency = "";
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

  computed: {
    // validate bank account number
    validation() {
      return parseInt(this.account.account_number).toString().length === 16;
    },
  },
};
</script>

<style scoped>
</style>