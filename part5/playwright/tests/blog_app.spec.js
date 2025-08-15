const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    // couldn't get server to work with start:test
    // await request.post('http://localhost:3003/api/testing/reset')
    // await request.post('http://localhost:3003/api/users', {
    //   data: {
    //     name: 'test name',
    //     username: 'test',
    //     password: '1234'
    //   }
    // })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('h1').filter({ hasText: 'Login'})).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('button').filter({ hasText: 'Login'}).click()

      await page.getByTestId('username').fill('danny fentyn')
      await page.getByTestId('password').fill('1234')
      await page.getByTestId('submitLogin').click()

      await expect(page.getByText('Signed in as danny fentyn')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('button').filter({ hasText: 'Login'}).click()

      await page.getByTestId('username').fill('joe rogan')
      await page.getByTestId('password').fill('1234')
      await page.getByTestId('submitLogin').click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.locator('button').filter({ hasText: 'Login'}).click()

    await page.getByTestId('username').fill('danny fentyn')
    await page.getByTestId('password').fill('1234')
    await page.getByTestId('submitLogin').click()
  })

  test('a new blog can be created', async ({ page }) => {
    // test fails because page needs to be refreshed before changing content for signed in user

    await page.getByTestId('toggleButton').click()

    await page.getByTestId('title').fill('test title')
    await page.getByTestId('author').fill('test author')
    await page.getByTestId('url').fill('http://testurl.com')
    await page.getByTestId('submitBlog').click()

    await expect(page.getByText('New blog "test title" by test author added!')).toBeVisible()
  })
})
})