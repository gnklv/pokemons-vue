<template>
  <v-app-bar app>
    <v-img
      alt="Pokemons Logo"
      class="shrink mr-2"
      contain
      :src="require('@/assets/logo.svg')"
      transition="scale-transition"
      width="100"
    />

    <v-spacer />

    <div class="d-flex">
      <v-list-item v-for="{ path, title } in routes" :key="path" :to="{ path }" exact>
        <v-list-item-content>
          <v-list-item-title>
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { routes } from '@/router';

export default defineComponent({
  setup() {
    return { routes };
  },
});
</script>
