import type { GetterTree } from 'vuex';

import type { Pokemon, RootState } from '@/store/state';

export interface RootGetters extends GetterTree<RootState, RootState> {
  pokemonsUnselected: (state: RootState) => Pokemon[];
  pokemonsSelected: (state: RootState) => Pokemon[];
}

const getters: RootGetters = {
  pokemonsSelected: (state) => state.pokemons.filter((pokemon) => pokemon.selected),
  pokemonsUnselected: (state) => state.pokemons.filter((pokemon) => !pokemon.selected),
};

export default getters;
