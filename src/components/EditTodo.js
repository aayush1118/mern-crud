import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { useRouteMatch } from 'react-router-dom';
import { getTodo, updateTodo } from '../api';

export const EditTodo = () => {
	const match = useRouteMatch();
	const [todo, setTodo] = useState();

	useEffect(() => {
		const fetchTodo = async () => {
			const todo = await getTodo(match.params.id);
			setTodo(todo);
		};
		fetchTodo();
	}, []);

	const onSubmit = async (data) => {
		await updateTodo(data, match.params.id);
	};

	return todo ? (
		<div className='container'>
			<div className='mt-3'>
				<h3>Edit Todo Item</h3>
				<TodoForm todo={todo} onSubmit={onSubmit} />
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
};
