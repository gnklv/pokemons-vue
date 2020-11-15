import type { Ref } from '@vue/composition-api';
import {
  reactive, ref, toRef, watch,
} from '@vue/composition-api';
import debounce from 'lodash.debounce';

import type { Pokemon } from '@/store/state';

const useSearch = (pokemons: Ref<Pokemon[]>) => {
  const state = reactive<{ pokemons: Pokemon[] }>({
    pokemons: pokemons.value,
  });
  const search = ref('');

  const searchByName = (pokemon: Pokemon, s: string): boolean => (
    pokemon.name.toLowerCase().startsWith(s.toLowerCase())
  );

  const searchByAbility = (pokemon: Pokemon, s: string): boolean => (
    pokemon.abilities.some(({ ability }) => (
      (`#${ability.name.toLowerCase()}`).startsWith(s.toLowerCase())
    ))
  );

  watch(
    () => pokemons.value.length,
    (currentValue, prevValue) => {
      if (currentValue < prevValue) {
        search.value = '';
      }

      state.pokemons = pokemons.value;
    },
  );

  watch(
    () => search.value,
    debounce((v) => {
      if (v) {
        state.pokemons = pokemons.value.filter((pokemon) => (
          v.startsWith('#') ? searchByAbility(pokemon, v) : searchByName(pokemon, v)
        ));
      } else {
        state.pokemons = pokemons.value;
      }
    }, 500),
    { immediate: true },
  );

  return {
    search,
    pokemons: toRef(state, 'pokemons'),
  };
};

export default useSearch;
