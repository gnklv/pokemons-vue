export interface Pokemon {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  sprites: {
    front_default: string;
  };
  selected: boolean;
}

export interface History {
  name: string;
  toSelected: boolean;
  time: number;
}

export interface RootState {
  pokemons: Pokemon[];
  history: History[];
}

const state: RootState = {
  pokemons: [],
  history: [],
};

export default state;
