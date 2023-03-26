const express = require('express')

const router = express.Router()

const flightController = require('../controllers/flightController')

// I.N.D.U.C.E.S  ->  an acronym that helps remember how to properly order routes
// Index, New, Delete, Update, Create, Edit, Show

// Setup an "index" route for flights, attach it to router along with the controller logic
router.get('/', flightController.index)

// Setup a "new" route for creating flight
router.get('/new', flightController.new)

router.delete('/clear', flightController.clear)

// Setup a "delete" route for removing a specific flight
router.delete('/:id', flightController.delete)

// Setup a "update" route for updating a specific flight
router.put('/:id', flightController.update)

router.post('/seed', flightController.seed)

// Setup a "create" route for adding flight data
router.post('/', flightController.create)

// Setup a "edit" route for editing a flight
router.get('/:id/edit', flightController.edit)

// Setup an "show" route for flights, attach it to router along with the controller logic
router.get('/:id', flightController.show)

// EXTRA ROUTES (for destinations)

router.post('/:id/destinations', flightController.createDestination)

router.delete('/:id/destinations/:cid', flightController.deleteDestination)

router.get('/:id/destinations', flightController.indexDestination)

router.get('/:id/destinations/:cid', flightController.showDestination)

router.put('/:id/destinations/:cid', flightController.updateDestination)
module.exports = router;