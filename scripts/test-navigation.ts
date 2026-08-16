/**
 * Navigation policy self-check.
 *
 * The Mini App has several nested screens while the persistent bottom nav is
 * intentionally hidden during an exam. This test keeps every non-root screen
 * on one explicit Back policy and verifies that the rendered controls call the
 * same handler as Telegram's native BackButton.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const navigationSource = readFileSync("public/js/navigation.js", "utf8");
const context = vm.createContext({ window: { App: {} } });
vm.runInContext(navigationSource, context);

const resolveBackNavigation = (
  context.window.App as {
    resolveBackNavigation?: (
      screen: string,
      state?: { supportFrom?: string | null; examReturnScreen?: string | null }
    ) => { kind: string; target?: string };
  }
).resolveBackNavigation;

assert.equal(typeof resolveBackNavigation, "function");
if (!resolveBackNavigation) throw new Error("navigation policy was not loaded");
const resolved = (
  screen: string,
  state?: { supportFrom?: string | null; examReturnScreen?: string | null }
) => JSON.parse(JSON.stringify(resolveBackNavigation(screen, state)));

// Persistent-bottom-nav destinations are roots, so Telegram's BackButton hides.
for (const root of ["home", "signs", "vocab"]) {
  assert.deepEqual(resolved(root), { kind: "none" });
}

// Nested screens always have an unambiguous destination.
assert.deepEqual(resolved("topics"), { kind: "screen", target: "home" });
assert.deepEqual(resolved("stats"), { kind: "screen", target: "home" });
assert.deepEqual(resolved("profile"), { kind: "screen", target: "home" });
assert.deepEqual(resolved("admin"), { kind: "screen", target: "home" });
assert.deepEqual(resolved("results"), { kind: "screen", target: "home" });
assert.deepEqual(resolved("tutor"), { kind: "screen", target: "results" });
assert.deepEqual(resolved("exam", { examReturnScreen: "topics" }), {
  kind: "exit-exam",
  target: "topics",
});
assert.deepEqual(resolved("support", { supportFrom: "pending" }), {
  kind: "close-support",
  target: "pending",
});

const nestedScreenFiles = [
  "src/app/screens/topics.ts",
  "src/app/screens/stats.ts",
  "src/app/screens/profile.ts",
  "src/app/screens/admin.ts",
  "src/app/screens/results.ts",
  "src/app/screens/tutor.ts",
  "src/app/screens/support.ts",
  "src/app/screens/exam.ts",
];

for (const file of nestedScreenFiles) {
  const source = readFileSync(file, "utf8");
  assert.match(source, /App\.handleBackNavigation\(\)/, `${file} must render a Back control`);
}

const shell = readFileSync("src/app/shell.tsx", "utf8");
assert.ok(
  shell.indexOf('/js/navigation.js') < shell.indexOf('/js/app.js'),
  "navigation policy must load before the main client"
);

const app = readFileSync("public/js/app.js", "utf8");
assert.match(app, /BackButton/);
assert.match(app, /App\.handleBackNavigation/);

console.log("✓ navigation policy: all checks passed");
