import { useState } from "react";
import { uuidv7 } from "uuidv7";
import { HometrackLogo } from "./hometrack";

const all_status = ["todo", "doing", "done"] as const;

interface Todo {
  /** must be unique! */
  id: string;
  title: string;
  status: (typeof all_status)[number];
  assignee: string[];
}

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
      <header>
        <a href="https://www.hometrack.com" target="_blank">
          <HometrackLogo />
        </a>
      </header>
      <main>
        <h1>On the merits of Immutability</h1>
        <h2>Todo List</h2>
        <button
          onClick={() => {
            const title = prompt("Title?")?.trim();
            if (!title) return;
            const id = uuidv7();
            setTodos((todos) => {
              todos.push({ id, title, status: "todo", assignee: [] });
              return todos;
            });
          }}
        >
          add
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {all_status.map((status) => (
            <div key={status}>
              <h3>
                {status.at(0)?.toUpperCase()}
                {status.slice(1)}
              </h3>
              <ul>
                {todos.flatMap((todo) =>
                  todo.status === status
                    ? [<li key={todo.id}>{todo.title}</li>]
                    : [],
                )}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
