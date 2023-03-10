import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/core";
import errorHandler from "./middlewares/error";
import { Basket, BasketItem, Item, User } from "./entities";

dotenv.config();

// import routes
import { authRoutes, customersRoutes, salesRoutes } from "./routes";
import { ItemSeeder } from "./seeders/item.seeder";
import { UserSeeder } from "./seeders/user.seeder";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

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

(async () => {
	const orm = await MikroORM.init({
		driver: PostgreSqlDriver,
		driverOptions: {
			connection: {
				ssl: {
					require: true,
					rejectUnauthorized: false
				}
			}
		},
		entities: ["./dist/entities"],
		entitiesTs: ["./src/entities"],
		migrations: {
			path: "./dist/migrations",
			pathTs: "./src/migrations",
			disableForeignKeys: false
		}
	});

	const migrator = orm.getMigrator();
	await migrator.createMigration();
	await migrator.up();

	const seeder = orm.getSeeder();
	await seeder.seed(UserSeeder, ItemSeeder);

	DI.orm = orm;
	DI.em = DI.orm.em;
	DI.userRepository = DI.orm.em.getRepository(User);
	DI.itemRepository = DI.orm.em.getRepository(Item);
	DI.basketRepository = DI.orm.em.getRepository(Basket);
	DI.basketItemRepository = DI.orm.em.getRepository(BasketItem);
})();

app.use(express.json());
app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// mount routes
app.use("/auth", authRoutes);
app.use("/customers", customersRoutes);
app.use("/sales", salesRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
