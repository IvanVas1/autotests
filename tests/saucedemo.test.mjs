import { test, expect } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

const baseUrl = 'https://www.saucedemo.com/'
const userName = process.env.TEST_SAUCDEMO_USERNAME
const password = process.env.TEST_SAUCDEMO_PASSWORD

async function login(page, userName, password) {
  await page.goto(baseUrl)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await page.locator('[data-test="username"]').click()
  await page.locator('[data-test="username"]').fill(userName)
  await page.locator('[data-test="password"]').click()
  await page.locator('[data-test="password"]').fill(password)
  await page.locator('[data-test="login-button"]').click()
}

test('Проверка авторизации', async ({ page }) => {
  await login(page, userName, password)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Products')).toBeVisible()
})

test('Добавления и удаления товара товара из корзины', async ({ page }) => {
  await login(page, userName, password)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Products')).toBeVisible()

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
    'Sauce Labs Backpack',
  )

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
  await expect(
    page.locator('[data-test="inventory-item-name"]'),
  ).not.toBeVisible()
})

test('Переход в карточку товара из корзины', async ({ page }) => {
  await login(page, userName, password)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Products')).toBeVisible()

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible()

  await page.locator('[data-test="item-4-title-link"]').click()
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible()
  await expect(page.locator('[data-test="inventory-item-desc"]')).toBeVisible()
  await expect(page.locator('[data-test="remove"]')).toBeVisible()
  await expect(
    page.locator('[data-test="item-sauce-labs-backpack-img"]'),
  ).toBeVisible()
})

test('Удаление товара из корзины из карточки товара', async ({ page }) => {
  await login(page, userName, password)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Products')).toBeVisible()

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible()

  await page.locator('[data-test="item-4-title-link"]').click()
  await expect(
    page.locator('[data-test="item-sauce-labs-backpack-img"]'),
  ).toBeVisible()
  await page.locator('[data-test="remove"]').click()
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()

  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(
    page.locator('[data-test="item-4-title-link"]'),
  ).not.toBeVisible()
})

test('Оформление заказа', async ({ page }) => {
  await login(page, userName, password)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Products')).toBeVisible()

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

  await page.locator('[data-test="shopping-cart-link"]').click()
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible()
  await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible()

  await page.locator('[data-test="checkout"]').click()
  await expect(page.locator('[data-test="title"]')).toHaveText(
    'Checkout: Your Information',
  )
  await expect(page.locator('[data-test="firstName"]')).toBeVisible()
  await expect(page.locator('[data-test="lastName"]')).toBeVisible()
  await expect(page.locator('[data-test="postalCode"]')).toBeVisible()

  await page.locator('[data-test="firstName"]').fill('Ivan')
  await page.locator('[data-test="lastName"]').fill('Ivanov')
  await page.locator('[data-test="postalCode"]').fill('111')

  await page.locator('[data-test="continue"]').click()
  await expect(page.locator('[data-test="title"]')).toHaveText(
    'Checkout: Overview',
  )
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible()
  await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible()
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible()
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible()
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible()
  await expect(page.locator('[data-test="total-label"]')).toBeVisible()

  await page.locator('[data-test="finish"]').click()

  await expect(page.locator('[data-test="title"]')).toHaveText(
    'Checkout: Complete!',
  )
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible()
  await expect(page.locator('[data-test="complete-text"]')).toBeVisible()
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
})
