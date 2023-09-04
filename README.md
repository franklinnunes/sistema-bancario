# Sistema bancário - Cubos Bank

Esse sistema é uma RESTful API que permite:
-   Listagem de contas bancárias
-   Criar conta bancária
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depositar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

## **Endpoints**

### **Listar contas bancárias**

#### `GET` `/contas?senha_banco=123`

Essa é a rota utilizada para listar todas as contas bancárias existentes.

-   **Requisição**  

    Parâmetro do tipo query **`senha_banco`**.  

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta possui um array dos objetos (contas) encontradas.  
    Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /contas?senha_banco=senha-do-banco
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// 2 contas encontradas
[
    {
        numero: "1",
        saldo: 0,
        usuario: {
            nome: 'Foo Bar',
            cpf: '00011122233',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar.com',
            senha: '1234'
        }
    },
    {
        numero: "2",
        saldo: 1000,
        usuario: {
            nome: 'Foo Bar 2',
            cpf: '00011122234',
            data_nascimento: '2021-03-15',
            telefone: '71999998888',
            email: 'foo@bar2.com',
            senha: '12345'
        }
    }
]

// HTTP Status 200 / 201
// nenhuma conta encontrada
[]
```

### **Criar conta bancária**

#### `POST` `/contas`

Essa é a rota utilizada para criar uma conta bancária, onde será gerado um número único para identificação de cada conta.

-   **Requisição**

    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta possui um objeto com a propriedade **`numero`** que possui o número gerado exclusivamente para a conta em questão criada, a propriedade **`saldo`** que possui o valor inicial zerado e a propriedade **`usuario`** que possui as informações do usuário da conta.  
    Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -   Validar os campos obrigatórios:
        -   nome
        -   cpf
        -   data_nascimento
        -   telefone
        -   email
        -   senha
    -   CPF deve ser um campo único.
    -   E-mail deve ser um campo único.
    -   Saldo inicial da conta como 0.
    -   ID (número) único.

#### **Exemplo de requisição**

```javascript
// POST /contas
{
    "nome": "Foo Bar",
    "email": "foo@bar.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "11999998888",
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao cadastrar
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: "Foo Bar",
        cpf: "00011122233",
        data_nascimento: "2001-03-15",
        telefone: "11999998888",
        email: "foo@bar.com",
        senha: "1234"
    }
}

// HTTP Status 400, 404
// erro ao cadastrar
{
    mensagem: 'Mensagem de erro'
}
```

### **Atualizar usuário da conta bancária**

#### `PUT` `/contas/:numeroConta/usuario`

Essa é a rota utilizada para atualizar os dados do usuário de uma conta bancária.

-   **Requisição**

    Parâmetro do tipo rota **`numeroConta`**.  
    O corpo (body) deverá possuir um objeto contendo uma ou até mesmo todas as seguintes propriedades (respeitando estes nomes):

        -   nome
        -   cpf
        -   data_nascimento
        -   telefone
        -   email
        -   senha

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`mensagem`** que possui um texto informativo para orientar que os dados foram atualizados com sucesso.  
    Em caso de **falha na validação**, a resposta retorna **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplos de requisição**

```javascript
// PUT /contas/1/usuario
// informando apenas um campo para atualizar
{
    "nome": "Bar Foo"
}

// informando todos os campos para atualizar
{
    "nome": "Bar Foo",
    "email": "bar@foo.com",
    "cpf": "33322211100",
    "data_nascimento": "03/05/2010",
    "telefone": "11988889999",
    "senha": "4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao atualizar
{
    mensagem: "Conta atualizada com sucesso"
}

// HTTP Status 400, 404
// erro ao atualizar
{
    mensagem: "Mensagem de erro"
}
```

### **Excluir Conta**

#### `DELETE` `/contas/:numeroConta`

Essa é a rota utilizada para excluir uma conta bancária existente.

-   **Requisição**

    Parâmetro do tipo rota **`numeroConta`**.
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`mensagem`** que possui um texto informativo para orientar que a conta foi excluída com sucesso. 
    Em caso de **falha na validação**, a resposta retorna **_status code_** apropriado, e em seu corpo (body) retorna um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// DELETE /contas/1
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao excluir
{
    mensagem: "Conta excluída com sucesso"
}

// HTTP Status 400, 404
// erro ao excluir
{
    mensagem: "Mensagem de erro"
}
```

### **Depositar**

#### `POST` `/transacoes/depositar`

Essa é a rota utilizada para somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

-   **Requisição**

    Sem parâmetros de rota ou de query  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades:
    -   numero_conta
    -   valor

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`mensagem`** que possui um texto informativo para orientar que o depósito foi realizado com sucesso.  
    Em caso de **falha na validação**, a resposta retorna um **_status code_** apropriado, e em seu corpo (body) retorna um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.


#### **Exemplo de requisição**

```javascript
// POST /transacoes/depositar
{
    "numero_conta": "1",
    "valor": 10000
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao depositar
{
    mensagem: "Depósito realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao depositar
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de um depósito**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Sacar**

#### `POST` `/transacoes/sacar`

Essa é a rota utilizada para realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

-   **Requisição**

    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    -   numero_conta
    -   valor
    -   senha

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`mensagem`** que possui um texto informativo para orientar que o saque foi realizado com sucesso.  
    Em caso de **falha na validação**, é retornado um **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /transacoes/sacar
{
    "numero_conta": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao sacar
{
    mensagem: "Saque realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao sacar
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de um saque**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta: "1",
    valor: 10000
}
```

### **Transferir**

#### `POST` `/transacoes/transferir`

Essa é a rota utilizada para realizar a transferência de saldo de uma conta bancária para outra e registrar essa transação.

-   **Requisição**

    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades:
    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retornja um objeto com a propriedade **`mensagem`** que possui um texto informativo para orientar que a transferência foi realizada com sucesso.  
    Em caso de **falha na validação**, a resposta retorna um **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /transacoes/transferir
{
    "numero_conta_origem": "1",
    "numero_conta_destino": "1",
    "valor": 10000,
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao transferir
{
    mensagem: "Transferência realizado com sucesso"
}

// HTTP Status 400, 404
// erro ao transferir
{
    mensagem: "Mensagem de erro"
}
```

#### **Exemplo do registro de uma transferência**

```javascript
{
    data: "2021-08-10 23:40:35",
    numero_conta_origem: "1",
    numero_conta_destino: "2",
    valor: 10000
}
```

### **Consultar Saldo**

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Essa é a rota utilizada para retornar o saldo de uma conta bancária.

-   **Requisição**  

    Parâmetros do tipo query:
    -   numero_conta.  
    -   senha.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`saldo`** que possui o saldo em conta.  
    Em caso de **falha na validação**, a resposta retorna **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /contas/saldo?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201
// sucesso ao obter saldo
{
    saldo: 10000
}

// HTTP Status 400, 404
// erro ao obter saldo
{
    mensagem: "Mensagem de erro"
}
```

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Essa é a rota utilizada para listar as transações realizadas de uma conta específica.

-   **Requisição**  

    Parâmetros do tipo query:
    -   numero_conta.  
    -   senha.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  

    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **`saques`** que possui todos os saques vinculados a conta, a propriedade **`depositos`** que possui todos os depósitos vinculados a conta, a propriedade **`transferenciasEnviadas`** que possui todas as transferências enviadas desta conta e a propriedade **`transferenciasRecebidas`** que possui todas as transferências recebidas nesta conta.  
    Em caso de **falha na validação**, a resposta retorna **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **`mensagem`** que possui como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /contas/extrato?numero_conta=numero-da-conta&senha=senha-da-conta
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
// sucesso ao obter extrato
{
  depositos: [
    {
      data: "2021-08-18 20:46:03",
      numero_conta: "1",
      valor: 10000
    },
    {
      data: "2021-08-18 20:46:06",
      numero_conta: "1",
      valor: 10000
    }
  ],
  saques: [
    {
      data: "2021-08-18 20:46:18",
      numero_conta: "1",
      valor: 1000
    }
  ],
  transferenciasEnviadas: [
    {
      data: "2021-08-18 20:47:10",
      numero_conta_origem: "1",
      numero_conta_destino: "2",
      valor: 5000
    }
  ],
  transferenciasRecebidas: [
    {
      data: "2021-08-18 20:47:24",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    },
    {
      data: "2021-08-18 20:47:26",
      numero_conta_origem: "2",
      numero_conta_destino: "1",
      valor: 2000
    }
  ]
}

// HTTP Status 400, 404
// erro ao obter extrato
{
    mensagem: 'Mensagem do erro!'
}
```
//Projeto desenvolvido durante Curso de Desenvolvimento Back-end da Cubos Academy.