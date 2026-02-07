## APIs and Microservices

This repository contains APIs and microservices certification projects.  
For more information please visit [https://www.freecodecamp.org/](https://www.freecodecamp.org/).

To run an individual project, after cloning the repository:

1. navigate to it's folder e.g. `01-timestamp-microservice`
2. install the required dependencies using **`pnpm install`**
3. if the project requires access to a `MongoDB` database make sure that the connection URI is available under `DB` environment variable
4. use one of the available scripts to start the application:
   ##### `pnpm start`
   start server (by default on `localhost:3000`)
   ##### `pnpm run watch`
   start server in development mode using `nodemon` (by default on `localhost:3000`)
