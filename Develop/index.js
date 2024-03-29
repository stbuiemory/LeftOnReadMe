const inquirer = require('inquirer'); 
const fs = require('fs');  
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);


//interactice commandline user prompts array
const userQuestions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your readme project?',
    },
      {
        type: 'editor',
        name: 'description',
        message: 'Next step -- enter a DESCRIPTION of your project after pressing [Enter]. Please save before closing.',
      },
      {
        type: 'editor',
        name: 'tableofcontents',
        message: 'Next step -- enter a TABLE OF CONTENTS for your project after pressing [Enter].  File -> Save -> Close the Editor!',
      },
      {
        type: 'editor',
        name: 'install',
        message: 'Next step -- enter INSTALLATION instructions for your project after pressing [Enter].  Save a penny AND your project!',
      },
      {
        type: 'editor',
        name: 'usage',
        message: 'Next step -- enter USAGE instructions for your project after pressing [Enter].  Save now so you do not cry later.',
      },
      {
        type: 'editor',
        name: 'tests',
        message: 'Next step -- enter TESTING guidelines for your project after pressing [Enter].  Save your work so you can twerk.',
      },
      {
        type: 'editor',
        name: 'contrib',
        message: 'Next step -- enter CONTRIBUTION guidelines for your project after pressing [Enter].  Save your data to make it matter.',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Tired of me bossing you around?  Just a few more questions left.',
        choices: ['Apache License 2.0', 
          'BSD 3-Clause \'New\' or \'Revised\' license', 
          'BSD 2-Clause \'Simplified\' or \'FreeBSD\' license', 
          'GNU General Public License (GPL)', 
          'GNU Library or \'Lesser\' General Public License (LGPL)', 
          'MIT license', 
          'Mozilla Public License 2.0', 
          'Common Development and Distribution License', 
          'Eclipse Public License version 2.0'],
      },
      {
        type: 'input',
        name: 'gitHub',
        message: 'Please tell me your GitHub username.',
      },      
      {
        type: 'input',
        name: 'email',
        message: 'Final question (I swear), what is your email address? Ps It was fun getting to know you!',
      },
    ]);
};

// TODO: Create a function to write README file
const writeToFile = async (fileName, data) =>{

  try {
    await writeFileAsync(fileName, data);

    console.log('Your Readme.md is complete!');
  } catch (err) {
    console.log(err);
    console.log('There was an error writing your file');
  }
}

// TODO: Create a function to initialize app
const init = async () => {
  console.log('Welcome to the Left on README.md generator');
  try {
    const answers = await userQuestions(); //once user prompts are finished then retuen answers to answers array
    const md = generateMarkdown.generateMarkdown(answers);  //call the function in generateMarkdoen.js file to create the markdown for the readme
    writeToFile('README.md', md);  //call the writeToFile function and pass it the name 'README.MD' and the completed markdown
  } catch (err) {
    console.log(err);
    console.log('There was an error with user input');
  }
};

// Function call to initialize app
init();