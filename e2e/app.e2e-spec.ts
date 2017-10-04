import { CinReportPage } from './app.po';

describe('cin-report App', () => {
  let page: CinReportPage;

  beforeEach(() => {
    page = new CinReportPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
