import config from '../fraemwork/config'

const request = require('supertest')

describe('Тестирование сервиса Petstore', () => {
  it('Создание нового пользователя', async () => {
    const response = await request(config.baseUrl)
      .post('/user')
      .set('Accept', 'application/json')
      .send(config.credentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('code', 200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('Логин пользователя', async () => {
    const response = await request(config.baseUrl)
      .get('/user/login')
      .send(`username = ${config.credentials.username}`)
      .send(`password = ${config.credentials.password}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('code', 200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('Изменение данных о пользователе', async () => {
    const personCredentials = config.credentials
    personCredentials.firstName = 'Fedor'
    personCredentials.lastName = 'Petrov'

    const response = await request(config.baseUrl)
      .put(`/user/${config.credentials.username}`)
      .set('Accept', 'application/json')
      .send(personCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('code', 200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  }, 3000)

  it('Разлогин', async () => {
    const response = await request(config.baseUrl)
      .get('/user/logout')
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('code', 200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('message', expect.any(String))
  })

  it('Удаление пользователя', async () => {
    const response = await request(config.baseUrl)
      .delete(`/user/${config.credentials.username}`)
      .set('Accept', 'application/json')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('code', 200)
    expect(response.body).toHaveProperty('type', expect.any(String))
    expect(response.body).toHaveProperty('message', config.credentials.username)
  })
})
