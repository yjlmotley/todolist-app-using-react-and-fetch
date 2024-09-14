
export const fetchTodos = (setTodos) => {
    fetch("https://playground.4geeks.com/todo/users/yjlmotley")
        .then((resp) => {
            // console.log("raw response from API: ", resp);
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
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

export const addTaskToApi = async (inputValue, setTodos) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/yjlmotley`, {
            method: "POST",
            body: JSON.stringify({
                label: inputValue.trim(),
                is_done: false,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to add task. Status: " + response.status);
        }
        console.log("New Todo Added to API: " + inputValue);
        fetchTodos(setTodos);
    } catch (error) {
        console.error("Error adding task to API:", error);
    }
};


export const deleteTaskFromApi = async (todoId, deletedTodo, setTodos) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task. Status: " + response.status);
        }

        console.log("Todo deleted successfully from API: " + deletedTodo);
        fetchTodos(setTodos);

    } catch (error) {
        console.error("Error deleting task from API:", error);
    }
};


export const deleteAllTasksAndUserFromApi = async (setTodos) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/users/yjlmotley`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete user and tasks. Status: " + response.status);
        }

        console.log("User, yjlmotley, and all todos deleted successfully from API");
        setTodos([]);
        alert("Your tasks will now not be saved upon refreshing this page.")
    } catch (error) {
        console.error("Error deleting user and tasks from API:", error);
    }
}

export const handleCreateUser = (setTodos) => {
    fetch("https://playground.4geeks.com/todo/users/yjlmotley", {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (resp.ok) {
                console.log("User, yjlmotley, has been created successfully in API")
                fetchTodos(setTodos);
                alert("You can now save tasks.");
            }
        })
        .catch((error) => console.error("Error creating user in API:", error));
};