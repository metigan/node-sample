

```markdown
# 📤 Metigan CSV Email Sender

Este projeto é um exemplo simples de como enviar e-mails em massa utilizando a API do [Metigan](https://metigan.com), a partir de uma lista de e-mails em um arquivo CSV.

## 🚀 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/metigan/node-sample.git
cd node-sample
```

### 2. Instale as dependências

```bash
yarn install
```

### 3. Adicione seu arquivo `emails.csv`

O arquivo deve estar na raiz do projeto e conter uma coluna `email`, como no exemplo abaixo:

```csv
email
alice@example.com
bob@example.com
```

### 4. Adicione sua chave da API

No arquivo `index.ts`, substitua `'your_api_key'` pela sua chave da API do Metigan:

```ts
const metigan = new Metigan('your_api_key');
```

### 5. Execute o script

```bash
ts-node index.ts
```

> O script enviará os e-mails em lotes de 8 com um intervalo de 1 segundo entre os lotes.

## 📦 Tecnologias

- TypeScript
- Node.js
- [Metigan SDK para Node.js](https://www.npmjs.com/package/metigan)
- `csv-parser` para leitura do CSV

## 🧑‍💻 Autor

Francisco Inoque — [metigan.com](https://metigan.com) | developers@metigan.com
```
