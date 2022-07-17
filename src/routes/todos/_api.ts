import type { RequestEvent } from '@sveltejs/kit';

let todos: Todo[] = [];
export const api = (requestEvent: RequestEvent, todoItem?: Todo) => {
  let body = {};
  let status = 500;
  const { request } = requestEvent;

  switch (request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      todoItem?.text ? todos.push(todoItem) : '';
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter((todo) => todo.uid !== requestEvent.params.uid);
      status = 200;
      break;
    default:
      break;
  }
  if (request.method.toUpperCase() !== 'GET') {
    return {
      status: 303,
      headers: {
        location: '/',
      },
    };
  }
  return {
    status,
    body,
  };
};
