import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { uri } = configService.mongo;
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();
        const database = client.db('store-db');
        return database;
      },
      inject: [config.KEY]
    }
  ],
  exports: ['MONGO']
})
export class DatabaseModule { }
