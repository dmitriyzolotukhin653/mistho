import express from 'express';
import puppeteer from 'puppeteer';

const url = 'https://www.economist.com';

interface INews {
  title: string;
  img: string;
  description: string;
  link: string;
}

class NewsControleer {
  async fetchNews(_: any, res: express.Response): Promise<void> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('a[data-analytics^="top_stories:headline_"]');

      const news = await page.evaluate(() => {
        const newsList: INews[] = [];

        document.querySelectorAll('a[data-analytics^="top_stories:headline_"]').forEach((el) => {
          const title = el.textContent || '';
          const description = el.parentElement?.nextElementSibling?.textContent || '';
          const img = el?.parentElement?.parentElement?.querySelector('img')?.src || '';
          const link = el?.getAttribute('href')?.replace('https://www.economist.com', '') || '';
          newsList.push({ title, description, img, link });
        });

        document.querySelectorAll('a[data-analytics^="topical_content_1:headline_"]').forEach((el) => {
          const title = el.textContent || '';
          const description = el.parentElement?.nextElementSibling?.textContent || '';
          const img = el?.parentElement?.parentElement?.querySelector('img')?.src || '';
          const link = el?.getAttribute('href')?.replace('https://www.economist.com', '') || '';
          newsList.push({ title, description, img, link });
        });

        return newsList;
      });

      await browser.close();
      res.json({ news });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async fetchSingleNews(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { link } = req.query;

      if (!link) {
        res.status(500).json({ message: 'link not valid' });
        return;
      }

      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.goto(url + link, { waitUntil: 'networkidle2' });
      await page.waitForSelector('#content');

      const textNews = await page.evaluate(() => {
        const text: string[] = [];
        document.querySelectorAll('.article__body-text').forEach((el) => {
          text.push(el.textContent || '');
        });
        return text;
      });
      await browser.close();
      res.json({ textNews });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export const NewsCtrl = new NewsControleer();
