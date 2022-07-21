import type { RequestEvent } from '@sveltejs/kit';

let todos: Todo[] = [];
export const api = (
  requestEvent: RequestEvent,
  data?: Record<string, unknown>
) => {
  let body = {};
  let status = 500;
  const { request } = requestEvent;

  switch (request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      data?.text ? todos.push(data as Todo) : '';
      body = data;
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter((todo) => todo.uid !== requestEvent.params.uid);
      status = 200;
      break;
    case 'PATCH':
      status = 200;
      todos = todos.map((todo) => {
        if (todo.uid === requestEvent.params.uid) {
          if (data?.text) {
            todo.text = data?.text as string;
          } else {
            todo.done = data?.done as boolean;
          }
        }
        return todo;
      });
      body = todos.find((t) => t.uid === requestEvent.params.uid);
      break;
    default:
      break;
  }
  if (
    request.method.toUpperCase() !== 'GET' &&
    request.headers.get('accept') !== 'application/json'
  ) {
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
