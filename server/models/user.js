const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3,'Name must be 3 to 40 characters long'],
        maxlength: [40,'Name must be 3 to 40 characters long']
    },
    userEmail: {
        type: String,
        required: [true,'Email is required'],
        unique: [true,'Email should be unique']
    },
    userMobile: {
        type: Number,
        required: [true,'Phone Number is required'],
        minlength: [10,'Phone Number must be 10 Digit long'],
        maxlength: [12,'Phone Number must be 10 Digit long'],
    },
    userPassword: {
        type: String,
        required: [true,'Password is required'],
        minlength: [8,'Password must be 8 Character Long'],
        maxlength: [1024,'Password must be 8 Character Long'],
    },
    userType: {
        type: String,
        enum : ['customer','admin'],
        required: [true,'User type is required'],
    },
    userStatus:{
        type: Boolean,
        default:true
    },
    lastLoginTime:{
        type:Date
    },
    userRole:{
        type : String,
        default : "customer"
    },
    confirmationStatus: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Active'
      },
    confirmationCode: { 
        type: String, 
        unique: true 
    },
},{
    timestamps: true
});

// hashing the password
saltSecret:String;
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(this.userPassword, salt, (err,hash) => {
            this.userPassword = hash;
            this.saltSecret = salt;
            next();
        })
    })
})

const User = mongoose.model('User',userSchema);