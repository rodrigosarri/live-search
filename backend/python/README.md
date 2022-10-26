## Sobre

Esse é um servidor de exemplo simples utilizando o Python

## Pré-requisitos

- Python 3.10.1
- pip 21.3.1

## Instalando

``` bash
  git clone https://github.com/SelecaoGlobocom/rodrigo-sarri.git
  cd live-search/python
  pip install -r requirements.txt
```

### Bibliotecas utilizadas:

`Flask`: Micro framework para desenvolvimento de aplicativos Web. Nesse caso utilizei para gerar a rota REST API <br>
`CORS`: Extensão para lidar com CORS nos endpoints<br>
`jsonify`: Biblioteca útil para trabalhar com JSON (quando está sendo utilizado o Python para API)<br>
`dotenv`: Biblioteca utilizada para ler informações de arquivos .env<br>
`waitress`: Biblioteca utilizada para gerar um servidor WSGI de produção<br>

### ENVIONMENTS

Deve adicionar um arquivo .env ou renomear o arquivo .env-example adicionando endereço (hostname) e porta (port) no arquivo

#### localhost

Execute o comando: `python app.py`<br>
Para verificar o funcionamento do servidor basta acessar o endereço: http://{hostname}:{port} utilizando o hostname e port informados no arquivo .env

#### produção

O arquivo eu utilizei a biblioteca `waitress`, entretanto, existem diversas opções de deploy e por isso é interessante consultar o link:
[https://flask.palletsprojects.com/en/1.1.x/deploying/](https://flask.palletsprojects.com/en/1.1.x/deploying/)

## Autor

Rodrigo Sarri