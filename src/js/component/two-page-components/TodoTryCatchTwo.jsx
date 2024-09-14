import React, { useState, useEffect } from "react";
import { addTaskToApi, deleteTaskFromApi, deleteAllTasksAndUserFromApi, handleCreateUser, fetchTodos } from "../../api-fetch-try-catch-short.js";


const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos(setTodos);
    }, []);

    const handleAddTodo = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            // next 6 lines just for front end (w/out API)
            const newTodo = {
                id: Date.now(),
                label: inputValue.trim(),
                done: false
            };
            setTodos([...todos, newTodo]);

            addTaskToApi(inputValue, setTodos);
                
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const todoId = todos[index].id;
        const deletedTodo = todos[index].label;

        // next 2 lines just for front end (w/out API)
        const updatedTodos = todos.filter((todo, i) => index !== i);
        setTodos(updatedTodos);
        
        deleteTaskFromApi(todoId, deletedTodo, setTodos);
    };

    const handleCreateUserBtn = () => {
        handleCreateUser(setTodos);
    };

    const handleClearTasks = () => {
        setTodos([]);
        deleteAllTasksAndUserFromApi(setTodos);
    };


    return (
        <div className="container text-center">
            <h1 className="mt-5">todos</h1>
            <div className="card todo-card mx-auto mt-5 mb-5" style={{ maxWidth: "800px" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input 
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)} 
                            value={inputValue}
                            onKeyDown={handleAddTodo}
                            placeholder="What needs to be done?"
                        />
                    </li>
                    {todos.length === 0 ? (
                        <li className="list-group-item no-tasks">-- No tasks, add a task --</li>
                    ) : (
                        todos.map((todo, index) => (
                            <li className="list-group-item" key={todo.id}>
                                <div className="list-group-item-todo" id="screen">
                                    {todo.label}
                                </div>
                                <span className="x-container" onClick={() => handleDeleteTodo(index)}>
                                    <i className="fa-solid fa-x"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-secondary">
                    {todos.length} {todos.length === 1 ? "item" : "items"} left
                </div>
            </div>
            <div className="btn-div mb-5">
                <button id="create-user" className="btn btn-light btn-outline-danger fw-bold mb-5 me-2 rounded-0" onClick={handleCreateUserBtn}>
                    Create User to Save Tasks
                </button>
                <button id="clear-btn" className="btn btn-danger btn-outline-light fw-bold mb-5 rounded-0"  onClick={handleClearTasks}>
                    Clear User & All Tasks
                </button>
            </div>
            <footer>
                <p className="mb-1"><b>[NOTE]</b>  Create user to save your tasks.</p>
                <p><b>[WARNING]</b>  Clicking the "Clear All Tasks" button will delete the list as well as the user.</p>
            </footer>
        </div>
    );
};


export default TodoList;