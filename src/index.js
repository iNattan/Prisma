"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var readlineSync = require("readline-sync");
var prisma = new client_1.PrismaClient();
function cadastrarEstudante() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, curso_id, curso, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Cadastro de Estudante');
                    nome = readlineSync.question('Digite o nome do estudante: ');
                    curso_id = readlineSync.question('Digite o ID do curso: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.estudantes.create({
                            data: {
                                nome: nome,
                                curso_id: parseInt(curso_id, 10)
                            }
                        })];
                case 2:
                    curso = _a.sent();
                    console.log("Estudante ".concat(curso.nome, " cadastrado com sucesso."));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erro ao cadastrar estudante:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function excluirEstudante() {
    return __awaiter(this, void 0, void 0, function () {
        var id, curso, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Exclusão de Estudante');
                    id = readlineSync.question('Digite o ID do estudante: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.estudantes.delete({
                            where: {
                                id: parseInt(id, 10)
                            }
                        })];
                case 2:
                    curso = _a.sent();
                    console.log("Estudante ".concat(curso.nome, " exclu\u00EDdo com sucesso."));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erro ao excluir estudante:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function alterarEstudante() {
    return __awaiter(this, void 0, void 0, function () {
        var id, estudante, novoNome, novoCursoId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Alteração de Estudante');
                    id = readlineSync.question('Digite o ID do estudante: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, prisma.estudantes.findUnique({
                            where: {
                                id: parseInt(id, 10)
                            }
                        })];
                case 2:
                    estudante = _a.sent();
                    if (!estudante) {
                        console.log('Estudante não encontrado.');
                        return [2 /*return*/];
                    }
                    novoNome = readlineSync.question("Digite o novo nome para ".concat(estudante.nome, ": "));
                    novoCursoId = readlineSync.question('Digite o novo ID do curso: ');
                    return [4 /*yield*/, prisma.estudantes.update({
                            where: {
                                id: parseInt(id, 10)
                            },
                            data: {
                                nome: novoNome,
                                curso_id: parseInt(novoCursoId, 10)
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log("Estudante ".concat(estudante.nome, " alterado para ").concat(novoNome, " com sucesso."));
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Erro ao alterar estudante:', error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function cadastrarCurso() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, curso, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Cadastro de Curso');
                    nome = readlineSync.question('Digite o nome do curso: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.cursos.create({
                            data: {
                                nome: nome
                            }
                        })];
                case 2:
                    curso = _a.sent();
                    console.log("Curso ".concat(curso.nome, " cadastrado com sucesso."));
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Erro ao cadastrar curso:', error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function excluirCurso() {
    return __awaiter(this, void 0, void 0, function () {
        var id, curso, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Exclusão de Curso');
                    id = readlineSync.question('Digite o ID do curso: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.cursos.delete({
                            where: {
                                id: parseInt(id, 10)
                            }
                        })];
                case 2:
                    curso = _a.sent();
                    console.log("Curso ".concat(curso.nome, " exclu\u00EDdo com sucesso."));
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error('Erro ao excluir curso:', error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function alterarCurso() {
    return __awaiter(this, void 0, void 0, function () {
        var id, curso, novoNome, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Alteração de Curso');
                    id = readlineSync.question('Digite o ID do curso: ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, prisma.cursos.findUnique({
                            where: {
                                id: parseInt(id, 10)
                            }
                        })];
                case 2:
                    curso = _a.sent();
                    if (!curso) {
                        console.log('Curso não encontrado.');
                        return [2 /*return*/];
                    }
                    novoNome = readlineSync.question("Digite o novo nome para ".concat(curso.nome, ": "));
                    return [4 /*yield*/, prisma.cursos.update({
                            where: {
                                id: parseInt(id, 10)
                            },
                            data: {
                                nome: novoNome
                            }
                        })];
                case 3:
                    _a.sent();
                    console.log("Curso ".concat(curso.nome, " alterado para ").concat(novoNome, " com sucesso."));
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    console.error('Erro ao alterar curso:', error_6);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function exibirMenu() {
    console.log('Menu:');
    console.log('1. Cadastrar Estudante');
    console.log('2. Excluir Estudante');
    console.log('3. Alterar Estudante');
    console.log('4. Cadastrar Curso');
    console.log('5. Excluir Curso');
    console.log('6. Alterar Curso');
    console.log('0. Sair');
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exibirMenu();
                    opcao = readlineSync.question('Escolha uma opção: ');
                    _a = opcao;
                    switch (_a) {
                        case '1': return [3 /*break*/, 1];
                        case '2': return [3 /*break*/, 3];
                        case '3': return [3 /*break*/, 5];
                        case '4': return [3 /*break*/, 7];
                        case '5': return [3 /*break*/, 9];
                        case '6': return [3 /*break*/, 11];
                        case '0': return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 14];
                case 1: return [4 /*yield*/, cadastrarEstudante()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 3: return [4 /*yield*/, excluirEstudante()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 5: return [4 /*yield*/, alterarEstudante()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 7: return [4 /*yield*/, cadastrarCurso()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 9: return [4 /*yield*/, excluirCurso()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 11: return [4 /*yield*/, alterarCurso()];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 13:
                    console.log('Saindo do programa. Até mais!');
                    return [3 /*break*/, 15];
                case 14:
                    console.log('Opção inválida. Tente novamente.');
                    return [3 /*break*/, 15];
                case 15:
                    if (opcao !== '0') return [3 /*break*/, 0];
                    _b.label = 16;
                case 16: return [4 /*yield*/, prisma.$disconnect()];
                case 17:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
