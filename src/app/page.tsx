import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Zap, Download, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            会议记录转表格平台
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            零门槛、结构清晰、AI驱动的会议记录智能转换工具
          </p>
          <Link href="/convert">
            <Button size="lg" className="px-8 py-3 text-lg">
              开始转换
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <FileText className="w-10 h-10 mx-auto mb-2 text-blue-600" />
              <CardTitle className="text-lg">多种输入</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                支持文本粘贴、文件上传、语音转文字等多种输入方式
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-10 h-10 mx-auto mb-2 text-yellow-600" />
              <CardTitle className="text-lg">AI智能</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                基于先进AI模型，自动识别会议要点并生成结构化表格
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="w-10 h-10 mx-auto mb-2 text-green-600" />
              <CardTitle className="text-lg">多格式导出</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                支持Excel、CSV、PDF等多种格式导出，满足不同需求
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-10 h-10 mx-auto mb-2 text-purple-600" />
              <CardTitle className="text-lg">团队协作</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                支持在线分享和团队协作，提高办公效率
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            适用场景
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">项目会议</h3>
              <p className="text-gray-600">快速整理项目进度、任务分配和时间节点</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">销售会议</h3>
              <p className="text-gray-600">提取客户信息、需求和跟进事项</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">培训记录</h3>
              <p className="text-gray-600">整理培训要点、学员反馈和行动计划</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
