const vulgarTester = require('../../../library/VulgarTest');


/**
 * @module Set Account Status Controller
 * 
 * @param {Request} req - HTTP Request from the client
 * @param {Response} res - HTTP Response for the client
 * 
 * @description
 * This controller will allow the user to update his account status, if no vulgar language detected and all parameters are correct.
 * 
 * @todo
 * Nothing for now.
 */


module.exports.setStatus = async (req, res) => {

  try {

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (!user) return res.status(404).send({ msg: "Account Not Found." });

    if (!req.body.status) {
      return res.status(400).send({ msg: 'Not All Parameters Given.' });
    }

    if (vulgarTester.DetectVulgarWords(req.body.status)) {
      return res.status(406).send({ msg: "Vulgar Language Detected." });
    }


    user.update({
      status: req.body.status,
    });

    return res.status(200).send({ msg: 'Status set.' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: 'Error on setting account status' });
  }
};
