<template>
  <div class="container">
    <b-navbar toggleable type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#">حسابداری شخصی</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
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