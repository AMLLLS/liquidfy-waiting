'use client'

import React, { useState, useEffect } from 'react'
import { EmailTemplate } from '@/lib/email-templates'
import EmailTemplateLibrary from './EmailTemplateLibrary'

interface Campaign {
  id: string
  name: string
  templateId: string
  templateName: string
  subject: string
  status: 'draft' | 'scheduled' | 'sent'
  scheduledDate?: string
  sentDate?: string
  recipientCount: number
  openRate?: number
  clickRate?: number
}

export default function EmailCampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    subject: '',
    scheduledDate: '',
    recipientCount: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState<{
    action: string
    campaignId: string
    message: string
  } | null>(null)

  // Load campaigns on mount
  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    try {
      // In a real app, this would fetch from your API
      const mockCampaigns: Campaign[] = [
        {
          id: '1',
          name: 'Early Access Announcement',
          templateId: 'early-access-announcement',
          templateName: 'Early Access Announcement',
          subject: '🎯 Early Access Now Open - Liquidfy Waitlist',
          status: 'sent',
          sentDate: '2024-01-15T10:00:00Z',
          recipientCount: 1250,
          openRate: 68.5,
          clickRate: 12.3
        },
        {
          id: '2',
          name: 'Urgency Campaign - 3 Days Left',
          templateId: 'urgency-campaign',
          templateName: 'Urgency Campaign',
          subject: '⏰ 3 Days Left - Your Early Access Expires Soon',
          status: 'scheduled',
          scheduledDate: '2024-01-20T14:00:00Z',
          recipientCount: 1250
        }
      ]
      setCampaigns(mockCampaigns)
    } catch (error) {
      setMessage('Error loading campaigns')
    }
  }

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template)
    setCampaignForm(prev => ({
      ...prev,
      subject: template.subject
    }))
    setShowTemplateLibrary(false)
    setShowCreateCampaign(true)
  }

  const handleCreateCampaign = async () => {
    if (!selectedTemplate || !campaignForm.name || !campaignForm.subject) {
      setMessage('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    try {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: campaignForm.name,
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        subject: campaignForm.subject,
        status: 'draft',
        recipientCount: campaignForm.recipientCount,
        scheduledDate: campaignForm.scheduledDate || undefined
      }

      setCampaigns(prev => [...prev, newCampaign])
      setShowCreateCampaign(false)
      setSelectedTemplate(null)
      setCampaignForm({
        name: '',
        subject: '',
        scheduledDate: '',
        recipientCount: 0
      })
      setMessage('Campaign created successfully')
    } catch (error) {
      setMessage('Error creating campaign')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCampaign = async (campaignId: string) => {
    setShowConfirmation({
      action: 'send',
      campaignId,
      message: 'Are you sure you want to send this campaign? This action cannot be undone.'
    })
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    setShowConfirmation({
      action: 'delete',
      campaignId,
      message: 'Are you sure you want to delete this campaign? This action cannot be undone.'
    })
  }

  const confirmAction = async () => {
    if (!showConfirmation) return

    setIsLoading(true)
    try {
      if (showConfirmation.action === 'send') {
        // Send campaign logic
        setCampaigns(prev => prev.map(campaign => 
          campaign.id === showConfirmation.campaignId 
            ? { ...campaign, status: 'sent', sentDate: new Date().toISOString() }
            : campaign
        ))
        setMessage('Campaign sent successfully')
      } else if (showConfirmation.action === 'delete') {
        // Delete campaign logic
        setCampaigns(prev => prev.filter(campaign => campaign.id !== showConfirmation.campaignId))
        setMessage('Campaign deleted successfully')
      }
    } catch (error) {
      setMessage('Error performing action')
    } finally {
      setIsLoading(false)
      setShowConfirmation(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'sent': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Campaign Manager</h1>
              <p className="text-gray-600 mt-2">Manage your email marketing campaigns and track performance</p>
            </div>
            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Campaign
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Campaigns ({campaigns.length})</h2>
          </div>
          
          {campaigns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600 mb-6">Create your first email campaign to get started</p>
              <button
                onClick={() => setShowTemplateLibrary(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipients
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map(campaign => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.subject}</div>
                          {campaign.scheduledDate && (
                            <div className="text-xs text-gray-400">
                              Scheduled: {formatDate(campaign.scheduledDate)}
                            </div>
                          )}
                          {campaign.sentDate && (
                            <div className="text-xs text-gray-400">
                              Sent: {formatDate(campaign.sentDate)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{campaign.templateName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {campaign.recipientCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {campaign.status === 'sent' ? (
                          <div className="text-sm">
                            <div className="text-gray-900">Open: {campaign.openRate}%</div>
                            <div className="text-gray-500">Click: {campaign.clickRate}%</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {campaign.status === 'draft' && (
                            <button
                              onClick={() => handleSendCampaign(campaign.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Send
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Template Library Modal */}
        {showTemplateLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Select Email Template</h2>
                  <button
                    onClick={() => setShowTemplateLibrary(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                <EmailTemplateLibrary onSelectTemplate={handleTemplateSelect} />
              </div>
            </div>
          </div>
        )}

        {/* Create Campaign Modal */}
        {showCreateCampaign && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter campaign name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={campaignForm.subject}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter subject line..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Count</label>
                  <input
                    type="number"
                    value={campaignForm.recipientCount}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, recipientCount: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter recipient count..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={campaignForm.scheduledDate}
                    onChange={(e) => setCampaignForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Template</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedTemplate.name}</p>
                      <p className="text-xs text-gray-500">{selectedTemplate.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowCreateCampaign(false)
                    setSelectedTemplate(null)
                    setCampaignForm({
                      name: '',
                      subject: '',
                      scheduledDate: '',
                      recipientCount: 0
                    })
                  }}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCampaign}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Campaign'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Action</h3>
                <p className="text-gray-600 mb-6">{showConfirmation.message}</p>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmation(null)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    disabled={isLoading}
                    className={`px-4 py-2 text-white rounded-lg disabled:opacity-50 ${
                      showConfirmation.action === 'delete' 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isLoading ? 'Processing...' : 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 