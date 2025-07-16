# 部署指南

## 一键部署到Vercel

### 方法1: 使用部署按钮

点击下方按钮即可一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zhengshui/meet-sheet)

### 方法2: 手动部署

1. Fork或Clone仓库
2. 在Vercel控制台中导入项目
3. 配置环境变量（可选）
4. 点击部署

## 环境变量配置

以下环境变量为可选配置，用户也可以在应用中手动配置：

| 变量名 | 描述 | 示例值 |
|--------|------|---------|
| `DEFAULT_AI_PROVIDER` | 默认AI提供商 | `openai` 或 `deepseek` |
| `DEFAULT_OPENAI_API_KEY` | 默认OpenAI API密钥 | `sk-xxx...` |
| `DEFAULT_DEEPSEEK_API_KEY` | 默认DeepSeek API密钥 | `sk-xxx...` |

## 部署后配置

1. 访问部署的应用
2. 点击"AI配置"按钮
3. 选择AI模型提供商
4. 输入API密钥
5. 保存配置

## 获取API密钥

### OpenAI
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 创建新的API密钥
3. 复制密钥并保存

### DeepSeek
1. 访问 [DeepSeek Platform](https://platform.deepseek.com/api-keys)
2. 注册并创建API密钥
3. 复制密钥并保存

## 注意事项

- API密钥将保存在浏览器本地存储中
- 不会发送到服务器，确保数据安全
- 可以随时更改配置
- 支持多种AI模型切换

## 问题排查

### 常见问题

1. **转换失败**: 检查API密钥是否正确配置
2. **无法访问**: 确保API密钥有足够的配额
3. **部署失败**: 检查环境变量配置是否正确

### 获取支持

如有问题，请：
1. 查看[项目README](./README.md)
2. 提交[GitHub Issue](https://github.com/zhengshui/meet-sheet/issues)
3. 查看Vercel部署日志