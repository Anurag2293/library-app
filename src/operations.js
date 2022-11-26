export const connect = async (client, dbName) => {
    // Using connect to connect to server
    await client.connect();
    // console.log('Connected successfully to server.');

    const db = client.db(dbName);
    const collection = db.collection('books')

    return collection;
}

export const insertBooksHelper = async (collection, insertObject) => {
    const insertResult = await collection.insertOne(insertObject)    
    return insertResult.acknowledged === true;
}

export const findBooksHelper = async (collection, authorName) => {
    if (authorName.length === 0) {
        return await collection.find({}).toArray();
    }    
    const findResult = await collection.find({author: authorName}).toArray();
    return findResult;
}

export const updateBooksHelper = async (collection, finderOptions, updateOptions) => {
    const updateResult = await collection.updateOne(finderOptions, {$set: updateOptions});

    if (updateResult.modifiedCount === 0) {
        return console.log('No such Author and Book pair found 😐!');
    }
    console.log('Updated Successfully! 😀')
}

export const deleteBooksHelper = async (collection, options) => {
    const deleteResult = await collection.deleteMany(options);
    
    if (deleteResult.deletedCount === 0) {
        return console.log('No such Author and Book pair found 😐!');
    }
    console.log('Deleted Successfully! ☠️')
}