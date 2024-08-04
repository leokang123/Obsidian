const fs = require("fs");
const path = require("path");

// 주어진 디렉토리 내에서 특정 폴더를 찾는 함수
function findFolder(startPath, folderName, callback) {
  // 디렉토리가 존재하는지 확인
  if (!fs.existsSync(startPath)) {
    console.log("No directory found:", startPath);
    return;
  }

  // 디렉토리 읽기
  fs.readdir(startPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(startPath, file);

      // 파일 또는 디렉토리의 정보를 가져오기
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting stats:", err);
          return;
        }

        // 디렉토리인지 확인
        if (stats.isDirectory()) {
          if (file === folderName) {
            console.log("Folder found:", filePath);
            callback(filePath);
            return;
          } else {
            // 재귀적으로 하위 디렉토리 검색
            findFolder(filePath, folderName, callback);
          }
        }
      });
    }
  });
}

module.exports = findFolder;
