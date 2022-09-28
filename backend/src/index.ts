import db from "./config/db";
import ErrHandler from "./middleWare/errHandler";
import UserRoutes from "./User/router";
const { app, PORT, server } = db;

app.use("/user", UserRoutes(server.Router()));

app.listen(PORT, () => {
  console.log("CONNECTED");
});

app.use(ErrHandler);
