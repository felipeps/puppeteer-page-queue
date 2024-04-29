import puppeteer, { Browser, Page } from 'puppeteer';

class PuppeteerBrowser {
  private static instance: Browser;
  private static pageQueue: Page[] = [];

  private constructor() {}

  public static async getInstance(): Promise<Browser> {
    if (!PuppeteerBrowser.instance) {
      PuppeteerBrowser.instance = await puppeteer.launch({
        pipe: true,
        headless: 'new',
        userDataDir: './tmp',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return PuppeteerBrowser.instance;
  }

  public static async getPage(): Promise<Page> {
    let page: Page;

    if (PuppeteerBrowser.pageQueue.length === 0) {
      console.log('No page available, launching new one.');
      const browser = await PuppeteerBrowser.getInstance();
      page = await browser.newPage();
    } else {
      console.log(`Using page from queue. Currently ${PuppeteerBrowser.pageQueue.length} pages on the queue.`);
      page = PuppeteerBrowser.pageQueue.shift();
    }

    return page;
  }

  public static getQueueSize(): number {
    return PuppeteerBrowser.pageQueue.length;
  }

  public static releasePage(page: Page): Promise<void> {
    PuppeteerBrowser.pageQueue.push(page);
    console.log(`Page released. Currently ${PuppeteerBrowser.pageQueue.length} pages on the queue.`);
    return Promise.resolve();
  }
}

export default PuppeteerBrowser;
