import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import authHandler from "../middleWare/authHandler";
import { postSchedule } from "./controller";

export default function ScheduleRoutes(router: Router) {
  router.route("/").post(
    authHandler,
    expressAsyncHandler(async (req: Request, res: Response) => {
      if (req.user.role !== "Master Admin") {
        throw new Error("Master Admin can only use this");
      }

      const data = await postSchedule(req.body);

      res.json({ ...data });
    })
  );

  return router;
}
