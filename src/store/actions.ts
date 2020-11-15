import to from 'await-to-ts';
import axios from 'axios';
import type { ActionContext, ActionTree } from 'vuex';

import type { Pokemon, RootState } from '@/store/state';

type PokemonsList = { name: string; url: string }[];

export interface RootActions extends ActionTree<RootState, RootState> {
  fetchPokemons(ctx: ActionContext<RootState, RootState>): Promise<void>;
}

const actions: RootActions = {
  fetchPokemons: async ({ commit }) => {
    const [error, pokemonsList] = await to(axios.get<{ results: PokemonsList }>('https://pokeapi.co/api/v2/pokemon?limit=100'));

    if (!error) {
      const promises = pokemonsList.data.results.map(({ url }) => axios.get<Pokemon>(url));
      const pokemons = await Promise.all(promises);

      pokemons.forEach(({ data }) => {
        commit('setPokemon', data);
      });
    }
  },
};

export default actions;
