import chalk from "chalk";

export const connect = async (client, dbName) => {
    // Using connect to connect to server
    await client.connect();
    // console.log('Connected successfully to server.');

    const db = client.db(dbName);
    const collection = db.collection('books')

    return collection;
}

export const insertBooksHelper = async (collection, insertObject) => {
    const insertResult = await collection.insertOne(insertObject);

    if (insertResult.acknowledged === false) {
        return console.log(chalk.red('There was some problem inserting. Please try again! '));
    }
    console.log(chalk.green('Successfully inserted books! ⭐'));
}

export const findBooksHelper = async (collection, authorName) => {
    if (authorName.length === 0) {
        const allBooks = await collection.find({}).toArray();

        if (allBooks.length === 0) {
            return console.log(chalk.bold('No books added till now! 😶‍🌫️'))
        }

        let i = 1;
        allBooks.forEach(book => {
            console.log(i++ + '. ' + chalk.yellow(book.name) + ' by ' + chalk.blueBright(book.author));
        });
    } else {
        const books = await collection.find({author: authorName}).toArray();

        console.log(chalk.bold(authorName));
        if (books.length === 0) {
            return console.log(chalk.bold('No books of the given author exist. 🥱'))
        }
        let i = 1;
        books.forEach(book => {
            console.log(i++ + '. ' + chalk.yellow(book.name));
        });
    }   
}

export const updateBooksHelper = async (collection, finderOptions, updateOptions) => {
    const updateResult = await collection.updateOne(finderOptions, {$set: updateOptions});

    if (updateResult.modifiedCount === 0) {
        return console.log(chalk.blueBright('No such Author and Book pair found. 😐'));
    }
    console.log(chalk.greenBright('Updated Successfully! 😀'))
}

export const deleteBooksHelper = async (collection, options) => {
    const deleteResult = await collection.deleteMany(options);
    
    if (deleteResult.deletedCount === 0) {
        return console.log(chalk.red('No such Author and Book pair found! 😐'));
    }
    console.log(chalk.green('Deleted Successfully! ❌'))
}