import express, { Request, Response, NextFunction } from "express";
import config from "./config";
import routes from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

interface ErrorType {
  message: string;
  status: number;
}

app.use(function (err: ErrorType, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
  })
  .on("error", err => {
    console.error(err);
    process.exit(1);
  });
