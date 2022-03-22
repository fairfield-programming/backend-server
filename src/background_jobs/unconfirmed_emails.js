module.exports.remove_unconfirmed_email__user_accounts = async () => {


    // find and retreive all the users with an unconfirmed email address
    // this query only retreives the ids, for perfomance reasons

    const found_users = await User.findAll(
        {
            where:
            {
                [Op.or]: {
                    confirmed_email: false,
                },
            },
            attributes: ['id'],
            raw: true,
        },
    )

    if (found_users != undefined && found_users.length) {

        
        // at this stage found_users will look like [{id:1}, {id:2}]
        // we want to turn it into an ids array which will look like [1,2]
        const ids = [];
        found_users.forEach((element) => {
            ids.push(element.id)
        })


        // search through the event table,
        // and remove all the events that belongs to a user with an unconfirmed email address

        await Events.destroy(
            {
                where:
                {
                    [Op.or]: {
                        ownerId: { $in: ids }
                        ,
                    },
                },
            },
        )


        // then destroy all the users to finish the deletion algorithm process

        await User.destroy(
            {
                where:
                {
                    [Op.or]: {
                        id: { $in: ids }
                        ,
                    },
                },
            },
        )

        // then at the end, sync with our database to update the User table.
        // this will drop the current table and recreate a new one.
        // this not optimal though. 
        await User.sync({ force: true });
    }


}