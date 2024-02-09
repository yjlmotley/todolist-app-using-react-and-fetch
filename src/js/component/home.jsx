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
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue}
						onKeyDown={handleAddTodo}
						placeholder="What do you need to do"
					/>
				</li>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo}
						<span className="x" onClick={() => handleDeleteTodo(index)}>
							<i class="fa-solid fa-x"></i></span>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;
