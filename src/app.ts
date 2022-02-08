import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core";
import errorHandler from "./middlewares/error";
import { Basket, BasketItem, Item, User } from "./entities";

dotenv.config();

// import routes
import { authRoutes } from "./routes";
import { itemsRoutes as customersRoutes } from "./routes/items";

export const DI = {} as {
	orm: MikroORM;
	em: EntityManager;
	userRepository: EntityRepository<User>;
	itemRepository: EntityRepository<Item>;
	basketRepository: EntityRepository<Basket>;
	basketItemRepository: EntityRepository<BasketItem>;
};

colors.enable();
export const app = express();

MikroORM.init().then((orm) => {
	DI.orm = orm;
	DI.em = DI.orm.em;
	DI.userRepository = DI.orm.em.getRepository(User);
	DI.itemRepository = DI.orm.em.getRepository(Item);
	DI.basketRepository = DI.orm.em.getRepository(Basket);
	DI.basketItemRepository = DI.orm.em.getRepository(BasketItem);

	app.use(express.json());
	app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
	app.use(morgan("tiny"));

	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(helmet());

	// mount routes
	app.use("/auth", authRoutes);
	app.use("/customers", customersRoutes);

	app.use(errorHandler);
});
