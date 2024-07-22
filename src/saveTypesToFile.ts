import fs from "fs";

export const saveTypesToFile = (types: string, filePath: string): void => {
  fs.writeFileSync(filePath, types);
  console.log("Types saved to:", filePath);
};
