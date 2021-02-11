var express = require('express');
var router = express.Router();

// TODO: Template literal for router.get for company specific requests
router.get('/fresh', async (req, res, next) => {
  const month = [
    "01", "02", "03", "04",
    "05", "06", "07", "08",
    "09", "10", "11", "12",
  ]
  // yyyymmdd date converter
  var date = new Date();
  var dateString = date.toDateString();
  var dateArray = dateString.split(" ");
  var monthIndex = date.getMonth()
  var yyyymmdd = dateArray[3] + "-" + month[monthIndex] + "-" + dateArray[2]

  //connect to the database
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://hiring_spree_db_user:hiring_spree_db_pass@hiringspree.ykvou.mongodb.net/hiring_spree_db?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });


  try {
    await client.connect(async err => {
      const collection = await client.db("hiring_spree_db").collection("companydatas");
      var docs = await collection.find({
        "date": {$gte: yyyymmdd},
      }).toArray();
      let data = await JSON.stringify(docs);
      await res.send(data);
      await client.close();
      });
  } catch (err) {
    res.send({ message: err });
  }
});


module.exports = router;
