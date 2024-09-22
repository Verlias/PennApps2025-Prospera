# 💸 PennApps2025 - Prospera: AI-Powered Budgeting Tool

## Team Members:
 - Logan Voravong: lsv27@drexel.edu
 - Aman Sharma: amanshar@sas.upenn.edu
 - Taqi Tahmid: tt676@drexel.edu
 - Jacob Rimmer: rimmerj@seas.upenn.edu

## 📖 Overview
Prospera is an AI-powered budgeting application built with advanced web technologies. It empowers users to manage their finances more effectively by utilizing machine learning to analyze spending patterns and deliver personalized budget recommendations. Capital One is integrated for real-time financial data, ensuring seamless connectivity with users' banking information, while PropelAuth provides secure and scalable user authentication. Additionally, the Cerebras AI platform powers the deployment of the LLaMA Large Language Model (LLM) for our chatbot, offering rapid and precise financial insights.

## 🛠️ Technologies Used

### 🎨 Frontend
- **React**: ⚛️ UI framework for building the interactive frontend.
- **Tailwind CSS**: 💨 Utility-first CSS framework for rapid UI development.
- **CSS**: 🎨 Styling framework for a responsive and polished user experience.

### 🔧 Backend
- **Flask**: 🍃 A lightweight Python web framework for creating the backend API.
- **Python**: 🐍 The primary programming language used for backend services and machine learning.
- **scikit-learn**: 🧠 For building and training the machine learning models used for budget prediction.

### 🗄️ Database
- **MongoDB**: 🍃 A NoSQL database used to store user financial data.

### 🤖 Machine Learning
- **scikit-learn**: 🔍 Library for predictive analytics and data manipulation.
- **Cerebras**: ⚡ AI platform used to deploy LLaMA Large Language Model (LLM) for fast and efficient chatbot inference.

### 🔑 Authentication & APIs
- **PropelAuth**: 🔒 For secure user authentication.
- **Capital One**: 🏦 To fetch and integrate banking and financial data.
- **Cerebras**: ⚡ The fastest AI inference platform, used to deploy the LLaMA Large Language Model (LLM) for our chatbot, enabling 20x faster inference compared to NVIDIA GPUs.


### ☁️ Cloud Services
- **AWS**: ☁️ For hosting the backend services and machine learning models.

## 🚀 Setup Instructions

### 📋 Prerequisites
- **Node.js** and **npm**: Required to run the React frontend.
- **Python 3.x**: Required to run the Flask backend.
- **MongoDB**: For the database (either locally or via a cloud provider like MongoDB Atlas).

## Inspiration
We were inspired by the importance of **financial well-being** 💰 and the growing need for personalized financial tools that help individuals make informed decisions about their money. With the rise of AI technologies, we saw an opportunity to provide users with a smart budgeting tool that can offer insights tailored to their spending habits.

## What it does
Prospera provides **personalized budget optimization** 📊 by analyzing users' spending patterns. It delivers budget recommendations, predicts future spending behavior, and helps users improve their financial management. Additionally, the integrated chatbot uses AI 🤖 to offer real-time financial insights and tips.

## How we built it
We developed the **frontend using React** ⚛️, ensuring a seamless and responsive user interface. For the **backend**, we used **Flask** 🍃, which handles user requests, connects to our **MongoDB** 🗄️ database for data storage, and integrates machine learning models built with **scikit-learn** 🔍. We deployed the **Cerebras AI platform** ⚡ to handle our chatbot's AI inference, powered by the **LLaMA Large Language Model (LLM)** 📚, and used **Capital One’s CerebrAPI** 🏦 for real-time financial data. **PropelAuth** 🔑 was used to ensure secure authentication for all users.

## Challenges we ran into
- **Integrating Capital One’s CerebrAPI** with real-time financial data while ensuring security and accuracy.
- **Deploying the LLaMA model** on the Cerebras platform and optimizing its performance for real-time interactions.
- Managing **data security** 🔒 and privacy concerns, especially with sensitive financial data.
- Ensuring a smooth **frontend-backend connection**, especially with complex API calls and machine learning predictions.

## Accomplishments that we're proud of
- Successfully deploying an **AI-powered chatbot** 🤖 that can deliver fast and accurate financial insights using the **Cerebras platform**.
- Creating a smooth and intuitive **user interface** 🌟 that allows users to effortlessly manage their budgets.
- **Integrating real-time financial data** from Capital One’s CerebrAPI to provide users with up-to-date information.
- Ensuring **secure and scalable user authentication** 🔒 with PropelAuth.

## What we learned
- How to effectively integrate **AI and machine learning models** into a real-time application for financial analysis.
- The importance of ensuring **data security** 🔐 when dealing with sensitive financial information.
- How to deploy and scale an AI application using cutting-edge platforms like **Cerebras**.
- Optimizing both frontend and backend performance for a **better user experience**.

## What's next for Prospera
- **Expanding the machine learning models** to offer more detailed financial insights and predictions.
- Integrating additional **financial services APIs** to offer users a wider range of features.
- Adding more **personalization features** ✨ based on individual user financial goals and behavior.
- Continuing to improve the **chatbot** for more advanced interactions and financial advice.
- Exploring mobile app development 📱 to make Prospera more accessible on the go.


