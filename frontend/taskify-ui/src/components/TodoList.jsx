import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  search,
  page,
  totalPages,
  onPrev,
  onNext,
  handleEdit,
  handleDelete,
}) {

  return (
    <>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            search={search}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}

        <div className="pagination">
          <button disabled={page === 0} onClick={onPrev}>
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button disabled={page === totalPages - 1} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
