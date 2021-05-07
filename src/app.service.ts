import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `¡Hola mundo! api_key: ${apiKey}, db_name: ${dbName}`;
  }

  getTasks() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find().toArray();
  }
}
