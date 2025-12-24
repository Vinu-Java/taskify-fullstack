import TodoItem from "./TodoItem";

export default function TodoList({
  todos = [],
  search,
  page = 0,
  totalPages = 0,
  onPrev,
  onNext,
  handleEdit,
  handleDelete,
}) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}

      <div className="pagination">
        <button disabled={page === 0} onClick={onPrev}>
          Prev
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages - 1 || totalPages === 0}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
