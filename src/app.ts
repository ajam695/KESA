import express, { Request, Response } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/Users";
import indexRouter from "./routes/index";
// import adminRouter from "./routes/Admin";
import searchDoctors from "./routes/seachDoctors";
import pharmacyRoute from "./routes/pharmacyRoute";
import path from "path";
import { db } from "./config/index";
import professionalRoute from "./routes/professionalRoute";
import smsRouter from './routes/smsRoute'
// Sequelize connection
db.sync({force:true})
  .then(() => {
    console.log("Db connected successfuly");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");

//Router middleware
app.use('/sms',smsRouter)
app.use("/", indexRouter);
app.use("/users", userRouter);
// app.use("/admins", adminRouter);
app.use("/search-doctors", searchDoctors);
app.use("/pharmacy", pharmacyRoute);

// pro route

app.use("/pro", professionalRoute);

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;