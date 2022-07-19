import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IBlocklyRegisty } from 'jupyterlab-blockly';

import BlocklyNiryo from './niryo_one_python_generators';

/**
 * Initialization data for the jupyterlab-niryo-one extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-niryo-one:plugin',
  autoStart: true,
  requires: [IBlocklyRegisty],
  activate: (app: JupyterFrontEnd, blockly: IBlocklyRegisty) => {
    console.log('JupyterLab extension jupyterlab-niryo-one is activated!');

    //Registering the new toolbox containing all Niryo One blocks.
    blockly.registerToolbox('niryo', BlocklyNiryo.Toolbox);
  }
};

export default plugin;
