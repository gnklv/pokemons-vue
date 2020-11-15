<template>
  <div class="history">
    <h1 class="text-h2 mb-4">History</h1>

    <v-list>
      <v-list-item v-for="{ name, toSelected, time } in history" :key="time">
        <v-list-item-content>
          <v-list-item-title>
            <strong class="text-capitalize">
              {{ name }}
            </strong> {{ toSelected ? 'moved to' : 'removed from' }} selected pokemons
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ time | date }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers';
import dayjs from 'dayjs';

import type { RootState } from '@/store/state';

export default defineComponent({
  filters: {
    date(v: number): string {
      return dayjs(v).format('YYYY.MM.DD, HH:mm:ss');
    },
  },
  setup() {
    const { history } = useState<RootState>(['history']);

    return { history };
  },
});
</script>
