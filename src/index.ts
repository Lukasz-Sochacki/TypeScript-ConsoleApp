const inquirer = require('inquirer');
import consola from 'consola';

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

// const msg = new Message('heLlo world!');
// msg.show(); // "heLlo world!"
// msg.capitalize();
// msg.show(); // "Hello world!"
// msg.toLowerCase();
// msg.show(); // "hello world!"
// msg.toUpperCase();
// msg.show(); // "HELLO WORLD!"
// Message.showColorized(MessageVariant.Success, 'Test'); // √ "Test"
// Message.showColorized(MessageVariant.Error, 'Test 2'); // "x Test 2"
// Message.showColorized(MessageVariant.Info, 'Test 3'); // ℹ "Test 3"

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
}

// const users = new UsersData();
// users.showAll();
// users.add({ name: 'Jan', age: 20 });
// users.add({ name: 'Adam', age: 30 });
// users.add({ name: 'Kasia', age: 23 });
// users.add({ name: 'Basia', age: -6 });
// users.showAll();
// users.remove('Maurycy');
// users.remove('Adam');
// users.showAll();

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
