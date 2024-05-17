const express = require("express");
const router = express.Router();
const tasks = require("../data/tasks");

router.get('/', (req, res) => {
    console.log('tasks route');
    // res.json(tasks);
    res.render('index', { tasks });
  });
  
//   Render the form for creating new tasks
  router.get('/new', (req, res) => {
    res.render('create');
  });

  
// GET a specific task by id
// router.get('/:id', (req, res) => {
//     const task = tasks.find(task => task.id === parseInt(req.params.id));
//     res.render('update', { task });
//   });
  
  // POST create a new task
  router.post('/', (req, res) => {
    const { title, description, status, deadline } = req.body;
    const id = tasks.length + 1;
    const newTask = { id, title, description, status, deadline };
    tasks.push(newTask);
    res.redirect('/tasks');
  });
  
  // PUT update an existing task
  router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, status, deadline } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex] = { id, title, description, status, deadline };
    res.redirect('/tasks');
  });

  

  
  // DELETE a task
  router.delete('/:id', (req, res) => {
    console.log('delete');
    const id = parseInt(req.params.id);
    console.log(id);

    const task = tasks.find((p, i) => {
        if (p.id == req.params.id) {
          tasks.splice(i, 1);
          res.status(200);
          res.redirect('/tasks');
        }
    })


  });


module.exports = router;