import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { DI } from "../app";
import { UserRole } from "../entities/User";
import ErrorResponse from "../utils/errorResponse";

// Protect routes
export const protect = async (req: Request, res: Response, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		// Set token from Bearer token in header
		var token = req.headers.authorization.split(" ")[1];
	}

	// Make sure token exists
	if (!token) {
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}

	try {
		// Verify token
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
		const id = decoded.id;

		// find user in database
		const user: any = await DI.userRepository.findOne(id);
		req.body.user = user;
		next();
	} catch (err) {
		console.log(err);
		return next(new ErrorResponse("Not authorized to access this route", 401));
	}
};

// Grant access to specific roles
export const authorize = (...roles: UserRole[]) => {
	return async (req: Request, res: Response, next) => {
		if (!roles.includes(req.body.user?.role)) {
			return next(
				new ErrorResponse(`User role ${req.body.user.role} is not authorized to access this resource`, 403)
			);
		}
		next();
	};
};
