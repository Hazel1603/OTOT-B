// Filename: api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import contact controller
var todoController = require('./todoController');
// Contact routes
router.route('/todos')
    .get(todoController.index)
    .post(todoController.new);

router.route('/todos/:todo_id')
    .get(todoController.view)
    .patch(todoController.patch)
    .put(todoController.put)
    .delete(todoController.delete);

// Export API routes
module.exports = router;