const toggleAndSaveFile = async () => {
  const delayMS = 600;
  const saveFileCommand = 'editor:save-file';
  const toggleEditorCommand = 'markdown:toggle-preview';
  const commands = this.app.commands;
  try {
    commands.executeCommandById(toggleEditorCommand);
    const timeId = setTimeout(() => {
      commands.executeCommandById(saveFileCommand);
      console.log('Success Initial File Saving ');
    }, delayMS);
  } catch (e) {
    console.log('Error Saving File');
  }
};

module.exports = toggleAndSaveFile;
