import { useState } from "react";
import { uuidv7 } from "uuidv7";
import { withTransition } from "./viewTransitions";

const statuses = ["todo", "doing", "done"] as const;
const priorities = ["low", "medium", "high"] as const;

export function Todos({
  initialTodos,
  initialDisplay,
}: Readonly<{
  initialTodos: readonly Todo[];
  initialDisplay: Readonly<Record<Todo["priority"], boolean>>;
}>) {
  const [todos, setTodos] = useState(initialTodos);
  const [display, setDisplay] = useState(initialDisplay);

  return (
    <>
      <h2>Controls</h2>
      <fieldset>
        <button
          onClick={() => {
            const title = prompt("Title?")?.trim();
            if (!title) return;

            setTodos((todos) =>
              todos.concat({
                id: `uuid-${uuidv7()}`,
                title,
                status: "todo",
                priority: "medium",
              }),
            );
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
                  return { ...previous, [priority]: checked };
                });
              }}
            />
            {priority}{" "}
            <span className="count">
              {todos
                .filter((todo) => todo.priority === priority)
                .length.toString()
                .padStart(2, "0")}
            </span>
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
                        update={(updated) => {
                          withTransition(() => {
                            setTodos((todos) =>
                              todos.map((todo) =>
                                todo.id === updated.id ? updated : todo,
                              ),
                            );
                          });
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
  readonly id: `uuid-${string}`;
  readonly title: string;
  readonly status: (typeof statuses)[number];
  readonly priority: (typeof priorities)[number];
}

function Todo({
  todo,
  update,
}: Readonly<{
  todo: Todo;
  update: (updated: Todo) => void;
}>) {
  const { prev, next } = getPrevNext(todo.status);

  return (
    <li
      key={todo.id}
      id={todo.id}
      className="todo"
      data-status={todo.status}
      data-priority={todo.priority}
      style={{ viewTransitionName: todo.id }}
    >
      <div className="control">
        <h4>{todo.title}</h4>
        <button
          onClick={() => {
            const title = prompt("Rename", todo.title)?.trim();
            if (!title) return;
            update({ ...todo, title });
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
                update({ ...todo, priority });
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
            update({ ...todo, status: prev });
          }}
        >
          ←
        </button>
        <button
          disabled={!next}
          onClick={() => {
            if (!next) return;
            update({ ...todo, status: next });
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
