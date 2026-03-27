const inquirer = require('inquirer');

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
}

type InquirerAnswers = {
  action: Action;
};

const startApp = () => {
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'input',
        message: 'How can I help you?',
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      console.log('Chosen action: ' + answers.action);
      if (answers.action === Action.Quit) {
        console.log('Goodbye!');
        return;
      }
      startApp();
    });
};

startApp();
