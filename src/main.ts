#! /usr/bin/env node

import inquirer, {Answers} from "inquirer";
import fs from "fs/promises";

let data: string = await fs.readFile("data.json","utf-8");
const questionsObject : any[] = JSON.parse(data);

let loop : number = 1;

let questionsArr : Answers[] = questionsObject.map((item) => {
    let single_question : Answers = {
        message : item.question,
        type: "list",
        choices : item.choices,
        name: "ques_" + loop,
    } 
    loop++;
    return single_question;
});

console.log("\n~Welcome to TypeScript Quiz!!~\n");

let answers = await inquirer.prompt(questionsArr);

let answersArr = Object.values(answers);

questionsObject.forEach((item, index) =>{
    if(answersArr[index] == item.answer) {
        console.log(`\nQuestion # ${index + 1}: ${item.question}`);
        console.log(`Your answer is Correct: ${item.answer}`);
    } else {
        console.log(`\nQuestion # ${index + 1}: ${item.question}`);
        console.log(`Your answer is wrong, Correct answer is :  ${item.answer}`);
        console.log(`Your answer was: ${answersArr[index]}`);
    }
})