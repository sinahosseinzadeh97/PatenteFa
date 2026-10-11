import test from "node:test";
import assert from "node:assert/strict";
import { checkAnswer } from "../src/lib/grading.js";


test("correct answer returns 1", () => {
    const result = checkAnswer(1, 1);
    assert.equal(result, 1);

});
test("wrong answer returns 0", () => {
    const result = checkAnswer(0, 1);
    assert.equal(result, 0);

});
test("student true but correct awnser is false ", () => {
    const result = checkAnswer(1, 0);
    assert.equal(result, 0);
})