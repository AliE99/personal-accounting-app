<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AssetComponent></AssetComponent>
  </div>
</template>

<script>
import AssetComponent from './components/AssetComponent.vue'

export default {
  name: 'App',
  components: {
    AssetComponent: AssetComponent
  }
}
</script>

<style>

</style>
