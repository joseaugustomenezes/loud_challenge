Loud Challenge

## Como rodar
Para rodar o projeto, tendo nodejs e npm instalado na máquina, basta entrar na raíz do mesmo e utilizar os seguintes comandos:

### `npm install`
### `npm start`

## Como deployar
Para fazer um deploy local, é necessário se utilizar dos seguintes comandos na raíz do projeto:

### `serve -s build`
esse comando gerará uma build otimizada para sua aplicação react;

### `npm install -g serve`
esse comando instalará globalmente o serve, para que você possa "servir" a build da sua aplicação react

### `serve -s build`
esse comando iniciará um servidor local da build criada do seu projeto. agora é só acessar o http://localhost:5000 para utilizar sua aplicação


## Bibliotecas utilizadas
No desenvolvimento do projeto, utilizei bibliotecas bastante famosas e utilizadas em projetos react atualmente.

### `react-redux + redux-saga`
Para me auxiliar no gerenciamento de estado da aplicação, utilizei o redux, bliblioteca mais utilizada para esse tipo de problema no React, com o middleware Redux-Saga, para tratar requisições asíncronas com o poder do Redux de forma efetiva e organizada.

### `axios`
Utilizei para a comunicação com a api a biblioteca axios, muito utilizada hoje em dia pela sua facilidade para gerenciar requisições rest, além da possibilidade se tulizar intercerptors.

### `formik`
Utilizei o formik para gerenciamento de formulários, solução que já trás "out of the box" gerenciamento de campos, validação

### `react-bootstrap`
Mesmo não sendo requisitado que o projeto tivesse uma ui, para que não ficasse apenas html sem nenhum tipo de estilo, decidi usar essa biblioteca de componentes para deixar a UI melhor apresentável.

### `react-router-dom`
Biblioteca responsável pelo gerenciamento de rotas no projeto

### `react-markdown`
Biblioteca utilizada na interpretação de textos com markdown
