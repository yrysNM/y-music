import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @Prop()
  title: string;
  @Prop()
  subtitle: string;
  @Prop()
  type: 'MUSIC';
  @Prop()
  url: string;

  @Prop(
    raw({
      background: { type: String },
    }),
  )
  images: Record<string, any>;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
