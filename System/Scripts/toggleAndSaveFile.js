const toggleAndSaveFile = async () => {
  const delayMS = 5000;
  const saveFileCommand = 'editor:save-file';
  const toggleEditorCommand = 'markdown:toggle-preview';
  const commands = this.app.commands;
  try {
    commands.executeCommandById(toggleEditorCommand);
    const timeId = setTimeout(() => {
      commands.executeCommandById(saveFileCommand);
    }, delayMS);
  } catch (e) {
    console.log('Error Saving File');
  } finally {
    console.log('Success Initial File Saving ');
  }
};

module.exports = toggleAndSaveFile;
