# OOUX Object Template Creator - Figma Plugin

A Figma plugin for creating **Object-Oriented UX (OOUX)** templates with **AI-powered suggestions**. Generate professional object maps with proper OOUX color coding in seconds.

![OOUX Colors](https://img.shields.io/badge/Core_Content-FF9800-orange) ![Attributes](https://img.shields.io/badge/Attributes-FDD835-yellow) ![Nested](https://img.shields.io/badge/Nested_Objects-81D4FA-blue) ![CTAs](https://img.shields.io/badge/CTAs-4CAF50-green)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Download & Install Dependencies

```bash
# Clone or download this repository
cd plugin

# Install Node.js dependencies
npm install
```

### Step 2: Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your new API key

### Step 3: Configure Your API Key

```bash
# Create your config file from the template
cp config.example.ts config.ts
```

Open `config.ts` and replace `YOUR_API_KEY_HERE` with your actual key:

```typescript
export const CONFIG = {
  GEMINI_API_KEY: "paste-your-api-key-here",
};
```

### Step 4: Build the Plugin

```bash
npm run build
```

You should see:

```
🔨 Building OOUX Plugin...
✅ API key loaded from config.ts
📦 Compiling TypeScript...
✅ TypeScript compiled successfully
✅ API key injected into code.js
🎉 Build complete!
```

### Step 5: Import into Figma

1. Open **Figma Desktop** (not the web version)
2. Go to **Plugins** → **Development** → **Import plugin from manifest...**
3. Navigate to this folder and select `manifest.json`
4. Done! The plugin is now installed.

### Step 6: Use the Plugin

1. Open any Figma file
2. Right-click → **Plugins** → **Development** → **OOUX Object Template Creator**
3. Enter an object name (e.g., "CLIENT", "COMMANDE", "PRODUIT")
4. Select your industry/domain
5. Click **✨ AI Suggest** to auto-generate content
6. Click **Generate Template**

---

## 🎨 OOUX Color Coding

The plugin uses standard OOUX colors:

| Element               | Color                | Used For                 |
| --------------------- | -------------------- | ------------------------ |
| 🔵 **Header**         | Blue `#5C94E0`       | Object name & stage      |
| 🟠 **Core Content**   | Orange `#FF9800`     | Primary identifying info |
| 🟡 **Attributes**     | Yellow `#FDD835`     | Object properties        |
| 🔷 **Nested Objects** | Light Blue `#81D4FA` | Related objects          |
| 🟢 **CTAs**           | Green `#4CAF50`      | User actions             |

---

## 🤖 AI Features

The plugin uses **Google Gemini AI** to suggest:

- **Definition**: What the object represents
- **Core Content**: Primary identifying fields with example values
- **Attributes**: Relevant properties with realistic example data
- **Nested Objects**: Related objects with cardinality (1-many, 0-many, has 1)
- **CTAs**: Actions users can perform, ordered by priority

### Supported Domains

Choose your industry for better suggestions:

- 🏦 Banking / Finance
- 🛒 E-commerce
- 🏥 Healthcare
- 📋 Insurance
- 🏠 Real Estate
- 👥 HR / Personnel
- 📚 Education
- 📦 Logistics
- 💼 CRM

---

## 🔒 Security

Your API key is **never exposed** in the repository:

| File        | Contains            | Pushed to Git?     |
| ----------- | ------------------- | ------------------ |
| `config.ts` | Your real API key   | ❌ No (gitignored) |
| `code.ts`   | Placeholder only    | ✅ Yes (safe)      |
| `code.js`   | Real key (injected) | ❌ No (gitignored) |

The build script automatically injects your key into the compiled code.

---

## 📁 Project Files

```
plugin/
├── manifest.json         # Figma plugin config
├── package.json          # Dependencies
├── build.js              # Secure build script
├── code.ts               # Plugin source (TypeScript)
├── code.js               # Compiled code (gitignored)
├── ui.html               # Plugin interface
├── config.ts             # Your API key (gitignored)
├── config.example.ts     # Template for config
└── README.md             # This file
```

---

## 🛠 Development

### Rebuild After Changes

```bash
npm run build
```

Then in Figma: Right-click → **Plugins** → **Development** → **OOUX Object Template Creator**

### Watch Mode (Auto-rebuild)

```bash
npm run watch
```

Note: Watch mode doesn't inject the API key. Run `npm run build` for the final version.

---

## ❓ Troubleshooting

### "API key not found"

- Make sure `config.ts` exists (copy from `config.example.ts`)
- Check that your key is correctly pasted in `config.ts`

### "AI Error: 429"

- You've hit the API rate limit
- Wait a few seconds and try again
- The plugin will use smart local templates as fallback

### Plugin not showing in Figma

- Make sure you're using **Figma Desktop**, not the web version
- Re-import the `manifest.json` file

### Changes not reflecting

- Run `npm run build` after any code changes
- Reload the plugin in Figma

---

## 📚 Learn More

- [OOUX Official Website](https://www.ooux.com/)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Google AI Studio](https://aistudio.google.com/)

---

## 📄 License

MIT License - Free to use and modify!

---

Made with ❤️ for the Yakeey design team
