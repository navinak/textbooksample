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


// GET project info
exports.displayInfo = function(req, res) {
    console.log("Finding project _id: " + req.params.id);
    if (req.session.loggedIn !== "true"){
        res.redirect('/login');
    }
    else {
        if (req.params.id) {
            Project.findById( req.params.id, function(err,project) {
                if(err){
                    console.log(err);
                    res.redirect('/user?404=project');
                }else{
                    console.log(project);
                    res.render('project-page', {
                        title: project.projectName,
                        projectName: project.projectName,
                        tasks: project.tasks,
                        createdBy: project.createdBy,
                        contributors:project.contributors,
                        projectID: req.params.id
                    });
                }
            });
        }else{
            res.redirect('/user');
        }
    }
};


// GET Project edit form
exports.edit = function(req, res){
    console.log("Finding project _id: " + req.params.id);
    if (req.session.loggedIn !== "true"){
        res.redirect('/login');
    }else{
        if (req.params.id) {
            Project.findById( req.params.id, function(err,project) {
                if(err){
                    console.log(err);
                    res.redirect('/user?404=project');
                }else{
                    console.log(project);
                    res.render('project-edit', {
                        id:req.params.id,
                        title: project.projectName,
                        projectName: project.projectName,
                        tasks: project.tasks,
                        createdBy: project.createdBy,
                        contributors:project.contributors,
                        projectID: req.params.id
                    });
                }
            });
        }else{
            res.redirect('/user');
        }
    }
};




exports.doEdit = function(req, res) {
    if (req.session.user._id) {
        Project.findById( req.params.id,
            function (err, project) {

                doEditSave (req, res, err, project);
            }
        );
    }
};
var doEditSave = function(req, res, err, project) {
    if(err){
        console.log(err);
        res.redirect( '/user?error=finding');
    } else {
        console.log("elseloop"+req.body.ProjectName);
        project.projectName = req.body.ProjectName;
        project.contributors = req.body.contributors;
        project.tasks = req.body.task;
        project.save(
            function (err, project) {
                onEditSave (req, res, err, project);
            }
        );
    }
};
var onEditSave = function (req, res, err, project) {
    if(err){
        console.log(err);
        res.redirect( '/user?error=saving');
    } else {
        console.log('User updated: ' + req.body.FullName);
        req.session.user.name = req.body.FullName;
        req.session.user.email = req.body.Email;
        res.redirect( '/project/'+project._id );
    }
};
