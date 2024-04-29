import puppeteer, { Browser, Page } from 'puppeteer';

import PuppeteerBrowser from './browser';

describe('Browser', () => {
  test('should return new instance if it is currently not initiated', async () => {
    const launchSpy = jest.spyOn(puppeteer, 'launch');

    await PuppeteerBrowser.getInstance();

    expect(launchSpy).toHaveBeenCalledTimes(1);
  });

  test('should not create a new instance if there is one already created', async () => {
    const launchSpy = jest.spyOn(puppeteer, 'launch');

    await PuppeteerBrowser.getInstance();
    await PuppeteerBrowser.getInstance();

    expect(launchSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a new page if queue is empty', async () => {
    const browserMock = {
      newPage: (): Promise<Page> => Promise.resolve({} as Page)
    } as Browser;

    jest.spyOn(PuppeteerBrowser, 'getInstance').mockReturnValueOnce(Promise.resolve(browserMock));

    const newPageSpy = jest.spyOn(browserMock, 'newPage');

    await PuppeteerBrowser.getPage();

    expect(newPageSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a page from the queue', async () => {
    const browserMock = {
      newPage: (): Promise<Page> => Promise.resolve({} as Page)
    } as Browser;

    jest.spyOn(PuppeteerBrowser, 'getInstance').mockReturnValueOnce(Promise.resolve(browserMock));

    const newPageSpy = jest.spyOn(browserMock, 'newPage');
    const page = await PuppeteerBrowser.getPage();

    await PuppeteerBrowser.releasePage(page);
    await PuppeteerBrowser.getPage();

    expect(newPageSpy).toHaveBeenCalledTimes(1);
    expect(PuppeteerBrowser.getQueueSize()).toBe(0);
  });

  test('should add page back to the queue after release', async () => {
    const browserMock = {
      newPage: (): Promise<Page> => Promise.resolve({} as Page)
    } as Browser;

    jest.spyOn(PuppeteerBrowser, 'getInstance').mockReturnValueOnce(Promise.resolve(browserMock));

    const newPageSpy = jest.spyOn(browserMock, 'newPage');
    const page = await PuppeteerBrowser.getPage();

    await PuppeteerBrowser.releasePage(page);

    expect(newPageSpy).toHaveBeenCalledTimes(1);
    expect(PuppeteerBrowser.getQueueSize()).toBe(1);
  });
});
