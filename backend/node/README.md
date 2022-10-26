## Sobre

Esse é um servidor de exemplo simples utilizando o node.js

## Pré-requisitos

- Node v16.13.1

## Instalando

``` bash
  git clone https://github.com/SelecaoGlobocom/rodrigo-sarri.git
  cd live-search/server
  npm install
```

### Bibliotecas utilizadas:

`body-parser`: Utilizado para converter o corpo das solicitações de entrada em objetos JavaScript.<br>
`cors`: Utilizado para configurar a biblioteca `express` para adicionar cabeçalhos informando que sua API aceita solicitações provenientes de outras origens. Isso é conhecido como Compartilhamento de Recursos de Origem Cruzada (CORS).<br>
`express`: Biblioteca express que é uma biblioteca mínima e flexível que fornece um conjunto robusto de recursos para aplicativos web e móveis.<br>
`helmet`: Esta biblioteca ajuda a proteger APIs Express definindo vários cabeçalhos HTTP<br>
`morgan`: Esta biblioteca adiciona alguns recursos de registro à sua API Express<br>

### ENVIONMENTS

Deve adicionar um arquivo .env ou renomear o arquivo .env-example adicionando endereço (hostname) e porta (port) no arquivo

#### localhost

Execute o comando: `npm start`<br>
Para verificar o funcionamento do servidor basta acessar o endereço: http://{hostname}:{port} utilizando o hostname e port informados no arquivo .env

#### produção

Para produção é importante configurar (dependendo do servidor) um PM2 que irá executar o servidor node.js como um serviço apontando para executar o arquivo `src/index.js`, exemplo: `pm2 start src/index.js`

## Autor

Rodrigo Sarri