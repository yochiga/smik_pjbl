import app from '../src/server/app.ts';

export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.includes('generate-project')) {
    req.url = '/api/generate-project';
  }
  return app(req, res);
}
