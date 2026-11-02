import app from '../src/server/app.ts';

export default function handler(req: any, res: any) {
  if (!req.url || req.url === '/' || !req.url.includes('ai-chat')) {
    req.url = '/api/ai-chat';
  }
  return app(req, res);
}
