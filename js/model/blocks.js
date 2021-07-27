Blockly.Blocks['node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("name"), "name");
    this.appendStatementInput("content")
        .setCheck("content");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "content");
    this.setNextStatement(true, "content");
    this.setColour(105);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['transition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if:")
        .appendField(new Blockly.FieldTextInput("event"), "guard")
        .appendField("to:")
        .appendField(new Blockly.FieldTextInput("node"), "to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "content");
    this.setNextStatement(true, "content");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["entry","entry"], ["exit","exit"]]), "event")
        .appendField(":")
        .appendField(new Blockly.FieldTextInput("do"), "do");
    this.setPreviousStatement(true, "content");
    this.setNextStatement(true, "content");
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};