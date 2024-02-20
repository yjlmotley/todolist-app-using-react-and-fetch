import React, { useEffect } from "react";


const FetchAll = ({ todos, setTodos }) => {
  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Failed to fetch todo list. Status: " + resp.status);
        }
        return resp.json();
      })
      .then((data) => {
        console.log("Todo List from API", data);
        console.log("Response body as a string:", resp.text());
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  }, [todos]);

  return null;
};

export default FetchAll;