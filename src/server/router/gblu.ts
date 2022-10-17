import { createRouter } from "./context";
import { z } from "zod";

export const gbluRouter = createRouter().query("getGBLUByCountry", {
  input: z.object({ country: z.string() }),
  async resolve({ ctx, input }) {
    return await ctx.prisma.gblu.findMany({
      where: { country: input.country },
    });
  },
});
