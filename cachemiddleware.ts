// cacheMiddleware.ts
/*


// deno-lint-ignore no-explicit-any
const cache = new lruCache<string, any>({ max: 100 });

export const cacheMiddleware = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const Method = ctx.request.method;
  const path = ctx.request.url.pathname;
  const cacheKey = `${Method} ${path}`;
    if (Method === "GET") {
      if(path )
      const cacheKey = ctx.request.url.pathname;
      //const cacheQuery = ctx.request.url.searchParams.get(); Pensar para los casos que tenga una o varias querys
      if (cache.has(cacheKey)) {
        ctx.response.body = cache.get(cacheKey);
        return;
      }

      await next();

      if (ctx.response.body) {
        cache.set(cacheKey, ctx.response.body);
      }
    } else {

      await next();
    }
};
*/
