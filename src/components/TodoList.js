import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../api';

export const Todolist = () => {
	const [items, setItems] = useState([]);
	useEffect(() => {
		const fetchItems = async () => {
			const todos = await getTodos();
			setItems(todos);
		};
		fetchItems();
	}, []);

	const removeTodo = (todo) => {
		const newItems = items.filter((item) => item !== todo);
		setItems(newItems);
		deleteTodo(todo._id);
	};

	return (
		<div className='container'>
			<div className='mt-3'>
				<h3>TodoList</h3>
				<table className='table table-striped mt-3'>
					<thead>
						<tr>
							<th>Todo</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{items.map((todo) => (
							<tr key={todo._id}>
								<td>{todo.text}</td>
								<td>
									<Link
										className='btn btn-info btn-sm'
										to={`/edit/${todo._id}`}
									>
										Edit
									</Link>
								</td>
								<td>
									<button
										className='btn btn-danger btn-sm mx-1'
										onClick={() => removeTodo(todo)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
