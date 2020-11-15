<template>
  <div class="home">
    <h1 class="text-h2 mb-4">Choose your pokemon</h1>

    <v-progress-circular
      v-if="isLoading"
      color="primary"
      indeterminate
    />

    <v-row v-else>
      <v-col sm="6">
        <v-text-field
          v-model.trim="search"
          placeholder="Name or #Ability"
          autofocus
          clearable
          solo
        />

        <PokemonsList :pokemons="pokemons"/>
      </v-col>

      <v-col v-if="!!pokemonsSelected.length" sm="6">
        <h2 class="text-h4 mb-10">Selected pokemons: </h2>

        <PokemonsList :pokemons="pokemonsSelected" short />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, toRef, reactive, onMounted, watch,
} from '@vue/composition-api';
import { useGetters, useActions } from 'vuex-composition-helpers';

import type { Pokemon } from '@/store/state';
import type { RootGetters } from '@/store/getters';
import type { RootActions } from '@/store/actions';

import useSearch from '@/hooks/useSearch';

import PokemonsList from '@/components/common/PokemonsList.vue';

export default defineComponent({
  components: { PokemonsList },
  setup() {
    const {
      pokemonsUnselected,
      pokemonsSelected,
    } = useGetters<RootGetters>(['pokemonsUnselected', 'pokemonsSelected']);
    const { fetchPokemons } = useActions<RootActions>(['fetchPokemons']);

    const state = reactive<{ pokemons: Pokemon[] }>({
      pokemons: [],
    });
    const setPokemons = (pokemons: Pokemon[]) => {
      state.pokemons = pokemons;
    };

    const { search, setSearch } = useSearch(pokemonsUnselected, setPokemons);

    const isLoading = ref(true);

    onMounted(async () => {
      if (state.pokemons.length === 0) {
        await fetchPokemons();
      }
      setPokemons(pokemonsUnselected.value);
      isLoading.value = false;
    });

    watch(
      () => pokemonsUnselected.value.length,
      (curLength, prevLength) => {
        if (curLength < prevLength) {
          setPokemons(pokemonsUnselected.value);
          setSearch('');
        }
      },
    );

    return {
      pokemons: toRef(state, 'pokemons'), pokemonsSelected, isLoading, search,
    };
  },
});
</script>
