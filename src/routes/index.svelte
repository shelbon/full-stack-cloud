<script>
  import TodoItem from '$lib/todo-item.svelte';
  const title = 'Todo';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<h1>{title}</h1>

<form action="" method="post">
  <input
    type="text"
    name="todo"
    placeholder="+ tap to add a todo"
    aria-label="Add a todo"
  />
</form>
<section>
  <TodoItem />
</section>
