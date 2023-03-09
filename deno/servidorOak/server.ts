import { Application } from "./deps.ts";
import { userRouter } from "./routes/user.routes.ts";
import { config } from "./deps.ts";

const app = new Application(); // creamos la app del servidor
const { PORT } = config();

// inicializar la aplicación creando una ruta
/*app.use((ctx) => {
  ctx.response.body = `Bienvenido servidor deno`;
});*/
app.use(userRouter.routes());

app.listen({ port: Number(PORT) });
console.log(`Server listening on port ${PORT}`);
