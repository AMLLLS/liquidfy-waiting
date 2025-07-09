'use client'

import React, { useState } from 'react'
import { EMAIL_TEMPLATES, EmailTemplate } from '@/lib/email-templates'
import EmailTemplateViewer from './EmailTemplateViewer'

interface EmailTemplateLibraryProps {
  onSelectTemplate: (template: EmailTemplate) => void
}

export default function EmailTemplateLibrary({ onSelectTemplate }: EmailTemplateLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [viewingTemplate, setViewingTemplate] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'All Templates', count: EMAIL_TEMPLATES.length },
    { id: 'early-access', name: 'Early Access', count: EMAIL_TEMPLATES.filter(t => t.category === 'early-access').length },
    { id: 'urgency', name: 'Urgency', count: EMAIL_TEMPLATES.filter(t => t.category === 'urgency').length },
    { id: 'launch', name: 'Launch', count: EMAIL_TEMPLATES.filter(t => t.category === 'launch').length },
    { id: 'follow-up', name: 'Follow-up', count: EMAIL_TEMPLATES.filter(t => t.category === 'follow-up').length }
  ]

  const filteredTemplates = EMAIL_TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'early-access': return 'bg-blue-100 text-blue-800'
      case 'urgency': return 'bg-red-100 text-red-800'
      case 'launch': return 'bg-green-100 text-green-800'
      case 'follow-up': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'early-access': return '🎯'
      case 'urgency': return '⏰'
      case 'launch': return '🚀'
      case 'follow-up': return '📧'
      default: return '📄'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Template Library</h2>
          <p className="text-gray-600 mt-1">Choose from our collection of professionally designed email templates</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedTemplate(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Templates</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className={`bg-white rounded-lg border p-6 hover:shadow-md transition-shadow cursor-pointer ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                    {template.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Template Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>

            {/* Template Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Variables:</span>
                <span className="font-medium">{template.variables.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Subject:</span>
                <span className="font-medium truncate max-w-32">{template.subject}</span>
              </div>
            </div>

            {/* Template Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setViewingTemplate(template.id)
                }}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Preview
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectTemplate(template)
                }}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Template Viewer Modal */}
      {viewingTemplate && (
        <EmailTemplateViewer
          templateId={viewingTemplate}
          onClose={() => setViewingTemplate(null)}
          onSave={(templateId, customHtml) => {
            // Handle custom template save
            console.log('Saving custom template:', templateId, customHtml)
            setViewingTemplate(null)
          }}
        />
      )}
    </div>
  )
} 