import fs from 'fs';
import { json } from 'stream/consumers';

export default function ExportFile(obj: Object, fileName: string) {
    fileName = '@/static/' + fileName + '.json';

    const json = JSON.stringify(obj, null, 2);

    if (fs.existsSync(fileName)) {
        fs.copyFileSync(fileName, fileName+'.bak');
    }
    fs.writeFileSync(fileName, json);
}