This is a [Vocs] (https://vocs.dev) documentation project bootstrapped with the Vocs CLI.

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/NethermindEth/starkweb.git
cd app/starkweb/docs
npm i vocs
```

Then add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "docs:dev": "vocs dev",
    "docs:build": "vocs build",
    "docs:preview": "vocs preview"
  }
}
```

To start the development server, run:

```bash
npm run docs:dev
```

This will launch the documentation site at [http://localhost:5173](http://localhost:5173).

### Building for Production

To build the documentation for production:

```bash
npm run docs:build
```

To preview the production build:

```bash
npm run docs:preview
```

Visit the [Vocs documentation](https://vocs.dev) for more complex functionality around the tool.