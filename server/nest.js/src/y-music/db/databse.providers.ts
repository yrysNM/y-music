import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'y-music',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_CONNECTION),
  },
];
