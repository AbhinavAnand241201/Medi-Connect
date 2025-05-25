# Medi-Connect: AI-Powered Healthcare Platform

Medi-Connect is a modern healthcare platform that combines AI-powered diagnosis, video consultations, and comprehensive health tracking to provide accessible and efficient healthcare services.

## Features

### AI-Powered Symptom Analysis
- Real-time symptom analysis using Google's Gemini AI
- Confidence-based diagnosis suggestions
- Detailed condition descriptions and recommendations
- Severity assessment for symptoms
- Diagnosis history tracking

### Video Consultations
- High-quality video calls with doctors
- Real-time WebRTC integration
- Audio/video controls
- Consultation notes
- Call duration tracking
- Fullscreen support

### Health Data Visualization
- Interactive charts for health metrics
- Weight tracking
- Blood pressure monitoring
- Heart rate analysis
- Health insights and recommendations

### Appointment Management
- Schedule video consultations
- View upcoming and past appointments
- Appointment status tracking
- Doctor profiles and availability
- Automated reminders

### Subscription Plans
- Free tier with basic features
- Premium plan with advanced features
- Enterprise plan for families
- Secure Stripe payment integration
- Flexible billing options

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API
- **Video Calls**: WebRTC, Simple Peer
- **Payments**: Stripe
- **Charts**: Recharts
- **Icons**: React Icons
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Stripe account and API keys

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_api_url
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbhinavAnand241201/Medi-Connect.git
   cd Medi-Connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── common/           # Shared components
│   │   ├── ai-diagnosis/
│   │   ├── appointments/
│   │   ├── billing/
│   │   ├── health-data/
│   │   └── video-consultation/
│   └── screens/          # Screen components
├── store/               # Zustand store
├── styles/             # Global styles
└── types/              # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powering the symptom analysis
- Stripe for secure payment processing
- WebRTC for enabling video consultations
- All contributors and supporters of the project

## Support

For support, email support@mediconnect.com or open an issue in the GitHub repository.
