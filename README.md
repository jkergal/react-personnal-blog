## SIMPLE REACT PERSONNAL BLOG

## Description

This is a ReactJS project to set up your own personnal blog. You can write text articles, with some features like markdown articles shaping, drafts, admin dashboard, etc.
Works with **firebase**, so front-end devs: don't worry about database, auth and other back-end stuff!

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file (mainly to work with your firebase, but also to keep secured and hidden your exclusive login page URL) :

`REACT_APP_ADMIN_LOGIN_PATH_ID`=aSecureIdForYourLoginPageURL
`REACT_APP_FIREBASE_API_KEY`=yourFirebaseApiKey
`REACT_APP_FIREBASE_AUTH_DOMAIN`=yourFirebaseAuthDomain
`REACT_APP_FIREBASE_PROJECT_ID`=yourFirebaseProjectId
`REACT_APP_FIREBASE_STORAGE_BUCKET`=yourFirebaseStorageBucket
`REACT_APP_FIREBASE_MESSAGING_SENDER_ID`=yourFirebaseMessagingId
`REACT_APP_FIREBASE_APP_ID`=yourFirebaseAppId

Create this .env.local file at the root of your project folder.

## Packages Installation

To run this project :

```packages installation
  npm install
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Authors

-   [@jkergal](https://github.com/jkergal) (hello@johannkergal.fr)

## 🔗 Links

[![website](https://img.shields.io/badge/my_website-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://johannkergal.fr/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johannkergal)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/zetyd)

---

## Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run format`

Works with the .prettierrc and .eslintrc.json configs

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
