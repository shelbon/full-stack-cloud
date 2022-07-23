import PrismaClient from '$lib/prisma';
import type { RequestEvent } from '@sveltejs/kit';

const prisma = new PrismaClient();
export const api = async (
  requestEvent: RequestEvent,
  data?: Record<string, unknown>
) => {
  let body = {};
  let status = 500;
  const { request } = requestEvent;

  switch (request.method.toUpperCase()) {
    case 'GET':
      body = await prisma.todo.findMany();
      status = 200;
      break;
    case 'POST':
      if (data?.text) {
        body = await prisma.todo.create({
          data: {
            created_at: data.created_at as Date,
            done: data.done as boolean,
            text: data.text as string,
          },
        });
        status = 201;
      }
      break;
    case 'DELETE':
      await prisma.todo.delete({
        where: { uid: requestEvent.params.uid },
      });
      status = 200;
      break;
    case 'PATCH':
      status = 200;
      body = await prisma.todo.update({
        data: {
          done: data.done as boolean,
          text: data.text as string,
        },
        where: { uid: requestEvent.params.uid },
      });
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
