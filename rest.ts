import {Application} from "https://deno.land/x/oak/mod.ts";
import {router} from './router.ts'

const port = 5000
const app = new Application()

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});
app.use(router.routes())
app.use(router.allowedMethods());

console.log(`App has been started on ${port}...`)

await app.listen({port});
