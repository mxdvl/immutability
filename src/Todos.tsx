import { useState } from "react";
import { uuidv7 } from "uuidv7";

const statuses = ["todo", "doing", "done"];
const priorities = ["low", "medium", "high"];

export function Todos({
  initialTodos,
  initialDisplay,
  debug,
}: {
  initialTodos: Todo[];
  initialDisplay: Record<Todo["priority"], boolean>;
  debug: boolean;
}) {
  const [todos, setTodos] = useState(initialTodos);
  const [display, setDisplay] = useState(initialDisplay);

  if (debug) {
    console.debug({ todos, display });
  }

  return (
    <>
      <h2>Controls</h2>
      <fieldset>
        <button
          onClick={() => {
            const title = prompt("Title?")?.trim();
            if (!title) return;

            setTodos((todos) => {
              todos.push({
                id: `uuid-${uuidv7()}`,
                title,
                status: "todo",
                priority: "medium",
              });
              return todos;
            });
          }}
        >
          add todo
        </button>
        <hr />
        {priorities.map((priority) => (
          <label key={priority}>
            <input
              type="checkbox"
              checked={display[priority]}
              onChange={({ target: { checked } }) => {
                setDisplay((previous) => {
                  previous[priority] = checked;
                  return previous;
                });
              }}
            />
            {priority} (
            {todos.filter((todo) => todo.priority === priority).length})
          </label>
        ))}
      </fieldset>
      <div id="todos">
        {statuses.map((status) => (
          <div key={status}>
            <h3>
              {status.at(0)?.toUpperCase()}
              {status.slice(1)}
            </h3>
            <ul>
              {todos.flatMap((todo) =>
                todo.status === status && display[todo.priority]
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
  /** must be unique & valid [`<custom-ident>`](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident#forbidden_values) */
  id: `uuid-${string}`;
  title: string;
  status: (typeof statuses)[number];
  priority: (typeof priorities)[number];
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

  const { prev, next } = getPrevNext(todo.status);

  return (
    <li
      key={todo.id}
      id={todo.id}
      className="todo"
      data-status={todo.status}
      data-priority={todo.priority}
    >
      <div className="control">
        {todo.title}
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
      </div>
      <div className="control">
        {priorities.map((priority) => (
          <label key={priority}>
            <input
              type="radio"
              disabled={todo.status === "done"}
              checked={todo.priority === priority}
              onChange={({ target: { checked } }) => {
                if (!checked) return;
                todo.priority = priority;
                update(todo);
              }}
            />
            {priority}
          </label>
        ))}
      </div>
      <div className="control">
        <button
          disabled={!prev}
          onClick={() => {
            if (!prev) return;
            todo.status = prev;
            update(todo);
          }}
        >
          ←
        </button>
        <button
          disabled={!next}
          onClick={() => {
            if (!next) return;
            todo.status = next;
            update(todo);
          }}
        >
          →
        </button>
      </div>
    </li>
  );
}

function getPrevNext(
  status: Todo["status"],
): Record<"prev" | "next", Todo["status"] | undefined> {
  switch (status) {
    case "todo":
      return { prev: undefined, next: "doing" };
    case "doing":
      return { prev: "todo", next: "done" };
    case "done":
      return { prev: "doing", next: undefined };
    default:
      return { prev: undefined, next: undefined };
  }
}
