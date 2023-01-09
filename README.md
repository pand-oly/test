# Transfer Between Piggy Banks
 
 Uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que os usuários consigam realizar transferências internas entre si.

 Para construir esse projeto foram utilizadas as seguinte tecnologias:

  * Eslint - Para padronização de código
  * Git - Para versionamento de código

  Back-end
  * NodeJS
  * TypeScript
  * Docker
  * Prisma
  * PostgresDB
  * Express

## Como fazer para rodar a aplicação:

* Na raiz do projeto rode o comando `npm run prestart`.
  - Aqui instala as dependencias de back-end e sobe os containers para uso

## Back-end

### Requisições da Api / Database

> - Confira a [documentação](http://localhost:3001/api-docs/) da api feita com `swagger` na rota `http://localhost:3001/api-docs/`
**Obs.** Esta rota esta disponível somente com os containers rodando


- Rota de registro
> - `/register` _Responsavel pelo cadastro de novos usuários_

- Rota de login
> - `/login` _Responsavel pelo acesso de usuários e gerar um token_

- Rota de transferencia de credito
> - `/transaction` _Responsavel pela transação de credito entre usuarios do banco de dados_

- Rota para buscar saldo da conta
> - `/balance/:id` _Responsavel por buscar valor de "balance" na tabela de "Account" do usuário verificado_

- Rota para buscar historico de transações
> - `/transaction/:id` _Responsavel por buscar todo o historico de transações feitas pelo usuário_

### Testes

Para rodar os testes do back-end
  * Entre na pasta de back-end
    - `cd backend/`
  
  * Execute o teste
    - `npm test`

**Obs.** Não ah necessidade do container estar rodando para executar os testes, foram feitos mocks para todos os testes.

## Front-end

### Em contrução

o front-end ainda esta sendo feito pra o ver em ação pode user o comando `npm run compose-up:dev` ou na pasta frontend o comando `npm start`


