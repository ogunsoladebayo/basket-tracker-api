import express from "express";
import {
	addItemToBasket,
	allItems,
	checkout,
	modifyItemQuantity,
	removeItemFromBasket
} from "../controllers/customers";
import { UserRole } from "../entities";
import { authorize, protect } from "../middlewares/auth";

const Router = express.Router();

export const customersRoutes = Router.get("/items/all", allItems)
	.post("/items/:id", protect, authorize(UserRole.CUSTOMER), addItemToBasket)
	.patch("/items/:id", protect, authorize(UserRole.CUSTOMER), modifyItemQuantity)
	.delete("/items/:id", protect, authorize(UserRole.CUSTOMER), removeItemFromBasket)
	.post("/checkout", protect, authorize(UserRole.CUSTOMER), checkout);
