import express from "express";
import { allCustomers, getUserRemovedItems } from "../controllers/sales";
import { UserRole } from "../entities/User";
import { authorize, protect } from "../middlewares/auth";

const Router = express.Router();

export const salesRoutes = Router.get("/customers/all", protect, authorize(UserRole.SALES_REP), allCustomers).get(
	"/customers/removed-items/:id",
	protect,
	authorize(UserRole.SALES_REP),
	getUserRemovedItems
);
