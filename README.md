# Setup
**Run `npm i` to intall dependencies**
# How to use tailwind
Our project's tailwind.config.js includes customized settings for colors, typography, borders,... based on figma design.
## Custom Colors
We have defined a palette of custom colors. To apply these colors in your project:

- For Text: Prefix the color name with text-, e.g., text-keiken-purple. 
- For Backgrounds: Prefix the color name with bg-, e.g., bg-keiken-blue. 
- For Borders: Prefix the color name with border-, e.g., border-border-blue.
#### Example:

```javascript
// Apply custom text color
<div className="text-keiken-purple">
    <p>This text is colored with our custom purple.</p>
</div>

// Apply custom background color
<div className="bg-keiken-blue">
    <p>This background is colored with our custom blue.</p>
</div>

// Apply custom border color
<div className="border-2 border-border-blue">
    <p>This element has a 2px solid border in custom blue.</p>
</div>


```

## Typography
- Roboto Font: font-roboto
- Font Sizes: Use text-xs, text-base, text-lg

#### Example:

```javascript
<div className="font-roboto text-base">
    <p>This paragraph uses the Roboto font at base size.</p>
</div>
```
## Borders and Radius
- Borders: Use border-1, border-2 for 1px or 2px borders, respectively
- Radius: For specific border-radius configurations, use rounded-none-top.

#### Example:

```javascript
<div className="rounded-none-top border-2 border-border-blue">
    <p>Box with custom border radius and 2px border in blue.</p>
</div>

```

## Adding new customizations
If you need a style that is not yet defined, add it to tailwind.config.js under the appropriate section:

- Open tailwind.config.js:
- Located in the root of our project.
- Extend the Theme: Add your new styles under the extend object in the config. 

## Use tailwind css for our components (specified in figma)
### Create React Components
- SecondarySmallButton.js
```javascript
import React from 'react';

const SecondarySmallButton = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="w-36 h-7.5 bg-keiken-blue text-white font-roboto text-base leading-[18.75px] opacity-0 rounded-none">
            {text}
        </button>
    );
};

export default SecondarySmallButton;

```
- SmallButton.js
```javascript
import React from 'react';

const SmallButton = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="w-36 h-7.5 bg-keiken-blue text-white rounded-none opacity-0">
            {label}
        </button>
    );
};

export default SmallButton;
```
### How to use them:
````javascript
const App = () => {
  return (
    <div className="space-x-2">
      <SmallButton label="Next" onClick={() => console.log("Next Action")} />
      <SecondarySmallButton text="Previous" onClick={() => console.log("Previous Action")} />
    </div>
  );
};

export default App;

````

# What to change in webpack.dev.js for microfrontends?
the best suggested way to add config is:
- create a .env file in config directory and paste this into it:
````text
const port = 8081; //set this
const backendUrl = 'http://localhost:8090/' //orchestration service URL
module.exports = {
    backendUrl: backendUrl,
    port: port,
    publicPath: `http://localhost:${(port)}/`,
    name: 'nameOfMicrofrontend', //set this
    filename: 'remoteEntry.js',
    exposes:{
        './NameOfMicrofrontendApp': './src/index', //set this to your index.js (or any other entry file)
    }
};
````
**Respect please this convention: if your microfrontend name is "marketing" you should expose the index as "MarketingApp"**

- change your `webpack.dev.js` to: 

````text
const packageJson = require('../package.json');
const env = require('./env');

const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
    require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common.js');
const devConfig = {
    mode: 'development',
    output: {
        publicPath: env.publicPath,
    },
    devServer: {
        port: env.port,
        historyApiFallback: {
            index: 'index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: env.name,
            filename: env.filename,
            exposes: env.exposes,
            shared: packageJson.dependencies,
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]


};
module.exports = merge(commonConfig, devConfig);

````

--> This will help you to focus just on necessary configurations, you'll need just to modify the env file.