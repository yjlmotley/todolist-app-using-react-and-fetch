const API_URL = "https://playground.4geeks.com/todo";
const user = "yjlmotley";

// Helper function for API requests
const apiRequest = async (url, options = {}) => {
    const resp = await fetch(url, options);
    // console.log("raw response from API: ", resp);

    // if (!response.ok) throw new Error(`Status: ${response.status}`);
    if (!resp.ok) {
        return resp.text().then(text => {
            throw new Error(`${resp.status} - ${resp.statusText}: ${text}`);
        });
    }
    return resp.status === 204 ? Promise.resolve() : resp.json();
    // return resp.json();
};


export const fetchTodos = async (setTodos) => {
    try {
        const data = await apiRequest(`${API_URL}/users/${user}`)
        // console.log("Data from the API (after jsonified):", data);
        setTodos(data && Array.isArray(data.todos) ? data.todos : []);
    } catch (error) {
        console.error("Fetch todos failed:", error);
    }
};

export const addTaskToApi = async (inputValue, setTodos) => {
    try {
        await apiRequest(`${API_URL}/todos/${user}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: inputValue.trim(), is_done: false }),
        });
        console.log("New todo added to API: " + inputValue.trim());
        fetchTodos(setTodos);
    } catch (error) {
        console.error("Add task failed:", error);
    }
};

export const deleteTaskFromApi = async (todoId, deletedTodo, setTodos) => {
    try {
        await apiRequest(`${API_URL}/todos/${todoId}`, { method: "DELETE" });
        console.log("Todo deleted successfully from API: " + deletedTodo);
        fetchTodos(setTodos);
    } catch (error) {
        console.error("Delete task failed:", error);
    }
};

export const deleteAllTasksAndUserFromApi = async (setTodos) => {
    try {
        await apiRequest(`${API_URL}/users/${user}`, { method: "DELETE" });
        console.log(`User, ${user}, and all todos deleted successfully`);
        alert("Your tasks will now not be saved upon refreshing this page.");
        setTodos([]);
    } catch (error) {
        console.error("Delete user and tasks failed:", error);
    }
};

export const handleCreateUser = async (setTodos) => {
    try {
        await apiRequest(`${API_URL}/users/${user}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([]),
        });
        console.log(`User, ${user}, has been created successfully in API`);
        alert("You can now save tasks.");
        await fetchTodos(setTodos);
    } catch (error) {
        console.error("Create user failed:", error);
    }
};
