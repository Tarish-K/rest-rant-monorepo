const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');

const { User } = db;

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({
        where: { email }
    })

    if (user && await bcrypt.compare(password, user.passwordDigest)) {
        res.json({ user });
    } else {
        res.status(404).json({
            message: 'Could not find a user with the provided credentials.'
        })
    }

    console.log({id: user.userId, email, password})
})

module.exports = router;