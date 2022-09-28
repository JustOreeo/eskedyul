import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { login, registerAdmin } from "./controller";

export default function userRoutes(router: Router) {
  router.route("/login").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await login(req.body);

      res.json({ ...data });
    })
  );

  router.route("/register/admin").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await registerAdmin(req.body);

      res.json({ ...data });
    })
  );

  return router;
}
