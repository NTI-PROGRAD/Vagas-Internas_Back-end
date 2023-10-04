import "express-async-errors";
import express from "express";
import { errorMiddleware, } from "./middleware/error";
import { router, } from "./routes";

const port = 4000;
const app  = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}.`));