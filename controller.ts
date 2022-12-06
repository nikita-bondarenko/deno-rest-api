import {Context, User} from "./types.ts";
import {
    v1
} from "https://deno.land/std@0.167.0/uuid/mod.ts";

let users: User[] = [
    {id: '1', name: 'nikita'},
    {id: '2', name: 'eva'},
    {id: '3', name: 'aruna'}

]

export const getUsers = ({response}: Context) => {
    response.status = 200
    response.body = {users}
}

export const getUser = ({response, params}: Context) => {
    const user: User | undefined = users.find(u => u.id === params.id)

    if (user) {
        response.status = 200
        response.body = {user}
    } else {
        response.status = 404
        response.body = { message: "User not found"}
    }

}

export const addUser = async ({response, request}: Context) => {
    const body = await request.body()
    if (!request.hasBody) {
        response.status = 404
        response.body = { message: "Invalid data"}
    } else {
        console.log(body.value)
        const user: User = await body.value
        user.id =v1.generate()
        users.push(user)
        response.status = 201
        response.body = {user}
    }
}

export const editUser =  async ({response, request, params}: Context) => {
    const user: User | undefined = users.find(item => item.id === params.id)
    if (user) {
        const body = await request.body().value
        users = users.map(user => user.id === params.id ? {...user, ...body} : user)
        response.status = 201
        response.body = { users}
    } else {
        response.status = 404
        response.body = { message: "User not found"}
    }
}

export const removeUser =  async ({response, params}: Context) => {
    const user: User | undefined = users.find(item => item.id === params.id)
    if (user) {
        users = users.filter(user => user.id !== params.id)
        response.status = 200
        response.body = { users}
    } else {
        response.status = 404
        response.body = { message: "User not found"}
    }
}