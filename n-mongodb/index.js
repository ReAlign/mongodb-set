const MongoClient = require('mongodb').MongoClient;
const dbName = 'REALIGN_1';
const urlBase = 'mongodb://localhost:27017';
const url = `${urlBase}/${dbName}`;

MongoClient.connect(url, (err, db) => {
  if(err) {
        throw err;
    }
    const dbo = db.db(dbName);
    dbo.collection(dbName).find({}).toArray((err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        db.close();
    });
});