<template>
  <v-card>
    <v-img v-if="!short" :src="front_default" height="100" contain />
    <v-card-title class="text-capitalize">{{ name }}</v-card-title>
    <v-card-text v-if="!short">
      <v-chip
        v-for="{ ability } in abilities"
        :key="`${id}-${ability.name}`"
        class="ma-1"
        color="primary"
      >
        {{ ability.name }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="!selected"
        fab small dark
        color="green"
        @click="selectPokemon(id, name)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-else
        fab small dark
        color="red"
        @click="unselectPokemon(id, name)"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { useMutations } from 'vuex-composition-helpers';

import type { RootMutations } from '@/store/mutations';

import { Pokemon } from '@/store/state';

export default defineComponent({
  props: {
    pokemon: {
      type: Object as PropType<Pokemon>,
      default: () => ({}),
    },
    short: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {
      abilities, id, name, sprites: { front_default }, selected,
    } = props.pokemon;

    const { setPokemonSelected, setHistory } = useMutations<RootMutations>(['setPokemonSelected', 'setHistory']);

    const selectPokemon = (pokemonId: number, pokemonName: string) => {
      setPokemonSelected({ id: pokemonId, selected: true });
      setHistory({ name: pokemonName, toSelected: true });
    };

    const unselectPokemon = (pokemonId: number, pokemonName: string) => {
      setPokemonSelected({ id: pokemonId, selected: false });
      setHistory({ name: pokemonName, toSelected: false });
    };

    return {
      abilities,
      id,
      name,
      front_default,
      selected,
      selectPokemon,
      unselectPokemon,
    };
  },
});
</script>
