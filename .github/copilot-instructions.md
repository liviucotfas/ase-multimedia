## Project context

This repository contains teaching materials and code examples for the university
Multimedia course. The course teaches students how to develop multimedia
applications using web technologies, combining foundational concepts with
practical skills.

## Teaching guidelines

- Prioritize pedagogical clarity.
- Keep each example focused on the concept being taught.
- Preserve commented alternatives that support classroom demonstrations.
- Use English for identifiers, comments, and messages in code examples.
- Follow the existing example structure, file numbering, and local formatting.
- Prefer existing local media assets when they support the lesson.

## JavaScript and browser target

- Use the latest standardized ECMAScript features and modern browser APIs
  supported by default in the current stable release of Google Chrome.
- Examples must run without experimental flags or origin trials.
- Prefer ES modules for multi-file examples or lessons about modularity.
  Inline scripts are appropriate for self-contained demonstrations.

## Documentation and types

- Add concise JSDoc to functions and classes to provide type information for
  VS Code IntelliSense in JavaScript.
- Include explicit `@param` and `@returns` annotations where applicable.
- Use `@type` for variables or properties when inference is insufficient, and
  `@typedef` for reusable object shapes.
- Add `@example` when it supports the concept being taught.

## Coding style

- Use `const` by default and `let` when reassignment is needed.
- Prefer clear, descriptive names and small, focused functions.
- Keep side effects explicit and localized; use pure functions where practical.
- Handle asynchronous failures when demonstrating asynchronous operations.
- Add dependencies or abstractions only when they serve the lesson.

## Canvas, animation, and performance

- Use `requestAnimationFrame` for rendering loops.
- Clear the canvas when a frame should replace the previous drawing; preserve
  intentional accumulation, trails, and overlays.
- Apply high-DPI scaling when relevant to the lesson. Preserve the intended
  dimensions and coordinate system in examples that teach pixel manipulation.
- Provide accessible fallback text or a meaningful description of canvas output.
- Optimize when measurements or the learning objective justify it. In rendering
  loops, reduce unnecessary allocations, repeated layout reads, and redundant
  canvas state changes when doing so keeps the example clear.

## Validation and contributions

- For behavior changes, verify the affected examples in current stable Chrome
  and check the browser console for errors.
- Use a local HTTP server for examples that need one, including ES modules and
  fetching local resources.
- Run relevant existing checks when available and report what was verified.
- Use short, imperative commit messages. In pull requests, summarize the
  behavior change and include relevant validation or demonstration steps.
- Attribute third-party content and use material whose license permits reuse.
- Keep the shared guidance in `AGENTS.md` and `.github/copilot-instructions.md`
  synchronized so each file remains self-contained.
