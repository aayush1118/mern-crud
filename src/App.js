import { Link, Route, Switch } from 'react-router-dom';
import { Todolist } from './components/TodoList';
import { CreateTodo } from './components/CreateTodo';
import { EditTodo } from './components/EditTodo';

function App() {
	return (
		<div>
			<nav className='navbar bg-light navbar-expand-lg navbar-light'>
				<ul className='navbar-nav mr-auto px-5'>
					<li className='nav-item'>
						<Link to='/' className='nav-link active'>
							Todos
						</Link>
					</li>
					<li className='nav-item'>
						<Link to='/create' className='nav-link'>
							Create
						</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path='/' component={Todolist} />
				<Route path='/edit/:id' component={EditTodo} />
				<Route path='/create' component={CreateTodo} />
			</Switch>
		</div>
	);
}

export default App;
