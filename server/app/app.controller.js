const appSvc = require("./app.service");

class AppController{
    create = async (req, res, next)=>{
        try{
            let payload = req.body;
            let response = await appSvc.createTask(payload);

            res.json({
                result: response,
                message: "Task Created Successfully",
                meta: null
            })
        }
        catch(except){
            console.log("appCtrl.create: ", except);
            next(except);
        }
    }

    listAll = async(req, res, next)=>{
        try{
            let filter = {};
            if(req.query['search']){
                filter = {
                    ...filter,
                    $or: [
                        {
                            task: new RegExp(req.query['search'], 'i')
                        },
                        {
                            assignedTo: new RegExp(req.query['search'], 'i')
                        },
                        {
                            priority: new RegExp(req.query['search'], 'i')
                        },
                        {
                            status: new RegExp(req.query['search'], 'i')
                        },
                    ]
                }
            }
            const response = await appSvc.readTasks(filter);
            res.json({
                result: response,
                message: "Requested tasks fetched",
                meta: null
            })
        }
        catch(except){
            console.log("appCtrl.listAll: ", except);
            next(except);
        }
    }

    taskDetail = async (req, res, next)=>{
        try{
            const response = await appSvc.getById(req.params.id);
            if(response){
                res.json({
                    result: response,
                    message: "Task Detail fetched",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "No such tasks available" })
            }
        }
        catch(except){
            console.log("appCtrl.taskDetail: ", except);
            next(except);
        }
    }

    deleteTask = async (req, res, next)=>{
        try{
            const response = await appSvc.deleteById(req.params.id);
            if(response){
                res.json({
                    result: null,
                    message: "Task Deleted",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "No such tasks available" })
            }
        }
        catch(except){
            console.log("appCtrl.deleteTask: ", except);
            next(except);
        }
    }

    updateTask = async (req, res, next)=>{
        try{
            const data = req.body;
            const oldData = await appSvc.updateById(req.params.id, data);
            res.json({
                result: {
                    oldData: oldData
                },
                message: "Task Updated",
                meta: null
            })
        }
        catch(except){
            console.log("appCtrl.deleteTask: ", except);
            next(except);
        }
    }
}

const appCtrl = new AppController();
module.exports = appCtrl