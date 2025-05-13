import { join } from 'path'; //paquetes de  node van primero
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // rootPath: `${__dirname}/../public`,
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemons'),

    PokemonModule,
  ],
})
export class AppModule {}
