const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const added_todos = Number(await redis.get('added_todos')) || 0
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  await redis.set('added_todos', added_todos + 1)
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await Todo.findByIdAndDelete(req.todo.id)
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const upatedTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {
    new: true,
  })
  res.send(upatedTodo) // Implement this
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
