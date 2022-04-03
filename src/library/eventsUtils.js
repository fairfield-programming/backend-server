function missingParameters(req) {
	const { name, location, description, host, status, date } = req.body;
	return !name || !location || !description || !host || !status || !date;
}

module.exports = { missingParameters };
