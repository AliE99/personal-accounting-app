<template>
  <div class="container">
    <h1>Latest Assets</h1>
    <hr>
    <p v-if="error">{{ error }}</p>
    <div class="assets-container">
      <!--      <div class="asset" v-for="asset in assets" v-bind:item="asset" :key="asset._id">-->
      <!--        <p>{{ asset }}</p>-->
      <!--      </div>-->
      <p>{{ account }}</p>
    </div>
  </div>
</template>

<script>
// import AssetService from "@/services/AssetService";
import axios from "axios";

export default {
  name: "AssetComponent",
  data() {
    return {
      asset: {},
      account: {},
      cash: {},
      error: "",
    };
  },
  created() {
    axios.get("http://localhost:3000/assets/").then(response => {
          this.asset = response.data;
          this.account = response.data.account;
          this.cash = response.data.cash;
        },
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
