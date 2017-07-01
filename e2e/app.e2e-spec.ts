import { RealTimeChatClientPage } from './app.po';

describe('real-time-chat-client App', () => {
  let page: RealTimeChatClientPage;

  beforeEach(() => {
    page = new RealTimeChatClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
