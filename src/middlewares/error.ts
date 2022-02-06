const errorHandler = (err, req, res, next) => {
	const error = { ...err };

	error.message = err.message;

	// log error to console for dev
	console.log("Error: ", err);

	if (error.name === "SequelizeValidationError") {
		res.status(400).json({
			success: false,
			message: "Please check that all fields are properly filled",
		});
	} else if (error.name === "SequelizeUniqueConstraintError") {
		res.status(400).json({
			success: false,
			message: "Details already exists",
		});
	} else {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error",
		});
	}
};

export default errorHandler;
