// add middlewares here related to projects
const Projects = require('./projects-model')

function validateUserId(req, res, next) {
    const { id } = req.params
    Projects.get(id)
        .then((project) => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({
                    message: 'user not found',
                })
            }
        })
}

module.exports = {
    validateUserId,
}