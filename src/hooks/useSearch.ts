import type { Ref } from '@vue/composition-api';
import { ref, watch } from '@vue/composition-api';
import debounce from 'lodash.debounce';

import type { Pokemon } from '@/store/state';

const useSearch = (pokemons: Ref<Pokemon[]>, setPokemons: (pokemon: Pokemon[]) => void) => {
  const search = ref('');
  const setSearch = (s: string) => {
    search.value = s;
  };

  const searchByName = (pokemon: Pokemon, s: string): boolean => (
    pokemon.name.toLowerCase().startsWith(s.toLowerCase())
  );
  const searchByAbility = (pokemon: Pokemon, s: string): boolean => (
    pokemon.abilities.some(({ ability }) => (
      (`#${ability.name.toLowerCase()}`).startsWith(s.toLowerCase())
    ))
  );
  const filterPokemons = (pokemon: Pokemon, s: string) => (
    s.startsWith('#')
      ? searchByAbility(pokemon, s)
      : searchByName(pokemon, s)
  );

  watch(
    () => search.value,
    debounce((v) => {
      const filteredPokemons = v
        ? pokemons.value.filter((pokemon) => filterPokemons(pokemon, v))
        : pokemons.value;

      setPokemons(filteredPokemons);
    }, 500),
  );

  return { search, setSearch };
};

export default useSearch;
