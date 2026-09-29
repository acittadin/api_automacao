import { spec } from 'pactum';

describe('Testes da API ReqRes - Usuários', () => {

  // Cenário 1: Validar retorno de uma lista de usuários (GET)
  it('1. Deve listar usuários da página 2 e retornar status 200', async () => {
    await spec()
      .get('https://reqres.in/api/users?page=2')
      .expectStatus(200)
      .expectJsonLike({
        page: 2
      });
  });

  // Cenário 2: Validar busca de um usuário específico (GET)
  it('2. Deve retornar o usuário com ID 2 com sucesso', async () => {
    await spec()
      .get('https://reqres.in/api/users/2')
      .expectStatus(200)
      .expectJsonLike({
        data: {
          id: 2,
          first_name: 'Janet'
        }
      });
  });

  // Cenário 3: Validar a criação de um novo registro (POST)
  it('3. Deve criar um novo usuário e retornar status 201', async () => {
    await spec()
      .post('https://reqres.in/api/users')
      .withJson({
        name: 'André',
        job: 'QA Engineer'
      })
      .expectStatus(201)
      .expectJsonLike({
        name: 'André',
        job: 'QA Engineer'
      });
  });

  // Cenário 4: Validar tratamento de erro ao buscar usuário inexistente (GET)
  it('4. Deve retornar erro 404 ao buscar um usuário que não existe', async () => {
    await spec()
      .get('https://reqres.in/api/users/23')
      .expectStatus(404);
  });

  // Cenário 5: Validar a exclusão de um registro (DELETE)
  it('5. Deve deletar um usuário com sucesso e retornar status 204', async () => {
    await spec()
      .delete('https://reqres.in/api/users/2')
      .expectStatus(204); // A API ReqRes retorna 204 (No Content) para exclusão
  });

});