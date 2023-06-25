const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'socialCreditBot';
module.exports = async function updateSocialCredit(playerID, addedSocialCredit) {
  await client.connect();
  let socialCredit;
  const db = client.db(dbName);
  const collection = db.collection('socialCredit');


  const filteredDocs = await collection.find({playerID : playerID}).toArray();

  if(!filteredDocs[0]) {
    const insertResult = await collection.insertMany([{ playerID : playerID, socialCredit:1000}]);
    socialCredit = 1000;
  }else {
    socialCredit = filteredDocs[0].socialCredit;
  }
  socialCredit += addedSocialCredit;
  const updateResult = await collection.updateOne({ playerID: playerID }, { $set: {socialCredit : socialCredit} });
  return socialCredit;
}

// updateSocialCredit(1342, 100)
//     .catch(console.error)
//     .finally(() => client.close());
