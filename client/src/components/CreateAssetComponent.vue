<template>
  <div class="container mt-5">
    <b-form-select v-model="selected" :options="['account','cash']"></b-form-select>
    <b-form @submit="onSubmit" @reset="onReset">
      <div class="make-account" v-if="selected==='account'">

      </div>
      <div class="make-cash" v-if="selected==='cash'">
        Cash
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "CreateAssetComponent",
  data() {
    return {
      selected:'',
    };
  },
  methods: {
    onSubmit() {

    },
    onReset() {

    },
  },
};
</script>

<style scoped>

</style>