/**
 * Created by navina on 27/9/16.
 */
var mongoose=require('mongoose');
var Project=mongoose.model('Project');

exports.create=function (req,res) {
    res.render('project-add', {
        title: 'Create Project',
        buttonText: "Create!"
    });

};
exports.doCreate=function (req,res) {


    Project.create({
        projectName: req.body.ProjectName,
        modifiedOn : Date.now(),
        createdBy:req.session.user._id,
        contributors:req.body.contributors,
        tasks:req.body.task
    }, function( err, project ){
        if(err){
            console.log(err);
            if(err.code===11000){
                res.redirect( '/views/new?exists=true' );
            }else{
                res.redirect('/?error=true');
            }
        }else{
            // Success
            console.log("Project created and saved: " + project);

            res.redirect( '/user' );
        }


    });

};










// GET Projects by UserID
exports.byUser = function (req, res) {
    console.log("Getting user projects");
    if (req.params.userid){
        Project.findByUserID(
            req.params.userid,
            function (err, projects) {
                if(!err){
                    console.log(projects);
                    res.json(projects);
                }else{
                    console.log(err);
                    res.json({"status":"error", "error":"Error finding projects"});
                    }
                })
    }else{
        console.log("No user id supplied");
        res.json({"status":"error", "error":"No user id supplied"});
    }
};