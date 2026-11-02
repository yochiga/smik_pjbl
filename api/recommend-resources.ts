import app from '../src/server/app.ts';

export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.includes('recommend-resources')) {
    req.url = '/api/recommend-resources';
  }
  return app(req, res);
}
