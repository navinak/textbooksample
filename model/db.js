/**
 * Created by navina on 27/9/16.
 */
//Bring mongoose into project

var mongoose=require("mongoose");

//build connection string
var dbURI='mongodb://localhost/MongoosePM';

// Create the database connection
mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique:true},
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date
});
mongoose.model( 'User', userSchema );

var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});

mongoose.model( 'Project', projectSchema );

