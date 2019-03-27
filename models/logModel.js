const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LogsSchema = new Schema({
    http_req: {type: Number,default:0}
});
module.exports = mongoose.model('Logs', LogsSchema);