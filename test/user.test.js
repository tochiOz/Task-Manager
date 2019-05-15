const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: "Test Origin",
    email: "origin@origin.com",
    password: "nukau67a"
}

beforeEach( async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('create new user', async () => {
    await request(app).post('/user/create').send({
        name: 'Test',
        email: 'test@test.com',
        password: 'test39988rd'
    }).expect(201)
})