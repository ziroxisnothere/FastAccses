# FastAccses

FastAccses is a small, English-language desktop launcher built with Electron. Add paths to applications, files, or folders and launch them from one clean dashboard.

## Features

- Add any application, file, or folder path.
- Choose paths with native file and folder pickers.
- Assign an emoji icon to every shortcut.
- Launch with one click.
- Store all shortcut data locally in the operating system's Electron `userData` directory. No cloud or remote database is used.
- Remove individual shortcuts or clear the entire list.
- GitHub Actions builds Windows, Linux, and macOS packages and publishes tagged releases.

## Development

```bash
npm install
npm start
```

## Release

Create and push a semantic version tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow builds installers and publishes them to the GitHub Release automatically.

## Note about C++ and Electron

The user interface and desktop shell are implemented with Electron, which is the native cross-platform desktop framework. The repository also includes `native/launcher.cpp`, a C++ native launcher helper that GitHub Actions compiles on each platform. Electron's secure shell bridge is used by the app at runtime so paths are launched safely without exposing Node.js APIs to the UI.

## License

MIT
