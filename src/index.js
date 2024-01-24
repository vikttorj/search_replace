#! /usr/bin/env node
const prompts = require("prompts");
prompts.override(require("yargs").argv);
const { exec } = require("child_process");
const { ProgressBar } = require("ascii-progress");
const { program } = require('commander');


program
  .option('-v, --version', 'version')
  .option('-h, --help', 'help')
program.parse();

const options = program.opts();

if(Object.keys(options).length !== 0) {
  if ('help' in options) {
    titleCLI();
    console.log(`
Usage: replaze [options]

Options:
  -v, --version                                                                  show version active
    
Questions:
  1. pwd                                                                           Donde hay que buscar
  2. language                                                                      LIT or EMBER
  3. textSearch                                                                    Lo que hay que buscar
  4. insideTag                                                                     Dentro de un tag?
  5. textReplace                                                                   Lo que hay que reemplazar
\n\nCLI to replace one text with another recursively. Search in tag or replace all\n`);
  }
  if ('version' in options) {
    var pjson = require('../package.json');
    console.log(pjson.version);
  }
  false;
} else {
  const objectSearch = {
    pathSearch: "",
    language: "ember",
    insideTag: false,
    textSearch: "",
    textReplace: "",
  };

  let finished = 0;
  let cont = 0;
  // Search on the current PATH?
  titleCLI();

  (async () => {
    const response = await prompts([
      {
        type: "confirm",
        name: "currentPath",
        message: "Search on the current PATH?",
        initial: true,
      },
    ]);
    response.currentPath == false || response.currentPath == true
      ? question(response)
      : false;
  })();

  async function question(answer) {
    if (!answer.currentPath) {
      response = await prompts([
        {
          type: "text",
          name: "currentPathNew",
          message: `What is the complete PATH to search?`,
        },
      ]);
      if (response.currentPathNew == "") {
        console.log("\n!!!! Path empty\n");
        question(false);
      }
      response.currentPathNew ? question2(response.currentPathNew) : false;
    } else {
      exec("pwd", (error, stdout, stderr) => {
        stdout = stdout.substring(0, stdout.length - 1);
        question2(`${stdout}/`);
        return;
      });
    }
  }

  async function question2(pathSearch) {
    objectSearch.pathSearch = pathSearch;
    response = await prompts([
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
    response.language ? question3(response.language) : false;
  }

  async function question3(language) {
    objectSearch.language = language;
    response = await prompts([
      {
        type: "text",
        name: "textSearch",
        message: `What do I have to LOOK FOR? `,
      },
    ]);
    response.textSearch ? question4(response.textSearch) : false;
  }

  async function question4(textSearch) {
    objectSearch.textSearch = textSearch;
    response = await prompts([
      {
        type: "confirm",
        name: "insideTag",
        message: `Search inside a tag? `,
      },
    ]);
    response.insideTag == false || response.insideTag == true ? question5(response.insideTag) : false;
  }

  async function question5(insideTag) {
    objectSearch.insideTag = insideTag;
    response = await prompts([
      {
        type: "text",
        name: "textReplace",
        message: `What do you want me to REPLACE?`,
      },
    ]);
    response.textReplace ? question6(response.textReplace) : false;
  }

  async function question6(textReplace) {
    objectSearch.textReplace = textReplace;
    console.log(objectSearch)
    response = await prompts([
      {
        type: "confirm",
        name: "confirmReplace",
        message: `Do you want to replace '${objectSearch.textSearch}' with '${
          objectSearch.textReplace
        }' in ${objectSearch.language.toLocaleUpperCase()} now? `,
        initial: true,
      },
    ]);
    response.confirmReplace == false || response.confirmReplace == true
      ? replaceAnimated(response.confirmReplace)
      : false;
  }

  async function replaceAnimated(confirm) {
    console.log("\nReplacing text ...\n");
    if (confirm) {
      replaceFn();
      const bar = new ProgressBar({ total: 100, callback: finishAnimated });

      const tokens = ":percent.bold.yellow :etas.italic.cyan";

      const iv = setInterval(() => {
        let completedColor = "";
        const current = bar.current;
        if (current < 20) {
          completedColor = "red";
        } else if (current < 40) {
          completedColor = "magenta";
        } else if (current < 60) {
          completedColor = "yellow";
        } else if (current < 80) {
          completedColor = "blue";
        } else if (current < 100) {
          completedColor = "green";
        }

        const schema = ` [.white:filled.${completedColor}:blank.grey] .white${tokens}`;

        bar.setSchema(schema);
        bar.tick();

        if (bar.completed) {
          clearInterval(iv);
        }
      }, (Math.random() * (35 - 8) + 8));
    }
  }

  function finishAnimated() {
    cont++;
    cont > 4 ? finished++ : null;
    finished++;
    if (finished == 1) {
      finished = 0;
      replaceAnimated(true);
    } 
    finish();
  }
  async function replaceFn() {




    finished++;
    finish();
  }

  function finish() {
    if (finished > 1) {
      console.log(`\n
        ┏┓            •         
        ┃┃┓┏┏┓  ┏┏┓┏┳┓┓┏┓┏┓┏┏┓┏┓
        ┗┻┗┻┗   ┗┗┛┛┗┗┗┗ ┛┗┗┗ ┛┗
        ┓     •                 
        ┃┏┓┏  ┓┓┏┏┓┏┓┏┓┏        
        ┗┗┛┛  ┃┗┻┗ ┗┫┗┛┛        
        ┓  ┓ ┛┓┏   ┛ ┓         
        ┏┫┏┓┃  ┣┫┏┓┏┳┓┣┓┏┓┏┓    
        ┗┻┗ ┗  ┛┗┗┻┛┗┗┗┛┛ ┗     
          \n`);
      console.log(objectSearch);
    }
  }
}

function titleCLI() {
    console.log(`\n
                            dP          d8888888888P         
                            dP                 .d8'          
                            88               .d8'          
  88d888b. .d8888b. 88d888b. 88 .d8888b.    .d8'      .d8888b. 
  88'  '88 88ooood8 88'  '88 88 88'  '88  .d8'        88ooood8 
  88       88.      88.  .88 88 88.  .88 d8'          88.   
  dP       '888888P'88Y888P' dP '88888P8 Y8888888888P '888888P' 
                    88                                      
                    dP                                      
                    dP                                      
  \n`);
}
/*
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
  output: process.stdout
});

rl.question("What do you think of node.js? ", function(answer) {
  console.log("Thank you for your valuable feedback:", answer);

  rl.close();
});*/
