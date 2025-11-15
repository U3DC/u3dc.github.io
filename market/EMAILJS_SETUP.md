# EmailJS 配置说明

本系统使用 EmailJS 来实现从前端直接发送邮件功能。请按照以下步骤配置：

## 1. 注册 EmailJS 账号

1. 访问 [EmailJS官网](https://www.emailjs.com/)
2. 注册一个免费账号（免费版每月可发送200封邮件）

## 2. 创建邮件服务

1. 登录 EmailJS 控制台
2. 进入 "Email Services" 页面
3. 点击 "Add New Service"
4. 选择您的邮件服务提供商（Gmail、Outlook等）或使用 "Custom SMTP"
5. 按照提示连接您的邮箱账号
6. 记录下生成的 **Service ID**

## 3. 创建邮件模板

1. 进入 "Email Templates" 页面
2. 点击 "Create New Template"
3. 配置模板内容，使用以下变量：

```
收件人：{{to_email}}
主题：{{subject}}

{{message}}

详细信息：
框架材质类型：{{frame_type}}
托盘材质类型：{{tray_type}}
框架颜色：{{frame_color}}
托盘颜色：{{tray_color}}
卡带类型：{{card_type}}
```

4. 在 "Settings" 中设置：
   - **To Email**: `tuqibiao@gmail.com`（或您的收件邮箱）
   - **From Name**: 游戏卡带收纳盒定制系统
   - **Subject**: `{{subject}}`

5. 保存模板，记录下 **Template ID**

## 4. 获取 Public Key

1. 进入 "Account" -> "General"
2. 找到 "Public Key"，复制该值

## 5. 配置到代码中

打开 `script.js` 文件，找到以下配置部分（约第82-87行）：

```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',      // 替换为您的EmailJS Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // 替换为您的EmailJS Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'       // 替换为您的EmailJS Public Key
};
```

将 `YOUR_SERVICE_ID`、`YOUR_TEMPLATE_ID` 和 `YOUR_PUBLIC_KEY` 替换为您在步骤2、3、4中获取的实际值。

## 6. 测试

1. 保存文件
2. 刷新网页
3. 选择定制选项
4. 点击"立即定制"按钮
5. 检查是否收到邮件

## 注意事项

- 免费版每月限制200封邮件
- 如果未配置EmailJS，系统会自动使用mailto链接作为备选方案
- 确保EmailJS的Public Key是公开的，可以安全地放在前端代码中
- 不要将Private Key放在前端代码中

## 故障排除

如果邮件发送失败：
1. 检查浏览器控制台是否有错误信息
2. 确认EmailJS配置是否正确
3. 检查EmailJS控制台的"Logs"页面查看发送记录
4. 确认邮件服务连接是否正常

