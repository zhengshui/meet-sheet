"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Eye, EyeOff } from 'lucide-react'
import { useAIStore } from '@/lib/store'

interface AIConfigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIConfigModal({ open, onOpenChange }: AIConfigModalProps) {
  const { config, setConfig } = useAIStore()
  const [provider, setProvider] = useState<'openai' | 'deepseek'>(config?.provider || 'openai')
  const [apiKey, setApiKey] = useState(config?.apiKey || '')
  const [model, setModel] = useState(config?.model || '')
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSave = () => {
    if (!apiKey.trim()) {
      alert('请输入API密钥')
      return
    }
    
    setConfig({
      provider,
      apiKey: apiKey.trim(),
      model: model.trim() || undefined
    })
    
    onOpenChange(false)
  }

  const modelOptions = {
    openai: [
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }
    ],
    deepseek: [
      { value: 'deepseek-chat', label: 'DeepSeek Chat' },
      { value: 'deepseek-coder', label: 'DeepSeek Coder' }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            AI模型配置
          </DialogTitle>
          <DialogDescription>
            配置您的AI模型API密钥和参数。数据将安全保存在本地浏览器中。
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="provider">AI模型提供商</Label>
            <Select value={provider} onValueChange={(value: 'openai' | 'deepseek') => setProvider(value)}>
              <SelectTrigger>
                <SelectValue placeholder="选择AI模型提供商" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="apiKey">API密钥</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                placeholder={`请输入${provider === 'openai' ? 'OpenAI' : 'DeepSeek'} API密钥`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {provider === 'openai' 
                ? '获取地址: https://platform.openai.com/api-keys'
                : '获取地址: https://platform.deepseek.com/api-keys'
              }
            </p>
          </div>

          <div>
            <Label htmlFor="model">模型 (可选)</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="选择模型或留空使用默认" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">使用默认模型</SelectItem>
                {modelOptions[provider].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSave}>
            保存配置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}