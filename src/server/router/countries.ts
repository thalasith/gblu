import { createRouter } from "./context";
import { z } from "zod";

export const countriesRouter = createRouter().query("getCountries", {
  async resolve({ ctx }) {
    return await ctx.prisma.countries.findMany();
  },
});
