import db from "./config/db";
import ErrHandler from "./middleWare/errHandler";
import ProgramsRoutes from "./Programs/router";
import ScheduleRoutes from "./Schedule/router";
import UserRoutes from "./User/router";
const { app, PORT, server } = db;

app.use("/user", UserRoutes(server.Router()));

app.use("/program", ProgramsRoutes(server.Router()));
app.use("/schedule", ScheduleRoutes(server.Router()));

app.listen(PORT, () => {
  console.log("CONNECTED");
});

app.use(ErrHandler);
