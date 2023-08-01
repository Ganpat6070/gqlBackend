import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const QuoteSchema = mongoose.model('Quotes', quoteSchema);
export default QuoteSchema