/*
    niryo_one_python_generators.js
    Copyright (C) 2017 Niryo
    All rights reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// adds Custom Niryo One blocks + Python generators

import * as Blockly from 'blockly';
import BlocklyPy from 'blockly/python';

var niryo_one_color = '#3D4D9A';

// Interface color
var logic_color = '#00876d';
var loop_color = '#49a563';
var math_color = '#5769a1';
var list_color = '#765da1';
var variable_color = '#ad5a7e';
var function_color = '#9f5ca1';
var movement_color = '#4f87c0';
var io_color = '#c05150';
var tool_color = '#bf964b';
var utility_color = '#bead76';
var vision_color = '#546e7a';
var conveyor_color = '#00838f';
var sound_color = '#FFC0CB';
var frames_color = '#4B0082';
var led_color = '65c368';
var trajectory_color = '#9370DB';

// Color object for vision
//TODO Should be in a class
const g_color_values = {
  COLOR_RED: 'RED',
  COLOR_GREEN: 'GREEN',
  COLOR_BLUE: 'BLUE',
  COLOR_ANY: 'ANY'
};

// Shape object for vision
//TODO Should be in a class
const g_shape_values = {
  SHAPE_SQUARE: 'SQUARE',
  SHAPE_CIRCLE: 'CIRCLE',
  SHAPE_ANY: 'ANY'
};

/*
 *  Blocks definition
 */

// Connection

Blockly.Blocks['niryo_one_connect'] = {
  init: function () {
    this.appendDummyInput().appendField('IP Address');
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(10, 0, 255, 0), 'ip_0')
      .appendField('.')
      .appendField(new Blockly.FieldNumber(10, 0, 255, 0), 'ip_1')
      .appendField('.')
      .appendField(new Blockly.FieldNumber(10, 0, 255, 0), 'ip_2')
      .appendField('.')
      .appendField(new Blockly.FieldNumber(10, 0, 255, 0), 'ip_3');
    this.appendStatementInput('DO');
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(function_color);
    this.setTooltip('Connect to the robot and disconnects after the execution');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_need_calibration'] = {
  init: function () {
    this.appendDummyInput().appendField('Need calibration');
    this.setOutput(true, 'Boolean');
    this.setColour(function_color);
    this.setTooltip(
      'Return a bool indicating whereas the robot motors need to be calibrate'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_calibrate_auto'] = {
  init: function () {
    this.appendDummyInput().appendField('Calibrate motors (auto)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(function_color);
    this.setTooltip(
      'Will auto calibrate motors. If already calibrated, will do nothing.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_calibrate'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['Auto', 'Auto'],
          ['Manual', 'Manual']
        ]),
        'CALIBRATE_MODE'
      )
      .appendField('calibrate mode');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(function_color);
    this.setTooltip(
      'Will auto or manually calibrate motors (robot needs to be in home position for manual calibration). If already calibrated, will do nothing.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_learning_mode'] = {
  init: function () {
    this.appendDummyInput().appendField('Get Learning Mode');
    this.setOutput(true, 'Boolean');
    this.setColour(function_color);
    this.setTooltip('Set learning mode if param is True, else turn it off.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_activate_learning_mode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['Activate', '1'],
          ['Deactivate', '0']
        ]),
        'LEARNING_MODE_VALUE'
      )
      .appendField('learning mode');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(function_color);
    this.setTooltip('Set learning mode if param is True, else turn it off.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_set_jog_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['Activate', '1'],
          ['Deactivate', '0']
        ]),
        'JOG_CONTROL_MODE_VALUE'
      )
      .appendField('Jog control mode');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(function_color);
    this.setTooltip('Set jog control mode if param is True, else turn it off:');
    this.setHelpUrl('');
  }
};

// Movement

Blockly.Blocks['niryo_one_move_joints'] = {
  init: function () {
    this.appendDummyInput().appendField('Move Joints');
    this.appendDummyInput()
      .appendField('j1')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_1'
      )
      .appendField('j2')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_2'
      )
      .appendField('j3')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_3'
      )
      .appendField('j4')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_4'
      )
      .appendField('j5')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_5'
      )
      .appendField('j6')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_6'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Give all 6 joints to move the robot. Joints are expressed in radians.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_joints'] = {
  init: function () {
    this.appendDummyInput().appendField('Get joints values');
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Get joints value in radians. You can also use a getter');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Move Pose');
    this.appendDummyInput()
      .appendField('x')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_X'
      )
      .appendField('y')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Y'
      )
      .appendField('z')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Z'
      )
      .appendField('roll')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_ROLL'
      )
      .appendField('pitch')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_PITCH'
      )
      .appendField('yaw')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_YAW'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Move robot end effector pose to a (x, y, z, roll, pitch, yaw, frame_name) pose. x, y & z are expressed in meters / roll, pitch & yaw are expressed in radians'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_linear_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Move Linear Pose');
    this.appendDummyInput()
      .appendField('x')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_X'
      )
      .appendField('y')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Y'
      )
      .appendField('z')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Z'
      )
      .appendField('roll')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_ROLL'
      )
      .appendField('pitch')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_PITCH'
      )
      .appendField('yaw')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_YAW'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Move robot end effector pose to a (x, y, z, roll, pitch, yaw) pose with a linear trajectory.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Get pose value');
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Get end effector link pose as [x, y, z, roll, pitch, yaw]. x, y & z are expressed in meters / roll, pitch & yaw are expressed in radians You can also use a getter'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_pose_quat'] = {
  init: function () {
    this.appendDummyInput().appendField('Get pose value (quaternion)');
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Get end effector link pose in Quaternion coordinates.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_shift_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Shift');
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['pos. x', '0'],
          ['pos. y', '1'],
          ['pos. z', '2'],
          ['rot. x', '3'],
          ['rot. y', '4'],
          ['rot. z', '5']
        ]),
        'SHIFT_POSE_AXIS'
      )
      .appendField('by')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'SHIFT_POSE_VALUE'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip('Shift robot end effector pose along one axis');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_shift_linear_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Shift linear');
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['pos. x', '0'],
          ['pos. y', '1'],
          ['pos. z', '2'],
          ['rot. x', '3'],
          ['rot. y', '4'],
          ['rot. z', '5']
        ]),
        'SHIFT_POSE_AXIS'
      )
      .appendField('by')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'SHIFT_POSE_VALUE'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Shift robot end effector pose along one axis, with a linear trajectory.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_set_arm_max_speed'] = {
  init: function () {
    this.appendValueInput('SET_ARM_MAX_SPEED')
      .setCheck('Number')
      .appendField('Set Arm max. speed to');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Limit arm max velocity to a percentage of its maximum velocity. Should be between 1 & 100'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_joint'] = {
  init: function () {
    this.appendDummyInput().appendField('Joints');
    this.appendValueInput('j1').setCheck('Number').appendField('j1');
    this.appendValueInput('j2').setCheck('Number').appendField('j2');
    this.appendValueInput('j3').setCheck('Number').appendField('j3');
    this.appendValueInput('j4').setCheck('Number').appendField('j4');
    this.appendValueInput('j5').setCheck('Number').appendField('j5');
    this.appendValueInput('j6').setCheck('Number').appendField('j6');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Represents an object pose');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_joint_from_joint'] = {
  init: function () {
    this.appendValueInput('JOINT')
      .setCheck('niryo_one_joint')
      .appendField('Move joint');
    this.setTooltip('Move joint with an object pose given');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_pose_from_pose'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Move pose');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip('Move pose with an object pose given');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Pose');
    this.appendValueInput('x').setCheck('Number').appendField('x');
    this.appendValueInput('y').setCheck('Number').appendField('y');
    this.appendValueInput('z').setCheck('Number').appendField('z');
    this.appendValueInput('roll').setCheck('Number').appendField('roll');
    this.appendValueInput('pitch').setCheck('Number').appendField('pitch');
    this.appendValueInput('yaw').setCheck('Number').appendField('yaw');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Represents an object pose');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_pick_from_pose'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Pick from pose');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Execute a picking from a pose. A picking is described as: going over the object, going down until height = z, grasping with tool, going back over the object'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_pick_and_place'] = {
  init: function () {
    this.appendValueInput('POSE_1')
      .setCheck('niryo_one_pose')
      .appendField('Pick from pose');
    this.appendValueInput('POSE_2')
      .setCheck('niryo_one_pose')
      .appendField('and place from pose');
    this.appendValueInput('DIST_SMOOTHING')
      .setCheck('Number')
      .appendField('with distance smoothing');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Execute a pick and a place. Distance smoothing refers to distance from waypoints before smoothing trajectory.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_place_from_pose'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Place from pose');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Execute a placing from a position. A placing is described as: going over the place, going down until height = z, releasing the object with tool, going back over the place'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_jog_joints'] = {
  init: function () {
    this.appendDummyInput().appendField('Jog Joints');
    this.appendDummyInput()
      .appendField('j1')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_1'
      )
      .appendField('j2')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_2'
      )
      .appendField('j3')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_3'
      )
      .appendField('j4')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_4'
      )
      .appendField('j5')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_5'
      )
      .appendField('j6')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_6'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Jog robot joints’. Jog corresponds to a shift without motion planning. Values are expressed in radians.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_jog_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Jog Pose');
    this.appendDummyInput()
      .appendField('x')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_X'
      )
      .appendField('y')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Y'
      )
      .appendField('z')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Z'
      )
      .appendField('roll')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_ROLL'
      )
      .appendField('pitch')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_PITCH'
      )
      .appendField('yaw')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_YAW'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Jog robot end effector pose Jog corresponds to a shift without motion planning Arguments are [dx, dy, dz, d_roll, d_pitch, d_yaw] dx, dy & dz are expressed in meters / d_roll, d_pitch & d_yaw are expressed in radians'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_to_home_pose'] = {
  init: function () {
    this.appendDummyInput().appendField('Move to home pose');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip('Move to a position where the forearm lays on shoulder.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_sleep'] = {
  init: function () {
    this.appendDummyInput().appendField('Go to sleep');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip('Go to home pose and activate learning mode.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_forward_kinematics'] = {
  init: function () {
    this.appendDummyInput().appendField('Forward Kinematics of Joints');
    this.appendDummyInput()
      .appendField('j1')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_1'
      )
      .appendField('j2')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_2'
      )
      .appendField('j3')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_3'
      )
      .appendField('j4')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_4'
      )
      .appendField('j5')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_5'
      )
      .appendField('j6')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'JOINTS_6'
      );
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip(
      'Compute forward kinematics of a given joints configuration and give the associated spatial pose'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_inverse_kinematics'] = {
  init: function () {
    this.appendDummyInput().appendField('Inverse Kinematics of Pose');
    this.appendDummyInput()
      .appendField('x')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_X'
      )
      .appendField('y')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Y'
      )
      .appendField('z')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Z'
      )
      .appendField('roll')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_ROLL'
      )
      .appendField('pitch')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_PITCH'
      )
      .appendField('yaw')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_YAW'
      );
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Compute inverse kinematics.');
    this.setHelpUrl('');
  }
};

// Saved poses

Blockly.Blocks['niryo_one_get_saved_pose'] = {
  init: function () {
    this.appendValueInput('POSE_NAME')
      .setCheck('String')
      .appendField('Get pose named');
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('Get pose saved in from Niryo’s memory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_save_pose'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Save pose')
      .appendField('x')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_X'
      )
      .appendField('y')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Y'
      )
      .appendField('z')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_Z'
      )
      .appendField('roll')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_ROLL'
      )
      .appendField('pitch')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_PITCH'
      )
      .appendField('yaw')
      .appendField(
        new Blockly.FieldNumber(0, -Infinity, Infinity, 0.001),
        'POSE_YAW'
      );
    this.appendValueInput('POSE_NAME')
      .setCheck('String')
      .appendField('under the name');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip("Save pose in Niryo's memory.");
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_delete_pose'] = {
  init: function () {
    this.appendValueInput('POSE_NAME')
      .setCheck(null)
      .appendField('Delete pose named');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(movement_color);
    this.setTooltip('Delete pose from Niryo’s memory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_saved_pose_list'] = {
  init: function () {
    this.appendDummyInput().appendField('Get list of saved poses');
    this.setOutput(true, null);
    this.setColour(movement_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

// Trajectories

// Blockly.Blocks['niryo_one_trajectory'] = {
//   // Create block which can get a trajectory (list of poses).
// };

Blockly.Blocks['niryo_one_get_trajectory_saved'] = {
  init: function () {
    this.appendValueInput('TRAJECTORY_NAME')
      .setCheck('String')
      .appendField('Get trajectory named');
    this.setOutput(true, null);
    this.setColour(trajectory_color);
    this.setTooltip('Get trajectory saved in Niryo’s memory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_saved_trajectory_list'] = {
  init: function () {
    this.appendDummyInput().appendField('Get list of saved trajectories');
    this.setOutput(true, null);
    this.setColour(trajectory_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_execute_registered_trajectory'] = {
  init: function () {
    this.appendValueInput('TRAJECTORY_NAME')
      .setCheck('String')
      .appendField('Execute trajectory named');
    this.setOutput(true, null);
    this.setColour(trajectory_color);
    this.setTooltip('Execute trajectory from Niryo’s memory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_save_last_learned_trajectory'] = {
  init: function () {
    this.appendValueInput('TRAJECTORY_NAME')
      .setCheck('String')
      .appendField('Save last executed trajectory under name');
    this.appendValueInput('TRAJECTORY_DESCRIPTION')
      .setCheck('String')
      .appendField('and description');
    this.setColour(trajectory_color);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Save last user executed trajectory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_delete_trajectory'] = {
  init: function () {
    this.appendValueInput('TRAJECTORY_NAME')
      .setCheck(null)
      .appendField('Delete trajectory named');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(trajectory_color);
    this.setTooltip('Delete trajectory from Niryo’s memory');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_clean_trajectory_memory'] = {
  init: function () {
    this.appendDummyInput().appendField('Clean trajectory memory');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(trajectory_color);
    this.setTooltip('Clean trajectory from Niryo’s memory');
    this.setHelpUrl('');
  }
};

// Dynamic frames

Blockly.Blocks['niryo_one_get_saved_dynamic_frame_list'] = {
  init: function () {
    this.appendDummyInput().appendField('Get list of saved dynamic frames');
    this.setOutput(true, null);
    this.setColour(frames_color);
    this.setTooltip('Get list of saved dynamic frames');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_saved_dynamic_frame'] = {
  init: function () {
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('Get dynamic frame named');
    this.setOutput(true, null);
    this.setColour(frames_color);
    this.setTooltip('Get name, description and pose of a dynamic frame');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_save_dynamic_frame_from_poses'] = {
  init: function () {
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('Save dynamic frame under name');
    this.appendValueInput('DYNAMIC_FRAME_DESCRIPTION')
      .setCheck('String')
      .appendField('and description');
    this.appendValueInput('POSE_1')
      .setCheck('niryo_one_pose')
      .appendField('with origin pose');
    this.appendValueInput('POSE_2')
      .setCheck('niryo_one_pose')
      .appendField('first pose');
    this.appendValueInput('POSE_3')
      .setCheck('niryo_one_pose')
      .appendField('and second pose');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip(
      'Create a dynamic frame given name, description and 3 poses (origin, x, y)'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_point'] = {
  init: function () {
    this.appendDummyInput().appendField('Point');
    this.appendValueInput('x').setCheck('Number').appendField('x');
    this.appendValueInput('y').setCheck('Number').appendField('y');
    this.appendValueInput('z').setCheck('Number').appendField('z');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(frames_color);
    this.setTooltip('Represents a point in 3D space');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_save_dynamic_frame_from_points'] = {
  init: function () {
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('Save dynamic frame under name');
    this.appendValueInput('DYNAMIC_FRAME_DESCRIPTION')
      .setCheck('String')
      .appendField('and description');
    this.appendValueInput('POINT_1')
      .setCheck('niryo_one_point')
      .appendField('with origin point');
    this.appendValueInput('POINT_2')
      .setCheck('niryo_one_point')
      .appendField('first point');
    this.appendValueInput('POINT_3')
      .setCheck('niryo_one_point')
      .appendField('and second point');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip(
      'Create a dynamic frame given name, description and 3 points (origin, x, y)'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_edit_dynamic_frame'] = {
  init: function () {
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('Modify dynamic frame named');
    this.appendValueInput('DYNAMIC_FRAME_NEW_NAME')
      .setCheck('String')
      .appendField('with new name');
    this.appendValueInput('DYNAMIC_FRAME_NEW_DESCRIPTION')
      .setCheck('String')
      .appendField('and new description');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip('Modify a dynamic frame');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_delete_dynamic_frame'] = {
  init: function () {
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('Modify dynamic frame named');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip('Delete a dynamic frame');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_relative'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Move relative to pose');
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('in frame');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip('Move robot end of a offset in a frame');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_move_linear_relative'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Move linearly relative to pose');
    this.appendValueInput('DYNAMIC_FRAME_NAME')
      .setCheck('String')
      .appendField('in frame');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(frames_color);
    this.setTooltip(
      'Move robot end of a offset by a linear movement in a frame'
    );
    this.setHelpUrl('');
  }
};

// I/O - Hardware

Blockly.Blocks['niryo_one_gpio_select'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['1A', 'GPIO_1A'],
        ['1B', 'GPIO_1B'],
        ['1C', 'GPIO_1C'],
        ['2A', 'GPIO_2A'],
        ['2B', 'GPIO_2B'],
        ['2C', 'GPIO_2C']
      ]),
      'GPIO_SELECT'
    );
    this.setOutput(true, 'niryo_one_gpio_select');
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_set_pin_mode'] = {
  init: function () {
    this.appendValueInput('SET_PIN_MODE_PIN')
      .setCheck('niryo_one_gpio_select')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Set Pin');
    this.appendDummyInput()
      .appendField('to mode')
      .appendField(
        new Blockly.FieldDropdown([
          ['INPUT', 'PIN_MODE_INPUT'],
          ['OUTPUT', 'PIN_MODE_OUTPUT']
        ]),
        'PIN_MODE_SELECT'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_digital_write'] = {
  init: function () {
    this.appendValueInput('DIGITAL_WRITE_PIN')
      .setCheck('niryo_one_gpio_select')
      .appendField('Set Pin');
    this.appendDummyInput()
      .appendField('to state')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'PIN_HIGH'],
          ['LOW', 'PIN_LOW']
        ]),
        'PIN_WRITE_SELECT'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_digital_read'] = {
  init: function () {
    this.appendValueInput('DIGITAL_READ_PIN')
      .setCheck('niryo_one_gpio_select')
      .appendField('Get Pin');
    this.appendDummyInput().appendField('state');
    this.setInputsInline(true);
    this.setOutput(true, 'niryo_one_gpio_state');
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_hardware_status'] = {
  init: function () {
    this.appendDummyInput().appendField('Get hardware status');
    this.setOutput(true, 'any');
    this.setColour(io_color);
    this.setTooltip(
      'Get hardware status : Temperature, Hardware version, motors names & types …'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_digital_io_state'] = {
  init: function () {
    this.appendDummyInput().appendField('Get digital IO state');
    this.setOutput(true, 'any');
    this.setColour(io_color);
    this.setTooltip('Get Digital IO state : Names, modes, states.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_analog_io_state'] = {
  init: function () {
    this.appendDummyInput().appendField('Get analog IO state');
    this.setOutput(true, 'any');
    this.setColour(io_color);
    this.setTooltip('Get Analog IO state : Names, modes, states.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_analog_write'] = {
  init: function () {
    this.appendValueInput('ANALOG_WRITE_PIN')
      .setCheck('niryo_one_gpio_select')
      .appendField('Set Pin');
    this.appendDummyInput()
      .appendField('to voltage')
      .appendField('VOLTAGE_VALUE')
      .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(io_color);
    this.setTooltip('Set and analog pin_id state to a value between 0 and 5V.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_gpio_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('state')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'PIN_HIGH'],
          ['LOW', 'PIN_LOW']
        ]),
        'GPIO_STATE_SELECT'
      );
    this.setOutput(true, 'niryo_one_gpio_state');
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_sw_select'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['SW1', 'SW_1'],
        ['SW2', 'SW_2']
      ]),
      'SW_SELECT'
    );
    this.setOutput(true, 'niryo_one_sw_select');
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_set_12v_switch'] = {
  init: function () {
    this.appendValueInput('SET_12V_SWITCH')
      .setCheck('niryo_one_sw_select')
      .appendField('Set 12V Switch');
    this.appendDummyInput()
      .appendField('to state')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'PIN_HIGH'],
          ['LOW', 'PIN_LOW']
        ]),
        'SET_12V_SWITCH_SELECT'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_analog_write'] = {
  init: function () {
    this.appendValueInput('ANALOG_WRITE_PIN')
      .setCheck('niryo_one_gpio_select')
      .appendField('Set Pin');
    this.appendDummyInput()
      .appendField('to state')
      .appendField(
        new Blockly.FieldDropdown([
          ['HIGH', 'PIN_HIGH'],
          ['LOW', 'PIN_LOW']
        ]),
        'PIN_WRITE_SELECT'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(io_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_analog_read'] = {
  init: function () {
    this.appendValueInput('ANALOG_READ_PIN')
      .setCheck('niryo_one_gpio_select')
      .appendField('Read analog value of pin');
    this.setOutput(true, 'any');
    this.setColour(io_color);
    this.setTooltip('Read the analog pin value.');
    this.setHelpUrl('');
  }
};

// Tool

Blockly.Blocks['niryo_one_tool_select'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Standard gripper', 'GRIPPER_1'],
        ['Large gripper', 'GRIPPER_2'],
        ['Adaptive gripper ', 'GRIPPER_3'],
        ['Electromagnet 1', 'ELECTROMAGNET_1'],
        ['Vacuum pump 1', 'VACUUM_PUMP_1']
      ]),
      'TOOL_SELECT'
    );
    this.setOutput(true, 'niryo_one_tool_select');
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_get_current_tool_id'] = {
  init: function () {
    this.appendDummyInput().appendField('Get current tool id');
    this.setOutput(true, 'niryo_one_tool_select');
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_update_tool'] = {
  init: function () {
    this.appendDummyInput().appendField('Update tool');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_grasp_with_tool'] = {
  init: function () {
    this.appendDummyInput().appendField('Grasp with tool');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Grasp with tool | This action correspond to | - Close gripper for Grippers | - Pull Air for Vacuum pump | - Activate for Electromagnet'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_release_with_tool'] = {
  init: function () {
    this.appendDummyInput().appendField('Release with tool');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Release with tool | This action correspond to | - Open gripper for Grippers | - Push Air for Vacuum pump | - Deactivate for Electromagnet'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_open_gripper'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Open gripper at speed')
      .appendField(
        new Blockly.FieldDropdown([
          ['1/5', '100'],
          ['2/5', '250'],
          ['3/5', '500'],
          ['4/5', '750'],
          ['5/5', '1000']
        ]),
        'OPEN_SPEED'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_close_gripper'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Close gripper at speed')
      .appendField(
        new Blockly.FieldDropdown([
          ['1/5', '100'],
          ['2/5', '250'],
          ['3/5', '500'],
          ['4/5', '750'],
          ['5/5', '1000']
        ]),
        'CLOSE_SPEED'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_pull_air_vacuum_pump'] = {
  init: function () {
    this.appendDummyInput().appendField('Pull air with Vacuum Pump');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('Pull air of vacuum pump.');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_push_air_vacuum_pump'] = {
  init: function () {
    this.appendDummyInput().appendField('Push air with Vacuum Pump');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_setup_electromagnet'] = {
  init: function () {
    this.appendValueInput('SETUP_ELECTROMAGNET_PIN')
      .setCheck('niryo_one_gpio_select')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Setup Electromagnet on pin');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip('Setup electromagnet on pin');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_activate_electromagnet'] = {
  init: function () {
    this.appendValueInput('ACTIVATE_ELECTROMAGNET_PIN')
      .setCheck('niryo_one_gpio_select')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Activate Electromagnet on pin');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Activate electromagnet associated to electromagnet_id on pin_id'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_deactivate_electromagnet'] = {
  init: function () {
    this.appendValueInput('DEACTIVATE_ELECTROMAGNET_PIN')
      .setCheck('niryo_one_gpio_select')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('Deactivate Electromagnet on pin');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Deactivate electromagnet associated to electromagnet_id on pin_id'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_enable_tcp'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Enable TCP')
      .appendField(
        new Blockly.FieldDropdown([
          ['True', '1'],
          ['False', '0']
        ]),
        'ENABLE_TCP'
      );
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Enables or disables the TCP function (Tool Center Point). If activation is requested, the last recorded TCP value will be applied. The default value depends on the gripper equipped. If deactivation is requested, the TCP will be coincident with the tool_link.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_set_tcp'] = {
  init: function () {
    this.appendValueInput('POSE')
      .setCheck('niryo_one_pose')
      .appendField('Set tcp with pose');
    this.setTooltip(
      'Activates the TCP function (Tool Center Point) and defines the transformation between the tool_link frame and the TCP frame.'
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_reset_tcp'] = {
  init: function () {
    this.appendDummyInput().appendField('Reset TCP');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Reset the TCP (Tool Center Point) transformation. The TCP will be reset according to the tool equipped.'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_tool_reboot'] = {
  init: function () {
    this.appendDummyInput().appendField('Reboot tool');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(tool_color);
    this.setTooltip(
      'Reboot the motor of the tool equparam_list = [workspace_name]'
    );
    this.setHelpUrl('');
  }
};
// Utility

Blockly.Blocks['niryo_one_wait'] = {
  init: function () {
    this.appendValueInput('WAIT_TIME')
      .setCheck('Number')
      .appendField('Wait for ');
    this.appendDummyInput().appendField('seconds');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(utility_color);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_comment'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Comment :')
      .appendField(new Blockly.FieldTextInput(''), 'COMMENT_TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(utility_color);
    this.setTooltip('This block will not be executed.');
    this.setHelpUrl('');
  }
};

// Vision

Blockly.Blocks['niryo_one_vision_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Color')
      .appendField(
        new Blockly.FieldDropdown([
          ['RED', 'COLOR_RED'],
          ['GREEN', 'COLOR_GREEN'],
          ['BLUE', 'COLOR_BLUE'],
          ['ANY', 'COLOR_ANY']
        ]),
        'COLOR_SELECT'
      );
    this.setOutput(true, 'niryo_one_vision_color');
    this.setColour(vision_color);
    this.setTooltip("Color object (must be used with Vision's blocks)");
  }
};

Blockly.Blocks['niryo_one_vision_shape'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Shape')
      .appendField(
        new Blockly.FieldDropdown([
          ['SQUARE', 'SHAPE_SQUARE'],
          ['CIRCLE', 'SHAPE_CIRCLE'],
          ['OBJECT', 'SHAPE_ANY']
        ]),
        'SHAPE_SELECT'
      );
    this.setOutput(true, 'niryo_one_vision_shape');
    this.setColour(vision_color);
    this.setTooltip("Shape object (must be used with Vision's blocks)");
  }
};

Blockly.Blocks['niryo_one_vision_pick'] = {
  init: function () {
    this.appendValueInput('COLOR_SWITCH')
      .setCheck('niryo_one_vision_color')
      .appendField('Vision pick');

    this.appendValueInput('SHAPE_SWITCH').setCheck('niryo_one_vision_shape');
    this.appendDummyInput().appendField('in workspace');

    this.appendValueInput('WORKSPACE_NAME').setCheck('String');

    this.appendValueInput('HEIGHT_OFFSET')
      .setCheck('Number')
      .appendField('with height offset (mm)');

    this.setOutput(true, 'Boolean');
    this.setColour(vision_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Picks the specified object from the workspace. This function has multiple phases: 1. detect object using the camera 2. prepare the current tool for picking 3. approach the object 4. move down to the correct picking pose 5. actuate the current tool 6. lift the object'
    );
    this.setInputsInline(false);
  }
};

Blockly.Blocks['niryo_one_vision_is_object_detected'] = {
  init: function () {
    this.appendValueInput('COLOR_SWITCH')
      .setCheck('niryo_one_vision_color')
      .appendField('Is object detected');

    this.appendValueInput('SHAPE_SWITCH').setCheck('niryo_one_vision_shape');
    this.appendDummyInput().appendField('in workspace');

    this.appendValueInput('WORKSPACE_NAME').setCheck('String');

    this.setOutput(true, 'Boolean');
    this.setColour(vision_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Detect is there is an object of SHAPE / COLOR in the WORKSPACE given.'
    );
    this.setInputsInline(false);
  }
};

// Conveyor

Blockly.Blocks['niryo_one_conveyor_models'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Conveyor 1', 'CONVEYOR_1'],
        ['Conveyor 2', 'CONVEYOR_2']
      ]),
      'CONVEYOR_SELECT'
    );
    this.setOutput(true, 'niryo_one_conveyor_models');

    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Conveyors available with Niryo One.');
  }
};

Blockly.Blocks['niryo_one_conveyor_use'] = {
  init: function () {
    this.appendDummyInput().appendField('Activate conveyor and return its ID');
    this.setColour(conveyor_color);
    this.setOutput(true, 'String');
    this.setHelpUrl('');
    this.setTooltip('Activate a new conveyor and return its ID.');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['niryo_one_conveyor_unset'] = {
  init: function () {
    this.appendValueInput('CONVEYOR_SWITCH')
      .setCheck('niryo_one_conveyor_models')
      .appendField('Remove conveyor');

    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Remove specific conveyor.');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['niryo_one_conveyor_control'] = {
  init: function () {
    this.appendValueInput('CONVEYOR_SWITCH')
      .setCheck('niryo_one_conveyor_models')
      .appendField('Control conveyor:');

    this.appendValueInput('SPEED_PERCENT')
      .setCheck('Number')
      .appendField('with speed (%):');

    this.appendDummyInput()
      .appendField('in direction:')
      .appendField(
        new Blockly.FieldDropdown([
          ['FORWARD', '1'],
          ['BACKWARD', '-1']
        ]),
        'DIRECTION_SELECT'
      );

    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Control the conveyor given.');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
  }
};

Blockly.Blocks['niryo_one_conveyor_run'] = {
  init: function () {
    this.appendValueInput('CONVEYOR_SWITCH')
      .setCheck('niryo_one_conveyor_models')
      .appendField('Run conveyor:');

    this.appendValueInput('SPEED_PERCENT')
      .setCheck('Number')
      .appendField('with speed (%):');

    this.appendDummyInput()
      .appendField('in direction:')
      .appendField(
        new Blockly.FieldDropdown([
          ['FORWARD', '1'],
          ['BACKWARD', '-1']
        ]),
        'DIRECTION_SELECT'
      );
    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Run conveyor');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(false);
  }
};

Blockly.Blocks['niryo_one_conveyor_stop'] = {
  init: function () {
    this.appendValueInput('CONVEYOR_SWITCH')
      .setCheck('niryo_one_conveyor_models')
      .appendField('Stop conveyor');

    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Stop the conveyor given.');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['niryo_one_get_connected_conveyors_id'] = {
  init: function () {
    this.appendDummyInput().appendField('Get list of connected conveyors');
    this.setOutput(true, null);
    this.setColour(conveyor_color);
    this.setHelpUrl('');
    this.setTooltip('Conveyors directions available with Niryo One.');
  }
};

// Sound

Blockly.Blocks['niryo_one_get_sounds'] = {
  init: function () {
    this.appendDummyInput().appendField('Get sound name list');
    this.setOutput(true, null);
    this.setColour(sound_color);
    this.setHelpUrl('');
    this.setTooltip('Get sound name list.');
  }
};

Blockly.Blocks['niryo_one_set_volume'] = {
  init: function () {
    this.appendValueInput('SET_VOLUME')
      .setCheck('Number')
      .appendField('Set volume procentage of robot to');
    this.appendDummyInput().appendField('%');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sound_color);
    this.setTooltip(
      'Set the volume percentage of the robot. Volume percentage of the sound (0: no sound, 100: max sound)'
    );
    this.setHelpUrl('');
  }
};

Blockly.Blocks['niryo_one_stop_sound'] = {
  init: function () {
    this.appendDummyInput().appendField('Stop sound');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sound_color);
    this.setHelpUrl('');
    this.setTooltip('Stop a sound being played.');
  }
};

Blockly.Blocks['niryo_one_get_sound_duration'] = {
  init: function () {
    this.appendValueInput('SOUND_NAME')
      .setCheck('String')
      .appendField('Get duration of sound named');
    this.setOutput(true, null);
    this.setColour(sound_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Returns the duration in seconds of a sound stored in the robot database raise SoundRosWrapperException if the sound doesn’t exists'
    );
  }
};

Blockly.Blocks['niryo_one_play_sound'] = {
  init: function () {
    this.appendValueInput('SOUND_NAME')
      .setCheck('String')
      .appendField('Play sound named');

    this.appendDummyInput().appendField('wait until the end');
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['True', '1'],
        ['False', '0']
      ]),
      'WAIT_END'
    );

    this.appendValueInput('START_TIME')
      .setCheck('Number')
      .appendField('starting from this second');

    this.appendValueInput('END_TIME')
      .setCheck('Number')
      .appendField('ending at this second');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sound_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Play a sound from the robot, given its name, whether to for the end of the sound before exiting the function (True or False), the start time of the sound from the value in seconds and end time of the sound at this value in seconds.'
    );
  }
};

Blockly.Blocks['niryo_one_say'] = {
  init: function () {
    this.appendValueInput('SAY_TEXT').setCheck('String').appendField('Say');
    this.appendDummyInput().appendField('in');
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['English', '0'],
        ['French', '1'],
        ['Spanish', '2'],
        ['Mandarin', '3'],
        ['Portuguese', '4']
      ]),
      'LANGUAGE_SELECT'
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(sound_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Use gtts (Google Text To Speech) to interprete a string as sound.'
    );
  }
};

// Led Ring

Blockly.Blocks['niryo_one_color'] = {
  init: function () {
    // this.appendDummyInput().appendField('Color');
    this.appendValueInput('RED').setCheck('Number').appendField('R');
    this.appendValueInput('GREEN').setCheck('Number').appendField('G');
    this.appendValueInput('BLUE').setCheck('Number').appendField('B');
    this.setOutput(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Define color in RGB. Each value has to be between 0 and 255.'
    );
  }
};

Blockly.Blocks['niryo_one_set_led_color'] = {
  init: function () {
    this.appendValueInput('LED_RING_ID')
      .setCheck('Number')
      .appendField('Set led ring with id');
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('to color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Set led ring color. The led id is between 0 and 29.');
  }
};

Blockly.Blocks['niryo_one_led_ring_solid'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Set ring to color');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Set the whole Led Ring to a fixed color.');
  }
};

Blockly.Blocks['niryo_one_led_ring_turn_off'] = {
  init: function () {
    this.appendDummyInput().appendField('Turn off led ring');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Turn off all LEDs.');
  }
};

Blockly.Blocks['niryo_one_led_ring_flashing'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Flash ring to color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Flashes a color according to a frequency. The frequency is equal to 1 / period. Duration for a pattern is in seconds, if 0 default time will be used. Frequency considered as number of consecutive flashses, if 0 the led ring flashes endlessly.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_alternate'] = {
  init: function () {
    this.appendValueInput('COLOR_1')
      .setCheck('niryo_one_color')
      .appendField('Alternate ring to colors');
    this.appendValueInput('COLOR_2').setCheck('niryo_one_color');
    this.appendValueInput('COLOR_3').setCheck('niryo_one_color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Several colors are alternated one after the other. The frequency is equal to 1 / period. Duration for a pattern is in seconds, if 0 default time will be used. Frequency considered as number of consecutive alternates, if 0 the led ring alternates endlessly.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_chase'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Chaser ring animation to color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Movie theater light style chaser animation. The frequency is equal to 1 / period. Duration for a pattern is in seconds, if 0 default time will be used. Frequency considered as number of consecutive flashses, if 0 the led ring flashes endlessly.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_wipe'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Wipe across led ring the color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Wipe a color across the Led Ring, light a Led at a time.');
  }
};

Blockly.Blocks['niryo_one_led_ring_rainbow'] = {
  init: function () {
    this.appendDummyInput().appendField('Fading rainbow animation');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Draw rainbow that fades across all LEDs at once.');
  }
};

Blockly.Blocks['niryo_one_led_ring_rainbow_cycle'] = {
  init: function () {
    this.appendDummyInput().appendField('Draw rainbow');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Draw rainbow that uniformly distributes itself across all LEDs.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_rainbow_chase'] = {
  init: function () {
    this.appendDummyInput().appendField('Rainbow chase animation');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip('Rainbow chase animation, like the led_ring_chase method.');
  }
};

Blockly.Blocks['niryo_one_led_ring_go_up'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Led ring go up in color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'LEDs turn on like a loading circle, and are then all turned off at once.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_go_up_down'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Load circle in color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'LEDs turn on like a loading circle, and are turned off the same way.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_breath'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('LED ring lights up like breathing in color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'Variation of the light intensity of the LED ring, similar to human breathing.'
    );
  }
};

Blockly.Blocks['niryo_one_led_ring_snake'] = {
  init: function () {
    this.appendValueInput('COLOR')
      .setCheck('niryo_one_color')
      .appendField('Snake lights up in color');
    this.appendValueInput('PERIOD')
      .setCheck('Number')
      .appendField('for duration');
    this.appendValueInput('ITERATIONS')
      .setCheck('Number')
      .appendField('at frequency');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(led_color);
    this.setHelpUrl('');
    this.setTooltip(
      'A small coloured snake (certainly a python :D ) runs around the LED ring.'
    );
  }
};

/*
 * Generators
 */

BlocklyPy['niryo_one_connect'] = function (block) {
  var ip_0 = block.getFieldValue('ip_0');
  var ip_1 = block.getFieldValue('ip_1');
  var ip_2 = block.getFieldValue('ip_2');
  var ip_3 = block.getFieldValue('ip_3');

  let branch = BlocklyPy.statementToCode(block, 'DO');
  var ip = ip_0 + '.' + ip_1 + '.' + ip_2 + '.' + ip_3;

  var code = '\nwith niryo_connect("' + ip + '") as n:\n' + branch;
  return code;
};

Blockly.Blocks['niryo_one_connect'].toplevel_init = `
from pyniryo import *

class niryo_connect():
  def __init__(self, ip):
    self.n = NiryoRobot(ip)
  def __enter__(self):
    return self.n
  def __exit__(self):
    self.n.close_connection()

`;

BlocklyPy['niryo_one_need_calibration'] = function (block) {
  var code = 'n.need_calibration()\n';
  return code;
};

BlocklyPy['niryo_one_calibrate_auto'] = function (block) {
  var code = 'n.calibrate_auto()\n';
  return code;
};

BlocklyPy['niryo_one_calibrate'] = function (block) {
  var dropdown_calibrate_mode = block.getFieldValue('CALIBRATE_MODE');
  var code = 'n.calibrate(' + dropdown_calibrate_mode + ')\n';
  return code;
};

BlocklyPy['niryo_one_activate_learning_mode'] = function (block) {
  var dropdown_learning_mode_value = block.getFieldValue('LEARNING_MODE_VALUE');
  var code = 'n.set_learning_mode(' + dropdown_learning_mode_value + ')\n';
  return code;
};

BlocklyPy['niryo_one_get_learning_mode'] = function (block) {
  var code = 'n.get_learning_mode()\n';
  return code;
};

BlocklyPy['niryo_one_set_jog_control'] = function (block) {
  var dropdown_jog_control_mode_value = block.getFieldValue(
    'JOG_CONTROL_MODE_VALUE'
  );
  var code = 'n.set_jog_control(' + dropdown_jog_control_mode_value + ')\n';
  return code;
};

BlocklyPy['niryo_one_move_joints'] = function (block) {
  var number_joints_1 = block.getFieldValue('JOINTS_1');
  var number_joints_2 = block.getFieldValue('JOINTS_2');
  var number_joints_3 = block.getFieldValue('JOINTS_3');
  var number_joints_4 = block.getFieldValue('JOINTS_4');
  var number_joints_5 = block.getFieldValue('JOINTS_5');
  var number_joints_6 = block.getFieldValue('JOINTS_6');

  var code =
    'n.move_joints([' +
    number_joints_1 +
    ', ' +
    number_joints_2 +
    ', ' +
    number_joints_3 +
    ', ' +
    number_joints_4 +
    ', ' +
    number_joints_5 +
    ', ' +
    number_joints_6 +
    '])\n';
  return code;
};

BlocklyPy['niryo_one_move_pose'] = function (block) {
  var number_pose_x = block.getFieldValue('POSE_X');
  var number_pose_y = block.getFieldValue('POSE_Y');
  var number_pose_z = block.getFieldValue('POSE_Z');
  var number_pose_roll = block.getFieldValue('POSE_ROLL');
  var number_pose_pitch = block.getFieldValue('POSE_PITCH');
  var number_pose_yaw = block.getFieldValue('POSE_YAW');

  var code =
    'n.move_pose(' +
    number_pose_x +
    ', ' +
    number_pose_y +
    ', ' +
    number_pose_z +
    ', ' +
    number_pose_roll +
    ', ' +
    number_pose_pitch +
    ', ' +
    number_pose_yaw +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_move_linear_pose'] = function (block) {
  var number_pose_x = block.getFieldValue('POSE_X');
  var number_pose_y = block.getFieldValue('POSE_Y');
  var number_pose_z = block.getFieldValue('POSE_Z');
  var number_pose_roll = block.getFieldValue('POSE_ROLL');
  var number_pose_pitch = block.getFieldValue('POSE_PITCH');
  var number_pose_yaw = block.getFieldValue('POSE_YAW');

  var code =
    'n.move_pose(' +
    number_pose_x +
    ', ' +
    number_pose_y +
    ', ' +
    number_pose_z +
    ', ' +
    number_pose_roll +
    ', ' +
    number_pose_pitch +
    ', ' +
    number_pose_yaw +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_shift_pose'] = function (block) {
  var dropdown_shift_pose_axis = block.getFieldValue('SHIFT_POSE_AXIS');
  var number_shift_pose_value = block.getFieldValue('SHIFT_POSE_VALUE');

  var code =
    'n.shift_pose(' +
    dropdown_shift_pose_axis +
    ', ' +
    number_shift_pose_value +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_set_arm_max_speed'] = function (block) {
  var value_set_arm_max_speed =
    BlocklyPy.valueToCode(block, 'SET_ARM_MAX_SPEED', BlocklyPy.ORDER_ATOMIC) ||
    '0';
  value_set_arm_max_speed = value_set_arm_max_speed
    .replace('(', '')
    .replace(')', '');
  var code = 'n.set_arm_max_velocity(' + value_set_arm_max_speed + ')\n';
  return code;
};

BlocklyPy['niryo_one_joint'] = function (block) {
  var value_j1 = BlocklyPy.valueToCode(block, 'j1', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_j2 = BlocklyPy.valueToCode(block, 'j2', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_j3 = BlocklyPy.valueToCode(block, 'j3', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_j4 = BlocklyPy.valueToCode(block, 'j4', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_j5 = BlocklyPy.valueToCode(block, 'j5', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_j6 = BlocklyPy.valueToCode(block, 'j6', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');

  var code =
    '[' +
    value_j1 +
    ', ' +
    value_j2 +
    ', ' +
    value_j3 +
    ', ' +
    value_j4 +
    ', ' +
    value_j5 +
    ', ' +
    value_j6 +
    ']';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_joints'] = function (block) {
  var code = 'n.get_joints()\n';
  return code;
};

BlocklyPy['niryo_one_move_joint_from_joint'] = function (block) {
  // Position object
  var value_joint = BlocklyPy.valueToCode(
    block,
    'JOINT',
    BlocklyPy.ORDER_ATOMIC
  );
  value_joint = value_joint.replace('(', '').replace(')', '');

  var code = 'n.move_joints(' + value_joint + ')\n';
  return code;
};

BlocklyPy['niryo_one_pose'] = function (block) {
  var value_x = BlocklyPy.valueToCode(block, 'x', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_y = BlocklyPy.valueToCode(block, 'y', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_z = BlocklyPy.valueToCode(block, 'z', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_roll = BlocklyPy.valueToCode(block, 'roll', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_pitch = BlocklyPy.valueToCode(
    block,
    'pitch',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');
  var value_yaw = BlocklyPy.valueToCode(block, 'yaw', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');

  var code =
    '[' +
    value_x +
    ', ' +
    value_y +
    ', ' +
    value_z +
    ', ' +
    value_roll +
    ', ' +
    value_pitch +
    ', ' +
    value_yaw +
    ']';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_pose'] = function (block) {
  var code = 'n.get_pose()\n';
  return code;
};

BlocklyPy['niryo_one_get_pose_quat'] = function (block) {
  var code = 'n.get_pose_quat()\n';
  return code;
};

BlocklyPy['niryo_one_move_pose_from_pose'] = function (block) {
  // Position object
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var code = 'n.move_pose(*' + value_pose + ')\n';
  return code;
};

BlocklyPy['niryo_one_pick_from_pose'] = function (block) {
  // Position object
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var code = 'n.pick_from_pose(*' + value_pose + ')\n';
  return code;
};

BlocklyPy['niryo_one_place_from_pose'] = function (block) {
  // Position object
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var code = 'n.place_from_pose(*' + value_pose + ')\n';
  return code;
};

BlocklyPy['niryo_one_pick_and_place'] = function (block) {
  var value_pose_1 = BlocklyPy.valueToCode(
    block,
    'POSE_1',
    BlocklyPy.ORDER_ATOMIC
  );
  value_pose_1 = value_pose_1.replace('(', '').replace(')', '');

  var value_pose_2 = BlocklyPy.valueToCode(
    block,
    'POSE_2',
    BlocklyPy.ORDER_ATOMIC
  );
  value_pose_2 = value_pose_2.replace('(', '').replace(')', '');

  var dist_smoothing_value = BlocklyPy.valueToCode(
    block,
    'DIST_SMOOTHING',
    BlocklyPy.ORDER_ATOMIC
  );
  // dist_smoothing_value = dist_smoothing_value.replace('(', '').replace(')', '');

  var code =
    'n.pick_and_place(*' +
    value_pose_1 +
    ', *' +
    value_pose_2 +
    ', ' +
    dist_smoothing_value +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_jog_joints'] = function (block) {
  var number_joints_1 = block.getFieldValue('JOINTS_1');
  var number_joints_2 = block.getFieldValue('JOINTS_2');
  var number_joints_3 = block.getFieldValue('JOINTS_3');
  var number_joints_4 = block.getFieldValue('JOINTS_4');
  var number_joints_5 = block.getFieldValue('JOINTS_5');
  var number_joints_6 = block.getFieldValue('JOINTS_6');

  var code =
    'n.jog_joints([' +
    number_joints_1 +
    ', ' +
    number_joints_2 +
    ', ' +
    number_joints_3 +
    ', ' +
    number_joints_4 +
    ', ' +
    number_joints_5 +
    ', ' +
    number_joints_6 +
    '])\n';
  return code;
};

BlocklyPy['niryo_one_jog_pose'] = function (block) {
  var number_pose_x = block.getFieldValue('POSE_X');
  var number_pose_y = block.getFieldValue('POSE_Y');
  var number_pose_z = block.getFieldValue('POSE_Z');
  var number_pose_roll = block.getFieldValue('POSE_ROLL');
  var number_pose_pitch = block.getFieldValue('POSE_PITCH');
  var number_pose_yaw = block.getFieldValue('POSE_YAW');

  var code =
    'n.jog_pose(' +
    number_pose_x +
    ', ' +
    number_pose_y +
    ', ' +
    number_pose_z +
    ', ' +
    number_pose_roll +
    ', ' +
    number_pose_pitch +
    ', ' +
    number_pose_yaw +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_move_to_home_pose'] = function (block) {
  var code = 'n.move_to_home_pose()\n';
  return code;
};

BlocklyPy['niryo_one_sleep'] = function (block) {
  var code = 'n.go_to_sleep()\n';
  return code;
};

BlocklyPy['niryo_one_forward_kinematics'] = function (block) {
  var number_joints_1 = block.getFieldValue('JOINTS_1');
  var number_joints_2 = block.getFieldValue('JOINTS_2');
  var number_joints_3 = block.getFieldValue('JOINTS_3');
  var number_joints_4 = block.getFieldValue('JOINTS_4');
  var number_joints_5 = block.getFieldValue('JOINTS_5');
  var number_joints_6 = block.getFieldValue('JOINTS_6');

  var code =
    'n.forward_kinematics([' +
    number_joints_1 +
    ', ' +
    number_joints_2 +
    ', ' +
    number_joints_3 +
    ', ' +
    number_joints_4 +
    ', ' +
    number_joints_5 +
    ', ' +
    number_joints_6 +
    '])\n';
  return code;
};

BlocklyPy['niryo_one_inverse_kinematics'] = function (block) {
  var number_pose_x = block.getFieldValue('POSE_X');
  var number_pose_y = block.getFieldValue('POSE_Y');
  var number_pose_z = block.getFieldValue('POSE_Z');
  var number_pose_roll = block.getFieldValue('POSE_ROLL');
  var number_pose_pitch = block.getFieldValue('POSE_PITCH');
  var number_pose_yaw = block.getFieldValue('POSE_YAW');

  var code =
    'n.inverse_kinematics(' +
    number_pose_x +
    ', ' +
    number_pose_y +
    ', ' +
    number_pose_z +
    ', ' +
    number_pose_roll +
    ', ' +
    number_pose_pitch +
    ', ' +
    number_pose_yaw +
    ')\n';
  return code;
};

// Saved poses

BlocklyPy['niryo_one_get_saved_pose'] = function (block) {
  var value_pose_name = BlocklyPy.valueToCode(
    block,
    'POSE_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.get_saved_pose(' + value_pose_name + ')\n';
  return code;
};

BlocklyPy['niryo_one_save_pose'] = function (block) {
  var pose_name = BlocklyPy.valueToCode(
    block,
    'POSE_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var number_pose_x = block.getFieldValue('POSE_X');
  var number_pose_y = block.getFieldValue('POSE_Y');
  var number_pose_z = block.getFieldValue('POSE_Z');
  var number_pose_roll = block.getFieldValue('POSE_ROLL');
  var number_pose_pitch = block.getFieldValue('POSE_PITCH');
  var number_pose_yaw = block.getFieldValue('POSE_YAW');

  var code =
    'n.save_pose(' +
    pose_name +
    ', ' +
    number_pose_x +
    ', ' +
    number_pose_y +
    ', ' +
    number_pose_z +
    ', ' +
    number_pose_roll +
    ', ' +
    number_pose_pitch +
    ', ' +
    number_pose_yaw +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_delete_pose'] = function (block) {
  var pose_name = BlocklyPy.valueToCode(
    block,
    'POSE_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.delete_pose(' + pose_name + ')\n';
  return code;
};

BlocklyPy['niryo_one_get_saved_pose_list'] = function (block) {
  var code = 'n.get_saved_pose_list()\n';
  return code;
};

// Trajectories

BlocklyPy['niryo_one_get_trajectory_saved'] = function (block) {
  var value_trajectory_name = BlocklyPy.valueToCode(
    block,
    'TRAJECTORY_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.get_trajectory_saved(' + value_trajectory_name + ')\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_saved_trajectory_list'] = function (block) {
  var code = 'n.get_saved_trajectory_list()\n';
  return code;
};

BlocklyPy['niryo_one_execute_registered_trajectory'] = function (block) {
  var value_trajectory_name = BlocklyPy.valueToCode(
    block,
    'TRAJECTORY_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.execute_registered_trajectory(' + value_trajectory_name + ')\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_save_last_learned_trajectory'] = function (block) {
  var trajectory_name = BlocklyPy.valueToCode(
    block,
    'TRAJECTORY_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var trajectory_description = BlocklyPy.valueToCode(
    block,
    'TRAJECTORY_DESCRIPTION',
    BlocklyPy.ORDER_ATOMIC
  );

  var code =
    'n.save_last_learned_trajectory(' +
    trajectory_name +
    ', ' +
    trajectory_description +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_delete_trajectory'] = function (block) {
  var trajectory_name = BlocklyPy.valueToCode(
    block,
    'TRAJECTORY_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.delete_trajectory(' + trajectory_name + ')\n';
  return code;
};

BlocklyPy['niryo_one_clean_trajectory_memory'] = function (block) {
  var code = 'n.clean_trajectory_memory()\n';
  return code;
};

// Dynamic frames

BlocklyPy['niryo_one_get_saved_dynamic_frame_list'] = function (block) {
  var code = 'n.get_saved_dynamic_frame_list()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_saved_dynamic_frame'] = function (block) {
  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );
  var code = 'n.get_saved_dynamic_frame(' + value_dynamic_frame_name + ')\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_save_dynamic_frame_from_poses'] = function (block) {
  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_dynamic_frame_description = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_DESCRIPTION',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_pose_1 = BlocklyPy.valueToCode(
    block,
    'POSE_1',
    BlocklyPy.ORDER_ATOMIC
  );
  value_pose_1 = value_pose_1.replace('(', '').replace(')', '');

  var value_pose_2 = BlocklyPy.valueToCode(
    block,
    'POSE_2',
    BlocklyPy.ORDER_ATOMIC
  );
  value_pose_2 = value_pose_2.replace('(', '').replace(')', '');

  var value_pose_3 = BlocklyPy.valueToCode(
    block,
    'POSE_3',
    BlocklyPy.ORDER_ATOMIC
  );
  value_pose_3 = value_pose_3.replace('(', '').replace(')', '');

  var code =
    'n.save_dynamic_frame_from_poses(' +
    value_dynamic_frame_name +
    ', ' +
    value_dynamic_frame_description +
    ', ' +
    value_pose_1 +
    ', ' +
    value_pose_2 +
    ', ' +
    value_pose_3 +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_point'] = function (block) {
  var value_x = BlocklyPy.valueToCode(block, 'x', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_y = BlocklyPy.valueToCode(block, 'y', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_z = BlocklyPy.valueToCode(block, 'z', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');

  var code = '[' + value_x + ', ' + value_y + ', ' + value_z + ']';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_save_dynamic_frame_from_points'] = function (block) {
  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_dynamic_frame_description = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_DESCRIPTION',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_point_1 = BlocklyPy.valueToCode(
    block,
    'POINT_1',
    BlocklyPy.ORDER_ATOMIC
  );
  value_point_1 = value_point_1.replace('(', '').replace(')', '');

  var value_point_2 = BlocklyPy.valueToCode(
    block,
    'POINT_2',
    BlocklyPy.ORDER_ATOMIC
  );
  value_point_2 = value_point_2.replace('(', '').replace(')', '');

  var value_point_3 = BlocklyPy.valueToCode(
    block,
    'POINT_3',
    BlocklyPy.ORDER_ATOMIC
  );
  value_point_3 = value_point_3.replace('(', '').replace(')', '');

  var code =
    'n.save_dynamic_frame_from_points(' +
    value_dynamic_frame_name +
    ', ' +
    value_dynamic_frame_description +
    ', ' +
    value_point_1 +
    ', ' +
    value_point_2 +
    ', ' +
    value_point_3 +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_edit_dynamic_frame'] = function (block) {
  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_dynamic_frame_new_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NEW_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var value_dynamic_frame_new_description = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NEW_DESCRIPTION',
    BlocklyPy.ORDER_ATOMIC
  );

  var code =
    'n.edit_dynamic_frame(' +
    value_dynamic_frame_name +
    ', ' +
    value_dynamic_frame_new_name +
    ', ' +
    value_dynamic_frame_new_description +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_delete_dynamic_frame'] = function (block) {
  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var code = 'n.delete_dynamic_frame(' + value_dynamic_frame_name + ')\n';
  return code;
};

BlocklyPy['niryo_one_move_relative'] = function (block) {
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var code =
    'n.move_relative(' +
    value_pose +
    ', frame=' +
    value_dynamic_frame_name +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_move_linear_relative'] = function (block) {
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var value_dynamic_frame_name = BlocklyPy.valueToCode(
    block,
    'DYNAMIC_FRAME_NAME',
    BlocklyPy.ORDER_ATOMIC
  );

  var code =
    'n.move_linear_relative(' +
    value_pose +
    ', frame=' +
    value_dynamic_frame_name +
    ')\n';
  return code;
};

// I/O - Hardware

BlocklyPy['niryo_one_gpio_state'] = function (block) {
  var dropdown_gpio_state_select = block.getFieldValue('GPIO_STATE_SELECT');
  var code = dropdown_gpio_state_select;
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_set_pin_mode'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'SET_PIN_MODE_PIN', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');
  var dropdown_pin_mode_select = block.getFieldValue('PIN_MODE_SELECT');
  var code =
    'n.set_pin_mode(' + value_pin + ', ' + dropdown_pin_mode_select + ')\n';
  return code;
};

BlocklyPy['niryo_one_digital_write'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'DIGITAL_WRITE_PIN', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');
  var dropdown_pin_write_select = block.getFieldValue('PIN_WRITE_SELECT');
  var code =
    'n.digital_write(' + value_pin + ', ' + dropdown_pin_write_select + ')\n';
  return code;
};

BlocklyPy['niryo_one_digital_read'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'DIGITAL_READ_PIN', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');
  var code = 'n.digital_read(' + value_pin + ')';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_hardware_status'] = function (block) {
  var code = 'n.get_hardware_status()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_digital_io_state'] = function (block) {
  var code = 'n.get_digital_io_state()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_analog_io_state'] = function (block) {
  var code = 'n.get_analog_io_state()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_analog_write'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'ANALOG_WRITE_PIN', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');

  var voltage_value =
    BlocklyPy.valueToCode(block, 'VOLTAGE_VALUE', BlocklyPy.ORDER_ATOMIC) ||
    '0';
  voltage_value = voltage_value.replace('(', '').replace(')', '');

  var code = 'n.analog_write(' + value_pin + ', ' + voltage_value + ')\n';
  return code;
};

BlocklyPy['niryo_one_analog_read'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'ANALOG_READ_PIN', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');
  var code = 'n.analog_read(' + value_pin + ')';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_gpio_select'] = function (block) {
  var dropdown_gpio_select = block.getFieldValue('GPIO_SELECT');
  var code = dropdown_gpio_select;
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_sw_select'] = function (block) {
  var dropdown_sw_select = block.getFieldValue('SW_SELECT');
  var code = dropdown_sw_select;
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_set_12v_switch'] = function (block) {
  var value_pin =
    BlocklyPy.valueToCode(block, 'SET_12V_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_pin = value_pin.replace('(', '').replace(')', '');
  var dropdown_set_12v_switch_select = block.getFieldValue(
    'SET_12V_SWITCH_SELECT'
  );
  var code =
    'n.digital_write(' +
    value_pin +
    ', ' +
    dropdown_set_12v_switch_select +
    ')\n';
  return code;
};

// Tool

BlocklyPy['niryo_one_tool_select'] = function (block) {
  const tool_id_map = {
    NONE: 0,
    GRIPPER_1: 11,
    GRIPPER_2: 12,
    GRIPPER_3: 13,
    ELECTROMAGNET_1: 30,
    VACUUM_PUMP_1: 31
  };
  var tool_model_id = block.getFieldValue('TOOL_SELECT');
  var code = tool_id_map[tool_model_id];

  // var dropdown_tool_select = block.getFieldValue('TOOL_SELECT');
  // var code = dropdown_tool_select;
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_current_tool_id'] = function (block) {
  var code = 'n.get_current_tool_id()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_update_tool'] = function (block) {
  var code = 'n.update_tool()\n';
  return code;
};

BlocklyPy['niryo_one_grasp_with_tool'] = function (block) {
  var code = 'n.grasp_with_tool()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_release_with_tool'] = function (block) {
  var code = 'n.release_with_tool()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_open_gripper'] = function (block) {
  var number_open_speed = block.getFieldValue('OPEN_SPEED');
  var code = 'n.open_gripper( ' + number_open_speed + ')\n';
  return code;
};

BlocklyPy['niryo_one_close_gripper'] = function (block) {
  var number_close_speed = block.getFieldValue('CLOSE_SPEED');
  var code = 'n.close_gripper(' + number_close_speed + ')\n';
  return code;
};

BlocklyPy['niryo_one_pull_air_vacuum_pump'] = function (block) {
  var code = 'n.pull_air_vacuum_pump()\n';
  return code;
};

BlocklyPy['niryo_one_push_air_vacuum_pump'] = function (block) {
  var code = 'n.push_air_vacuum_pump()\n';
  return code;
};

BlocklyPy['niryo_one_setup_electromagnet'] = function (block) {
  var value_electromagnet_pin =
    BlocklyPy.valueToCode(
      block,
      'SETUP_ELECTROMAGNET_PIN',
      BlocklyPy.ORDER_ATOMIC
    ) || '(0)';
  value_electromagnet_pin = value_electromagnet_pin
    .replace('(', '')
    .replace(')', '');
  var code = 'n.setup_electromagnet(' + value_electromagnet_pin + ')\n';
  return code;
};

BlocklyPy['niryo_one_activate_electromagnet'] = function (block) {
  var value_electromagnet_pin =
    BlocklyPy.valueToCode(
      block,
      'ACTIVATE_ELECTROMAGNET_PIN',
      BlocklyPy.ORDER_ATOMIC
    ) || '(0)';
  value_electromagnet_pin = value_electromagnet_pin
    .replace('(', '')
    .replace(')', '');
  var code = 'n.activate_electromagnet(' + value_electromagnet_pin + ')\n';
  return code;
};

BlocklyPy['niryo_one_deactivate_electromagnet'] = function (block) {
  var value_electromagnet_pin =
    BlocklyPy.valueToCode(
      block,
      'DEACTIVATE_ELECTROMAGNET_PIN',
      BlocklyPy.ORDER_ATOMIC
    ) || '(0)';
  value_electromagnet_pin = value_electromagnet_pin
    .replace('(', '')
    .replace(')', '');
  var code = 'n.deactivate_electromagnet(' + value_electromagnet_pin + ')\n';
  return code;
};

BlocklyPy['niryo_one_enable_tcp'] = function (block) {
  var dropdown_enable_tcp = block.getFieldValue('ENABLE_TCP');
  var code = 'n.enable_tcp(' + dropdown_enable_tcp + ')\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_set_tcp'] = function (block) {
  var value_pose = BlocklyPy.valueToCode(block, 'POSE', BlocklyPy.ORDER_ATOMIC);
  value_pose = value_pose.replace('(', '').replace(')', '');

  var code = 'n.set_tcp(' + value_pose + ')\n';
  return code;
};

BlocklyPy['niryo_one_reset_tcp'] = function (block) {
  var code = 'n.reset_tcp()\n';
  return code;
};

BlocklyPy['niryo_one_tool_reboot'] = function (block) {
  var code = 'n.tool_reboot()\n';
  return code;
};

// Utility

BlocklyPy['niryo_one_wait'] = function (block) {
  var value_wait_time =
    BlocklyPy.valueToCode(block, 'WAIT_TIME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_wait_time = value_wait_time.replace('(', '').replace(')', '');
  var code = 'n.wait(' + value_wait_time + ')\n';
  return code;
};

BlocklyPy['niryo_one_comment'] = function (block) {
  var text_comment_text = block.getFieldValue('COMMENT_TEXT');
  var code = ' #' + text_comment_text + '\n';
  return code;
};

// Vision

BlocklyPy['niryo_one_vision_color'] = function (block) {
  var dropdown_color_select = block.getFieldValue('COLOR_SELECT');
  var code = dropdown_color_select;
  code = '"' + g_color_values[code] + '"';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_vision_shape'] = function (block) {
  var dropdown_shape_select = block.getFieldValue('SHAPE_SELECT');
  var code = dropdown_shape_select;
  code = '"' + g_shape_values[code] + '"';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_vision_pick'] = function (block) {
  // Color (int) value (see g_shape_values at top of this file)
  var value_color =
    BlocklyPy.valueToCode(block, 'COLOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_color = value_color.replace('(', '').replace(')', '');

  // Shape (int) value (see g_shape_values at top of this file)
  var value_shape =
    BlocklyPy.valueToCode(block, 'SHAPE_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_shape = value_shape.replace('(', '').replace(')', '');

  // Name of workspace
  var workspace_name =
    BlocklyPy.valueToCode(block, 'WORKSPACE_NAME', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  workspace_name = workspace_name.replace('(', '').replace(')', '');

  // Height in centimeter
  var height_offset =
    BlocklyPy.valueToCode(block, 'HEIGHT_OFFSET', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  height_offset = height_offset.replace('(', '').replace(')', '');

  var code =
    'n.vision_pick(' +
    workspace_name +
    ', float(' +
    height_offset +
    ')/1000, ' +
    value_shape +
    ', ' +
    value_color +
    ')[0]';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_vision_is_object_detected'] = function (block) {
  // Color (int) value (see g_shape_values at top of this file)
  var value_color =
    BlocklyPy.valueToCode(block, 'COLOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_color = value_color.replace('(', '').replace(')', '');

  // Shape (int) value (see g_shape_values at top of this file)
  var value_shape =
    BlocklyPy.valueToCode(block, 'SHAPE_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  value_shape = value_shape.replace('(', '').replace(')', '');

  // Name of workspace
  var workspace_name =
    BlocklyPy.valueToCode(block, 'WORKSPACE_NAME', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  workspace_name = workspace_name.replace('(', '').replace(')', '');

  var code =
    'n.detect_object(' +
    workspace_name +
    ', ' +
    value_shape +
    ', ' +
    value_color +
    ')[0]';
  return [code, BlocklyPy.ORDER_NONE];
};

// Conveyor

BlocklyPy['niryo_one_conveyor_models'] = function (block) {
  const conveyor_id_map = {
    CONVEYOR_1: -1,
    CONVEYOR_2: -2
  };
  var conveyor_model_id = block.getFieldValue('CONVEYOR_SELECT');
  var code = conveyor_id_map[conveyor_model_id];
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_conveyor_use'] = function (block) {
  var code = 'n.set_conveyor()\n';
  return code;
};

BlocklyPy['niryo_one_conveyor_use'] = function (block) {
  var code = 'n.set_conveyor()\n';
  return code;
};

BlocklyPy['niryo_one_conveyor_unset'] = function (block) {
  var conveyor_id =
    BlocklyPy.valueToCode(block, 'CONVEYOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  conveyor_id = conveyor_id.replace('(', '').replace(')', '');
  var code = 'n.unset_conveyor(' + conveyor_id + ')\n';
  return code;
};

BlocklyPy['niryo_one_conveyor_control'] = function (block) {
  var conveyor_id =
    BlocklyPy.valueToCode(block, 'CONVEYOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  conveyor_id = conveyor_id.replace('(', '').replace(')', '');
  var speed_percent =
    BlocklyPy.valueToCode(block, 'SPEED_PERCENT', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  speed_percent = speed_percent.replace('(', '').replace(')', '');
  var direction = block.getFieldValue('DIRECTION_SELECT');
  var code =
    'n.control_conveyor(' +
    conveyor_id +
    ', True, ' +
    speed_percent +
    ', ' +
    direction +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_conveyor_run'] = function (block) {
  var conveyor_id =
    BlocklyPy.valueToCode(block, 'CONVEYOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  conveyor_id = conveyor_id.replace('(', '').replace(')', '');
  var speed_percent =
    BlocklyPy.valueToCode(block, 'SPEED_PERCENT', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  speed_percent = speed_percent.replace('(', '').replace(')', '');
  var direction = block.getFieldValue('DIRECTION_SELECT');
  var code =
    'n.run_conveyor(' +
    conveyor_id +
    ', ' +
    speed_percent +
    ', ' +
    direction +
    ')\n';
  return code;
};

BlocklyPy['niryo_one_conveyor_stop'] = function (block) {
  var conveyor_id =
    BlocklyPy.valueToCode(block, 'CONVEYOR_SWITCH', BlocklyPy.ORDER_ATOMIC) ||
    '(0)';
  conveyor_id = conveyor_id.replace('(', '').replace(')', '');
  var code = 'n.stop_conveyor(' + conveyor_id + ')\n';
  return code;
};

BlocklyPy['niryo_one_get_connected_conveyors_id'] = function (block) {
  var code = 'n.get_connected_conveyors_id()\n';
  return code;
};

// Sound

BlocklyPy['niryo_one_get_sounds'] = function (block) {
  var code = 'n.get_sounds()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_set_volume'] = function (block) {
  var value_set_volume =
    BlocklyPy.valueToCode(block, 'SET_VOLUME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_set_volume = value_set_volume.replace('(', '').replace(')', '');
  var code = 'n.set_volume(' + value_set_volume + ')\n';
  return code;
};

BlocklyPy['niryo_one_stop_sound'] = function (block) {
  var code = 'n.stop_sound()\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_get_sound_duration'] = function (block) {
  var value_sound_name =
    BlocklyPy.valueToCode(block, 'SOUND_NAME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_sound_name = value_sound_name.replace('(', '').replace(')', '');
  var code = 'n.get_sound_duration(' + value_sound_name + ')\n';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_play_sound'] = function (block) {
  var value_sound_name =
    BlocklyPy.valueToCode(block, 'SOUND_NAME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_sound_name = value_sound_name.replace('(', '').replace(')', '');

  var dropdown_wait_end = block.getFieldValue('WAIT_END');

  var value_start_time =
    BlocklyPy.valueToCode(block, 'START_TIME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_start_time = value_start_time.replace('(', '').replace(')', '');

  var value_end_time =
    BlocklyPy.valueToCode(block, 'END_TIME', BlocklyPy.ORDER_ATOMIC) || '0';
  value_end_time = value_end_time.replace('(', '').replace(')', '');

  var code =
    'n.play_sound(' +
    value_sound_name +
    ', ' +
    dropdown_wait_end +
    ', ' +
    value_start_time +
    ', ' +
    value_end_time +
    ')\n';

  return code;
};

BlocklyPy['niryo_one_say'] = function (block) {
  var value_say_text =
    BlocklyPy.valueToCode(block, 'SAY_TEXT', BlocklyPy.ORDER_ATOMIC) || '0';
  value_say_text = value_say_text.replace('(', '').replace(')', '');

  var dropdown_language_select = block.getFieldValue('LANGUAGE_SELECT');

  var code =
    'n.say(' + value_say_text + ', ' + dropdown_language_select + ')\n';
  return code;
};

//Led Ring

BlocklyPy['niryo_one_color'] = function (block) {
  var value_r = BlocklyPy.valueToCode(block, 'RED', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_g = BlocklyPy.valueToCode(block, 'GREEN', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');
  var value_b = BlocklyPy.valueToCode(block, 'BLUE', BlocklyPy.ORDER_ATOMIC)
    .replace('(', '')
    .replace(')', '');

  var code = '[' + value_r + ', ' + value_g + ', ' + value_b + ']';
  return [code, BlocklyPy.ORDER_NONE];
};

BlocklyPy['niryo_one_set_led_color'] = function (block) {
  var value_led_ring_id = BlocklyPy.valueToCode(
    block,
    'LED_RING_ID',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.set_led_color(' + value_led_ring_id + ', ' + value_color + ')\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_solid'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code = 'n.led_ring_solid(' + value_color + ')\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_turn_off'] = function (block) {
  var code = 'n.led_ring_turn_off()\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_flashing'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_flashing(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_alternate'] = function (block) {
  var value_color_1 = BlocklyPy.valueToCode(
    block,
    'COLOR_1',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_color_2 = BlocklyPy.valueToCode(
    block,
    'COLOR_2',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_color_3 = BlocklyPy.valueToCode(
    block,
    'COLOR_3',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_alternate( [' +
    value_color_1 +
    ', ' +
    value_color_2 +
    ', ' +
    value_color_3 +
    '], ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_chase'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_chase(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_wipe'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_wipe(' + value_color + ', ' + value_period + ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_rainbow'] = function (block) {
  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_rainbow(' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_rainbow_cycle'] = function (block) {
  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_rainbow_cycle(' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_rainbow_chase'] = function (block) {
  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_rainbow_chase(' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_go_up'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_go_up(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_go_up_down'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_go_up_down(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_breath'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_breath(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

BlocklyPy['niryo_one_led_ring_snake'] = function (block) {
  var value_color = BlocklyPy.valueToCode(
    block,
    'COLOR',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_period = BlocklyPy.valueToCode(
    block,
    'PERIOD',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var value_iterations = BlocklyPy.valueToCode(
    block,
    'ITERATIONS',
    BlocklyPy.ORDER_ATOMIC
  )
    .replace('(', '')
    .replace(')', '');

  var code =
    'n.led_ring_snake(' +
    value_color +
    ', ' +
    value_period +
    ', ' +
    value_iterations +
    ', True)\n';
  return code;
};

// Creating a toolbox containing all the main (default) blocks
// and adding the niryo category.
const TOOLBOX = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      colour: '210',
      contents: [
        {
          kind: 'block',
          type: 'controls_if'
        },
        {
          kind: 'BLOCK',
          type: 'logic_compare'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_operation"></block>',
          type: 'logic_operation'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_negate"></block>',
          type: 'logic_negate'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_boolean"></block>',
          type: 'logic_boolean'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_null"></block>',
          type: 'logic_null'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="logic_ternary"></block>',
          type: 'logic_ternary'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '120',
      contents: [
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="controls_repeat_ext">\n          <value name="TIMES">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'controls_repeat_ext'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_whileUntil"></block>',
          type: 'controls_whileUntil'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="controls_for">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n          <value name="BY">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'controls_for'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_forEach"></block>',
          type: 'controls_forEach'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="controls_flow_statements"></block>',
          type: 'controls_flow_statements'
        }
      ]
    },
    {
      kind: 'CATEGORY',
      name: 'Math',
      colour: '230',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_number"></block>',
          type: 'math_number'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_arithmetic">\n          <value name="A">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="B">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_arithmetic'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_single">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">9</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_single'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_trig">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">45</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_trig'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_constant"></block>',
          type: 'math_constant'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_number_property">\n          <value name="NUMBER_TO_CHECK">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_number_property'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_change">\n          <value name="DELTA">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_change'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_round">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">3.1</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_round'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_on_list"></block>',
          type: 'math_on_list'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_modulo">\n          <value name="DIVIDEND">\n            <shadow type="math_number">\n              <field name="NUM">64</field>\n            </shadow>\n          </value>\n          <value name="DIVISOR">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_modulo'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_constrain">\n          <value name="VALUE">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="LOW">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="HIGH">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_constrain'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="math_random_int">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'math_random_int'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="math_random_float"></block>',
          type: 'math_random_float'
        }
      ]
    },
    {
      kind: 'CATEGORY',
      name: 'Text',
      colour: '160',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="text"></block>',
          type: 'text'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="text_join"></block>',
          type: 'text_join'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_append">\n          <value name="TEXT">\n            <shadow type="text"></shadow>\n          </value>\n        </block>',
          type: 'text_append'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_length">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_length'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_isEmpty">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT"></field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_isEmpty'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n          <value name="FIND">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_indexOf'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_charAt">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
          type: 'text_charAt'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_getSubstring">\n          <value name="STRING">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
          type: 'text_getSubstring'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_changeCase">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_changeCase'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_trim">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_trim'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_print">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_print'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="text_prompt_ext">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'text_prompt_ext'
        }
      ]
    },
    {
      kind: 'CATEGORY',
      name: 'Lists',
      colour: '260',
      contents: [
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_create_with">\n          <mutation items="0"></mutation>\n        </block>',
          type: 'lists_create_with'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_create_with"></block>',
          type: 'lists_create_with'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_repeat">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">5</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'lists_repeat'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_length"></block>',
          type: 'lists_length'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_isEmpty"></block>',
          type: 'lists_isEmpty'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_indexOf'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_getIndex">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_getIndex'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_setIndex">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_setIndex'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_getSublist">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
          type: 'lists_getSublist'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="lists_split">\n          <value name="DELIM">\n            <shadow type="text">\n              <field name="TEXT">,</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'lists_split'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="lists_sort"></block>',
          type: 'lists_sort'
        }
      ]
    },
    {
      kind: 'CATEGORY',
      name: 'Color',
      colour: '20',
      contents: [
        {
          kind: 'BLOCK',
          blockxml: '<block type="colour_picker"></block>',
          type: 'colour_picker'
        },
        {
          kind: 'BLOCK',
          blockxml: '<block type="colour_random"></block>',
          type: 'colour_random'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="colour_rgb">\n          <value name="RED">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n          <value name="GREEN">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="BLUE">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'colour_rgb'
        },
        {
          kind: 'BLOCK',
          blockxml:
            '<block type="colour_blend">\n          <value name="COLOUR1">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#ff0000</field>\n            </shadow>\n          </value>\n          <value name="COLOUR2">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#3333ff</field>\n            </shadow>\n          </value>\n          <value name="RATIO">\n            <shadow type="math_number">\n              <field name="NUM">0.5</field>\n            </shadow>\n          </value>\n        </block>',
          type: 'colour_blend'
        }
      ]
    },
    {
      kind: 'SEP'
    },
    {
      kind: 'CATEGORY',
      colour: '330',
      custom: 'VARIABLE',
      name: 'Variables'
    },
    {
      kind: 'CATEGORY',
      colour: '290',
      custom: 'PROCEDURE',
      name: 'Functions'
    },
    {
      kind: 'SEP'
    },
    {
      kind: 'CATEGORY',
      colour: '210',
      name: 'Niryo',
      contents: [
        {
          kind: 'BLOCK',
          type: 'niryo_one_connect'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_calibrate_auto'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_calibrate'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_need_calibration'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_activate_learning_mode'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_learning_mode'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_jog_control'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_joints'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_joints'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_linear_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_pose_quat'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_shift_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_shift_linear_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_arm_max_speed'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_joint'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_joint_from_joint'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_pose_from_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_pick_from_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_place_from_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_pick_and_place'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_jog_joints'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_jog_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_to_home_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_sleep'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_forward_kinematics'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_inverse_kinematics'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_saved_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_save_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_delete_pose'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_saved_pose_list'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_trajectory_saved'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_saved_trajectory_list'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_execute_registered_trajectory'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_save_last_learned_trajectory'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_delete_trajectory'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_clean_trajectory_memory'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_saved_dynamic_frame_list'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_saved_dynamic_frame'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_save_dynamic_frame_from_poses'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_point'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_save_dynamic_frame_from_points'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_edit_dynamic_frame'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_delete_dynamic_frame'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_relative'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_move_linear_relative'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_gpio_select'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_pin_mode'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_digital_write'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_digital_read'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_hardware_status'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_digital_io_state'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_analog_io_state'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_gpio_state'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_sw_select'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_12v_switch'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_analog_write'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_analog_read'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_tool_select'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_current_tool_id'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_update_tool'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_grasp_with_tool'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_release_with_tool'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_open_gripper'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_close_gripper'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_pull_air_vacuum_pump'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_push_air_vacuum_pump'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_setup_electromagnet'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_activate_electromagnet'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_deactivate_electromagnet'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_tcp'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_reset_tcp'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_tool_reboot'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_wait'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_comment'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_vision_color'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_vision_shape'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_vision_pick'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_vision_is_object_detected'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_models'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_use'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_unset'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_control'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_run'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_conveyor_stop'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_connected_conveyors_id'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_sounds'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_volume'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_stop_sound'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_get_sound_duration'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_play_sound'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_say'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_color'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_set_led_color'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_solid'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_turn_off'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_flashing'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_alternate'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_chase'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_wipe'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_rainbow'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_rainbow_cycle'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_rainbow_chase'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_go_up'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_go_up_down'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_breath'
        },
        {
          kind: 'BLOCK',
          type: 'niryo_one_led_ring_snake'
        }
      ]
    }
  ]
};

const BlocklyNiryo = {
  Blocks: Blockly.Blocks,
  Generator: BlocklyPy,
  Toolbox: TOOLBOX
};

export default BlocklyNiryo;
