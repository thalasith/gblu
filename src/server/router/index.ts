// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { countriesRouter } from "./countries";
import { gbluRouter } from "./gblu";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("countries.", countriesRouter)
  .merge("gblu.", gbluRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
