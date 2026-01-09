# Task Manager

A modern, feature-rich task management application built with Next.js 15, React 19, and MongoDB. Organize your tasks with drag-and-drop functionality, dark mode support, and seamless Google authentication.

## ✨ Features

- 🎯 **Drag & Drop**: Intuitive task organization across three columns (To Do, In Progress, Done)
- 🌓 **Dark Mode**: Beautiful light and dark themes with smooth transitions
- 🔐 **Google Authentication**: Secure sign-in with NextAuth.js
- 💾 **Auto-Save**: Tasks automatically save every 30 seconds
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Updates**: Instant task updates with MongoDB
- 🎨 **Modern UI**: Gradient designs, smooth animations, and fluid interactions
- 📦 **PWA Ready**: Progressive Web App capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-app-main
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Theme**: next-themes

## 📁 Project Structure

```
todo-app-main/
├── src/
│   └── app/
│       ├── api/              # API routes
│       ├── components/       # React components
│       │   └── Draggable/   # Drag & drop components
│       ├── lib/             # Database models & utilities
│       ├── globals.css      # Global styles
│       ├── layout.js        # Root layout
│       └── page.js          # Home page
├── public/                  # Static assets
└── package.json            # Dependencies
```

## 🎨 Features in Detail

### Task Management
- Create, edit, and delete tasks
- Drag tasks between columns
- Real-time task count per column
- Empty state indicators

### User Experience
- Smooth animations and transitions
- Loading states with spinners
- Success/error notifications
- Keyboard shortcuts (Enter to add, Escape to cancel)

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Configuration

### MongoDB Setup
1. Create a MongoDB database (MongoDB Atlas recommended)
2. Get your connection string
3. Add it to `.env.local`

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Netlify
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and React
- Icons by Lucide
- Drag & Drop by dnd-kit
