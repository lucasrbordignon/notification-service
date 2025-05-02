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

