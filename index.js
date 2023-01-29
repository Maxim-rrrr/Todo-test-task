import express from "express";
import config from "config";
import path from "path";
import db from './database/index.js'
import logger from "./modules/logger.js";
import taskRouter from './api/task/taskRouter.js'
import adminRouter from './api/admin/adminRouter.js'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(express.json());
app.use("/api/task", taskRouter)
app.use("/api/admin", adminRouter)

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}  

const PORT = config.get("port") || 4000;

function start() {
    db.connnection().then(() => {
        app.listen(PORT, () =>
            logger.info(`Start server, port: ${PORT}`)
        );
    })
}

start();