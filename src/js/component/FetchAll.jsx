//Reset.vs4
import React, { useEffect, useState } from "react";

const FetchAll = ({ todos, setTodos, inputValue }) => {
    const [remoteTodos, setRemoteTodos] = useState([]);

    useEffect(() => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley")
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Failed to fetch todo list. Status: " + resp.status);
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Todo List from API", data);
                setRemoteTodos(data);
            })
            .catch((error) => {
                console.error("There has been a problem with your fetch operation:", error);
            });
    }, []);

    useEffect(() => {
        if (remoteTodos.length > 0) {
            addRemoteTodos();
        }
    }, [remoteTodos]);

    const addRemoteTodos = () => {
        setTodos((prevTodos) => [
            ...prevTodos,
            ...remoteTodos.map((todo) => ({
                id: todo.id,
                label: todo.label,
                done: false,
            })),
        ]);
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            addTaskToApi();
        }
    };

    const addTaskToApi = () => {
        const updatedTodos = [
            ...todos,
            {
                id: Date.now(), // Assign a unique ID
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
                    // If successful, update the todos state
                    setTodos(updatedTodos);
                }
            })
            .catch((error) => console.error("Error adding task to API:", error));
    };

    return null;
};

export default FetchAll;