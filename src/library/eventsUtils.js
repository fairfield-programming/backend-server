function missingParameters(req) {
    const { name, location,
            description, host,
            status, date } = req.body;
    if (!name || !location || !description ||
        !host || !status || !date )
        return true;
    return false;
}

module.exports = { missingParameters }