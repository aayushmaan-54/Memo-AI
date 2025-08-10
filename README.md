# 📝 Memo AI
Memo AI is a modern, AI-powered note-taking application that lets you **create, read, update, and delete** notes while also providing an integrated chatbot to query information directly from your saved notes. The chatbot can even share **links to relevant notes**, making your workflow faster and more intuitive.

## 🚀 Features
- ✍ **CRUD Notes** — Create, Read, Update, and Delete your notes.
- 🤖 **AI Chatbot Support** — Query your notes in natural language.
- 🔗 **Note Linking** — Get direct links to relevant notes from chatbot responses.
- ✅ **Form Validation** — Strong type-safe validation with Zod + React Hook Form.
- 🔐 **Authentication** — Secure login and signup powered by Convex Auth.
- 🔥 **Real-time Updates** — Powered by Convex for instant sync across devices.
- 📱 **Responsive UI** — Built with ShadCN UI for a clean, modern design.

## 🛠 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)
- **UI Library:** [ShadCN UI](https://ui.shadcn.com/)
- **AI SDK:** [Vercel AI SDK](https://ai-sdk.dev/)
- **Backend & DB:** [Convex](https://convex.dev/)
- **Auth:** [Convex Auth](https://docs.convex.dev/auth)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Markdown Rendering:** [React Markdown](https://remarkjs.github.io/react-markdown/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)


## ⚙️ Setup and Deployment
Follow these instructions to get the project running on your local machine for development and testing purposes, and to deploy it to production using Vercel.
### 1. Local Development Setup
**Steps:**
1.  **Initialize Convex:**
    Link your local project to your Convex account. This will create a new project in your Convex dashboard.
    ```bash
    npx convex dev
    ```
2.  **Set Backend Environment Variables in Convex:**
    Go to your [Convex Dashboard](https://dashboard.convex.dev/). Select your project and go to Settings -> Environment Variables. Add the following secrets for your dev deployment:
    - `AUTH_GOOGLE_ID`
    - `AUTH_GOOGLE_SECRET`
    - `GOOGLE_GENERATIVE_AI_API_KEY`
    - `SITE_URL` (For local development, this should be http://localhost:3000)

3.  **Run the Development Servers:**
    You need to run two commands in parallel in **separate terminal windows**.
    * **Terminal 1:** Start the Convex backend server.
        ```bash
        npx convex dev
        ```
    * **Terminal 2:** Start the Next.js frontend server.
        ```bash
        npm run dev
        ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

### 2. Production Deployment (Vercel)
**Step A: Configure Convex for Production**
1.  **Create Production Deployment:** In your [Convex Dashboard](https://dashboard.convex.dev/), select your project. Go to **Settings** and click **Create a production deployment**.

2.  **Set Production Environment Variables:** Select the `prod` deployment from the dropdown. Go to **Settings -> Environment Variables** and add the same variables as in your local setup, but using your **production values**.

3.  **Generate Deploy Key:** In the `prod` deployment settings, go to **URL & Deploy Key** and **Generate** a new deploy key. Copy this key for the next step.

4.  **(One-Time) Configure Production Auth:** Run the following command locally. It will provide you with the correct **Authorized redirect URI** to use in your Google Cloud Console for your production app.
    ```bash
    npx @convex-dev/auth --prod
    ```

**Step B: Configure and Deploy on Vercel**
1.  **Create Vercel Project:** Go to your Vercel dashboard and create a new project, importing your Git repository.

2.  **Override Build Command:** In the project settings (**Settings -> General**), override the **Build Command** with the following:
    ```bash
    npx convex deploy --cmd "npm run build"
    ```

3.  **Add Vercel Environment Variables:** Go to **Settings -> Environment Variables** and add:
    * `CONVEX_DEPLOY_KEY`: The deploy key you copied from the Convex dashboard.
    * The **production URL & Envs** from your Convex dashboard (it's different from your dev URL).

4.  **Deploy:** Trigger a new deployment in Vercel. Your application is now live!
