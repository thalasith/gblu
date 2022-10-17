import { createRouter } from "./context";
import { z } from "zod";

export const countriesRouter = createRouter()
  .query("getCountries", {
    async resolve({ ctx }) {
      return await ctx.prisma.countries.findMany();
    },
  })
  .query("getCountryList", {
    async resolve({ ctx }) {
      const data = await (
        await ctx.prisma.countries.findMany()
      ).map((country) => {
        return country.country;
      });

      return data;
    },
  });
