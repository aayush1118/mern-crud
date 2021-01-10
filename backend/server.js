const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

mongoose.connect('mongodb://localhost/mern_crud', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('///Mongoose is connected///');
});

const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	Todo.find((err, todos) => {
		if (err) {
			console.error(err);
		} else {
			res.json(todos);
		}
	});
});

app.post('/create', (req, res) => {
	const todo = new Todo(req.body);
	todo.save()
		.then((todo) => {
			res.json(todo);
		})
		.catch((err) => {
			res.status(500).send(err.message);
		});
});

app.get('/:id', (req, res) => {
	const id = req.params.id;
	Todo.findById(id, (err, todo) => {
		res.json(todo);
	});
});

app.post('/:id', (req, res) => {
	const id = req.params.id;
	Todo.findById(id, (err, todo) => {
		if (!todo) {
			res.status(404).send('todo not found');
		} else {
			todo.text = req.body.text;
			todo.save()
				.then((todo) => res.json(todo))
				.catch((err) => res.status(500).send(err.message));
		}
	});
});

app.delete('/:id', async (req, res) => {
	const id = req.params.id;
	await Todo.findByIdAndDelete(id);
});

app.listen(PORT, () => {
	console.log('***server started***');
});
