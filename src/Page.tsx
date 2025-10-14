import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { HometrackLogo } from "./hometrack";
import { Todos } from "./Todos";
import { QR } from "./qr";

const slides = ["intro", "demo", "recap"] as const;

/** Feedback Form URL */
const input = "https://forms.gle/esDgbS1gR8FwqnyT6";

export function Page() {
  const [currentSlide, setCurrentSlide] = useState(
    slides.find((slide) => slide === window.location.pathname.slice(1)) ??
      "intro",
  );

  useEffect(() => {
    history.pushState(null, "", `/${currentSlide}`);
  }, [currentSlide]);

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
        <hr />
        {slides.map((slide) => (
          <button
            key={slide}
            className={slide === currentSlide ? "active" : undefined}
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
      </header>
      <main>
        <div className="title">
          <h1>
            On the Merits of{" "}
            <a href="https://react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable">
              Immutability
            </a>
          </h1>
          {currentSlide === "demo" && (
            <QR input={input} correction="M" size={80} />
          )}
        </div>
        {currentSlide === "intro" && (
          <>
            <h2>Hi, I’m Max Duval – @mxdvl</h2>
            <ul>
              <li>React &lt;3 Functional Programming</li>
              <li>
                Stop <strong>squashing</strong> bugs…
              </li>
              <li>
                …start <strong>netting</strong> instead!
              </li>
              <li>Code on Github</li>
            </ul>
            <QR input={input} correction="M" size={480} />
          </>
        )}
        {currentSlide === "demo" && (
          <Todos
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
            <h2>
              Start <strong>netting</strong>…
            </h2>
            <ul>
              <li>
                … and stop <strong>squashing</strong>!
              </li>
              <li>Resources links & feedback form:</li>
            </ul>
            <QR input={input} correction="M" size={480} />
          </>
        )}
      </main>
    </>
  );
}
