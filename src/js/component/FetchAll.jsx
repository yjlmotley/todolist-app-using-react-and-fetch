import React, { useEffect, useState } from "react";

const FetchAll = ({ setTodos }) => {
    const [remoteTodos, setRemoteTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (remoteTodos.length > 0) {
            addRemoteTodos();
        }
    }, [remoteTodos]);

    const fetchTodos = () => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley")
            .then((resp) => {
                if (!resp.ok) {
                    throw newError("Failed to fetch too list. Status: " + resp.status);
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
    };

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


    return null;
};


export default FetchAll;