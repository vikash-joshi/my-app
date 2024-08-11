const mongoose=require('mongoose');
const {Schema}=mongoose;
const EmailSchema=new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'Users' ,required:true },
    Subject:{
        type: String,
        required: true,
    },
    FromEmail: {
        type: String,
        required: true,
    },
    ToEmail: {
        type: String,
        required: true,
    },
    Body:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    }   ,
    SentAt: {
        type: Date
    }      
});


module.exports=mongoose.model('EmailLog',EmailSchema);