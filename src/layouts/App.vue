<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from './MainHeader.vue'

export default {
  name: 'AppLayout',
  components: {
    MainHeader,
    RouterView,
  },
}
</script>
