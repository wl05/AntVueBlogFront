'use strict';
const nodemailer = require('nodemailer');

// success
exports.success = (ctx, result = null, message = 'Succeed') => {
  ctx.body = {
    code: 0,
    message,
    data: result,
  };
};

// error
exports.error = (ctx, code, message) => {
  ctx.body = {
    code,
    message,
  };
};


// get clien ip
exports.getIp = ctx => {
  return ctx.request.ip.replace(/::ffff:/, '');
};

exports.sendUserEmail = (ctx, toEmail) => {
  const expiraton = 1800;
  const code = require('crypto')
    .randomBytes(16)
    .toString('hex');
  ctx.app.redis.set(`${code}`, toEmail, 'EX', expiraton);
  const config_email = {
    host: 'smtp.qq.com',
    post: 25, // SMTP 端口
    // secureConnection: true, // 使用 SSL
    auth: {
      user: '2929712050@qq.com',
      // 这里密码不是qq密码，是你设置的smtp授权码
      pass: 'rdbbqlgolefhdecc',
    },
  };
  const transporter = nodemailer.createTransport(config_email);
  const html = '感谢您的注册，请点击下面的链接激活您的账号，如果链接在邮箱中打不开，您可以试试将其复制到浏览器地址栏中<div>' + ctx.app.config.baseUrl + '/activation?code=' + code + '&account=' + toEmail + '</div>';
  const data = {
    from: '2929712050@qq.com', // 发件地址
    to: toEmail, // 收件人
    subject: '注册激活-汪乐的个人网站', // 标题
    // text: html // 标题 //text和html两者只支持一种
    html, // html 内容
  };
  transporter.sendMail(data, function (err, info) {
    if (err) {
      return (err);
    }
    return (info.response);
  });
};
