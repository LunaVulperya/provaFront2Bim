📁 `main.js`
------------

Este arquivo lida com a coleta de dados do usuário por meio de um formulário e armazena essas informações no `localStorage`. Também possui validações e integração com a API de CEP.

### Principais funcionalidades

-   **Validação de entrada numérica**\
    A função `somenteNumeros(e)` impede a digitação de caracteres que não sejam números.

-   **Manipulação de formulário de endereço**

    -   `limpa_formulário_cep()`: limpa os campos relacionados ao endereço.

    -   `preencherFormulario(endereco)`: preenche os campos de endereço com base na resposta da API.

-   **Busca de CEP com API**

    -   Consulta a API `viacep.com.br` para preencher automaticamente os dados do formulário com base no CEP digitado.

-   **Armazenamento de dados**

    -   Coleta os dados do formulário ao clicar no botão e os armazena no array `master`, salvo em `localStorage` para persistência entre sessões.

* * * * *

📁 `ajuda.js`
-------------

Este arquivo é responsável por recuperar os dados salvos em `localStorage` (por `main.js`) e exibi-los dinamicamente na interface.

### Principais funcionalidades

-   **Leitura de dados do `localStorage`**

    -   Recupera o array `master` que contém os objetos com dados dos formulários preenchidos.

-   **Criação dinâmica de elementos HTML**

    -   A função `createDivP(paragrafo)` cria uma `div` para cada entrada do array, inserindo elementos `<p>` com os dados de cada objeto.

    -   Todos os elementos gerados recebem a classe `help-card` para estilização.

-   **Exibição dos dados**

    -   Os objetos são iterados e exibidos automaticamente em elementos HTML ao carregar a página ou chamar a função apropriada.