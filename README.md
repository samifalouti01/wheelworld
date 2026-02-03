# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. File stricture:

app/
├── (auth)/                 # Authentication flow
│   ├── login.tsx           # LinkedIn/Google/Email login
│   └── register.tsx
├── (tabs)/                 # Main Bottom Bar navigation
│   ├── index.tsx           # Home: "Insights" Feed
│   ├── diagnostics.tsx     # Diagnostic Tools (IA Légère)
│   ├── dossier.tsx         # Private Client Space (Payant)
│   └── profile.tsx         # User Profile & Settings
├── (premium)/              # High-value paid features
│   ├── booking/            # Expert scheduling
│   ├── chat/               # Priority messaging 
│   └── reports/            # Premium studies & PDF storage
├── diagnostic/             # Dynamic diagnostic flow
│   ├── [id].tsx            # Active questionnaire (5-7 questions)
│   └── result.tsx          # Scoring & Conversion screen
├── resources/              
│   └── [id].tsx            # White Papers & Document templates
└── _layout.tsx             # Root layout with Theme Provider
