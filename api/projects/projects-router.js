// Write your "projects" router here!

const express = require ('express')
const { 
    validateUserId, 
    validatePost, 
    validatePostCompleted,
} = require('./projects-middleware')

const router = express.Router()

const Projects = require('./projects-model')

router.get('/', (req, res, next) => {
    const { id } = req.params
    Projects.get(id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch(next)
})

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.project)
})

router.post('/', validatePost, (req,res, next) => {
    Projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validatePostCompleted, async (req, res, next) => {
    const { id } = req.params
    try {
        await Projects.update(id, req.body)
        res.status(200).json(req.body)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateUserId, (req, res, next) => {
    const { id } = req.params
    Projects.get(id)
    .then((project) => {
        Projects.remove(id).then(() => {
            res.status(200).json(project)
        })
    })
    .catch(next)
})

router.get('/:id/actions', validateUserId, (req, res, next) => {
    const { id } = req.params
    Projects.getProjectActions(id)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'Internal Server Errors, First World Problems, ammiright???',
      message: err.message,
    })
  })
  module.exports = router