import { Request, Response } from "express";
import { wrap } from "@mikro-orm/core";
import * as bcrypt from "bcryptjs";
import validator from "validator";
import { DI } from "../app";
import { User } from "../entities";
import asyncHandler from "../middlewares/asyncHandler";
import ErrorResponse from "../utils/errorResponse";

/**
 *  @desc      Login
 *  @route     POST /auth/login
 *  @access    Public
 * */
export const login = asyncHandler(async (req: Request, res: Response, next) => {
	const { username, password } = req.body;

	// Validate email & password
	if (!username || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400));
	}

	// Check for user
	const user = await DI.userRepository.findOne({ username });

	if (!user) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}

	// Check if password matches
	const isMatch = await bcrypt.compare(password, user.hashedPassword);
	if (!isMatch) {
		return next(new ErrorResponse("Invalid credentials", 401));
	}

	res.status(201).cookie("token", user.token, { domain: req.hostname, secure: req.secure }).json({
		success: true,
		message: "Login successful"
	});
});

/**
 *  @desc      Customer register
 *  @route     POST /auth/register
 *  @access    Public
 * */
export const register = asyncHandler(async (req, res, next) => {
	const { username, password } = req.body;

	// Validate email & password
	if (!username || !password) {
		return next(new ErrorResponse("Please provide an email and password", 400));
	}
	if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
		return next(
			new ErrorResponse(
				"Password should be minimum of 8 characters and contain at least one lowercase letter, one uppercase letter and one number",
				400
			)
		);
	}

	const user = new User(username, password);
	// wrap(user).assign(req.body);
	await DI.userRepository.persistAndFlush(user);

	res.status(201)
		.cookie("token", user.token, { domain: req.hostname, secure: req.secure })
		.json({ success: true, message: "User registered successfully.", data: { username: user.username } });
});
