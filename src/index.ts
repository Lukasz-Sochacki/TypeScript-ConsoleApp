const inquirer = require('inquirer');
const consola = require('consola');

enum MessageVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

class Message {
  constructor(private content: string) {}

  public show(): void {
    console.log(this.content);
  }

  public capitalize(): void {
    this.content =
      this.content.charAt(0).toUpperCase() +
      this.content.slice(1).toLowerCase();
  }

  public toUpperCase(): void {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase(): void {
    this.content = this.content.toLowerCase();
  }

  public static showColorized(variant: MessageVariant, text: string): void {
    if (variant === MessageVariant.Success) {
      consola.success(text);
    } else if (variant === MessageVariant.Error) {
      consola.error(text);
    } else if (variant === MessageVariant.Info) {
      consola.info(text);
    }
  }
}

interface User {
  name: string;
  age: number;
}

class UsersData {
  public data: User[] = [];

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');

    if (this.data.length > 0) {
      console.table(this.data);
    } else {
      console.log('No data...');
    }
  }

  public add(user: User): void {
    if (user.age > 0 && user.name.length > 0) {
      this.data.push(user);
      Message.showColorized(
        MessageVariant.Success,
        'User has been successfully added!',
      );
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }

  public remove(name: string): void {
    const index = this.data.findIndex((user) => user.name === name);

    if (index !== -1) {
      this.data.splice(index, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    }
  }

  public edit(currentName: string, newData: User): void {
    const user = this.data.find((u) => u.name === currentName);

    if (user) {
      if (newData.name.length > 0 && newData.age > 0) {
        user.name = newData.name;
        user.age = newData.age;
        Message.showColorized(
          MessageVariant.Success,
          `User updated! Now: ${user.name}, ${user.age}`,
        );
      } else {
        Message.showColorized(MessageVariant.Error, 'Wrong new data');
      }
    } else {
      Message.showColorized(
        MessageVariant.Error,
        'User not found for editing...',
      );
    }
  }
}

const users = new UsersData();
console.log('\n');
console.log('???? Welcome to the UsersApp!');
console.log('====================================');
Message.showColorized(MessageVariant.Info, 'Available actions');
console.log('\n');
console.log('list – show all users');
console.log('add – add new user to the list');
console.log('remove – remove user from the list');
console.log('quit – quit the app');
console.log('\n');

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit',
  Edit = 'edit',
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
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
            {
              name: 'age',
              type: 'number',
              message: 'Enter age',
            },
          ]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([
            {
              name: 'name',
              type: 'input',
              message: 'Enter name',
            },
          ]);
          users.remove(name.name);
          break;
        case Action.Edit:
          const toEdit = await inquirer.prompt([
            {
              name: 'currentName',
              type: 'input',
              message: 'Which user do you want to edit (enter current name)?',
            },
            { name: 'name', type: 'input', message: 'Enter NEW name' },
            {
              name: 'age',
              type: 'number',
              message: 'Enter NEW age',
            },
          ]);
          users.edit(toEdit.currentName, {
            name: toEdit.name,
            age: toEdit.age,
          });
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, 'Bye bye!');
          return;
        default:
          Message.showColorized(MessageVariant.Error, 'Command not found...');
      }
      startApp();
    });
};

startApp();
