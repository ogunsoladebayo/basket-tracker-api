import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import errorHandler from "./middlewares/error";

// import { User } from "./entities/User";
// import { Basket } from "./entities/Basket";
// import { Item } from "./entities/Item";
// import { BasketItem } from "./entities/BasketItem";

dotenv.config();

export const orm = async () =>
	await MikroORM.init({
		entities: ["./dist/entities/**/*.js"],
		entitiesTs: ["./src/entities/**/*.ts"],
		dbName: process.env.DB_NAME,
		type: "mysql"
		// clientUrl: `${process.env.DB_URL}`
	});

// import routes

export const app = express();

colors.enable();

orm().then((orm) =>
	app.use((req, res, next) => {
		RequestContext.create(orm.em, next);
	})
);

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// mount routes

app.use(errorHandler);
