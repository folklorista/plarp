import {ApplicationConfig, PlarpApplication} from './application';
import {patchPersistedModel} from './patch';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new PlarpApplication(options);
  /**
   *  Due to our needs for INNER JOIN we use our fork
   *  from loopback-connector-postgresql but we need
   *  to keep the relations on PersistedModel.
   *
   *  @todo Use Loopback TypeORM Component when it's ready
   *  Remove the patch and notice the changes about filter
   *
   *  @source https://github.com/strongloop/loopback-next/issues/5132#issuecomment-658908843
   */
  patchPersistedModel();

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
