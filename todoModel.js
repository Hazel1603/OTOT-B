// todoModel.js

var mongoose = require('mongoose');

// Setup schema
var toDoSchema = mongoose.Schema({
    todoItem: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: String,
});

// Export Todo model
var Todo = module.exports = mongoose.model('todo', toDoSchema);
module.exports.get = function (callback, limit) {
    Todo.find(callback).limit(limit);
}
