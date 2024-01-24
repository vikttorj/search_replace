#! /usr/bin/env node
// Search on the current PATH?
import prompts from "prompts";
import { exec } from "child_process";

export const objectSearch = {
  pathSearch: "",
  language: "ember",
  textSearch: "",
  textReplace: "",
  confirmReplace: false
};

export async function runPrompt() {
  const response = await prompts([
    {
      type: "confirm",
      name: "currentPath",
      message: "Search on the current PATH?",
      initial: true,
    },
  ]);
  response.currentPath ? question(response) : false;
  

  async function question(answer) {
    console.log(answer)
    if (!answer.currentPath) {
      var response2 = await prompts([
        {
          type: "text",
          name: "currentPathNew",
          message: `What is the complete PATH to search?`,
        },
      ]);
      response2.currentPathNew ? question2(response2.currentPathNew) : false;
    } else {
      exec("pwd", (error, stdout, stderr) => {
        question2(stdout);
        return;
      });
    }
    // question2();
  }

  async function question2(pathSearch) {
    objectSearch.pathSearch = pathSearch;
    var response3 = await prompts([
      {
        type: "select",
        name: "language",
        message: `What LANGUAGE should I search in?`,
        choices: [
          { title: "EMBER", value: "ember" },
          { title: "LIT", value: "lit" },
        ],
      },
    ]);
    response3.language ? question3(response3.language) : false;
  }

  async function question3(language) {
    objectSearch.language = language;
    var response4 = await prompts([
      {
        type: "text",
        name: "textSearch",
        message: `What do I have to LOOK FOR? `,
      },
    ]);
    response4.textSearch ? question4(response4.textSearch) : false;
  }

  async function question4(textSearch) {
    objectSearch.textSearch = textSearch;
    var response5 = await prompts([
      {
        type: "text",
        name: "textReplace",
        message: `What do you want me to REPLACE?`,
      },
    ]);
    response5.textReplace ? question5(response5.textReplace) : false;
  }

  async function question5(textReplace) {
    objectSearch.textReplace = textReplace;
    var response6 = await prompts([
      {
        type: "confirm",
        name: "confirmReplace",
        message: `Do you want to replace ${objectSearch.textReplace} with ${objectSearch.textReplace} in ${objectSearch.language} now? `,
        initial: true,
      },
    ]);
    response6.textReplace ? replaceFn(response6.confirmReplace) : false;
  }
  async function replaceFn(confirmReplace) {
    objectSearch.confirmReplace = confirmReplace;
    return objectSearch;
  }
}
