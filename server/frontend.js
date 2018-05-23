import express from 'express'
import render from './render'

const app = express()

app.get('*', render)

export default app
