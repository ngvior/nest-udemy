import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  private readonly url = 'https://pokeapi.co/api/v2/pokemon?limit=600';

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;
    const { data } = await this.axios.get<PokeResponse>(this.url);
    const pokemonArr: CreatePokemonDto[] = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });
    await this.pokemonModel.insertMany(pokemonArr);
    return 'Seed Executed!';
  }
}
