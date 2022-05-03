module.exports = (req, res) => {
	// Redirect to Homepage
	res.set({
		Location: 'https://fairfieldprogramming.org/',
	});

	res.status(308).send();
};
