import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addTodo, deleteTodo, fetchTodos } from '../store/todoReducer';

export default function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const inputTodo = (e) => {
        setNewTodo(e.target.value);
    };

    const sendForm = () => {
        if (newTodo.trim() !== '') {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };

    const clickDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo.id));
    };

    return (
        <div>
            <h4>TodoList</h4>
            <input type="text" onChange={inputTodo} value={newTodo} />
            <button onClick={sendForm}>Добавить</button>

            <div>
                {todos && (
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id} onClick={() => clickDeleteTodo(todo)}>
                                {todo.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
