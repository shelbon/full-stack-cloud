import { getFormBody } from '$lib/utils/form';
import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api.ts';
export const DELETE: RequestHandler = (event) => {
  return api(event);
};
export const PATCH: RequestHandler = async (event) => {
  const formData = getFormBody(await event.request.formData());
  return api(event, {
    text: formData.text,
    done: formData.done ?? undefined,
  });
};
