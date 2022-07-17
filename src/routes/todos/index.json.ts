import { getFormBody } from '$lib/utils/form';
import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api.ts';
//TODO persist in database

export const GET: RequestHandler = (requestEvent) => {
  return api(requestEvent);
};
export const POST: RequestHandler = async (requestEvent) => {
  const formData = getFormBody(await requestEvent.request.formData());
  return api(requestEvent, {
    uid: `${Date.now()}`, //TODO replace uid from database
    created_at: new Date(),
    text: formData.text,
    done: false,
  });
};
