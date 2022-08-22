# jupyterlab-niryo-one

Blockly extension for JupyterLab to control a Niryo robot.

## Blockly

Blockly is a library from Google for building beginner-friendly block-based programming languages.

Docs: https://developers.google.com/blockly/guides/overview
Repo: https://github.com/google/blockly

## Niryo robots

The Niryo robots are collaborative and open source 6-axis robots made in France for: higher education, vocational training and R&D laboratories. Its use is particularly adapted to study robotics and programming in the context of the industry 4.0.

Docs: https://niryo.com
Repo for Niryo One: https://github.com/NiryoRobotics/niryo_one_ros

## PyNiryo API

The extension is using the latest version of the `pyniryo` API - `v1.1.2`. This version is compatible with the Niryo, Ned and Ned2 robots.

The Niryo One and Ned robots are compatible with the `niryo` toolbox, whereas the Ned2 robot has the `ned2` toolbox. You can use all 130 blocks from each toolbox to program your robot.

Docs: https://docs.niryo.com/dev/pyniryo/v1.1.2/en/index.html

## Requirements

- JupyterLab == 3.4

## Install

To install the extension, execute:

```bash
conda install jupyterlab-niryo-one -c conda-forge
```

#### Kernels

- ipykernel
- xeus-python
- xeus-lua
- [JavaScript](https://github.com/n-riesco/ijavascript#installation)
- [JavaScript](https://github.com/yunabe/tslab)

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab-niryo-one
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
micromamba create -n niryo -c conda-forge python nodejs yarn jupyterlab==3.4 jupyter-packaging jupyterlab-language-pack-es-ES jupyterlab-language-pack-fr-FR ipykernel xeus-python xeus-lua
micromamba activate niryo
# Clone the repo to your local environment
# Change directory to the jupyterlab_niryo_one directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab-niryo-one
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab_niryo_one` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
