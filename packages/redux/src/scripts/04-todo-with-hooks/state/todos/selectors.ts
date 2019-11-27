import { FilterType } from '../filters/reducers';
import { Todo } from './reducers';

export function getFilteredTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case 'COMPLETED':
      return todos.filter(t => t.completed);
    case 'INCOMPLETE':
      return todos.filter(t => !t.completed);
    case 'ALL':
    default:
      return todos;
  }
}
