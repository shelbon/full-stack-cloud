import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api';
export const DELETE: RequestHandler = (event) => {
  return api(event);
};
