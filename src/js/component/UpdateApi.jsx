import { fetchTodos } from './FetchAll';


export const addTaskToApi = (todos, inputValue, setTodos) => {
    const updatedTodos = [
        ...todos,
        {
            id: Date.now(),
            label: inputValue.trim(),
            done: false,
        },
    ];

    fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley", {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => {
            if (resp.ok) {
                setTodos(updatedTodos);
                fetchTodos(setTodos);
            }
        })
        .catch((error) => console.error("Error adding task to API:", error));
};


export const deleteTaskFromApi = (updatedTodos, setTodos) => {
    const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley";
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (updatedTodos.length < 1) {
        requestOptions.method = "DELETE";
        delete requestOptions.body;
    }

    fetch(apiUrl, requestOptions)
        .then((resp) => {
            if (resp.ok) {
                if (requestOptions.method === "DELETE") {
                    console.log("Todos and user successfully deleted from API.");
                } else {
                    console.log("Todo deleted successfully from API");
                    fetchTodos(setTodos);
                }

            } else {
                console.error("Failed to delete todo(s) from API");
            }
        })
        .catch((error) => console.error("Error deleting task from API:", error));
};