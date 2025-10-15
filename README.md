# On the Merits of Immutability

Presented at Hometrack/Zoopla offices on Wed 15 Oct 2025.

We’ll explore why React loves immutable data structures.

> [Feedback form](https://forms.gle/esDgbS1gR8FwqnyT6)

## Buggy

We are not following the [rules of React](https://react.dev/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable)

## Netted

No mutability bugs can happen thanks to ESLint rules + TypeScript enforcement. [See diff in Pull Request](https://github.com/mxdvl/immutability/pull/1)


---

## Further Reading

- [“No BS TS #10” by Jack Herrington](https://www.youtube.com/watch?v=b_p3yP57A9w&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=12)
- [“`as const` is the GOAT” by Matt Pocock](https://www.linkedin.com/posts/mapocock_as-const-is-the-goat-activity-7110222213772910592-B33G/?trk=public_profile_like_view)
- [`Object.freeze()` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [“Immutability Example” TypeScript Playground](https://www.typescriptlang.org/play/?#example/immutability)
