const appCtrl = require('./app.controller');

const router = require('express').Router();

router.route("/")
//to create a task
    .post(appCtrl.create)
//to list all task
    .get(appCtrl.listAll)

router.route("/:id")
//to get detail of one task
    .get(appCtrl.taskDetail)
//to delete specific task
    .delete(appCtrl.deleteTask)
//to update
    .put(appCtrl.updateTask)

module.exports = router