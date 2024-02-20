//Reset.v2
import React, { useEffect, useState } from "react";


const FetchAll = ({ todos, setTodos, addTaskToApi, inputValue }) => {
  const [remoteTodos, setRemoteTodos] = useState([]);

  useEffect(() => {
    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley"
      )
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
  function addTaskToApi() {
    //fetch to api using PUT and the new array of tasks
    const inputValueObject = {
      done: false,
      label: inputValue,
      headers: {
        "Content-Type": "aapplication/json"
      }
    }
    const updatedTodos = [
      ...todos,
      inputValueObject
    ]
    fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley", {
        method: "PUT",
        body: json.stringigy(updatedTodos)
      })
      .then((resp) => {
        if (resp.ok) {
          getTasks();
        }
      })
  }  
  }, []);

  useEffect(() => {
    if (remoteTodos.length > 0) {
      addRemoteTodos();
    }
  }, [remoteTodos]);

  const addRemoteTodos = () => {
    setTodos((prevTodos) => [...prevTodos, ...remoteTodos.map((todo) => ({ id: todo.id, label: todo.label, done: false }))]);
  };

  return null;
};

export default FetchAll;


//----------------------------------------------------------------------------
// Reset.v1
// import React, { useEffect } from "react";


// const FetchAll = ({ todos, setTodos }) => {
//   useEffect(() => {
//     fetch(
//       "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley"
//       )
//       .then((resp) => {
//         if (!resp.ok) {
//           throw new Error("Failed to fetch todo list. Status: " + resp.status);
//         }
//         return resp.json();
//       })
//       .then((data) => {
//         console.log("Todo List from API", data);
//       })
//       .catch((error) => {
//         console.error("There has been a problem with your fetch operation:", error);
//       });
//   }, [todos]);

//   return null;
// };

// export default FetchAll;


// -------------------------------------------------------------------------------------


// version without change
// import React, { useEffect } from "react";


// const FetchAll = ({ todos, setTodos }) => {
//   useEffect(() => {
//     fetch("https://playground.4geeks.com/apis/fake/todos/user/yjlmotley", {
//       method: "PUT",
//       body: JSON.stringify(todos),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then((resp) => {
//         if (!resp.ok) {
//           throw new Error("Failed to fetch todo list. Status: " + resp.status);
//         }
//         return resp.json();
//       })
//       .then((data) => {
//         console.log("Todo List from API", data);
//         console.log("Response body as a string:", resp.text());
//       })
//       .catch((error) => {
//         console.error("There has been a problem with your fetch operation:", error);
//       });
//   }, [todos]);

//   return null;
// };

// export default FetchAll;


// --------------------------------------------------------------

// Ernesto's vs.
// import React, { useEffect } from "react";


// const FetchAll = ({ todos, setTodos }) => {
//   useEffect(() => {
//     fetch(
//       "https://playground.4geeks.com/apis/fake/todos/user/yjlmotley"
//     )
//       .then((resp) => {
//         if (!resp.ok) {
//           throw Error ("response was not succesfull!");
//         }
//           return resp.json();
//       })
//       .then((respBodyAsJson) => {
//         setTodos(respBodyAsJson);
//       })
//       .catch((error) => {
//         alert(error);
//       })
//     };
//   return null;
// };

// export default FetchAll;