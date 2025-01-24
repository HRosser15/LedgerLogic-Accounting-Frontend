# Ledger Logic Frontend - Vite React App

This branch contains the setup for the Vite React app in the Ledger Logic Frontend project.

## Prerequisites

#### Node

- Check if you have Node installed on your machine by using `node -v`
  if this doesn't return a version, please install [Node.js](https://nodejs.org/) as VITE requires it.

#### VSCode

- Download and install from the [Official VSCode website](https://code.visualstudio.com/download) if you don't already have it.

#### Git

- Check if you have git installed by using
  `git --version`
- If you don't have it or don't have the most recent version, download and install from the [Offical Git website](https://git-scm.com/downloads)
- Open VSCode, click the extensions button on the left, search for `Git` and install it.


## Getting Started

To work on this Vite React app locally, follow these steps:

#### Clone the Repository

```bash
git clone https://github.com/HRosser15/LedgerLogic-Accounting-Frontend.git
```

#### Navigate Into the Local Repository

```bash
cd Front-End
```

#### Create your branch for the feature you're working on (optional)

```bash
git checkout -b your-branch-name
```

#### Install Dependencies

```bash
npm install
```

#### Start the Development Server
```bash
npm run dev
```
- Open the application by accessing the URL that pops up in the terminal. By default, it should be ```http://localhost:5173/```.
- The web application should now open. The only thing left to do is run the backend server and mail server if you haven't already. Instructions to do so can be found here: https://github.com/Ledger-Logic/Back-End/blob/main/README.md

## Logging in and accessing features
### Pre-created user accounts
You can log in to pre-created user accounts with the following credentials:

#### Admin
username: hrosser0424
password: Password1!

#### Manager
username: bwilson0424
password: Password1!

#### Accountant
username: ksmith0424
password: Password1!

### Creating a new account
You can create a new account by clicking "Register Now" from the landing page.

### Other Features
Instructions for using features within the app can be found in the Help page, accessible from the footer.

# Troubleshooting

**Issue:** The Page is Blank when I access the URL
**Solution:** Press F12 or Right-click the page and click "inspect" to access the web developer console.
### Error Messages:
```Failed to load resource: net::ERR_BLOCKED_BY_CLIENT```
- This error most likely means that your browser or an extension you have is blocking the page from loading. Please disable your ad blocker to allow this page to load.

```Missing Dependencies```
- While using `npm install` should install everything you need to run the application, if you receive any errors regarding dependencies when running the Vite + React application, you can install them using the commands below.
```bash
npm install vite
npm install axios
npm install bootstrap
npm install html2canvas
npm install html2pdf.js
npm install react-bootstrap
npm install react-datepicker
npm install react-dom
npm install react-modal
npm install react-router-dom
npm install react-tooltip
npm install reactstrap
```

# React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
