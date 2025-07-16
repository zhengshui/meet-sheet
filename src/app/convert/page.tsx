"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, Loader2, Settings, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { MeetingTable } from "@/components/MeetingTable"
import { MeetingTableData } from "@/lib/ai"
import { AIConfigModal } from "@/components/AIConfigModal"
import { useAIStore } from "@/lib/store"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConvertPage() {
  const [meetingText, setMeetingText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<MeetingTableData | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { config, hasValidConfig } = useAIStore()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf']
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const text = await file.text()
        setMeetingText(text)
      }
    }
  })

  const handleConvert = async () => {
    if (!meetingText.trim()) return
    
    // 检查是否有配置
    if (!hasValidConfig()) {
      setShowConfigModal(true)
      return
    }
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: meetingText,
          config: config
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult(data.data)
      } else {
        setError(data.error || '转换失败')
      }
    } catch {
      setError('转换过程中发生错误，请重试')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              会议记录转换
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              AI配置
            </Button>
          </div>
          <p className="text-gray-600">
            输入您的会议记录，AI将自动为您生成结构化表格
          </p>
          {!hasValidConfig() && (
            <Alert className="mt-4 max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                请先配置AI模型API密钥才能使用转换功能
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  输入会议记录
                </CardTitle>
                <CardDescription>
                  您可以直接粘贴文本或上传文件
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {isDragActive 
                      ? '拖放文件到这里' 
                      : '点击或拖拽文件到这里上传'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    支持 .txt, .docx, .pdf 格式
                  </p>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder="或者直接在此处粘贴会议记录内容..."
                    value={meetingText}
                    onChange={(e) => setMeetingText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleConvert}
                  disabled={!meetingText.trim() || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      处理中...
                    </>
                  ) : (
                    '开始转换'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>转换结果</CardTitle>
                <CardDescription>
                  AI生成的结构化表格将在这里显示
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <MeetingTable data={result} />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>请输入会议记录内容开始转换</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <AIConfigModal 
          open={showConfigModal}
          onOpenChange={setShowConfigModal}
        />
      </div>
    </div>
  )
}