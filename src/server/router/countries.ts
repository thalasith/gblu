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
      const data = (await ctx.prisma.countries.findMany()).map((country) => {
        return country.country;
      });

      return data;
    },
  })
  .query("getCountryCode", {
    input: z.object({ country: z.string() }),
    async resolve({ ctx, input }) {
      const data = await ctx.prisma.countries.findFirst({
        where: { country: input.country },
      });
      return data?.country_code;
    },
  });
