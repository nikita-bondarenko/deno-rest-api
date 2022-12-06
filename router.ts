import { Router} from "https://deno.land/x/oak/mod.ts";
import {getUser, getUsers, addUser, editUser, removeUser} from './controller.ts'
const router = new Router()

router
    .get('/api/users',getUsers )
    .get('/api/users/:id', getUser)
    .post('/api/users', addUser)
    .put('/api/users/:id',editUser)
    .delete('/api/users/:id',removeUser)

export {router}