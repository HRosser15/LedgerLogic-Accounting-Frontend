# Ledger Logic Frontend - Vite React App

This branch contains the setup for the Vite React app in the Ledger Logic Frontend project.

## Prerequisites
#### Node
- Check if you have Node installed on your machine by using ```node -v```
if this doesn't return a version, please install [Node.js](https://nodejs.org/) as VITE requires it.

#### VSCode
- Download and install from the [Official VSCode website](https://code.visualstudio.com/download) if you don't already have it.

#### Git
- Check if you have git installed by using
          ```git --version```
- If you don't have it or don't have the most recent version, download and install from the [Offical Git website](https://git-scm.com/downloads)
- Open VSCode, click the extensions button on the left, search for ```Git``` and install it.

<p>. </p>
<p>. </p>

## Getting Started

To work on this Vite React app locally, follow these steps:

#### Clone the Repository

```bash
git clone https://github.com/Ledger-Logic/Front-End.git
```

#### Navigate Into the Local Repository
```bash
cd Front-End
```

#### Create your branch for the feature you're working on
```bash
git checkout -b your-branch-name
```
#### Install Dependencies (you may be able to skip this step)
```bash
npm install
```
#### Start the Development Server
```bash
npm run dev
```
You can then view the app and any changes you make at the localhost url it displays in your terminal

## Start Backend Server
Please follow the [README instructions for the backend repo](https://github.com/Ledger-Logic/Back-End/blob/main/README.md).
For the frontend and postman APIs to work, you will need to run:
- The backend server
- The mail server

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

