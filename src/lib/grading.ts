export function checkAnswer(
    submittedAnswer: number,
    correctAnswer: number
): 0 | 1 {
    return submittedAnswer === correctAnswer ? 1 : 0;
}