import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import {errorHandler,NotFoundError,currentUser} from '@azabticketing/common'
import cookieSession from 'cookie-session'
import {newOrderRouter} from './routers/new'
import {showOrderRouter} from './routers/show'
import {deleteOrderRouter} from './routers/delete'
import {indexOrderRouter} from './routers/index'

const app = express()
app.set('trust proxy',1)

app.use(json())
app.use(cookieSession({
    signed: false,
    secure:process.env.NODE_ENV!=="test"
}))
app.use(currentUser)

app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.all('*',async() => {throw new NotFoundError()})

app.use(errorHandler)

export {app}