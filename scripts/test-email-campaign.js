#!/usr/bin/env node

/**
 * Test Script for Email Campaign System
 * Usage: node scripts/test-email-campaign.js
 */

const fetch = require('node-fetch');

// Configuration
const BASE_URL = 'http://localhost:3000'; // Change to your domain in production
const ADMIN_PASSWORD = 'Liquidfy2024!@#'; // Change this in production

// Test data
const testTemplates = [
  {
    id: 'early-access-announcement',
    name: 'Early Access Announcement',
    variables: { totalSubscribers: 1000, daysLeft: 7 }
  },
  {
    id: 'urgency-campaign',
    name: 'Urgency Campaign',
    variables: { totalSubscribers: 1000, daysLeft: 3 }
  },
  {
    id: 'launch-campaign',
    name: 'Launch Campaign',
    variables: { totalSubscribers: 1000 }
  },
  {
    id: 'follow-up-campaign',
    name: 'Follow-up Campaign',
    variables: { totalSubscribers: 1000 }
  }
];

// Helper function to make authenticated requests
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'x-admin-password': ADMIN_PASSWORD,
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  return response;
}

// Test 1: Get subscriber count
async function testGetSubscribers() {
  console.log('\n🔍 Testing: Get Subscriber Count');
  console.log('================================');
  
  try {
    const response = await makeRequest('/api/email-campaign', {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success!');
      console.log(`📊 Total Subscribers: ${data.totalSubscribers}`);
      console.log(`📝 Message: ${data.message}`);
    } else {
      const error = await response.json();
      console.log('❌ Failed!');
      console.log(`🚨 Error: ${error.error || 'Unknown error'}`);
      console.log(`📊 Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log(`🚨 Error: ${error.message}`);
  }
}

// Test 2: Test template rendering
async function testTemplateRendering() {
  console.log('\n🎨 Testing: Template Rendering');
  console.log('==============================');
  
  for (const template of testTemplates) {
    console.log(`\n📧 Testing Template: ${template.name}`);
    console.log(`🆔 Template ID: ${template.id}`);
    
    try {
      const response = await makeRequest('/api/email-campaign', {
        method: 'POST',
        body: JSON.stringify({
          templateId: template.id,
          variables: template.variables,
          recipientCount: 1 // Test with just 1 recipient
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Template rendered successfully!');
        console.log(`📊 Recipients: ${data.totalSubscribers}`);
        console.log(`📤 Sent: ${data.sent}`);
        console.log(`❌ Failed: ${data.failed}`);
        console.log(`📝 Message: ${data.message}`);
        
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          console.log(`📧 Test Email: ${result.email}`);
          console.log(`✅ Success: ${result.success}`);
          if (result.id) {
            console.log(`🆔 Email ID: ${result.id}`);
          }
          if (result.error) {
            console.log(`🚨 Error: ${result.error}`);
          }
        }
      } else {
        const error = await response.json();
        console.log('❌ Template rendering failed!');
        console.log(`🚨 Error: ${error.error || 'Unknown error'}`);
        console.log(`📊 Status: ${response.status}`);
      }
    } catch (error) {
      console.log('❌ Network Error!');
      console.log(`🚨 Error: ${error.message}`);
    }
  }
}

// Test 3: Test custom HTML
async function testCustomHtml() {
  console.log('\n🔧 Testing: Custom HTML');
  console.log('======================');
  
  const customHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Test Email</title>
</head>
<body>
  <h1>Custom Test Email</h1>
  <p>This is a test email with custom HTML content.</p>
  <p>Total Subscribers: 1000</p>
  <p>Days Left: 3</p>
</body>
</html>
  `;

  try {
    const response = await makeRequest('/api/email-campaign', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'urgency-campaign',
        customHtml: customHtml,
        subject: '🧪 Custom Test Email',
        variables: { totalSubscribers: 1000, daysLeft: 3 },
        recipientCount: 1
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Custom HTML sent successfully!');
      console.log(`📊 Recipients: ${data.totalSubscribers}`);
      console.log(`📤 Sent: ${data.sent}`);
      console.log(`❌ Failed: ${data.failed}`);
    } else {
      const error = await response.json();
      console.log('❌ Custom HTML failed!');
      console.log(`🚨 Error: ${error.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log(`🚨 Error: ${error.message}`);
  }
}

// Test 4: Test authentication
async function testAuthentication() {
  console.log('\n🔐 Testing: Authentication');
  console.log('==========================');
  
  // Test without password
  try {
    const response = await fetch(`${BASE_URL}/api/email-campaign`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      console.log('✅ Authentication working correctly!');
      console.log('🔒 API properly rejects unauthorized requests');
    } else {
      console.log('❌ Authentication not working!');
      console.log(`📊 Expected 401, got ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log(`🚨 Error: ${error.message}`);
  }
}

// Test 5: Test invalid template
async function testInvalidTemplate() {
  console.log('\n🚫 Testing: Invalid Template');
  console.log('============================');
  
  try {
    const response = await makeRequest('/api/email-campaign', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'invalid-template-id',
        recipientCount: 1
      })
    });

    if (response.status === 400) {
      const error = await response.json();
      console.log('✅ Invalid template properly rejected!');
      console.log(`🚨 Error: ${error.error}`);
    } else {
      console.log('❌ Invalid template not properly handled!');
      console.log(`📊 Expected 400, got ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log(`🚨 Error: ${error.message}`);
  }
}

// Test 6: Test campaign with no subscribers
async function testNoSubscribers() {
  console.log('\n📭 Testing: No Subscribers');
  console.log('==========================');
  
  try {
    const response = await makeRequest('/api/email-campaign', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'early-access-announcement',
        recipientCount: 0
      })
    });

    if (response.status === 400) {
      const error = await response.json();
      console.log('✅ No subscribers properly handled!');
      console.log(`🚨 Error: ${error.error}`);
    } else {
      console.log('❌ No subscribers not properly handled!');
      console.log(`📊 Expected 400, got ${response.status}`);
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log(`🚨 Error: ${error.message}`);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Email Campaign System Tests');
  console.log('======================================');
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`🔑 Admin Password: ${ADMIN_PASSWORD}`);
  
  // Run all tests
  await testAuthentication();
  await testGetSubscribers();
  await testTemplateRendering();
  await testCustomHtml();
  await testInvalidTemplate();
  await testNoSubscribers();
  
  console.log('\n🎉 All tests completed!');
  console.log('========================');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testGetSubscribers,
  testTemplateRendering,
  testCustomHtml,
  testAuthentication,
  testInvalidTemplate,
  testNoSubscribers,
  runAllTests
}; 