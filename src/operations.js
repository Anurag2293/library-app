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
        return console.log('There was some problem inserting. Please try again! ')
    }
    console.log('Successfully inserted books! ⭐');
}

export const findBooksHelper = async (collection, authorName) => {
    if (authorName.length === 0) {
        const allBooks = await collection.find({}).toArray();

        if (allBooks.length === 0) {
            return console.log('No books added till now! 😶‍🌫️')
        }

        let i = 1;
        allBooks.forEach(book => {
            console.log(i++ + '. ' + book.name + ' by ' + book.author);
        });
    } else {
        const books = await collection.find({author: authorName}).toArray();

        if (books.length === 0) {
            return console.log('No books of the given author exist. 🥱')
        }
        let i = 1;
        books.forEach(book => {
            console.log(i++ + '. ' + book.name);
        });
    }   
}

export const updateBooksHelper = async (collection, finderOptions, updateOptions) => {
    const updateResult = await collection.updateOne(finderOptions, {$set: updateOptions});

    if (updateResult.modifiedCount === 0) {
        return console.log('No such Author and Book pair found. 😐');
    }
    console.log('Updated Successfully! 😀')
}

export const deleteBooksHelper = async (collection, options) => {
    const deleteResult = await collection.deleteMany(options);
    
    if (deleteResult.deletedCount === 0) {
        return console.log('No such Author and Book pair found! 😐');
    }
    console.log('Deleted Successfully! ❌')
}