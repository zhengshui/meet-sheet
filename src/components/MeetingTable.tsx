"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download } from 'lucide-react'
import { MeetingTableData } from '@/lib/ai'

interface MeetingTableProps {
  data: MeetingTableData
}

export function MeetingTable({ data }: MeetingTableProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    console.log(`导出为 ${format} 格式`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">会议概览</TabsTrigger>
          <TabsTrigger value="agenda">议程</TabsTrigger>
          <TabsTrigger value="actions">行动事项</TabsTrigger>
          <TabsTrigger value="decisions">决策</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">会议信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>日期：</strong> {data.date}
                </div>
                <div>
                  <strong>时长：</strong> {data.duration}
                </div>
                <div>
                  <strong>参与者：</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.participants.map((participant, index) => (
                      <Badge key={index} variant="secondary">
                        {participant}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">统计信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>议程项目：</strong> {data.agenda.length} 项
                </div>
                <div>
                  <strong>行动事项：</strong> {data.actionItems.length} 项
                </div>
                <div>
                  <strong>决策事项：</strong> {data.decisions.length} 项
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">会议议程</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">议题</th>
                      <th className="text-left p-2">主讲人</th>
                      <th className="text-left p-2">时长</th>
                      <th className="text-left p-2">备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.agenda.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{item.topic}</td>
                        <td className="p-2">{item.presenter}</td>
                        <td className="p-2">{item.duration}</td>
                        <td className="p-2 text-sm text-gray-600">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">行动事项</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">任务</th>
                      <th className="text-left p-2">负责人</th>
                      <th className="text-left p-2">截止日期</th>
                      <th className="text-left p-2">优先级</th>
                      <th className="text-left p-2">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.actionItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{item.task}</td>
                        <td className="p-2">{item.assignee}</td>
                        <td className="p-2">{item.deadline}</td>
                        <td className="p-2">
                          <Badge className={priorityColors[item.priority]}>
                            {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge className={statusColors[item.status]}>
                            {item.status === 'pending' ? '待处理' : 
                             item.status === 'in_progress' ? '进行中' : '已完成'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">决策事项</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.decisions.map((decision, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{decision.topic}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>决策：</strong> {decision.decision}
                      </div>
                      <div>
                        <strong>原因：</strong> {decision.reasoning}
                      </div>
                      <div>
                        <strong>影响：</strong> {decision.impact}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}