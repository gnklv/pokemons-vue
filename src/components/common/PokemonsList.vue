<template>
  <transition-group
    class="row"
    tag="div"
    name="list"
  >
    <v-col
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="list-item"
      sm="12"
      md="6"
    >
      <PokemonCard :pokemon="pokemon" :short="short" />
    </v-col>
  </transition-group>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { defineComponent } from '@vue/composition-api';

import type { Pokemon } from '@/store/state';

import PokemonCard from '@/components/common/PokemonCard.vue';

export default defineComponent({
  components: { PokemonCard },
  props: {
    pokemons: {
      type: Array as PropType<Pokemon[]>,
      default: () => [],
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.list-item {
  transition: transform 0.3s, opacity 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
