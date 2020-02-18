import { TodolistUiNgPage } from './app.po';

describe('todolist-ui-ng App', function() {
  let page: TodolistUiNgPage;

  beforeEach(() => {
    page = new TodolistUiNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('td works!');
  });
});
