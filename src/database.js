// Core Modules
import { MongoClient } from 'mongodb';
import readline from 'readline-sync';
// Imported Modules
import { connect, insertBooksHelper, findBooksHelper, updateBooksHelper, deleteBooksHelper } from './operations.js';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'library';

export async function insertBooks () {
    console.log('Enter Book Name : ');
    const bookName = String(readline.question());
    console.log('Enter Author Name : ');
    const authorName = String(readline.question());

    try {
        const collection = await connect(client, dbName);
        await insertBooksHelper(collection, {name: bookName, author: authorName});
    } catch (e) {
        console.log(e)
    } finally {
        client.close()
    }
}

export async function findBooks () {
    console.log('Enter author name to find his books : ');
    console.log('Leave blank to list all books')
    const authorName = String(readline.question());

    try {
        const collection = await connect(client, dbName);
        await findBooksHelper(collection, authorName);       
    } catch (e) {
        console.log(e)
    } 
    finally {
        client.close();
    }
}

export async function updateBooks () {
    console.log('Update a pair of book and ')
    console.log('Enter author\'s old name :')
    const oldAuthorName = String(readline.question());

    console.log('Enter old book name :')
    const oldBookName = String(readline.question());

    console.log('Enter author\'s new name :')
    const newAuthorName = String(readline.question());

    console.log('Enter new book name :')
    const newBookName = String(readline.question());

    try {
        const collection = await connect(client, dbName);
        const oldOptions = {author: oldAuthorName, name: oldBookName};
        const newOptions = {author: newAuthorName, name: newBookName};
        await updateBooksHelper(collection, oldOptions, newOptions);
    } catch(e) {
        console.log(e);
    } 
    finally {
        client.close();
    }
}

export async function deleteBooks () {
    console.log('Delete a book with specified names.');
    console.log('Enter author\'s name :');
    const author = String(readline.question());
    console.log('Enter book name :');
    const name = String(readline.question());

    try {
        const collection = await connect(client, dbName);
        await deleteBooksHelper(collection, {author, name});
    } catch (e) {
        console.log(e)
    } 
    finally {
        client.close();
    }
}

/**
 * connect(client, dbName)
        .then(async (collection) => {
            const insertResult = await insertBooksHelper(collection, {
                name: bookName,
                author: authorName
            });
            
            if (insertResult === true) {
                return console.log('Inserted Book Successfully');
            }
            console.log('There was some error. Please try again.')
        })
        .catch(console.error)
        .finally(() => client.close());
 */