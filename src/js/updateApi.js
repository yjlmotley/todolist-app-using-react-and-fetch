import { fetchUserId, fetchTodos } from './component/FetchAll.jsx';


export const addTaskToApi = async (todos, inputValue, setTodos) => {
    try {
        const newTask = {
            label: inputValue.trim(),
            is_done: false,
        };

        const response = await fetch(`https://playground.4geeks.com/todo/todos/yjlmotley`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to add task. Status: " + response.status);
        }

        const data = await response.json();
        const updatedTodos = [
            ...todos,
            { ...newTask, id: data.id },
        ];
        setTodos(updatedTodos);
        fetchTodos(setTodos);
    } catch (error) {
        console.error("Error adding task to API:", error);
    }
};


    export const deleteTaskFromApi = async (todoId, setTodos) => {
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

            console.log("User and all todos deleted successfully from API");
            setTodos([]);
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
                    console.log("User has been created successfully in API")
                    fetchTodos(setTodos);
                }
            })
            .catch((error) => console.error("Error creating user in API:", error));
    };