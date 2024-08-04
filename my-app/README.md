# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
###  @dotnet run 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
### @dotnet test 

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### About this project
This project is a diary application using .NET for the backend and React (TypeScript) for the frontend. The backend-related code is located in the backend folder, and MS SQL (NoSQL) server is used for the database. The project includes features such as sign-in, registration, posting a diary, deleting a diary, reading a diary, and updating a diary. Originally, we planned to implement AI feedback for users' diaries, but due to time constraints, we couldn't include it. Apart from AI feedback generation, we also aimed to use cookies and sessions to showcase backend knowledge.

This was my first experience developing a client-side rendering project, and I was initially confused with server-side rendering methods. Despite the challenges, it was a great opportunity and experience. Although phase 2 of the project is completed, we plan to continuously update it, including the addition of cookies, sessions, and AI feedback generation.

The one thing that I am proud of is I did not give up. There were 4 times that I wanted to give up to develop with .NET. However I kept pushed myself into challenges and I could developed the basic CRUD project. Looking back, this is the first time that I developed CRUD project by myself. Through this, I could get technological skills, however I feel like I got a mindset as a developer. Thus, I would like to say that this is the proudest thing. 

The basic features include CRUD operations, login, and sign-up. An advanced feature I implemented is using a salt method to securely store users' passwords.