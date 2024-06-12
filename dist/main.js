#! /usr/bin/env node
import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dataPath = path.resolve(__dirname, "../data.json");
    const data = await fs.readFile(dataPath, "utf-8");
    const questionObject = JSON.parse(data);
    let loop = 1;
    const questionArr = questionObject.map((item) => {
        let single_question = {
            message: item.question,
            type: "list",
            choices: item.choices,
            name: "ques_" + loop,
        };
        loop++;
        return single_question;
    });
    console.log("Welcome to TypeScript Quiz!!");
    const answers = await inquirer.prompt(questionArr);
    const answersArr = Object.values(answers);
    questionObject.forEach((item, index) => {
        if (answersArr[index] === item.answer) {
            console.log(`\nQuestion #${index + 1}: ${item.question}`);
            console.log(`Your answer is Correct: ${item.answer}`);
        }
        else {
            console.log(`\nQuestion #${index + 1}: ${item.question}`);
            console.log(`Your answer is wrong, Correct answer is: ${item.answer}`);
            console.log(`Your answer was: ${answersArr[index]}`);
        }
    });
}
main().catch((err) => {
    console.error("Error running the quiz:", err);
});
