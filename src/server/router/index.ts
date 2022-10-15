// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { countriesRouter } from "./countries";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("countries.", countriesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
