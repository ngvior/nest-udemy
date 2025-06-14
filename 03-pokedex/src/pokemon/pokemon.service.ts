import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.getOrThrow<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this._handleErrorCode11000(error);
    }
  }

  async findAll(
    paginationDto: PaginationDto /* offset: number, limit: number */,
  ) {
    const { offset = 0, limit = this.defaultLimit } = paginationDto;
    return await this.pokemonModel
      .find()
      .skip(offset)
      .limit(limit)
      // .sort({ no: 1 }) //? sorts by no column ascending(1) // descending(0)
      .select('-__v'); //? hides column __v
  }

  async findOne(term: string) {
    const pokemon = await this.pokemonModel.findOne(this._getTerm(term));
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon  with _term, no or name "${term}" not found`,
      );
    return pokemon;
  }

  _getTerm(term: string) {
    if (!isNaN(+term)) return { no: term };
    if (isValidObjectId(term)) return { _term: term };
    return { name: term.toLowerCase().trim() };
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    try {
      return this.pokemonModel.findOneAndUpdate(
        this._getTerm(term),
        updatePokemonDto,
        { new: true },
      );
    } catch (error) {
      this._handleErrorCode11000(error);
    }
  }

  async remove(id: string) {
    const result = await this.pokemonModel.findByIdAndDelete(id).then((dp) => {
      if (!dp)
        throw new BadRequestException(`Pokemon with id "${id}" not found`);
      return dp;
    });
    return { deleted: result };
    // const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    // if (deletedCount === 0)
    //   throw new BadRequestException(`Pokemon with id "${id}" not found`);
    // return ;
  }

  _handleErrorCode11000(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create pokemon - Check server logs`,
    );
  }
}
