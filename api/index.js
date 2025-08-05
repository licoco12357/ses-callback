export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = await req.body;
      console.log('收到腾讯云 SES 回调：', body);

      res.status(200).json({
        code: 0,
        message: 'Callback received successfully'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error processing callback' });
    }
  } else {
    res.status(200).send('腾讯云 SES 回调服务运行中');
  }
}
