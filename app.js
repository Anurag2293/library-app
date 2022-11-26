import readline from 'readline-sync';
import chalk from 'chalk';
import { insertBooks, findBooks, updateBooks, deleteBooks } from "./src/database.js";

const print = console.log;

async function main () {
    print(' ------------------------------------------------------')
    print('|' + chalk.bold('Welcome to Library!') + '                                   |')
    print('|Input following numbers for the corresponding options |')
    print('|and 5 to exit.                                        |')
    print('|1 : Add a new book                                    |')
    print('|2 : List books                                        |')
    print('|3 : Update a book                                     |')
    print('|4 : Delete a book                                     |')
    print(' ------------------------------------------------------')

    let input = Number(readline.question())

    switch (input) {
        case 1:
            await insertBooks();
            break;
        case 2:
            await findBooks();
            break;
        case 3:
            await updateBooks();
            break;
        case 4:
            await deleteBooks();
            break;
        default:
            return false;
    }
    return true;
}

while (true) {
    try {
        const result = await main();
        if (result === false) {
            break;
        }
    } catch(e) {
        console.log(e);
    }
}