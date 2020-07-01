import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'development',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'plarp',
  password: 'plarp',
  database: 'plarp_dev',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DevelopmentDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'development';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.development', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
