# Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install react-native-chat-ui`
- Using [Yarn](https://yarnpkg.com/): `yarn add react-native-chat-ui`

# Example

- [https://github.com/SinanBaymammadli/react-native-chat-ui-example](https://github.com/SinanBaymammadli/react-native-chat-ui-example)

### Updating package

- npm login
- npm version [patch, minor, major]
- npm publish

### Development

- sudo npm install -g wml
- git clone https://github.com/SinanBaymammadli/react-native-chat-ui.git
- git clone https://github.com/SinanBaymammadli/react-native-chat-ui-dev.git
- cd react-native-chat-ui
- wml add ./ ../react-native-chat-ui-dev/node_modules/react-native-chat-ui
- wml start (re-run this everytime you run yarn add)
- cd ../react-native-chat-ui-dev
- react-native run-ios
