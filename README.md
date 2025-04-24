# Morfeus IA Integration Backend
### Trabalho da cadeira de Inteligência Artifical 1

Morfeus IA é um projeto voltado para a interpretação de sonhos para a área da psicologia.
Ao prover um sonho, Morfeus utiliza-se de uma integração com a API do Gemini para obter um interpretação baseada nos estudos da psicanálise e ontopsicologia, assim como gera uma imagem descritiva do relato onírico.

## Descrição do Projeto

Morfeus IA Integration Backend é o projeto backend (sistema / API) de Morfeus IA, foi desenvolvido em TypeScript com o framework AdonisJS.

## Instalação / Execução

É possível instalar e executar esse projeto localmente em uma máquina ou através de um container Docker.

### Localmente

Requisitos:
- Node >= 20.12;
- npm >= 10.09;
- Banco de dados Postgres >= 16;
- Chave da API do Gemini.

Instalação:
1. `npm i` - instala as dependências;
2. `node ace migration:run` - criação das tabelas das migrações;
3. `node ace db:seed` - inserção de dados iniciais;
4. `npm run dev` - inicializa o projeto.

### Docker

Requisitos:
- Docker >= 28.

Instalação:
1. Execute `docker compose up` ou `docker compose up -d` na pasta raíz deste projeto;
2. Acesse o container "morfeusiabackend" através do exec e execute `node ace migration:run` e `node ace db:seed`.

#### Variáveis de ambiente

É necessária uma chave de API do Gemini (GEMINI_API_KEY).

Variáveis de ambiente do banco de dados (exemplo para instalação com Docker):
- DB_HOST=morfeusiadatabase
- DB_PORT=5432
- DB_USER=postgres
- DB_PASSWORD=12345
- DB_DATABASE=postgres
