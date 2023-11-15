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
const client_1 = require("@prisma/client");
const readlineSync = __importStar(require("readline-sync"));
const uploadFile_1 = require("./uploadFile");
const prisma = new client_1.PrismaClient();
async function cadastrarEstudante() {
    console.log('Cadastro de Estudante');
    const nome = readlineSync.question('Digite o nome do estudante: ');
    const curso_id = readlineSync.question('Digite o ID do curso: ');
    try {
        const estudante = await prisma.estudantes.create({
            data: {
                nome: nome,
                curso_id: parseInt(curso_id, 10)
            }
        });
        console.log(`Estudante ${estudante.nome} cadastrado com sucesso.`);
        const fileName = `./images/${estudante.nome}.jpg`;
        const destinationPath = `estudantes/${estudante.nome}.jpg`;
        await (0, uploadFile_1.uploadFile)(fileName, destinationPath);
    }
    catch (error) {
        console.error('Erro ao cadastrar estudante:', error);
    }
}
async function excluirEstudante() {
    console.log('Exclusão de Estudante');
    const id = readlineSync.question('Digite o ID do estudante: ');
    try {
        const estudante = await prisma.estudantes.delete({
            where: {
                id: parseInt(id, 10)
            }
        });
        console.log(`Estudante ${estudante.nome} excluído com sucesso.`);
    }
    catch (error) {
        console.error('Erro ao excluir estudante:', error);
    }
}
async function alterarEstudante() {
    console.log('Alteração de Estudante');
    const id = readlineSync.question('Digite o ID do estudante: ');
    try {
        const estudante = await prisma.estudantes.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        });
        if (!estudante) {
            console.log('Estudante não encontrado.');
            return;
        }
        const novoNome = readlineSync.question(`Digite o novo nome para ${estudante.nome}: `);
        const novoCursoId = readlineSync.question('Digite o novo ID do curso: ');
        await prisma.estudantes.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                nome: novoNome,
                curso_id: parseInt(novoCursoId, 10)
            }
        });
        console.log(`Estudante ${estudante.nome} alterado para ${novoNome} com sucesso.`);
    }
    catch (error) {
        console.error('Erro ao alterar estudante:', error);
    }
}
async function cadastrarCurso() {
    console.log('Cadastro de Curso');
    const nome = readlineSync.question('Digite o nome do curso: ');
    try {
        const curso = await prisma.cursos.create({
            data: {
                nome: nome
            }
        });
        console.log(`Curso ${curso.nome} cadastrado com sucesso.`);
        const fileName = `./images/${curso.nome}.jpg`;
        const destinationPath = `cursos/${curso.nome}.jpg`;
        await (0, uploadFile_1.uploadFile)(fileName, destinationPath);
    }
    catch (error) {
        console.error('Erro ao cadastrar curso:', error);
    }
}
async function excluirCurso() {
    console.log('Exclusão de Curso');
    const id = readlineSync.question('Digite o ID do curso: ');
    try {
        const curso = await prisma.cursos.delete({
            where: {
                id: parseInt(id, 10)
            }
        });
        console.log(`Curso ${curso.nome} excluído com sucesso.`);
    }
    catch (error) {
        console.error('Erro ao excluir curso:', error);
    }
}
async function alterarCurso() {
    console.log('Alteração de Curso');
    const id = readlineSync.question('Digite o ID do curso: ');
    try {
        const curso = await prisma.cursos.findUnique({
            where: {
                id: parseInt(id, 10)
            }
        });
        if (!curso) {
            console.log('Curso não encontrado.');
            return;
        }
        const novoNome = readlineSync.question(`Digite o novo nome para ${curso.nome}: `);
        await prisma.cursos.update({
            where: {
                id: parseInt(id, 10)
            },
            data: {
                nome: novoNome
            }
        });
        console.log(`Curso ${curso.nome} alterado para ${novoNome} com sucesso.`);
    }
    catch (error) {
        console.error('Erro ao alterar curso:', error);
    }
}
function exibirMenu() {
    console.log('\nMenu:');
    console.log('1. Cadastrar Estudante');
    console.log('2. Excluir Estudante');
    console.log('3. Alterar Estudante');
    console.log('4. Cadastrar Curso');
    console.log('5. Excluir Curso');
    console.log('6. Alterar Curso');
    console.log('0. Sair');
}
async function main() {
    let opcao;
    do {
        exibirMenu();
        opcao = readlineSync.question('Escolha uma opção: ');
        switch (opcao) {
            case '1':
                await cadastrarEstudante();
                break;
            case '2':
                await excluirEstudante();
                break;
            case '3':
                await alterarEstudante();
                break;
            case '4':
                await cadastrarCurso();
                break;
            case '5':
                await excluirCurso();
                break;
            case '6':
                await alterarCurso();
                break;
            case '0':
                console.log('Finalizando');
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                break;
        }
    } while (opcao !== '0');
    await prisma.$disconnect();
}
main();
