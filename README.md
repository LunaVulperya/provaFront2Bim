# 📚 Documentação do Projeto de Formulário e Busca Local

## Índice

- [main.js](#mainjs)
- [ajuda.js](#ajudajs)
- [Mecanismo de Busca](#mecanismo-de-busca)

---

## 📁 `main.js`

Este arquivo lida com a coleta de dados do usuário por meio de um formulário e armazena essas informações no `localStorage`. Também possui validações e integração com a API de CEP.

### Funcionalidades principais

- **Validação de entrada numérica**  
  A função `somenteNumeros(e)` impede a digitação de caracteres que não sejam números.

- **Manipulação de formulário de endereço**
  - `limpa_formulário_cep()`: limpa os campos relacionados ao endereço.
  - `preencherFormulario(endereco)`: preenche os campos de endereço com base na resposta da API.

- **Busca de CEP com API**
  - Consulta a API `viacep.com.br` para preencher automaticamente os dados do formulário com base no CEP digitado.

- **Armazenamento de dados**
  - Coleta os dados do formulário ao clicar no botão e os armazena no array `master`, salvo em `localStorage` para persistência entre sessões.

---

## 📁 `ajuda.js`

Este arquivo é responsável por recuperar os dados salvos em `localStorage` (por `main.js`) e exibi-los dinamicamente na interface.

### Funcionalidades principais

- **Leitura de dados do `localStorage`**
  - Recupera o array `master` que contém os objetos com dados dos formulários preenchidos.

- **Criação dinâmica de elementos HTML**
  - A função `createDivP(paragrafo)` cria uma `div` para cada entrada do array, inserindo elementos `<p>` com os dados de cada objeto.
  - Todos os elementos gerados recebem a classe `help-card` para estilização.

- **Exibição dos dados**
  - Os objetos são iterados e exibidos automaticamente em elementos HTML ao carregar a página ou chamar a função apropriada.

---

## 🔍 Mecanismo de Busca

Implementado dentro do arquivo `ajuda.js`, este trecho do código cria uma interface de busca dinâmica que filtra os dados exibidos na tela com base no input do usuário.

### 🧠 Como funciona

1. **Dados carregados**
   - O array `master` é carregado do `localStorage` com objetos contendo as informações previamente salvas via `main.js`.

2. **Criação do campo de busca**
   - Um campo de input e um botão são criados dinamicamente com o seguinte HTML:

     ```html
     <input type="text" id="searchInput" placeholder="Procure por Nome, Cidade, etc..." class="search-input">
     <button id="searchButton" class="search-button">Procurar</button>
     ```

3. **Lógica de filtragem**
   - A função `filterMasterArray(query, masterArray)` percorre todos os objetos do array `master` e verifica se algum de seus valores inclui o termo de busca (case-insensitive).

     ```javascript
     function filterMasterArray(query, masterArray) {
         const lowerQuery = query.toLowerCase();
         return masterArray.filter(item => {
             return Object.values(item).some(value =>
                 String(value).toLowerCase().includes(lowerQuery)
             );
         });
     }
     ```

4. **Atualização da exibição**
   - A função `renderMain(arrayMestre)` remove o elemento `<main>` atual da página e insere um novo, contendo apenas os resultados filtrados.

5. **Eventos de busca**
   - A busca pode ser acionada de duas formas:
     - **Botão de busca**:
       ```javascript
       document.getElementById('searchButton').addEventListener('click', () => {
           const query = document.getElementById('searchInput').value;
           const filtered = filterMasterArray(query, master);
           renderMain(filtered);
       });
       ```
     - **Busca ao digitar (live search)**:
       ```javascript
       document.getElementById('searchInput').addEventListener('input', (event) => {
           const query = event.target.value;
           const filtered = filterMasterArray(query, master);
           renderMain(filtered);
       });
       ```

### ✅ Benefícios

- Interface responsiva com live search.
- Busca por qualquer valor contido nos objetos (ex: nome, cidade, etc).
- Sem dependência de frameworks externos.


