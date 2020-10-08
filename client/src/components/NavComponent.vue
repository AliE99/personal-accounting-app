<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">حسابداری شخصی</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="changeThePage('assets')">دارایی ها</b-nav-item>
          <b-nav-item href="#" @click="changeThePage('trans')">دخل و خرج</b-nav-item>
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