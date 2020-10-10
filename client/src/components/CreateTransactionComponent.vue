<template>
  <div class="container mb-5">
    <hr>
    <b-form-group class="container mt-5" label="نوع تراکنش خود را مشخص کنید">
      <b-form-radio v-model="transaction.kind" name="some-radios" value="income">دریافتی</b-form-radio>
      <b-form-radio v-model="transaction.kind" name="some-radios" value="expense">پرداختی</b-form-radio>
    </b-form-group>
<!--      <b-alert-->
<!--          :show="dismissCountDown"-->
<!--          dismissible-->
<!--          :variant="alertKind"-->
<!--          @dismissed="dismissCountDown=0"-->
<!--          @dismiss-count-down="countDownChanged"-->
<!--      >-->
<!--        {{ alertMsg }}-->
<!--      </b-alert>-->


    <b-form @submit="onSubmit" @reset="onReset">
      <div class="container">

        <b-form-group
            id="input-group-1"
            label="مقدار"
            label-for="input-1"
        >
          <b-form-input
              id="input-1"
              v-model="transaction.amount"
              type="number"
              required
              placeholder="مقدار پول مورد نظر را وارد کنید"
          ></b-form-input>
        </b-form-group>


      </div>

      <b-button v-show="selected" type="submit" variant="primary">افزودن</b-button>
      <b-button v-show="selected" type="reset" variant="danger">دوباره</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "CreateTransactionComponent",
  data() {
    return {
      transaction:{
        kind:"",
        amount:0,
        source:"",
      }
    };
  },

  methods: {
    // Submit the forms and send them to the database
    onSubmit(evt) {
      evt.preventDefault();
    },
    // Reset the fields
    onReset(evt) {
      evt.preventDefault();
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

  }
};
</script>

<style scoped>

</style>