## Instalação
### Node.js
- Para instalar o node.js é necessário executar o comando `sudo apt-get install nodejs`
### Npm
- Após instalar o node é necessário instalar o npm, que é o gerenciador de pacotes do node. Para instalar basta rodar `sudo apt install npm`
### Sails.js
- Para instalar o sails basta executar o comando `sudo npm install sails -g`.
Para esse comando normalmente se pede a permissão de administrador, por isso usamos o sudo.
### Docker
- usamos o Docker para criar uma istância do MySql, para instalarmos o docker basta rodar os comandos dados no próprio site do [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)


## Execução
### Criar banco de dados
- Para criar um banco de dados utilizamos a imagem do próprio dockerHub do [MySql](https://hub.docker.com/_/mysql).
Parar rodar a instância do mysql basta rodar o comando `docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD="12345678" -d mysql:5.6 `.
Escolhemos utilizar a versão 5.6 do MySql, utilizamos como senha do banco local os números de 1 a 8, mas caso seja necessário mudar lembre-se de mudar tbm a senha na string de conexão em config/datastores.js
### Configurar Schema
- O sails antes de ser iniciado precisa que um schema seja definido no banco que foi gerado, para isso usamos o mysqlWorkbench para criar um schema, definimos o nome como prensaLatas, mas pode ser qualquer nome desde que tbm modifique o nome da string de conexão em config/datastores.js

![](https://i.imgur.com/rfTTfzm.png)

### Rodar aplicação
- Depois de configurar o banco de dados basta rodar `sails lift --alter` para que o ORM do sails leia as models definidas e faça as migrações necessárias para o schema anterior.
Após a execução do comando o terminal ficará dessa forma:
![sails rodando](https://i.imgur.com/1k6TknF.png)
Isso significa que sua api já está no ar e pronta para receber requisições.

