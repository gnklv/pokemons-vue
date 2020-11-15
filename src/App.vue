<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import Header from '@/components/layout/Header.vue';

export default defineComponent({
  name: 'App',
  components: { Header },
});
</script>
