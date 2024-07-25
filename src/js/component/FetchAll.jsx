import React, { useEffect, useState } from "react";


// Functions to fetch todos from the API
export const fetchUserId = (username) => {
    return fetch(`https://playground.4geeks.com/todo/users?limit=100`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch users. Status: " + resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            const user = data.users.find(user => user.name === username);
            if (!user) {
                throw new Error(`User ${username} not found.`);
            }
            return user.id;
        });
};


export const fetchTodos = (setTodos) => {
    fetch("https://playground.4geeks.com/todo/users/yjlmotley")
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            console.log("Todo List from API", data);
            if (Array.isArray(data.todos)) {
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

// Initial fetch with an effect to make sure the initial fetch only runs once at the beginning
const FetchAll = ({ setTodos }) => {
    const [initialFetchDone, setInitialFetchDone] = useState(false);

    useEffect(() => {
        if (!initialFetchDone) {
            fetchTodos(setTodos);
            setInitialFetchDone(true);
        }
    }, [setTodos, initialFetchDone]);

    return null;
};


export default FetchAll;