import { NextRequest, NextResponse } from 'next/server'
import { convertMeetingToTable } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, config } = body

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的会议记录内容' },
        { status: 400 }
      )
    }

    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: '会议记录内容太短，请提供更详细的内容' },
        { status: 400 }
      )
    }

    const result = await convertMeetingToTable(content, config)
    
    return NextResponse.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('转换API错误:', error)
    return NextResponse.json(
      { error: '转换过程中发生错误，请重试' },
      { status: 500 }
    )
  }
}