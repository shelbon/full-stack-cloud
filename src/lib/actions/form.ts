export const enhance = (form: HTMLFormElement, { result }) => {
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const body = new FormData(form);
    const res = await fetch(form.action, {
      headers: {
        accept: 'application/json',
      },
      method: form.method,
      body,
    }).catch((err) => {
      console.error('could not submit the form', err);
    });
    if (res.ok) {
      result(res,form);
    } else {
      console.log('fetch error', await res.text());
    }
  };
  form.addEventListener('submit', handleSubmit);
  return {
    destroy() {
      form.removeEventListener('submit', handleSubmit);
    },
  };
};
