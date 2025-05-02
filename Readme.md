# Notification Service

## Descrição
O **Notification Service** é uma API desenvolvida com NestJS para gerenciar notificações. Ele permite criar, cancelar, marcar como lidas/não lidas, contar notificações de um destinatário e listar notificações de um destinatário.

---

## Funcionalidades
- **Criar Notificação:** Envia uma nova notificação para um destinatário.
- **Cancelar Notificação:** Cancela uma notificação existente.
- **Marcar como Lida:** Marca uma notificação como lida.
- **Marcar como Não Lida:** Marca uma notificação como não lida.
- **Contar Notificações:** Retorna a contagem de notificações de um destinatário.
- **Listar Notificações:** Lista todas as notificações de um destinatário.

---

## Rotas da API

### **1. Criar Notificação**
**Endpoint:** `POST /notifications`  
**Descrição:** Cria uma nova notificação.  

#### **Exemplo de Requisição**
```json
POST /notifications
Content-Type: application/json

{
  "recipientId": "123",
  "category": "info",
  "content": "Você tem uma nova mensagem!"
}
```

#### **Exemplo de Resposta**
```json
200 OK
{
  "notification": {
    "id": "12345",
    "recipientId": "123",
    "category": "info",
    "content": "Você tem uma nova mensagem!",
    "readAt": null,
    "cancelAt": null,
    "createdAt": "2025-05-02T10:00:00.000Z"
  }
}
```

---

### **2. Cancelar Notificação**
**Endpoint:** `PATCH /notifications/:id/cancel`  
**Descrição:** Cancela uma notificação específica.  

#### **Exemplo de Requisição**
```json
PATCH /notifications/:id/cancel
```

#### **Exemplo de Resposta**
```json
204 No Content
```

---

### **3. Marcar Notificação como Lida**
**Endpoint:** `PATCH /notifications/:id/read`  
**Descrição:** Marca uma notificação como lida.  

#### **Exemplo de Requisição**
```json
PATCH /notifications/:id/read
```

#### **Exemplo de Resposta**
```json
204 No Content
```

---

### **4. Marcar Notificação como Não Lida**
**Endpoint:** `PATCH /notifications/:id/unread`  
**Descrição:** Marca uma notificação como não lida.  

#### **Exemplo de Requisição**
```json
PATCH /notifications/:id/unread
```

#### **Exemplo de Resposta**
```json
204 No Content
```

---

### **5. Contar Notificações de um Destinatário**
**Endpoint:** `GET /notifications/count/from/:recipientId`  
**Descrição:** Retorna a contagem de notificações de um destinatário específico.  

#### **Exemplo de Requisição**
```json
GET /notifications/count/from/:recipientId
```

#### **Exemplo de Resposta**
```json
200 OK
{
  "count": 5
}
```

---

### **6. Listar Notificações de um Destinatário**
**Endpoint:** `GET /notifications/from/:recipientId`  
**Descrição:** Retorna todas as notificações de um destinatário específico.  

#### **Exemplo de Requisição**
```json
GET /notifications/from/:recipientId
```

#### **Exemplo de Resposta**
```json
200 OK
{
  "notifications": [
    {
      "id": "12345",
      "recipientId": "123",
      "category": "info",
      "content": "Você tem uma nova mensagem!",
      "readAt": null,
      "cancelAt": null,
      "createdAt": "2025-05-02T10:00:00.000Z"
    },
    {
      "id": "67890",
      "recipientId": "123",
      "category": "alert",
      "content": "Sua conta foi atualizada.",
      "readAt": "2025-05-01T15:00:00.000Z",
      "cancelAt": null,
      "createdAt": "2025-05-01T14:00:00.000Z"
    }
  ]
}
```

---

## Estrutura do Projeto

### **Camadas**
1. **Infraestrutura (`infra`)**
   - Contém os controladores HTTP, mapeadores e integração com o banco de dados (Prisma).
   - Exemplo: `notifications.controller.ts`, `prisma.service.ts`.

2. **Aplicação (`app`)**
   - Contém os casos de uso (use-cases) que implementam a lógica de negócios.
   - Exemplo: `send-notification.ts`, `cancel-notifications.ts`.

3. **Entidades (`entities`)**
   - Contém as entidades principais do domínio, como `Notification` e `Content`.

---

## Configuração do Banco de Dados

### **Modelo Prisma**
Arquivo: `prisma/schema.prisma`  
Descrição: Modelo do banco de dados para o Prisma.

```prisma
model Notification {
  id          String   @id @default(uuid())
  recipientId String
  content     String
  category    String
  readAt      DateTime?
  cancelAt    DateTime?
  createdAt   DateTime  @default(now())

  @@index([recipientId])
}
```

---

## Como Executar o Projeto

### **1. Instalar Dependências**
```bash
npm install
```

### **2. Configurar Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```env
DATABASE_URL="file:./prisma/dev.db"
```

### **3. Configurar o Banco de Dados**
Gere o cliente Prisma e aplique as migrações:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### **4. Iniciar o Servidor**
```bash
npm run start:dev
```

---

## Ferramentas de Teste

### **Importar Rotas no Insomnia**
Você pode usar o seguinte arquivo JSON para importar as rotas no Insomnia:

```json
{
  "_type": "export",
  "__export_format": 4,
  "__export_date": "2025-05-02T10:00:00.000Z",
  "__export_source": "insomnia.desktop.app:v2023.1.0",
  "resources": [
    {
      "_id": "fld_1",
      "parentId": null,
      "modified": 1620000000000,
      "created": 1620000000000,
      "name": "Notification Service",
      "description": "API para gerenciar notificações",
      "_type": "request_group"
    },
    {
      "_id": "req_1",
      "parentId": "fld_1",
      "modified": 1620000000000,
      "created": 1620000000000,
      "url": "http://localhost:3000/notifications",
      "name": "Listar Notificações",
      "description": "Obtém todas as notificações",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    }
  ]
}
```

---
