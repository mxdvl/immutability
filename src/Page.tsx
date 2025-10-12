import { useState } from "react";
import { HometrackLogo } from "./hometrack";
import { Todos } from "./Todos";

export function Page() {
  const [debug, setDebug] = useState(false);

  if (!debug) {
    console.clear();
  }
  return (
    <>
      <header>
        <a
          href="https://www.hometrack.com"
          target="_blank"
          style={{ color: "inherit" }}
        >
          <HometrackLogo />
        </a>
        <label>
          <input
            type="checkbox"
            checked={debug}
            onChange={({ target: { checked } }) => {
              setDebug(checked);
            }}
          />{" "}
          debug
        </label>
      </header>
      <main>
        <h1>
          On the merits of{" "}
          <a href="https://react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable">
            Immutability
          </a>
        </h1>
        <Todos
          debug={debug}
          initial={[
            {
              id: "uuid-0199ce67-abcd-0000-0000-000000000001",
              title: "Prep talk",
              status: "done",
              priority: "high",
            },
            {
              id: "uuid-0199ce67-abcd-0000-0000-000000000001",
              title: "Give talk",
              status: "doing",
              priority: "high",
            },
            {
              id: "uuid-0199ce67-abcd-0000-0000-000000000002",
              title: "Get feedback",
              status: "todo",
              priority: "medium",
            },
          ]}
        />
      </main>
    </>
  );
}
