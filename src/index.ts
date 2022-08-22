import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IBlocklyRegistry } from 'jupyterlab-blockly';

import { BlocklyNiryo, BlocklyNed } from './niryo_one_python_generators';

/**
 * Initialization data for the jupyterlab-niryo-one extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-niryo-one:plugin',
  autoStart: true,
  requires: [IBlocklyRegistry],
  activate: (app: JupyterFrontEnd, blockly: IBlocklyRegistry) => {
    console.log('JupyterLab extension jupyterlab-niryo-one is activated!');

    //Registering the new toolbox containing all Niryo One blocks.
    blockly.registerToolbox('niryo', BlocklyNiryo.Toolbox);

    //Registering the new toolbox containing all Niryo One blocks.
    blockly.registerToolbox('ned2', BlocklyNed.Toolbox);
  }
};

export default plugin;
