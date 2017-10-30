let mongoose = require('mongoose')
let Schema = mongoose.Schema 
let ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/library');
 
var transactionsSchema = new Schema({
    member    	: [{type:Schema.Types.ObjectId,ref:'Customers'}],
    days      	: Number,
    out_date    : Date,
    due_date	: Date,
    in_date		: Date,
    fine		: Number,
    booklist	: [{type:Schema.Types.ObjectId,ref:'Books'}]
});
var Transactions = mongoose.model('Transactions', transactionsSchema);
module.exports = Transactions