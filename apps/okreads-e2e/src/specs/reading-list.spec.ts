import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {

  const common = async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    
    const readingListItems = await $$('.reading-list-item');
    readingListItems.length>0 ? readingListItems.forEach(item => item.$$('.remove').click())
    :null;
  }

  beforeAll(async () => {
    common();
  })

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  })

  afterAll(async () => {
    common();
  })

  it('Then: I should see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should be able to add books to the reading list and should be able to mark the book as finished reading', async () => {
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    let items = await $$('[data-testing="book-item"]');
    items[0].$('button').click();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    let readingListItems = await $$('.reading-list-item');

    //should have the book recently added into the reading list
    expect(readingListItems.length).toBe(1);

    await readingListItems[0].$('.finished').click();

    //should see the book finished date once marked as finished
    expect(readingListItems[0].$('.finished-date')).toBeDefined();

    items = await $$('[data-testing="book-item"]');
    const button = await items[0].$('button')

    //Book marked as finished in reading list should change the book in the search list's button text as Finished
    expect(button.getText()).toBe('Finished');
  });

});