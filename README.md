# 🍳 Tastebuds

Your personal AI sous-chef for discovering, creating, and organizing recipes.

![Status](https://img.shields.io/badge/status-in%20progress-blue)

## 📖 About The Project

Tastebuds is a mobile app born from a passion for cooking and a desire to leverage AI to make the kitchen experience more creative and less stressful. Current AI chat tools are great for generating recipes, but they lack the structure, storage, and display features needed for a real cooking workflow.

This app aims to solve that by providing a dedicated platform to:
*   **Reduce decision fatigue** by suggesting what to cook.
*   **Minimize food waste** by creating recipes from ingredients you already have.
*   **Build culinary confidence** with an easy-to-use, AI-powered cooking partner.

## ✨ Core Features

*   🤖 **AI Recipe Generation:** A conversational interface to request recipes by ingredients, cuisine, dietary needs, and more.
*   📚 **Digital Recipe Book:** A personal library to save, search, and edit your favorite recipes.
*   🛒 **Smart Shopping List:** Automatically create a consolidated shopping list from the ingredients in your chosen recipes.
*   👤 **User Personalization:** Set your dietary preferences to ensure all AI suggestions are tailored to you.

## 🛠️ Tech Stack

This project is built with a modern, cross-platform stack:

*   **Frontend:** React Native (with Expo)
*   **Backend & Database:** Firebase (Firestore, Authentication, Storage)
*   **AI Integration:** OpenAI API

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/[YOUR_USERNAME]/tastebuds.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd tastebuds
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    You will need to create a `.env` file in the root of the project to store your Firebase and OpenAI API keys.

5.  **Run the application:**
    ```sh
    npx expo start
    ```
    This will launch the Metro bundler. You can then run the app on a simulator or on a physical device using the Expo Go app.

## 🗺️ Project Roadmap

This is an active project. Key features planned for development include:

*   [ ] Real-time AI response streaming
*   [ ] Offline-first architecture for recipe book access
*   [ ] Image recognition for scanning ingredients
*   [ ] Export functionality (PDF, social sharing)

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.