import { useState } from "react";
import { flushSync } from "react-dom";
import { HometrackLogo } from "./hometrack";
import { Todos } from "./Todos";
import { QR } from "./qr";

const slides = ["intro", "demo", "recap"] as const;

export function Page() {
  const [debug, setDebug] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<(typeof slides)[number]>(
    slides[0],
  );

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
        {slides.map((slide) => (
          <button
            disabled={slide === currentSlide}
            onClick={() => {
              document.startViewTransition(() => {
                flushSync(() => {
                  setCurrentSlide(slide);
                });
              });
            }}
          >
            {slide}
          </button>
        ))}
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
        <div className="intro">
          <h1>
            On the Merits of{" "}
            <a href="https://react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable">
              Immutability
            </a>
          </h1>
          <QR
            input="https://forms.gle/esDgbS1gR8FwqnyT6"
            correction="M"
            size={80}
            colour={currentSlide === "recap" ? "aliceblue" : undefined}
          />
        </div>
        {currentSlide === "intro" && (
          <>
            <h2>Hi, I’m Max Duval – @mxdvl</h2>
            <p>React borrows from Functional Programming.</p>
            <p>Single most influential technical concept.</p>
            <p>Hands-on: all the code will be shared…</p>
            <p>Stop squashing & start netting!</p>
          </>
        )}
        {currentSlide === "demo" && (
          <Todos
            debug={debug}
            initialDisplay={{
              low: false,
              medium: true,
              high: true,
            }}
            initialTodos={[
              {
                id: "uuid-0199ce67-abcd-0000-0000-000000000001",
                title: "Prep talk",
                status: "done",
                priority: "high",
              },
              {
                id: "uuid-0199ce67-abcd-0000-0000-000000000002",
                title: "Give talk",
                status: "doing",
                priority: "high",
              },
              {
                id: "uuid-0199ce67-abcd-0000-0000-000000000003",
                title: "Get feedback",
                status: "todo",
                priority: "medium",
              },
              {
                id: "uuid-0199ce67-abcd-0000-0000-000000000004",
                title: "Watch Celebrity Traitors",
                status: "todo",
                priority: "low",
              },
            ]}
          />
        )}
        {currentSlide === "recap" && (
          <>
            <h2>Hope you’re convinced by now!</h2>
            <p>Let the computer do more for you.</p>
            <p>Start netting and stop squashing.</p>
            <p>Resources links & feedback form:</p>
            <QR
              input="https://forms.gle/esDgbS1gR8FwqnyT6"
              correction="M"
              size={480}
            />
          </>
        )}
      </main>
    </>
  );
}
