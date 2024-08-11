const commandId = 'editor:save-file';
const commands = this.app.commands;
const delayMS = 500;
commands.executeCommandById(commandId);

const saveOpenFile = async () => {
  const commandId = 'editor:save-file';
  const commands = this.app.commands;
  try {
    const timeId = setTimeout(() => {
      commands.executeCommandById(commandId);
    }, delayMS);
  } catch (e) {
    console.log('Error Saving File');
  } finally {
    console.log('Success Initial File Saving ');
  }
};

module.exports = saveOpenFile;
