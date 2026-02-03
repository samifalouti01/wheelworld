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


1. (tabs) - Core Navigation

Insights Feed (index.tsx):

NewsCard: For short articles on Algerian/Global economy.

StrategyAlert: A specialized card for fiscal/legal updates.

Diagnostic Center (diagnostics.tsx):

DiagnosticCard: Selection menu for different tests.

Client Dossier (dossier.tsx):

ProjectTimeline: Visual tracker for consulting mission progress.

SecureVault: List of uploaded/received confidential documents.


2. Diagnostic Engine (The Conversion Funnel)

QuestionnaireView: Dynamic forms supporting Yes/No logic for quick evaluation.

ScoreDisplay: An animated gauge or counter showing the 0-100 score.

ConversionCTA: The critical bridge component that triggers "Book an Expert" or "Download Premium Guide" based on a low score.


3. (premium) - Paid Services
Expert Booking:


CalendarPicker: Integrated calendar for selecting consultation slots.


VideoMeetingLink: UI for Google Meet/Zoom integration.

Priority Chat:


ChatInterface: Real-time messaging with assigned consultants.

4. Technical & Shared Components

Payment Gateway: Integration for CIB / Edahabia (local) and Stripe/PayPal (international).


PDF Viewer: To display generated mini-reports and premium market studies.


