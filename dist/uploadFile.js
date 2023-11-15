"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
const firebaseConfig_1 = require("./firebaseConfig");
const firebaseConfig = {
    credential: admin.credential.cert(firebaseConfig_1.serviceAccount),
    storageBucket: 'escola-b28b0.appspot.com',
};
admin.initializeApp(firebaseConfig);
async function uploadFile(filePath, destinationPath) {
    const bucket = admin.storage().bucket();
    const fileReadStream = fs.createReadStream(filePath);
    const fileWriteStream = bucket.file(destinationPath).createWriteStream();
    return new Promise((resolve, reject) => {
        fileReadStream.pipe(fileWriteStream)
            .on('finish', () => {
            console.log(`Arquivo enviado com sucesso para ${destinationPath}`);
            resolve();
        })
            .on('error', (error) => {
            console.error('Erro ao enviar o arquivo:', error);
            reject(error);
        });
    });
}
exports.uploadFile = uploadFile;
