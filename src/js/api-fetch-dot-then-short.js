const API_URL = "https://playground.4geeks.com/todo";
const user = "yjlmotley";

// Helper function for API requests
const apiFetch = (url, options = {}) =>
    fetch(url, options)
        .then((response) => {
            // if (!response.ok) throw new Error(`Status: ${response.status}`);
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`${response.status} - ${response.statusText}: ${text}`);
                });
            }
            // console.log("raw response from API: ", response);
            return response.status === 204 ? Promise.resolve() : response.json();
            // return response.json();
        });


export const fetchTodos = (setTodos) => {
    apiFetch(`${API_URL}/users/${user}`)
        // .then((data) => setTodos(Array.isArray(data.todos) ? data.todos : []))
        .then((data) => {
            // console.log("Data from the API (after jsonified):", data);
            setTodos(data && Array.isArray(data.todos) ? data.todos : []);
        })
        .catch((error) => {
            console.error("Fetch todos failed:", error);
            setTodos([]);
        });
};

export const addTaskToApi = (inputValue, setTodos) => {
    apiFetch(`${API_URL}/todos/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: inputValue.trim(), is_done: false }),
    })
        .then(() => {
            console.log("New todo added to API: " + inputValue.trim());
            fetchTodos(setTodos);
        })
        .catch((error) => console.error("Add task failed:", error));
};

export const deleteTaskFromApi = (todoId, deletedTodo, setTodos) => {
    apiFetch(`${API_URL}/todos/${todoId}`, { method: "DELETE" })
        .then(() => {
            console.log("Todo deleted successfully from API: " + deletedTodo);
            fetchTodos(setTodos);
        })
        .catch((error) => console.error("Delete task failed:", error));
};

export const deleteAllTasksAndUserFromApi = (setTodos) => {
    apiFetch(`${API_URL}/users/${user}`, { method: "DELETE" })
        .then(() => {
            console.log(`User, ${user}, and all their todos deleted successfully from API`);
            setTodos([]);
        })
        .catch((error) => console.error("Delete user failed:", error));
};

export const handleCreateUser = (setTodos) => {
    apiFetch(`${API_URL}/users/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
    })
        .then(() => {
            console.log(`User, ${user}, has been created successfully in API`);
            alert("You can now save tasks.");
            fetchTodos(setTodos);
        })
        .catch((error) => console.error("Create user failed:", error));
};
