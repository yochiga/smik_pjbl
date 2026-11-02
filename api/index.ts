import app from '../src/server/app.ts';

export default function handler(req: any, res: any) {
  const matched = (req.headers['x-matched-path'] as string) || (req.headers['x-forwarded-uri'] as string);
  if (matched && matched !== '/api' && matched !== '/') {
    req.url = matched;
  }
  return app(req, res);
}
