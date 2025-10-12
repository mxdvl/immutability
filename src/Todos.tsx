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
          const id = uuidv7();
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
  /** must be unique! */
  id: string;
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
