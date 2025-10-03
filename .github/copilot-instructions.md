Copilot / Contributor instructions
=================================

Purpose
-------
Short, practical guidelines to help code completions and contributors produce consistent, maintainable code.

JavaScript target
-----------------
- Use the latest stable ECMAScript (ES2025) and modern browser APIs. There's no need to support older browsers or add polyfills.
- Use ES modules (import / export).

Documentation and types
-----------------------
- Add JSDoc comments to every function and class. Prefer explicit @param and @returns tags and include short examples when useful.
- If a function expects a specific object shape, add a @typedef and reference it in @param.
- Example:

	/**
	 * Draws a single bar on the provided canvas context.
	 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context to draw into.
	 * @param {{x:number,y:number,width:number,height:number}} rect - Rectangle for the bar.
	 * @param {string} color - CSS color string for the bar fill.
	 * @returns {void}
	 * @example
	 * drawBar(ctx, {x:10,y:20,width:100,height:200}, '#2b8cbe')
	 */
	function drawBar(ctx, rect, color) {
		// ...implementation
	}

Coding style and best practices
------------------------------
- Use const / let; avoid var.
- Favor small, pure functions where practical. Keep side effects explicit and localized.
- Prefer clear, descriptive names for functions and variables.
- Avoid creating lots of temporary objects inside tight draw loops — reuse objects when possible.
- Keep files small and single-purpose; export only what's needed for other modules or the demo page.

Canvas-specific tips
--------------------
- Support high-DPI displays by using devicePixelRatio to scale the canvas backing store and then use CSS to size the element.
- Use ctx.clearRect to clear the canvas each frame when redrawing.
- Batch canvas state changes where possible (set fillStyle once for many draws).
- Use requestAnimationFrame for animations; avoid setTimeout/setInterval for rendering loops.
- Precompute scales, positions, and formatted labels outside the render loop when possible.

Performance notes
-----------------
- Avoid layout thrashing (reading layout properties like offsetWidth inside tight render loops).
- Reuse buffers/objects across frames.
- Measure only when needed (console.time), and prefer simple optimizations first.

Commit messages and PRs
----------------------
- Use short, imperative commit messages (e.g., "fix: handle high-DPI canvas scaling").
- When opening a PR, include a one-sentence summary and short notes about intended behavior, API changes, and any demo steps.

Legal / copyright
-----------------
- Keep third-party content clearly attributed. Don't paste large copyrighted examples.

Checklist for contributors / copilot prompts
-----------------------------------------
- Target ES2025 + ES modules
- Add JSDoc to all functions and classes (include @param/@returns)
- Prefer const/let and small pure helpers
- Follow canvas tips (high-DPI, clearRect, requestAnimationFrame)
- Provide accessible fallback text or summary for canvas outputs

If something is ambiguous, prefer clarity and small, well-documented changes rather than clever one-liners.