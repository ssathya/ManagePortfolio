var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FirmSchema = Schema({
    Symbol: { type: String, index: true, unique: true },
    Name: { type: String, index: true },
    IPOYear: Number,
    Sector: String,
    Industry: String
},
    { collection: 'Firms' }
);
module.exports=mongoose.model('Firm',FirmSchema);