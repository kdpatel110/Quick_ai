import multer from "multer";
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, UPLOAD_DIR);
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
		// keep original extension
		const ext = path.extname(file.originalname) || '';
		cb(null, `${file.fieldname}-${unique}${ext}`);
	}
});

export const upload = multer({ storage });