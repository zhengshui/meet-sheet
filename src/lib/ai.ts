import OpenAI from 'openai'

export interface AIConfig {
  provider: 'openai' | 'deepseek'
  apiKey: string
  model?: string
}

function createOpenAIClient(config: AIConfig) {
  const baseURL = config.provider === 'deepseek' 
    ? 'https://api.deepseek.com/v1' 
    : 'https://api.openai.com/v1'
  
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL,
  })
}

export interface MeetingTableData {
  title: string
  participants: string[]
  date: string
  duration: string
  agenda: AgendaItem[]
  actionItems: ActionItem[]
  decisions: Decision[]
}

export interface AgendaItem {
  topic: string
  presenter: string
  duration: string
  notes: string
}

export interface ActionItem {
  task: string
  assignee: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
}

export interface Decision {
  topic: string
  decision: string
  reasoning: string
  impact: string
}

export async function convertMeetingToTable(meetingContent: string, config?: AIConfig): Promise<MeetingTableData> {
  // 使用用户配置或默认配置
  const aiConfig = config || {
    provider: (process.env.DEFAULT_AI_PROVIDER as 'openai' | 'deepseek') || 'openai',
    apiKey: process.env.DEFAULT_OPENAI_API_KEY || process.env.DEFAULT_DEEPSEEK_API_KEY || '',
    model: 'gpt-3.5-turbo'
  }
  
  if (!aiConfig.apiKey) {
    throw new Error('请配置AI模型API密钥')
  }
  
  const client = createOpenAIClient(aiConfig)
  
  // 根据不同模型选择合适的模型名称
  const modelName = aiConfig.model || (aiConfig.provider === 'deepseek' ? 'deepseek-chat' : 'gpt-3.5-turbo')
  const systemPrompt = `你是一个专业的会议记录分析师。请将用户提供的会议记录转换为结构化的表格数据。

请按照以下JSON格式返回结果：
{
  "title": "会议标题",
  "participants": ["参与者1", "参与者2"],
  "date": "2024-01-01",
  "duration": "90分钟",
  "agenda": [
    {
      "topic": "议题",
      "presenter": "主讲人",
      "duration": "30分钟",
      "notes": "讨论要点"
    }
  ],
  "actionItems": [
    {
      "task": "任务描述",
      "assignee": "负责人",
      "deadline": "2024-01-15",
      "priority": "high",
      "status": "pending"
    }
  ],
  "decisions": [
    {
      "topic": "决策主题",
      "decision": "决策内容",
      "reasoning": "决策原因",
      "impact": "影响范围"
    }
  ]
}

请确保：
1. 从文本中提取关键信息
2. 如果某些信息不存在，请使用合理的默认值
3. 优先级用 high/medium/low 表示
4. 状态用 pending/in_progress/completed 表示
5. 只返回有效的JSON格式，不要包含其他文本`

  try {
    const response = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: meetingContent }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    const content = response.choices[0].message.content
    if (!content) {
      throw new Error('AI响应为空')
    }

    const parsedData = JSON.parse(content) as MeetingTableData
    return parsedData
  } catch (error) {
    console.error('AI转换失败:', error)
    throw new Error('会议记录转换失败，请重试')
  }
}