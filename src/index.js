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
    response = await prompts([
      {
        type: 'text',
        name: 'currentPathNew',
        message: `What is the complete PATH to search?`
      },
    ]);
    if(response.currentPathNew == '') {
      console.log('\n!!!! Path empty\n')
      question(false);
    }
    response.currentPathNew
      ? question2(response.currentPathNew)
      : false;
  } else {
    exec('pwd', (error, stdout, stderr) => {
      question2(stdout);
      return;
    });
  } 
}

async function question2(pathSearch) {
  
  objectSearch.pathSearch = pathSearch;
  response = await prompts([
    {
      type: 'select',
      name: 'language',
      message: `What LANGUAGE should I search in?`,
      choices: [
        { title: 'EMBER', value: 'ember' },
        { title: 'LIT', value: 'lit' }
      ],
    },
  ]);
  response.language
    ? question3(response.language)
    : false;
}

async function question3(language) {
  objectSearch.language = language;
  response = await prompts([
    {
      type: 'text',
      name: 'textSearch',
      message: `What do I have to LOOK FOR? `,
    },
  ]);
  response.textSearch
    ? question4(response.textSearch)
    : false;
}

async function question4(textSearch) {
  objectSearch.textSearch = textSearch;
  response = await prompts([
    {
      type: 'text',
      name: 'textReplace',
      message: `What do you want me to REPLACE?`,
    },
  ]);
  response.textReplace
    ? question5(response.textReplace)
    : false;
}

async function question5(textReplace) {
  objectSearch.textReplace = textReplace;
  response = await prompts([
    {
      type: 'confirm',
      name: 'confirmReplace',
      message: `Do you want to replace '${objectSearch.textSearch}' with '${objectSearch.textReplace}' in ${objectSearch.language.toLocaleUpperCase()} now? `,
      initial: true
    },
  ]);
  response.confirmReplace == false || response.confirmReplace == true
    ? replaceFn(response.confirmReplace)
    : false;
}

async function replaceFn (confirm) {
  if(confirm) {
    console.log(`\n

 +-+-+-+ +-+-+-+-+-+-+-+-+-+-+
 |Q|u|e| |c|o|m|i|e|n|c|e|n| |
 +-+-+-+ +-+-+-+-+-+-+-+-+-+-+
 |l|o|s| | | |j|u|e|g|o|s| | |      
 +-+-+-+ +-+-+-+-+-+-+-+-+-+-+      
 |d|e|l| | | |H|a|m|b|r|e| | |    
 +-+-+-+ +-+-+-+-+-+-+-+-+-+-+        



 ┏┓            •         
 ┃┃┓┏┏┓  ┏┏┓┏┳┓┓┏┓┏┓┏┏┓┏┓
 ┗┻┗┻┗   ┗┗┛┛┗┗┗┗ ┛┗┗┗ ┛┗
 ┓     •                 
 ┃┏┓┏  ┓┓┏┏┓┏┓┏┓┏        
 ┗┗┛┛  ┃┗┻┗ ┗┫┗┛┛        
  ┓  ┓ ┛┓┏   ┛ ┓         
 ┏┫┏┓┃  ┣┫┏┓┏┳┓┣┓┏┓┏┓    
 ┗┻┗ ┗  ┛┗┗┻┛┗┗┗┛┛ ┗     
                         
 

    \n`)
    console.log(objectSearch)
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