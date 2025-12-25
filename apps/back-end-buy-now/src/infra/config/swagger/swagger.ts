// import swaggerJSDoc from 'swagger-jsdoc';

// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Módulo Acadêmico API',
//     version: '1.0.0',
//     description: 'Documentação dos endpoints do sistema de gerenciamento acadêmico',
//   },
//   servers: [
//     {
//       url: 'http://localhost:3000',
//       description: 'Servidor de Desenvolvimento',
//     },
//   ],
//   tags: [
//     {
//       name: 'Auth',
//       description: 'Autenticação e autorização',
//     },
//   ],
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//     },
//     schemas: {
//       LoginDTO: {
//         type: 'object',
//         required: ['email', 'password'],
//         properties: {
//           email: { 
//             type: 'string', 
//             format: 'email', 
//             example: 'admin@gmail.com',
//             description: 'E-mail do usuário'
//           },
//           password: { 
//             type: 'string', 
//             example: 'pass22',
//             description: 'Senha do usuário'
//           },
//         },
//       },
//       AuthResponse: {
//         type: 'object',
//         properties: {
//           data: {
//             type: 'object',
//             properties: {
//               accessToken: {
//                 type: 'string',
//                 description: 'Token JWT para autenticação nas rotas protegidas',
//                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//               },
//               refreshToken: {
//                 type: 'string',
//                 description: 'Token para renovar o access token',
//                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//               },
//               employee: {
//                 type: 'object',
//                 properties: {
//                   id: { 
//                     type: 'string', 
//                     format: 'uuid',
//                     example: '0e517278-3fc9-4b24-9656-7a48b54cef77'
//                   },
//                   email: { 
//                     type: 'string', 
//                     format: 'email',
//                     example: 'admin9@gmail.com'
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       LogoutResponse: {
//         type: 'object',
//         properties: {
//           message: {
//             type: 'string',
//             example: 'Logout successful. Token revoked.',
//             description: 'Mensagem de confirmação do logout'
//           },
//         },
//       },
//       ErrorResponse: {
//         type: 'object',
//         properties: {
//           error: {
//             type: 'string',
//             example: 'Credenciais inválidas',
//             description: 'Mensagem de erro'
//           },
//         },
//       },
//       Student: {
//         type: 'object',
//         properties: {
//           id: { type: 'string', format: 'uuid', description: 'ID do Estudante', example: 'stu-7748b54cef77' },
//           name: { type: 'string', example: 'Aluno Exemplo' },
//           email: { type: 'string', format: 'email', example: 'aluno@escola.com' },
//           ra: { type: 'string', description: 'Registro Acadêmico', example: '99887766' },
//           cpf: { type: 'string', description: 'CPF', example: '123.456.789-00' },
//           active: { type: 'boolean', default: true },
//           employeeId: { type: 'string', format: 'uuid', description: 'ID do funcionário responsável' },
//           createdAt: { type: 'string', format: 'date-time' },
//           updatedAt: { type: 'string', format: 'date-time' },
//         },
//       },
//       CreateEmployeeDTO: {
//         type: 'object',
//         required: ['name', 'email', 'password'],
//         properties: {
//           name: { type: 'string', minLength: 3, example: 'Maria Instructor', description: 'Nome completo do funcionário' },
//           email: { type: 'string', format: 'email', example: 'maria@escola.com', description: 'E-mail único' },
//           password: { type: 'string', minLength: 6, description: 'Senha (mínimo 6 caracteres)', example: 'minhaSenha123' },
//           role: { type: 'string', enum: ['admin', 'instructor'], default: 'admin', description: 'Cargo do funcionário (opcional)' },
//         },
//       },
//       EmployeeResponseDto: {
//         type: 'object',
//         description: 'DTO de resposta contendo informações detalhadas do funcionário.',
//         properties: {
//           id: { type: 'string', format: 'uuid', example: 'emp-55443322' },
//           name: { type: 'string', example: 'Maria Instructor' },
//           email: { type: 'string', format: 'email', example: 'maria@escola.com' },
//           role: { type: 'string', enum: ['admin', 'instructor'], example: 'instructor' },
//           active: { type: 'boolean', default: true },
//           createdAt: { type: 'string', format: 'date-time' },
//           updatedAt: { type: 'string', format: 'date-time' },
//           students: {
//             type: 'array',
//             items: {
//               $ref: '#/components/schemas/Student',
//             },
//             description: 'Lista de estudantes associados (vazio se não houver).',
//           },
//         },
//       },
//     },
//   },
//   paths: {
//     '/api/auth/login': {
//       post: {
//         tags: ['Auth'],
//         summary: 'Realiza login do usuário',
//         description: 'Autentica um employee e retorna tokens JWT',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/LoginDTO'
//               },
//               examples: {
//                 admin: {
//                   summary: 'Login de administrador',
//                   value: {
//                     email: 'admin@gmail.com',
//                     password: 'pass22'
//                   }
//                 }
//               }
//             }
//           }
//         },
//         responses: {
//           '200': {
//             description: 'Login realizado com sucesso',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/AuthResponse'
//                 }
//               }
//             }
//           },
//           '401': {
//             description: 'Credenciais inválidas',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse'
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     '/api/auth/logout': {
//       post: {
//         tags: ['Auth'],
//         summary: 'Realiza logout do usuário',
//         security: [{ bearerAuth: [] }],
//         responses: {
//           '200': {
//             description: 'Logout realizado com sucesso',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/LogoutResponse'
//                 }
//               }
//             }
//           },
//           '401': {
//             description: 'Token inválido ou não fornecido',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse'
//                 }
//               }
//             }
//           }
//         }
//       }
//     },
//     '/api/employees': {
//       post: {
//         tags: ['Employee'],
//         summary: 'Cria um novo funcionário',
//         description: 'Cadastra um novo Employee no sistema. Retorna a entidade criada.',
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 $ref: '#/components/schemas/CreateEmployeeDTO',
//               },
//               examples: {
//                 newInstructor: {
//                   summary: 'Criação de novo instrutor',
//                   value: {
//                     name: 'Admin',
//                     email: 'admin@gmail.com',
//                     password: 'pass22',
//                     role: 'admin',
//                   },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           '201': {
//             description: 'Funcionário criado com sucesso',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     data: {
//                       $ref: '#/components/schemas/EmployeeResponseDto',
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           '400': {
//             description: 'Requisição inválida (Email já existe, validação Zod falhou, etc.)',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse',
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     '/api/employees/{id}': {
//       get: {
//         tags: ['Employee'],
//         summary: 'Busca um funcionário pelo ID',
//         description: 'Retorna os dados de um funcionário específico, incluindo a lista de estudantes associados.',
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             in: 'path',
//             name: 'id',
//             schema: {
//               type: 'string',
//               format: 'uuid',
//             },
//             required: true,
//             description: 'ID do funcionário (UUID)',
//           },
//         ],
//         responses: {
//           '200': {
//             description: 'OK. Funcionário encontrado.',
//             content: {
//               'application/json': {
//                 schema: {
//                   type: 'object',
//                   properties: {
//                     data: {
//                       $ref: '#/components/schemas/EmployeeResponseDto',
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           '404': {
//             description: 'Funcionário não encontrado.',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse',
//                 },
//               },
//             },
//           },
//           '401': {
//             description: 'Não autorizado (Token ausente ou inválido).',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse',
//                 },
//               },
//             },
//           },
//           '400': {
//             description: 'ID fornecido é inválido (ex: não é um UUID).',
//             content: {
//               'application/json': {
//                 schema: {
//                   $ref: '#/components/schemas/ErrorResponse',
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     '/api/students': {
//       post: {
//         tags: ['Student'],
//         summary: 'Cadastra um novo estudante',
//         description: 'Cria um novo registro de estudante. Requer EmployeeId válido.',
//         security: [{ bearerAuth: [] }],
//         requestBody: {
//           required: true,
//           content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateStudentDTO' }, 
//           examples: {
//             admin: {
//               summary: 'Login de administrador',
//               value: {
//                 name: 'Lailton',
//                 ra: '213315',
//                 cpf: '12332134511',
//                 email: 'admin@gmail.com',
//                 employeeId: '....add..'
//               }
//             }
//           } } },
//         },
//         responses: {
//           '201': {
//             description: 'Estudante criado com sucesso',
//             content: { 'application/json': { schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/StudentResponseDto' } } } } },
//           },
//           '404': { description: 'Employee (Instrutor) não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//           '400': { description: 'Validação falhou (Email, RA ou CPF já existem, ou dados inválidos)', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//         },
//       },
//     },
//     '/api/students/{id}': {
//       put: {
//         tags: ['Student'],
//         summary: 'Atualiza dados de um estudante',
//         description: 'Atualiza o nome e/ou e-mail de um estudante existente pelo ID.',
//         security: [{ bearerAuth: [] }],
//         parameters: [{ in: 'path', name: 'id', schema: { type: 'string', format: 'uuid' }, required: true, description: 'ID do estudante' }],
//         requestBody: {
//           required: true,
//           content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateStudentDTO' },
//           examples: {
//             admin: {
//               summary: 'Login de administrador',
//               value: {
//                 name: 'Lailton edit',
//                 email: 'admin2@gmail.com',
//                 ra: '213315'
//               }
//             }
//           }     
//         } },
//         },
//         responses: {
//           '200': {
//             description: 'Estudante atualizado com sucesso',
//             content: { 'application/json': { schema: { type: 'object', properties: { data: { $ref: '#/components/schemas/StudentResponseDto' } } } } },
//           },
//           '404': { description: 'Estudante não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//           '400': { description: 'Email já existe ou dados de entrada inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//         },
//       },
//       delete: {
//         tags: ['Student'],
//         summary: 'Remove um estudante',
//         description: 'Remove um estudante do sistema permanentemente.',
//         security: [{ bearerAuth: [] }],
//         parameters: [{ in: 'path', name: 'id', schema: { type: 'string', format: 'uuid' }, required: true, description: 'ID do estudante' }],
//         responses: {
//           '204': { description: 'Estudante removido com sucesso (No Content)' },
//           '404': { description: 'Estudante não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//         },
//       },
//     },
//     '/api/students/employee/{employeeId}': {
//       get: {
//         tags: ['Student'],
//         summary: 'Lista estudantes por Employee/Instrutor',
//         description: 'Retorna uma lista paginada de estudantes associados a um Employee.',
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           { in: 'path', name: 'employeeId', schema: { type: 'string', format: 'uuid' }, required: true, description: 'ID do Employee (Instrutor) responsável' },
//           { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1, default: 1 }, required: false, description: 'Número da página a ser retornada' },
//         ],
//         responses: {
//           '200': {
//             description: 'Lista de estudantes retornada com sucesso',
//             content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedStudents' } } },
//           },
//           '404': { description: 'Employee (Instrutor) não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//           '400': { description: 'ID do Employee inválido', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
//         },
//       },
//     },
//     '/api/students/search': {
//       get: {
//         tags: ['Student'],
//         summary: 'Pesquisa estudantes por nome, RA ou CPF',
//         description: 'Retorna uma lista paginada de estudantes filtrada pelo nome, RA ou CPF. A busca é case-insensitive.',
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             in: 'query',
//             name: 'query',
//             schema: { type: 'string' },
//             required: true,
//             description: 'Termo de pesquisa (nome, RA ou CPF)',
//           },
//           {
//             in: 'query',
//             name: 'page',
//             schema: { type: 'integer', minimum: 1, default: 1 },
//             required: false,
//             description: 'Número da página a ser retornada',
//           },
//         ],
//         responses: {
//           '200': {
//             description: 'Lista de estudantes retornada com sucesso',
//             content: {
//               'application/json': {
//                 schema: { $ref: '#/components/schemas/PaginatedStudents' },
//               },
//             },
//           },
//           '400': {
//             description: 'Parâmetro de busca inválido (query vazia)',
//             content: {
//               'application/json': {
//                 schema: { $ref: '#/components/schemas/ErrorResponse' },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

// const options = {
//   swaggerDefinition,
//   apis: [
//     './src/core/**/routes/*.ts',
//   ], 
// };

// const swaggerSpec = swaggerJSDoc(options);

// export default swaggerSpec;