const { errorhandler } = require("./utils/errorhandler");
const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const connectToDb = require("./DB/dbService");
const config = require("config");
const { generateInitialUsers, generateInitialCards } = require("./initialData/initialDataService");


// Middleware - Appl Level
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.text());
app.use(express.static("./public"));
app.use(router);

//middlewere - errors handler
app.use((err, req, res, next) => {
    errorhandler(res, err.status || 500, err.message);
})

const port = config.get("PORT");
app.listen(port, () => {
    console.log(chalk.yellow(`I'm listening to ${port}`));
    connectToDb();
    generateInitialCards();
    generateInitialUsers();
})