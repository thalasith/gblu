import { createRouter } from "./context";
import { z } from "zod";

export const countriesRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getCountries", {
    async resolve({ ctx }) {
      return await ctx.prisma.countries.findMany();
    },
  });
