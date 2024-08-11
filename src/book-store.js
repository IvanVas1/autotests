import supertest from 'supertest'
import config from '../framework/config'

const generateToken = async (userName, password) => {
  const response = await supertest(config.baseUrl)
    .post('/Account/v1/GenerateToken')
    .send({
      userName,
      password,
    })
  return response
}

const createBook = async token => {
  const response = await supertest(config.baseUrl)
    .post('/BookStore/v1/Books')
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId: config.userId,
      collectionOfIsbns: [
        {
          isbn: config.testIsbn,
        },
      ],
    })
  return response
}

const getBook = async ISBN => {
  const response = await supertest(config.baseUrl)
    .get('/BookStore/v1/Book')
    .query({ ISBN: `${ISBN}` })
  return response
}

const updateBook = async (token, ISBN) => {
  const response = await supertest(config.baseUrl)
    .put(`/BookStore/v1/Books/${ISBN}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId: config.userId,
      isbn: config.testIsbn2,
    })
  return response
}

const deleteBook = async token => {
  const response = await supertest(config.baseUrl)
    .delete('/BookStore/v1/Book')
    .set('Authorization', `Bearer ${token}`)
    .send({
      isbn: config.testIsbn2,
      userId: config.userId,
    })
  return response
}

export { createBook, generateToken, getBook, updateBook, deleteBook }
