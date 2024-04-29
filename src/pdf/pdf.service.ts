import PuppeteerBrowser from '../browser/browser';

export async function generatePdf(): Promise<Buffer> {
  const page = await PuppeteerBrowser.getPage();

  await Promise.all([
    page.setContent(`<span>Hello</span>`, { waitUntil: 'networkidle0' }),
    page.emulateMediaType('screen') 
  ]);

  const pdf = await page.pdf({
    format: 'a4',
    printBackground: true
  });

  PuppeteerBrowser.releasePage(page);

  return pdf;
}
