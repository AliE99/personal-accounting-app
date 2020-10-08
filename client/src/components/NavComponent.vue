<template>
  <div class="container">
    <b-navbar toggleable="lg" type="dark" variant="dark" dir="rtl" fixed="top">
      <b-navbar-brand class="mr-5" href="#">حسابداری شخصی</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
      </b-collapse>

      <b-nav-item-dropdown class="ml-5" text="MENU" left>
        <b-dropdown-item href="#" @click="changeThePage('assets')">دارایی ها</b-dropdown-item>
        <b-dropdown-item href="#" @click="changeThePage('trans')">دخل و خرج</b-dropdown-item>

      </b-nav-item-dropdown>

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