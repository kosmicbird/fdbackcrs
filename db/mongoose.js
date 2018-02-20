const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/React'/*, {
    useMongoClient: true
}*/);


module.exports = {
    mongoose
};

