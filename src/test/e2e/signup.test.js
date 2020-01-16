import puppeteer from 'puppeteer';
import {
  createEmailAddress,
  testFirstName,
  testLastName,
  testPassword
} from './utils/formUtils';

describe('Auth - Registration Page', () => {
  test('Fill out and submit form', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowmo: 10000
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/signup');
    const heading = await page.$eval('#form-heading', e => e.innerHTML);
    const subheading = await page.$eval('#form-subheading', e => e.innerHTML);
    expect(heading).toBe('Register Now');
    expect(subheading).toBe(
      'Save your favorite beats, get in touch with me faster, and more when you register!'
    );
    await page.type('#form-firstName', testFirstName);
    await page.type('#form-lastName', testLastName);
    await page.type('#form-lastName', createEmailAddress());
    await page.type('#form-password', testPassword);
    await page.click('#form-submit');
    browser.close();
  });
});
