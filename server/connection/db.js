const mongoose = require('mongoose')


const connectDB = async()=>{
    try{
const con = await mongoose.connect("mongodb+srv://admin:admin123@cluster0.uarbe.mongodb.net/messages?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
console.log('connection')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
} 
 

module.exports = connectDB 