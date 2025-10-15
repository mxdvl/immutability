import { flushSync } from "react-dom";

/** Now supported in all major browsers & works with React! */
export function withTransition(action: () => void) {
  if (typeof document.startViewTransition !== "function") {
    action();
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => {
      action();
    });
  });
}
