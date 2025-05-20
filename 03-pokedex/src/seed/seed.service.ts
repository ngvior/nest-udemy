import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    // const data = await fetch<PokeResponse>(
    //   'https://pokeapi.co/api/v2/pokemon?limit=10',
    // ).then((response) => {
    //   return response.json();
    // });
    // return data;
    const { data } = await axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      console.log({
        no: no,
        name: name,
      });
    });

    return data.results;
  }
}
