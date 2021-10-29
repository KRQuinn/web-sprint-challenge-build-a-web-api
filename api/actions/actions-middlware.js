// add middlewares here related to actions

const Actions = require('./actions-model')

function validateUserId(req, res, next) {
  const { id } = req.params
  Actions.get(id).then((action) => {
    if (action) {
      req.action = action
      next()
    } else {
      res.status(404).json({
        message: 'user not found',
      })
    }
  })
}

module.exports = { validateUserId }