const database = {
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/fcc-pinterestclone-app'
  }
};

module.exports = database;
