var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var holdingTypes=['Equities','Fixed Income','Government Bonds', 'Corporate Bonds', 'Convertibles','Options']
var HoldingsSchema = Schema(
    {
        holdingType:{type: String, enum:holdingTypes, default:'Equities'},
        ticker:{type:String, required:true},
        name:{type:String},
        createDate:{type: Date, default:Date.now()},
        modifiedDate:{type:Date},
        inactivatedDate:{type:Date}
    }
);