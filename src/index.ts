import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { ILauncher } from '@jupyterlab/launcher';
import { ITranslator } from '@jupyterlab/translation';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { IBlocklyRegisty } from 'jupyterlab-blockly/lib/token';
import Blocklyplugin from 'jupyterlab-blockly';

import BlocklyNiryo from './niryo_one_python_generators';

/**
 * Initialization data for the jupyterlab-niryo-one extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-niryo-one:plugin',
  autoStart: true,
  requires: [
    ILayoutRestorer,
    IRenderMimeRegistry,
    IEditorServices,
    IFileBrowserFactory,
    ISettingRegistry,
    ITranslator
  ],
  optional: [ILauncher, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    restorer: ILayoutRestorer,
    rendermime: IRenderMimeRegistry,
    editorServices: IEditorServices,
    browserFactory: IFileBrowserFactory,
    settings: ISettingRegistry,
    translator: ITranslator,
    launcher: ILauncher | null,
    palette: ICommandPalette | null
  ) => {
    console.log('JupyterLab extension jupyterlab-niryo-one is activated!');

    // Activating the Blockly plugin.
    const BlocklyReturn = Blocklyplugin.activate(
      app,
      restorer,
      rendermime,
      editorServices,
      browserFactory,
      settings,
      translator,
      launcher,
      palette
    );

    //Registering the new toolbox containing all Niryo One blocks.
    (BlocklyReturn as IBlocklyRegisty).registerToolbox(
      'niryo',
      BlocklyNiryo.Toolbox
    );
  }
};

export default plugin;
