import "express-async-errors";
import express from "express";
import { router, } from "./routes";
import { errorMiddleware, } from "./middleware/error";

const port = 4000;
const app  = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}.`));