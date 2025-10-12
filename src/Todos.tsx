import { useState } from "react";
import { uuidv7 } from "uuidv7";

const statuses = ["todo", "doing", "done"] as const;
const priorities = ["low", "medium", "high"] as const;

export function Todos({ initial, debug }: { initial: Todo[]; debug: boolean }) {
  const [todos, setTodos] = useState(initial);
  const [display, setDisplay] = useState<Todo["priority"][]>([
    "low",
    "medium",
    "high",
  ]);

  if (debug) {
    console.debug({ todos, display });
  }

  return (
    <>
      <h2>Controls</h2>
      <button
        onClick={() => {
          const title = prompt("Title?")?.trim();
          if (!title) return;
          const id = `uuid-${uuidv7()}` as const;
          setTodos((todos) => {
            todos.push({ id, title, status: "todo", priority: "medium" });
            return todos;
          });
        }}
      >
        add
      </button>
      {priorities.map((priority) => (
        <label>
          <input
            type="checkbox"
            checked={display.includes(priority)}
            onChange={() => {
              setDisplay((previous) => {
                const index = previous.indexOf(priority);
                if (index === -1) {
                  previous.push(priority);
                } else {
                  previous.splice(index, 1);
                }

                return previous;
              });
            }}
          />
          {priority} (
          {todos.filter((todo) => todo.priority === priority).length})
        </label>
      ))}
      <div id="todos">
        {statuses.map((status) => (
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
      <div>
        {priorities.map((priority) => (
          <label key={priority}>
            <input
              type="radio"
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
      <div>
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
  }
}
