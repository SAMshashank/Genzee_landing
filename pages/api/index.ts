import { createServer } from "http";

// import {} from "@/common/types/global";

import express from "express";
import next, { NextApiHandler } from "next";

import connectToMongoose  from "./database/dbconfig";
import adminRouter from "./controller/admin.controller";
import userRouter from "./controller/user.controller";
import subscriptionRouter from "./controller/subscription.controller";


// const  setupSocket =require("./controller/socket");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = createServer(app);
  app.use(express.json());
  app.use('/api/admin',adminRouter);
  app.use('/api/user',userRouter);
  app.use('/api/subscription',subscriptionRouter);
  // app.use('/api/rooms', roomRouter);

  try {
    connectToMongoose();
    console.log("Connected to Mongoose")
    // logger.Info("Connected to db");
  } catch (e) {
    console.error("Error connecting",e)
    // logger.Error("Unable to connect to db", e);
  }






  app.get("/health", async (_, res) => {
    res.send("Healthy");
  });
  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
    // logger.Info(`> Ready on XXXXXXXXXXXXXXXX:${port}`);
  });
});
