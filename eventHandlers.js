const EVENTS = require('./events');
const db = require('./db');

module.exports = [
    {
        event: EVENTS.ADD_TODO,
        createHandler: socket => async todo => {
            await db.addTodo(todo);
            const todos = await db.getTodos();
            socket.emit(EVENTS.SET_TODOS, todos);
        }
    },
    {
        event: EVENTS.EDIT_TODO,
        createHandler: socket => async todo => {
            await db.editTodo(todo);
            const todos = await db.getTodos();
            socket.emit(EVENTS.SET_TODOS, todos);
        }
    },
    {
        event: EVENTS.DELETE_TODO,
        createHandler: socket => async key => {
            await db.deleteTodo(key);
            const todos = await db.getTodos();
            socket.emit(EVENTS.SET_TODOS, todos);
        }
    },
    {
        event: EVENTS.GET_TODOS,
        createHandler: socket => async key => {
            const todos = await db.getTodos();
            socket.emit(EVENTS.SET_TODOS, todos);
        }
    }
];
