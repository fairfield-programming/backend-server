const { MAX_UNCONFIRMED_ACCOUNT_AGE } = require('../constants');

module.exports.removeUnconfirmedAccounts = async () => {
	const accounts = await User.findAll({
		where: {
			confirmed_email: false,
		},
		attributes: ['id', 'createdAt'],
		raw: true,
	});

	if (!accounts?.length) {
		return;
	}

	const accountIds = accounts.filter(account => Date.parse(account.createdAt) < Date.now() - MAX_UNCONFIRMED_ACCOUNT_AGE).map(account => account.id);

	await Promise.all([
		Events.findAll({
			where: {
				ownerId: { [Op.in]: accountIds },
			},
		}),
		User.destroy({
			where: {
				id: { [Op.in]: accountIds },
			},
		}),
	]);
};
