#! /usr/bin/env node
const prompts = require('prompts');
prompts.override(require('yargs').argv);
const { exec } = require('child_process');


const objectSearch = 
{
  pathSearch: '',
  language: 'ember',
  textSearch: '',
  textReplace: ''
};
// Search on the current PATH?
(async () => {
  const response = await prompts([
    {
      type: 'confirm',
      name: 'currentPath',
      message: 'Search on the current PATH?',
      initial: true
    }
  ]);
  response.currentPath == false || response.currentPath == true
    ? question(response)
    : false;
})();

async function question(answer) {
  if(!answer.currentPath) {
    response2 = await prompts([
      {
        type: 'text',
        name: 'currentPathNew',
        message: `What is the complete PATH to search?`
      },
    ]);
    if(response2.currentPathNew == '') {
      console.log('\n!!!! Path empty\n')
      question(false);
    }
    response2.currentPathNew
      ? question2(response2.currentPathNew)
      : false;
  } else {
    exec('pwd', (error, stdout, stderr) => {
      question2(stdout);
      return;
    });
  } 
  // question2();
}

async function question2(pathSearch) {
  
  objectSearch.pathSearch = pathSearch;
  response3 = await prompts([
    {
      type: 'text',
      name: 'language',
      message: `What LANGUAGE should I search in?`,
      choices: [
        { title: 'EMBER', value: 'ember' },
        { title: 'LIT', value: 'lit' }
      ],
    },
  ]);
  response3.language
    ? question3(response3.language)
    : false;
}

async function question3(language) {
  objectSearch.language = language;
  response4 = await prompts([
    {
      type: 'text',
      name: 'textSearch',
      message: `What do I have to LOOK FOR? `,
    },
  ]);
  response4.textSearch
    ? question4(response4.textSearch)
    : false;
}

async function question4(textSearch) {
  objectSearch.textSearch = textSearch;
  response5 = await prompts([
    {
      type: 'text',
      name: 'textReplace',
      message: `What do you want me to REPLACE?`,
    },
  ]);
  response5.textReplace
    ? question5(response5.textReplace)
    : false;
}

async function question5(textReplace) {
  objectSearch.textReplace = textReplace;
  response6 = await prompts([
    {
      type: 'confirm',
      name: 'confirmReplace',
      message: `Do you want to replace ${objectSearch.textReplace} with ${objectSearch.textReplace} in ${objectSearch.language} now? `,
      initial: true
    },
  ]);
  response.confirmReplace == false || response.confirmReplace == true
    ? replaceFn(response6.confirmReplace)
    : false;
}

async function replaceFn (confirm) {
  if(confirm) {
    
  }
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