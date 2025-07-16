# 会议记录转表格平台

一个零门槛、结构清晰、AI驱动的会议记录智能转换工具。

## 功能特点

- 🎯 **零门槛使用**: 无需复杂配置，即开即用
- 📝 **多种输入**: 支持文本粘贴、文件上传等多种输入方式
- 🤖 **AI驱动**: 基于先进AI模型，自动识别会议要点
- 📊 **结构化表格**: 自动生成会议概览、议程、行动事项、决策记录
- 📤 **多格式导出**: 支持Excel、CSV、PDF等多种格式导出
- 🎨 **现代界面**: 响应式设计，支持多种设备
- ⚡ **高性能**: 基于Next.js 14和最新技术栈

## 技术栈

- **前端**: Next.js 14, TypeScript, TailwindCSS, Radix UI
- **后端**: Next.js API Routes
- **状态管理**: Zustand (本地存储)
- **AI模型**: OpenAI GPT, DeepSeek, 支持多种大模型
- **部署**: Vercel 一键部署

## 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone <repository-url>
cd meet-sheet

# 安装依赖
npm install
```

### 2. 环境变量配置（可选）

复制 `.env.example` 到 `.env.local` 并填入默认配置（用户也可以在应用中手动配置）：

```env
# 可选：默认AI配置（用户可在应用中重新配置）
DEFAULT_AI_PROVIDER="openai"
DEFAULT_OPENAI_API_KEY="your-openai-api-key"
DEFAULT_DEEPSEEK_API_KEY="your-deepseek-api-key"
```

### 3. 运行项目

```bash
# 开发模式
npm run dev

# 生产构建
npm run build
npm start
```

应用将在 `http://localhost:3000` 启动。

### 4. 配置AI模型

首次使用时，点击"AI配置"按钮配置您的API密钥：

1. 选择AI模型提供商（OpenAI 或 DeepSeek）
2. 输入对应的API密钥
3. 选择模型（可选，留空使用默认）
4. 保存配置

配置将安全保存在浏览器本地存储中。

## 使用说明

1. **输入会议记录**: 在转换页面输入或上传会议记录文本
2. **AI转换**: 系统自动分析内容并生成结构化表格
3. **查看结果**: 通过标签页查看会议概览、议程、行动事项、决策等
4. **导出分享**: 支持多种格式导出和在线分享

## 一键部署

### Vercel部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/meet-sheet)

1. 点击上方按钮进行部署
2. 连接您的GitHub仓库
3. 配置环境变量
4. 完成部署

### 环境变量配置（可选）

在Vercel控制台设置以下环境变量（用户也可以在应用中手动配置）：

- `DEFAULT_AI_PROVIDER`: 默认AI提供商 (openai/deepseek)
- `DEFAULT_OPENAI_API_KEY`: 默认OpenAI API密钥
- `DEFAULT_DEEPSEEK_API_KEY`: 默认DeepSeek API密钥

## 支持的AI模型

### 已支持模型
- **OpenAI**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
- **DeepSeek**: DeepSeek Chat, DeepSeek Coder

### 计划支持模型
- Anthropic Claude
- Google Gemini
- 通义千问（阿里云）
- 文心一言（百度）
- 讯飞星火
- 智谱GLM

## 开发指南

### 项目结构

```
src/
├── app/                 # Next.js 应用路由
├── components/         # React组件
├── lib/               # 工具函数和配置
├── types/             # TypeScript类型定义
└── styles/            # 样式文件
```

### 添加新的AI模型

1. 在 `src/lib/ai.ts` 中添加新的模型配置
2. 实现相应的API调用逻辑
3. 更新环境变量配置

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 许可证

MIT License

## 支持

如有问题或建议，请提交Issue或联系开发团队。
