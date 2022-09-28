import { Request, Response, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { login, registerAdmin, registerResident } from "./controller";

export default function userRoutes(router: Router) {
  router.route("/login").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const data = await login(req.body);

      res.json({ ...data });
    })
  );

  router.route("/register/:role").post(
    expressAsyncHandler(async (req: Request, res: Response) => {
      const role = req.params.role;

      if (role.toString() === "admin") {
        const data = await registerAdmin(req.body);
        res.json({ ...data });

        return;
      }

      if (role.toString() === "resident") {
        const data = await registerResident({
          data: req.body.data,
          residentData: req.body.residentData,
        });

        res.json({ ...data });

        return;
      }
    })
  );

  return router;
}
