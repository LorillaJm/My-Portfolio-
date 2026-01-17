![Alt](https://repobeats.axiom.co/api/embed/18a869f14f7a8c4bac0019a443211d39c668f440.svg "Repobeats analytics image")

# John Michael Lorilla - Portfolio

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer. Built with React, TypeScript, and Material-UI featuring smooth animations and 3D effects.

## 🌐 Live Demo

[https://my-portfolio-lilac-nine-87.vercel.app](https://my-portfolio-lilac-nine-87.vercel.app)

## ✨ Features

- 🎨 Modern UI with dark/light theme toggle
- 📱 Fully responsive design (mobile-first)
- ⚡ Smooth animations with Framer Motion
- 🎭 3D effects with Three.js
- 📧 Contact form with EmailJS integration
- 🔥 Firebase backend integration
- 🚀 Deployed on Vercel

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Material-UI (MUI)
- **Animations:** Framer Motion, GSAP
- **3D Graphics:** Three.js, React Three Fiber
- **Backend:** Firebase
- **Email:** EmailJS
- **Build Tool:** Vite
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LorillaJm/My-Portfolio-.git
cd My-Portfolio-
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/       # React components
│   ├── 3d/          # Three.js 3D components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Home.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── config/          # Firebase configuration
├── contexts/        # React context (Theme)
├── types/           # TypeScript type definitions
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

- **Email:** lorillajm011@gmail.com
- **LinkedIn:** [John Michael Lorilla](https://www.linkedin.com/in/john-michael-lorilla-a933782a6/)
- **GitHub:** [LorillaJm](https://github.com/LorillaJm)
