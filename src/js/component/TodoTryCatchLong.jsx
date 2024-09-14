import React, { useState, useEffect } from "react";


const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos(setTodos);
    }, []);

    const API_URL = "https://playground.4geeks.com/todo";
    const user = "yjlmotley";

    const fetchTodos = async (setTodos) => {
        try {
            const resp = await fetch(`${API_URL}/users/${user}`);
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            // if (!resp.ok) {
            //     throw new Error("Status: " + resp.status);
            // }
            // console.log("raw response from API: ", resp);
            const data = await resp.json();
            // console.log("Todo List from API (after response has been jsonified):", data);
            if (data && Array.isArray(data.todos)) {
                setTodos(data.todos);
            } else {
                console.error("Fetched data is not an array:", data.todos);
                setTodos([]);
            }
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    };

    const handleAddTodo = async (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            // next 6 lines just for front end (w/out API)
            const newTodo = {
                id: Date.now(),
                label: inputValue.trim(),
                done: false
            };
            setTodos([...todos, newTodo]);

            setInputValue("");

            try {
                const resp = await fetch(`${API_URL}/todos/${user}`, {
                    method: "POST",
                    body: JSON.stringify({
                        label: inputValue.trim(),
                        is_done: false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        
                if (!resp.ok) {
                    return resp.text().then(text => {
                        throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                    });
                }
                console.log("New todo added to API: " + inputValue.trim());
                fetchTodos(setTodos);
            } catch (error) {
                console.error("Error adding task to API:", error);
            };
        }
    };

    const handleDeleteTodo = async (index) => {
        const todoId = todos[index].id;
        const deletedTodo = todos[index].label;

        // next 2 lines just for front end (w/out API)
        const updatedTodos = todos.filter((todo, i) => index !== i);
        setTodos(updatedTodos);

        try {
            const resp = await fetch(`${API_URL}/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log("Todo deleted successfully from API: " + deletedTodo);
            fetchTodos(setTodos);
        } catch (error) {
            console.error("Error deleting task from API:", error);
        }
    };

    const handleCreateUserBtn = async () => {
        try {
            const resp = await fetch(`${API_URL}/users/${user}`, {
                method: "POST",
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log(`User, ${user}, has been created successfully in API`);
            alert("You can now save tasks.");
            await fetchTodos(setTodos);
    
        } catch (error) {
            console.error("Error creating user in API:", error);
        }
    };

    const handleClearTasks = async () => {
        setTodos([]);
        try {
            const resp = await fetch(`${API_URL}/users/${user}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
    
            console.log(`User, ${user}, and all todos deleted successfully from API`);
            alert("Your tasks will now not be saved upon refreshing this page.");
            setTodos([]);
        } catch (error) {
            console.error("Error deleting user and tasks from API:", error);
        }
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
                <button id="clear-btn" className="btn btn-danger btn-outline-light fw-bold mb-5 rounded-0" onClick={handleClearTasks}>
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