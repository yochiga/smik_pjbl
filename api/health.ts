import app from '../src/server/app.ts';

export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.includes('health')) {
    req.url = '/api/health';
  }
  return app(req, res);
}
