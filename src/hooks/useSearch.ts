import type { Ref } from '@vue/composition-api';
import { ref, watch } from '@vue/composition-api';
import debounce from 'lodash.debounce';

import type { Pokemon } from '@/store/state';

const useSearch = (pokemons: Ref<Pokemon[]>, setPokemons: (pokemon: Pokemon[]) => void) => {
  const search = ref('');

  const searchByName = (pokemon: Pokemon, s: string): boolean => (
    pokemon.name.toLowerCase().startsWith(s.toLowerCase())
  );
  const searchByAbility = (pokemon: Pokemon, s: string): boolean => (
    pokemon.abilities.some(({ ability }) => (
      (`#${ability.name.toLowerCase()}`).startsWith(s.toLowerCase())
    ))
  );
  const searchPokemons = (s: string): Pokemon[] => {
    const result = pokemons.value.filter((pokemon) => (
      s.startsWith('#')
        ? searchByAbility(pokemon, s)
        : searchByName(pokemon, s)
    ));

    return result;
  };

  watch(
    () => search.value,
    debounce((s: string) => {
      setPokemons(s ? searchPokemons(s) : pokemons.value);
    }, 500),
  );

  return { search, searchPokemons };
};

export default useSearch;
