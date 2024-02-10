import React, { useState } from "react";


const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue.trim()]);
			setInputValue("");
		}
	};

	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div className="todo-box">
			<h1>todos</h1>
			<div className="card todo-card" style={{ width: "49rem" }}>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<input 
							type="text"
							onChange={(e) => setInputValue(e.target.value)} 
							value={inputValue}
							onKeyDown={handleAddTodo}
							placeholder="What needs to be done?"
						/>
					</li>
					{todos.map((todo, index) => (
						<li className="list-group-item" key={index}>
							<div className="list-group-item-todo">
								{todo}
							</div>
							<span className="x-container" onClick={() => handleDeleteTodo(index)}>
								<i className="fa-solid fa-x"></i>
							</span>
						</li>
					))}
				</ul>
				<div className="card-footer text-secondary">{todos.length} tasks left</div>
			</div>
		</div>
	);
};

export default Home;
