const { Plugin, TFile, Notice } = require("obsidian");

const LOG_FILE_PATH = "System/Log/log.md";

module.exports = class DeleteHookPlugin extends Plugin {
  async onload() {
    this.registerEvent(
      this.app.vault.on("delete", async (file) => {
        if (file instanceof TFile) {
          new Notice(`삭제 감지: ${file.path}`);
          console.log("삭제됨:", file.path);

          if (!(file instanceof TFile)) return;

          const logFile = this.app.vault.getAbstractFileByPath(LOG_FILE_PATH);
          if (!(logFile instanceof TFile)) return;

          await this.app.vault.process(logFile, (data) => {
            const hasTrailingNewline = data.endsWith("\n");
            const lines = data.split(/\r?\n/);

            // 마지막에 생기는 빈 줄 제거용
            if (lines.length > 0 && lines[lines.length - 1] === "") {
              lines.pop();
            }

            const targetSuffix = `${file.path} 생성`;

            // 뒤에서부터 찾아서 가장 최근 생성 로그 1개만 삭제
            for (let i = lines.length - 1; i >= 0; i--) {
              if (lines[i].endsWith(targetSuffix)) {
                lines.splice(i, 1);
                break;
              }
            }

            const result = lines.join("\n");
            return hasTrailingNewline ? result + "\n" : result;
          });
        }
      }),
    );
  }
};
