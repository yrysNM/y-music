import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImagesDocument = HydratedDocument<Images>;

@Schema()
export class Images {
  @Prop()
  background: string;
  @Prop()
  coverart: string;
  @Prop()
  coverarthq: string;
  @Prop()
  joecolor: string;
}

export const ImagesSchema = SchemaFactory.createForClass(Images);
