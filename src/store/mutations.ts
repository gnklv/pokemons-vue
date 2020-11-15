import type { MutationTree } from 'vuex';

import type { Pokemon, RootState } from '@/store/state';

export interface RootMutations extends MutationTree<RootState> {
  setPokemon: (state: RootState, pokemon: Pokemon) => void;
  setPokemonSelected: (
    state: RootState,
    { id, selected }: { id: number; selected: boolean }
  ) => void;
  setHistory: (state: RootState, history: { name: string; toSelected: boolean }) => void;
}

const mutations: RootMutations = {
  setPokemon(state, pokemon) {
    state.pokemons.push({ ...pokemon, selected: false });
  },
  setPokemonSelected(state, { id, selected }) {
    const pokemon = state.pokemons.find((p) => p.id === id);
    if (pokemon) {
      pokemon.selected = selected;
    }
  },
  setHistory(state, history) {
    state.history.push({ ...history, time: new Date().getTime() });
  },
};

export default mutations;
