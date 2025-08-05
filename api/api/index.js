export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let body = req.body;

      // Vercel 有时 req.body 是空，需要手动解析
      if (!body || typeof body === 'string') {
        const raw = await new Promise((resolve) => {
          let data = '';
          req.on('data', chunk => data += chunk);
          req.on('end', () => resolve(data));
        });
        body = JSON.parse(raw);
      }

      console.log('✅ 收到腾讯云 SES 回调数据:', body);

      res.status(200).json({
        code: 0,
        message: 'Callback received successfully'
      });
    } catch (err) {
      console.error('❌ 回调解析失败:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(200).send('腾讯云 SES 回调接口已启动');
  }
}
