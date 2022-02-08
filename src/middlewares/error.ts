const errorHandler = (err, req, res, next) => {
	const error = { ...err };

	error.message = err.message;

	// log error to console for dev
	console.log("Error: ", err);

	if (error.name === "ValidationError") {
		res.status(400).json({
			success: false,
			message: "Please check that all fields are properly filled"
		});
	} else if (error.name === "UniqueConstraintViolationException") {
		res.status(400).json({
			success: false,
			message: "Details already exists"
		});
	} else if (error.name === "NotNullConstraintViolationException") {
		res.status(400).json({
			success: false,
			message: "One or more required fields are not provided"
		});
	} else if (error.name === "NotFoundError") {
		res.status(400).json({
			success: false,
			message: error.message
		});
	} else {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error"
		});
	}
};

export default errorHandler;
