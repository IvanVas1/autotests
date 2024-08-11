import {
  createBook,
  generateToken,
  getBook,
  updateBook,
  deleteBook,
} from '../src/book-store'
import config from '../framework/config'

let token

describe('Authorized', () => {
  beforeAll(async () => {
    const response = await generateToken(config.userName, config.password)
    token = response.body.token
  })

  it('Create Book', async () => {
    const response = await createBook(token)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('books', expect.any(Array))
  })

  it('Get Book information', async () => {
    const response = await getBook(config.testIsbn)

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      isbn: config.testIsbn,
      title: expect.any(String),
      subTitle: expect.any(String),
      author: expect.any(String),
      publish_date: expect.any(String),
      publisher: expect.any(String),
      pages: expect.any(Number),
      description: expect.any(String),
    })
  })

  it('Update Book', async () => {
    const response = await updateBook(token, config.testIsbn)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('userId', config.userId)
    expect(response.body).toHaveProperty('username', config.userName)
    expect(response.body.books.length).toBeGreaterThan(0)
  })

  it('Delete Book', async () => {
    const response = await deleteBook(token)

    expect(response.status).toBe(204)
  })
})
