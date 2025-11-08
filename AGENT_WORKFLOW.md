🤖 AI Agent Workflow Log
🧠 Agents Used
Agent	Purpose
ChatGPT (GPT-5)	For architecture design, backend logic explanation, and step-by-step development guidance
GitHub Copilot	Inline code completion and boilerplate generation inside VS Code
Cursor AI	Context-aware file generation and refactoring during frontend development
Tailwind IntelliSense	Suggested responsive design classes for quick styling
💬 Prompts & Outputs
🧩 Example 1 — Backend: Compute Compliance Balance (CB)

Prompt:

“Implement the function computeComplianceBalance() using the FuelEU formula (Target - Actual) × (FuelConsumption × 41000) for each route.”

AI Output:

const TARGET = 89.3368;
const MJ_PER_TON = 41000;
cb = (TARGET - route.ghg_intensity) * (route.fuel_consumption * MJ_PER_TON);


Validation:
Manually verified outputs against seed data (R001–R005) in PostgreSQL.
Tested via Postman → GET /compliance/cb?year=2025.
Values correctly reflected surplus and deficit logic.

⚖️ Example 2 — Frontend: ComparePage Visualization

Prompt:

“Create a ComparePage in React using Tailwind and Recharts to compare baseline vs comparison route GHG intensities.”

AI Output:
Generated a two-bar chart with columns for baseline and comparison data, along with percentage difference calculation.

Corrections Made:

Added safe .toFixed(2) formatting for floating-point values.

Improved table layout with Tailwind responsive utilities.

Added a “No data available” state to prevent crashes when backend returns empty arrays.

💰 Example 3 — Banking Logic

Prompt:

“Implement a banking system that lets users bank positive CBs and apply them to deficits. Validate before banking that CB > 0.”

AI Output:

async getBankedAmount(shipId: string, year: number): Promise<number> {
  const res = await query("SELECT COALESCE(SUM(amount_gco2eq),0) FROM bank_entries WHERE ship_id=$1 AND year=$2", [shipId, year]);
  return Number(res.rows[0].coalesce);
}


Corrections:
Replaced coalesce with the correct alias total.
Added negative entry handling for applying banked values.
Manually validated results through SQL queries.

⚓ Example 4 — UI Navigation Refactor

Prompt:

“Redesign App.tsx with a gradient navbar, smooth transitions, and responsive tabs for Routes, Compare, Banking, and Pooling.”

AI Output:
Generated a gradient-based responsive layout using Tailwind utilities.

Corrections Made:

Added animated scale transitions for active tabs.

Implemented Framer Motion for smooth fade-in/out between pages.

Adjusted spacing and shadow effects for mobile responsiveness.

🧩 Validation / Corrections
Task	Validation Action
Backend API testing	Tested each endpoint using Postman
TypeScript type errors	Fixed missing type imports and explicit type parameters
SQL schema mismatches	Verified migrations and seed scripts manually
Tailwind styling	Switched from @apply to inline class utilities
Recharts integration	Verified rendering through live chart tests
⚡ Observations
✅ Where AI Saved Time

Scaffolded Hexagonal Architecture folders and naming conventions instantly.

Reduced repetitive typing for interfaces, use cases, and repository layers.

Provided immediate solutions to syntax and configuration errors.

Accelerated UI creation through pre-styled components.

⚠️ Where AI Failed or Hallucinated

Suggested invalid SQL joins (routes ↔ ship_compliance).

Hallucinated columns (cb_value, ship_type).

Produced JSX snippets that violated strict TypeScript settings.

🔁 Human Intervention

Rewrote database queries to match the actual schema.

Simplified logic for banking and pooling validations.

Debugged Tailwind class conflicts and incorrect color mappings.

🧠 Best Practices Followed

Incremental commits per major module (Routes → Compare → Banking → Pooling).

Used Cursor tasks to generate and refactor files iteratively.

Used Copilot inline completions for boilerplate (types, hooks, forms).

Used ChatGPT primarily for reasoning, debugging, and architectural direction.

Manually validated every AI-generated code block before committing.

📈 Observations on Workflow
Phase	AI Use	Human Role
Backend Setup	Generated core structure and repository patterns	Adjusted SQL and data validation
Frontend Development	Auto-suggested layouts and chart logic	Manually refined styling and state management
Testing & Validation	Drafted initial Jest configs	Executed and corrected failing tests
Documentation	Generated first-pass Markdown drafts	Revised language and formatting
💡 Final Thoughts

AI agents accelerated this project’s development by over 50%, but correctness still relied on human reasoning.
By combining ChatGPT’s reasoning, Copilot’s inline speed, and Cursor’s contextual generation, I built a clean, testable, and maintainable system within the given time constraint.

Key takeaway: AI can be your best assistant — but you must still be the architect, reviewer, and decision-maker.

✅ Summary

Category	Outcome
Time saved	~50–60% faster than manual coding
Quality maintained	Yes, via manual validation
AI contribution	Scaffolding, syntax, layout, reasoning
Human contribution	Logic, correctness, testing, documentation