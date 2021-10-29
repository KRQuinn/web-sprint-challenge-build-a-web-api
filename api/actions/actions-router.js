// Write your "actions" router here!
const router = require("express").Router()

const Actions = require('./actions-model')

const { 
    validateUserId, 
    validatePost, 
} = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get(req.params.id)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.action)
})

router.post('/', validatePost, (req, res, next) => {
    Actions.insert(req.body)
    .then((action) => {
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validatePost, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})
  
router.delete('/:id', validateUserId, (req, res, next) => {
    Actions.get(req.params.id)
    .then((action) => {
        Actions.remove(req.params.id).then(() => {
          res.status(200).json(action)
        })
    })
    .catch(next)
})

//eslint-disable-next-line
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'This server will self destruct in 5 seconds. Have a nice day!',
      message: err.message,
    })
  })
module.exports = router