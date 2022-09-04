// todoController.js
// Import contact model
const Todo = require('./todoModel');

// Handle index actions
exports.index = function (req, res) {
    Todo.get(function (err, todo) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: err,
            });
            return;
        }
        res.json({
            status: "success",
            message: "Todos retrieved successfully",
            data: todo
        });
    });
};

// Handle create todo actions
exports.new = function (req, res) {
    var todo = new Todo();
    var postData = req.query;

    todo.todoItem = postData.todoItem;
    todo.description = postData.description;
    todo.type = postData.type;

    // save the todo item and check for errors
    todo.save(function (err) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        res.json({
            message: 'New Todo Item created!',
            data: todo
        });
    });
};

// Handle view todo info
exports.view = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if ( todo === null ) {
            res.status(404).json({
                status: "error",
                message: "Todo Item is not found.",
            })
            return;
        }

        res.json({
            message: 'Todo details loading..',
            data: todo
        });
    });
};

// Handle update contact info
exports.patch = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.status(400).json(err)
            return;
        }

        if ( todo === null ) {
            res.status(404).json({
                status: "error",
                message: "Todo Item is not found.",
            })
            return;
        }
        const postData = req.query;

        todo.todoItem = postData.todoItem ? postData.todoItem : todo.todoItem;
        todo.description = postData.description ? postData.description : todo.description;
        todo.type = postData.type ? postData.type : todo.type;

        // save the contact and check for errors
        todo.save(function (err) {
            if (err) {
                res.json(err);
                return;
            }
            res.json({
                message: 'Todo Info updated',
                data: todo
            });
        });
    });
};

// Handle update contact info
exports.put = function (req, res) {
    Todo.findById(req.params.todo_id, function (err, todo) {
        if (err) {
            res.status(400).json(err)
            return;
        }

        if ( todo === null ) {
            res.status(404).json({
                status: "error",
                message: "Todo Item is not found.",
            })
            return;
        }

        const postData = req.query;
        if (!postData.todoItem || !postData.description || !postData.type) {
            res.json({
                status: "error",
                message: "Not all information is provided.",
            })
        }

        todo.todoItem = postData.todoItem;
        todo.description = postData.description;
        todo.type = postData.type;

        // save the contact and check for errors
        todo.save(function (err) {
            if (err) {
                res.json(err);
                return;
            }
            res.json({
                message: 'Todo Info updated',
                data: todo
            });
        });
    });
};

// Handle delete todo
exports.delete = function (req, res) {
    Todo.deleteOne({_id: req.params.todo_id}, function (err, response) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        if ( response.deletedCount === 0 ) {
            res.status(404).json({
                status: "error",
                message: "Todo Item is not found.",
            })
            return;
        }
        res.json({
            status: "success",
            message: 'Todo deleted'
        });
    });
};