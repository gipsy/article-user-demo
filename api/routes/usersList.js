const { Router } = require('express')
const usersController = require('../controllers/usersController')

const router = Router()

// Get All
router.get('/usersList', usersController.usersList)

module.exports = router
