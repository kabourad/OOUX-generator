#!/usr/bin/env node
/**
 * Secure Build Script for OOUX Figma Plugin
 * 
 * This script:
 * 1. Compiles TypeScript to JavaScript
 * 2. Injects the API key from config.ts into code.js
 * 
 * The API key never touches code.ts (which is pushed to git),
 * only code.js (which is gitignored).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, 'config.ts');
const OUTPUT_FILE = path.join(__dirname, 'code.js');
const PLACEHOLDER = '__GEMINI_API_KEY_PLACEHOLDER__';

console.log('🔨 Building OOUX Plugin...\n');

// Step 1: Check if config.ts exists
if (!fs.existsSync(CONFIG_FILE)) {
  console.error('❌ Error: config.ts not found!');
  console.error('   Please create config.ts with your API key.');
  console.error('   You can copy config.example.ts and add your key.\n');
  process.exit(1);
}

// Step 2: Extract API key from config.ts
let apiKey = null;
try {
  const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
  const match = configContent.match(/GEMINI_API_KEY:\s*["']([^"']+)["']/);
  if (match && match[1] && match[1] !== 'YOUR_API_KEY_HERE') {
    apiKey = match[1];
    console.log('✅ API key loaded from config.ts');
  } else {
    console.warn('⚠️  Warning: No valid API key found in config.ts');
    console.warn('   AI suggestions will not work without a valid key.\n');
  }
} catch (err) {
  console.error('❌ Error reading config.ts:', err.message);
  process.exit(1);
}

// Step 3: Compile TypeScript
console.log('📦 Compiling TypeScript...');
try {
  execSync('npx tsc code.ts --outDir . --target ES2017 --skipLibCheck --types @figma/plugin-typings', {
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('✅ TypeScript compiled successfully');
} catch (err) {
  console.error('❌ TypeScript compilation failed');
  process.exit(1);
}

// Step 4: Inject API key into code.js
if (apiKey) {
  try {
    let jsContent = fs.readFileSync(OUTPUT_FILE, 'utf8');
    
    if (jsContent.includes(PLACEHOLDER)) {
      jsContent = jsContent.replace(PLACEHOLDER, apiKey);
      fs.writeFileSync(OUTPUT_FILE, jsContent);
      console.log('✅ API key injected into code.js');
    } else {
      console.warn('⚠️  Warning: Placeholder not found in code.js');
    }
  } catch (err) {
    console.error('❌ Error injecting API key:', err.message);
    process.exit(1);
  }
}

console.log('\n🎉 Build complete!\n');
console.log('   Your API key is secure:');
console.log('   • code.ts has a placeholder (safe to push)');
console.log('   • code.js has your real key (gitignored)\n');
