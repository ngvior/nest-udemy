import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // private id: string; // Mongo genera un id automaticamente

  @Prop({
    unique: true,
    index: true,
  })
  private no: number;

  @Prop({
    unique: true,
    index: true,
  })
  private name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
