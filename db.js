const {Schema, model, connect} = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://enliberte:29072017sm@cluster0.hydp7.mongodb.net/RN_Todos?retryWrites=true&w=majority';
connect(MONGO_URI, {useNewUrlParser: true, keepAlive: true});

const todoSchema = new Schema({
   key: String,
   value: String
});

const Todo = model('Todo', todoSchema);

module.exports = {
    getTodos: async () => Todo.find({}).exec(),
    addTodo: async todo => Todo.update(todo, {}, {upsert: true}).exec(),
    deleteTodo: async key => Todo.deleteOne({key}).exec(),
    editTodo: async ({key, value}) => Todo.updateOne({key}, {value}).exec()
};
