const mongoose = require('mongoose');

async function Connect_DB(url) {
  await mongoose.connect(url);
}

module.exports={Connect_DB};