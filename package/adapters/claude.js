import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

export default {
  name: 'claude',
  targetDir: join(homedir(), '.claude', 'skills'),
  filename: 'skill.md',

  async install(skillPath, skillName) {
    const targetDir = join(this.targetDir, skillName);
    const sourcePath = join(skillPath, 'skill.md');
    const targetPath = join(targetDir, this.filename);

    await mkdir(targetDir, { recursive: true });
    await copyFile(sourcePath, targetPath);
  }
};
