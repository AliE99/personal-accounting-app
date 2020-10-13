<template>
  <div class="container">
    <b-navbar toggleable type="dark" variant="dark" fixed="top" dir="rtl">
      <b-icon-calculator class="h5 pt-2" style="color: #fdfdfd"></b-icon-calculator>
      <b-navbar-brand href="#">حسابداری شخصی</b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon-menu-down v-if="expanded"></b-icon-menu-down>
          <b-icon-menu-up v-else></b-icon-menu-up>
        </template>
      </b-navbar-toggle>


      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" @click="changeThePage('assets')">لیست دارایی ها</b-nav-item>
          <b-nav-item href="#" @click="changeThePage('trans')">لیست دخل و خرج</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>


export default {
  name: "NavComponent",

  props: {
    callback: {
      type: Function,
    },
  },
  methods: {
    changeThePage(page) {
      this.callback(page);
    },
  },
};
</script>

<style scoped>

</style>