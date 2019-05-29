import express from "express";
import * as bodyParser from "body-parser";

// imports all routes from routes module
import routes from "./routes";

import cors from "cors";

class App {
  public app: express.Application;
  constructor() {
    // run the express instance and store in app
    this.app = express();
    this.config();
  }
  private config(): void {


    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // add routes
    this.app.use("/api/v1", routes);


  }
}
export default new App().app;
