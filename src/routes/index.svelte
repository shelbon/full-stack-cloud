<script context="module" lang="ts">
  import { enhance } from '$lib/actions/form';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch }) => {
    const response = await fetch('/todos.json');
    if (response.status == 200) {
      const todos = await response.json();
      return {
        props: { todos },
      };
    }
    const message = await response.text();
    return {
      error: new Error(message),
    };
  };
</script>

<script lang="ts">
  import TodoItem from '$lib/todo-item.svelte';
  const title = 'Todo';
  export let todos: Todo[];
  const processNewTodoResult = async (res: Response, form: HTMLFormElement) => {
    const newTodo = await res.json();
    todos = [...todos, newTodo];
    form.reset();
  };
  const processUpdatedTodoResult = async (res: Response) => {
    const updatedTodo = await res.json();
    todos = todos.map((t) => {
      if (t.uid === updatedTodo.uid) {
        return updatedTodo;
      }
      return t;
    });
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1>{title}</h1>
<div class="todos">
  <form
    action="/todos.json"
    method="post"
    class="new"
    use:enhance={{ result: processNewTodoResult }}
  >
    <input
      type="text"
      name="text"
      placeholder="+ tap to add a todo"
      aria-label="Add a todo"
    />
  </form>
  <section>
    {#each todos as todo}
      <TodoItem
        {todo}
        processDeletedTodoResult={() => {
          todos = todos.filter((t) => t.uid !== todo.uid);
        }}
        {processUpdatedTodoResult}
      />
    {/each}
  </section>
</div>

<style>
  .todos {
    width: 100%;
    max-width: 42rem;
    margin: 4rem auto 0 auto;
  }

  .new {
    margin: 0 0 0.5rem 0;
  }

  .new input {
    font-size: 28px;
    width: 100%;
    padding: 0.5em 1em 0.3em 1em;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-align: center;
  }

  .todos :global(input) {
    border: 1px solid transparent;
  }

  .todos :global(input:focus-visible) {
    box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ff3e00 !important;
    outline: none;
  }
</style>
