'use client'

import React, { useState, useEffect } from 'react'
import { EmailTemplate, getTemplateById, renderTemplate } from '@/lib/email-templates'

interface EmailTemplateViewerProps {
  templateId: string
  onClose: () => void
  onSave?: (templateId: string, customHtml: string) => void
}

export default function EmailTemplateViewer({ templateId, onClose, onSave }: EmailTemplateViewerProps) {
  const [template, setTemplate] = useState<EmailTemplate | null>(null)
  const [customHtml, setCustomHtml] = useState('')
  const [previewData, setPreviewData] = useState({
    totalSubscribers: 1000,
    daysLeft: 3
  })
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'settings'>('preview')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const foundTemplate = getTemplateById(templateId)
    if (foundTemplate) {
      setTemplate(foundTemplate)
      setCustomHtml(foundTemplate.html(previewData))
    }
  }, [templateId, previewData])

  const handlePreviewDataChange = (key: string, value: string | number) => {
    setPreviewData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    if (onSave && template) {
      onSave(template.id, customHtml)
      setIsEditing(false)
    }
  }

  const renderPreview = () => {
    if (!template) return null

    try {
      const html = isEditing ? customHtml : template.html(previewData)
      return (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Email Preview</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Subject:</span>
                <span className="text-xs font-medium text-gray-700">{template.subject}</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div 
              className="max-w-full overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      )
    } catch (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">Error rendering preview: {error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      )
    }
  }

  const renderCodeEditor = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">HTML Code</h3>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          {isEditing ? (
            <textarea
              value={customHtml}
              onChange={(e) => setCustomHtml(e.target.value)}
              className="w-full h-96 p-3 font-mono text-sm border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter HTML code..."
            />
          ) : (
            <pre className="w-full h-96 p-3 font-mono text-sm bg-gray-50 border rounded-lg overflow-auto">
              <code>{customHtml}</code>
            </pre>
          )}
        </div>
      </div>
    )
  }

  const renderSettings = () => {
    if (!template) return null

    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700">Template Settings</h3>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template Information</label>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500">Name:</span>
                <p className="text-sm font-medium">{template.name}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Description:</span>
                <p className="text-sm">{template.description}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Category:</span>
                <p className="text-sm font-medium capitalize">{template.category.replace('-', ' ')}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preview Variables</label>
            <div className="space-y-3">
              {template.variables.map(variable => (
                <div key={variable}>
                  <label className="block text-xs text-gray-500 mb-1">{variable}</label>
                  <input
                    type={variable.includes('days') ? 'number' : 'text'}
                    value={previewData[variable as keyof typeof previewData] || ''}
                    onChange={(e) => handlePreviewDataChange(variable, e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter ${variable}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input
              type="text"
              value={template.subject}
              readOnly
              className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
          <div className="text-center">
            <p className="text-gray-600">Template not found</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{template.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'preview', label: 'Preview' },
              { id: 'code', label: 'Code' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'preview' && renderPreview()}
          {activeTab === 'code' && renderCodeEditor()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  )
} 