import express from 'express'
import config from '../config'
import frontend from './frontend'


const port = config.port || 8000
const app = express()

app.use(express.static('app/assets'))
app.use('/build', express.static('build'))
app.use(frontend)

app.listen(port, (error) => {
  error
    ? console.log('Error starting server: ', error) //eslint-disable-line no-console
    : console.log(`Discgolf server started at http://${config.host}:${port}`) //eslint-disable-line no-console
})
