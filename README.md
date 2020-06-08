This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# smart-react-test-app
Coding challenge

Room Occupancy Manager
Requirements Build a room occupancy optimization tool for one of our hotel clients! Our customer has a certain number of free rooms each night, as well as potential guests that would like to book a room for that night.
Our hotel clients have two different categories of rooms: Premium and Economy. Our hotels want their customers to be satisﬁed: they will not book a customer willing to pay EUR 100 or more for the night into an Economy room. But they will book lower paying customers into Premium rooms if these rooms would be empty and all Economy rooms will be ﬁlled by low paying customers. Highest paying customers below EUR 100 will get preference for the “upgrade”. Customers always only have one speciﬁc price they are willing to pay for the night.
Please build a small app that provides an interface for hotels to enter the numbers of Premium and Economy rooms that are available for the night and then tells them immediately how many rooms of each category will be occupied and how much money they will make in total. Potential guests are represented by an array of numbers that is their willingness to pay for the night. This data does not need to be part of the UI.
Requirements for a valid solution: • Tracking progress through Git commits • Minimal readme explaining how to run the project • Tests/TDD (at least use the ones speciﬁed above) • A working algorithm implemented in JavaScript ES6 (TypeScript is ok) • Usage of React for the UI • State management using React Context Api, Redux, or RxJS • Clean code structure and formatting • Thoughtful naming of variables and functions • Go for high code quality rather than completeness if you feel time pressure
Nice to haves: • Nice design/formatting of the UI • Anything else you would like to add
You don’t need to do every part of the challenge perfectly. Most of all try to show your strengths. And if you feel unable to ﬁnish the project in time or can not fulﬁll any of the requirements for whatever reason, please let us know before you start working so that we can ﬁnd another solution.
Use the following raw json ﬁle as mock data for potential guests in your tests. Include the downloaded ﬁle in the project or get and parse it from the Github directly: • https://gist.github.com/lwhiteley/b01cf0964e19704df06fccf44d0c3c4d
Test results you should get:
Test 1 • Free Premium rooms: 3 Free Economy rooms: 3 • Usage Premium: 3 (EUR 738) Usage Economy: 3 (EUR 167) Test 2 • Free Premium rooms: 7 Free Economy rooms: 5 • Usage Premium: 6 (EUR 1054) Usage Economy: 4 (EUR 189) Test 3 • Free Premium rooms: 2 Free Economy rooms: 7 • Usage Premium: 2 (EUR 583) Usage Economy: 4 (EUR 189) Test 4 • Free Premium rooms: 7 Free Economy rooms: 1 • Usage Premium: 7 (EUR 1153) Usage Economy: 1 (EUR 45)
Please share the project with us through Github or any other Git based code sharing platform (i.e. Gitlab, Bitbucket etc.). If the repository is private, feel free to invite us to the repository by requesting the necessary emails to add