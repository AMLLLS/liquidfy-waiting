#!/usr/bin/env node

/**
 * Test Script for Email Campaign System
 * Usage: node scripts/test-email-campaign.js
 */

const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : 'http://localhost:3000';

const TEST_EMAIL = 'test@example.com';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': 'Liquidfy2024!@#',
        ...options.headers
      }
    };

    if (options.body) {
      requestOptions.body = JSON.stringify(options.body);
    }

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testSubscription() {
  log('\n🔧 Testing Email Subscription...', 'blue');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/subscribe`, {
      method: 'POST',
      body: { email: TEST_EMAIL }
    });

    if (response.status === 200) {
      log('✅ Subscription API working correctly', 'green');
      log(`📊 Total subscribers: ${response.data.totalSubscribers}`, 'green');
      return true;
    } else {
      log(`❌ Subscription failed: ${response.status}`, 'red');
      log(`Error: ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Subscription error: ${error.message}`, 'red');
    return false;
  }
}

async function testGetSubscribers() {
  log('\n📊 Testing Get Subscribers...', 'blue');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/email-campaign`);
    
    if (response.status === 200) {
      log('✅ Get subscribers API working correctly', 'green');
      log(`📊 Total subscribers: ${response.data.totalSubscribers}`, 'green');
      return true;
    } else {
      log(`❌ Get subscribers failed: ${response.status}`, 'red');
      log(`Error: ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Get subscribers error: ${error.message}`, 'red');
    return false;
  }
}

async function testUrgencyCampaign() {
  log('\n🚨 Testing Urgency Campaign...', 'blue');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/email-campaign`, {
      method: 'POST',
      body: {
        campaignType: 'urgency',
        daysLeft: 3
      }
    });

    if (response.status === 200) {
      log('✅ Urgency campaign API working correctly', 'green');
      log(`📧 Emails sent: ${response.data.sent}`, 'green');
      log(`❌ Failed: ${response.data.failed}`, 'yellow');
      return true;
    } else {
      log(`❌ Urgency campaign failed: ${response.status}`, 'red');
      log(`Error: ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Urgency campaign error: ${error.message}`, 'red');
    return false;
  }
}

async function testLaunchCampaign() {
  log('\n🚀 Testing Launch Campaign...', 'blue');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/email-campaign`, {
      method: 'POST',
      body: {
        campaignType: 'launch'
      }
    });

    if (response.status === 200) {
      log('✅ Launch campaign API working correctly', 'green');
      log(`📧 Emails sent: ${response.data.sent}`, 'green');
      log(`❌ Failed: ${response.data.failed}`, 'yellow');
      return true;
    } else {
      log(`❌ Launch campaign failed: ${response.status}`, 'red');
      log(`Error: ${JSON.stringify(response.data)}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Launch campaign error: ${error.message}`, 'red');
    return false;
  }
}

async function testInvalidCampaign() {
  log('\n🧪 Testing Invalid Campaign Type...', 'blue');
  
  try {
    const response = await makeRequest(`${BASE_URL}/api/email-campaign`, {
      method: 'POST',
      body: {
        campaignType: 'invalid'
      }
    });

    if (response.status === 400) {
      log('✅ Invalid campaign type properly rejected', 'green');
      return true;
    } else {
      log(`❌ Invalid campaign should have been rejected: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Invalid campaign test error: ${error.message}`, 'red');
    return false;
  }
}

async function runAllTests() {
  log('🧪 Starting Email Campaign System Tests...', 'bold');
  log(`🌐 Testing against: ${BASE_URL}`, 'blue');
  
  const tests = [
    { name: 'Subscription', fn: testSubscription },
    { name: 'Get Subscribers', fn: testGetSubscribers },
    { name: 'Urgency Campaign', fn: testUrgencyCampaign },
    { name: 'Launch Campaign', fn: testLaunchCampaign },
    { name: 'Invalid Campaign', fn: testInvalidCampaign }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ ${test.name} test crashed: ${error.message}`, 'red');
      failed++;
    }
  }

  // Summary
  log('\n📋 Test Summary:', 'bold');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, 'red');
  log(`📊 Total: ${passed + failed}`, 'blue');

  if (failed === 0) {
    log('\n🎉 All tests passed! Email campaign system is ready.', 'green');
    log('\n📧 Next steps:', 'blue');
    log('1. Visit https://liquidfy.app/campaigns', 'blue');
    log('2. Check your subscriber count', 'blue');
    log('3. Send your first campaign!', 'blue');
  } else {
    log('\n⚠️  Some tests failed. Please check the configuration.', 'yellow');
    log('\n🔧 Troubleshooting:', 'blue');
    log('1. Check environment variables (RESEND_API_KEY, etc.)', 'blue');
    log('2. Verify database connection', 'blue');
    log('3. Check Vercel deployment status', 'blue');
  }

  return failed === 0;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`❌ Test runner crashed: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  runAllTests,
  testSubscription,
  testGetSubscribers,
  testUrgencyCampaign,
  testLaunchCampaign,
  testInvalidCampaign
}; 