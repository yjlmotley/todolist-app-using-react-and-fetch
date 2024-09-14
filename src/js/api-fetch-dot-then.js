const API_URL = "https://playground.4geeks.com/todo";
const user = "yjlmotley";


export const fetchTodos = (setTodos) => {
    fetch(`${API_URL}/users/${user}`)
        .then((resp) => {
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            // console.log("raw response from API: ", resp);
            return resp.json();
        })
        .then((data) => {
            // console.log("Todo List from API (after response has been jsonified):", data);
            if (data && Array.isArray(data.todos)) {
                setTodos(data.todos);
            } else {
                console.error("Fetched data is not an array:", data.todos);
                setTodos([]);
            }
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
        });
};

export const addTaskToApi = (inputValue, setTodos) => {
    fetch(`${API_URL}/todos/${user}`, {
        method: "POST",
        body: JSON.stringify({
            label: inputValue.trim(),
            is_done: false,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log("New todo added to API: " + inputValue.trim());
            fetchTodos(setTodos);
        })
        .catch((error) => {
            console.error("Error adding task to API:", error);
        });
};

export const deleteTaskFromApi = (todoId, deletedTodo, setTodos) => {
    fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((resp) => {
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log("Todo deleted successfully from API: " + deletedTodo);
            fetchTodos(setTodos);
        })
        .catch((error) => {
            console.error("Error deleting task from API:", error);
        });
};

export const deleteAllTasksAndUserFromApi = (setTodos) => {
    fetch(`${API_URL}/users/${user}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log(`User, ${user}, and all their todos deleted successfully from API`);
            alert("Your tasks will now not be saved upon refreshing this page.");
            setTodos([]);
        })
        .catch((error) => {
            console.error("Error deleting user and tasks from API:", error);
        });
};

export const handleCreateUser = (setTodos) => {
    fetch(`${API_URL}/users/${user}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                return resp.text().then(text => {
                    throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
                });
            }
            console.log(`User, ${user}, has been created successfully in API`);
            alert("You can now save tasks.");
            fetchTodos(setTodos);
        })
        .catch((error) => console.error("Error creating user in API:", error));
};