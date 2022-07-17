import { getFormBody } from '$lib/utils/form';
import type { RequestHandler } from '@sveltejs/kit';
//TODO persist in database
let todos:Todo[] = [];
export const GET: RequestHandler = () => {
  return {
    status: 200,
    body: todos,
  };
};
export const POST: RequestHandler = async ({ request }) => {
  const formData = getFormBody(await request.formData());
  todos.push({
    created_at:new Date(),
      text:formData.text,
      done:false
  });
  return {
    status: 303,
    headers: {
      location: '/',
    },
  };
};
