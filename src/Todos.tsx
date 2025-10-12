import { useState } from "react";
import { uuidv7 } from "uuidv7";

const all_status = ["todo", "doing", "done"] as const;

export function Todos({ initial, debug }: { initial: Todo[]; debug: boolean }) {
  const [todos, setTodos] = useState(initial);

  if (debug) {
    console.info("todos", todos);
  }

  return (
    <>
      <button
        onClick={() => {
          const title = prompt("Title?")?.trim();
          if (!title) return;
          const id = uuidv7();
          setTodos((todos) => {
            todos.push({ id, title, status: "todo" });
            return todos;
          });
        }}
      >
        add
      </button>
      <div id="todos">
        {all_status.map((status) => (
          <div key={status}>
            <h3>
              {status.at(0)?.toUpperCase()}
              {status.slice(1)}
            </h3>
            <ul>
              {todos.flatMap((todo) =>
                todo.status === status
                  ? [
                      <Todo
                        key={todo.id}
                        todo={todo}
                        debug={debug}
                        update={(next) => {
                          if (!debug) return;
                          console.debug({ todo, next });
                        }}
                      />,
                    ]
                  : [],
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

interface Todo {
  /** must be unique! */
  id: string;
  title: string;
  status: (typeof all_status)[number];
}

function Todo({
  todo,
  debug,
  update,
}: {
  todo: Todo;
  debug: boolean;
  update: (updated: Omit<Todo, "id">) => void;
}) {
  if (debug) {
    console.log("todo", todo);
  }
  return (
    <li key={todo.id} id={todo.id}>
      {todo.title}{" "}
      <button
        onClick={() => {
          const title = prompt("Rename", todo.title)?.trim();
          if (!title) return;
          todo.title = title;
          update(todo);
        }}
      >
        ✎
      </button>
    </li>
  );
}
