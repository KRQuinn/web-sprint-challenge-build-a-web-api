// Write your "projects" router here!

const express = require ('express')
const { validateUserId } = require('./projects-middleware')

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

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'Internal Server Errors, First World Problems, ammiright???',
      message: err.message,
    })
  })
  module.exports = router