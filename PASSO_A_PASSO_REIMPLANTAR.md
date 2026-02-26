# 🚀 PASSO A PASSO COMPLETO - REIMPLANTAR GOOGLE APPS SCRIPT

## ⚠️ IMPORTANTE: O script precisa ser REIMPLANTADO para funcionar!

---

## 📋 PASSO 1: Abrir o Google Apps Script

1. Acesse: **https://script.google.com/**
2. Faça login com sua conta Google
3. Procure pelo projeto **"Dasco"** ou crie um novo projeto

---

## 📋 PASSO 2: Atualizar o Código

1. **DELETE TODO O CÓDIGO** que está no editor (selecione tudo e delete)
2. Abra o arquivo **`GOOGLE_APPS_SCRIPT_COMPLETO.js`** que está na pasta do projeto
3. **COPIE TODO O CÓDIGO** (Ctrl+A, Ctrl+C)
4. **COLE no Google Apps Script** (Ctrl+V)
5. Clique em **SALVAR** (ícone de disco 💾 ou Ctrl+S)

---

## 📋 PASSO 3: REIMPLANTAR (MUITO IMPORTANTE!)

### Opção A: Se JÁ EXISTE uma implantação

1. Clique no botão **"Implantar"** (canto superior direito)
2. Clique em **"Gerenciar implantações"**
3. Você verá uma lista com a implantação existente
4. Clique no ícone de **LÁPIS** (✏️) ao lado da implantação
5. Clique em **"Editar"**
6. Em **"Nova versão"**, selecione **"Nova versão"**
7. Clique em **"Implantar"**
8. Aguarde alguns segundos
9. **COPIE A URL** que aparece (deve ser igual à que já está no código)

### Opção B: Se NÃO EXISTE implantação

1. Clique no botão **"Implantar"** (canto superior direito)
2. Clique em **"Nova implantação"**
3. Clique no ícone de **ENGRENAGEM** (⚙️) ao lado de "Tipo"
4. Selecione **"App da Web"**
5. Configure:
   - **Descrição**: Sistema Dasco - Upload e Sincronização
   - **Executar como**: **Eu** (seu email)
   - **Quem tem acesso**: **Qualquer pessoa**
6. Clique em **"Implantar"**
7. Na primeira vez, você precisará **AUTORIZAR**:
   - Clique em **"Revisar permissões"**
   - Selecione sua conta Google
   - Clique em **"Avançado"**
   - Clique em **"Ir para [nome do projeto] (não seguro)"**
   - Clique em **"Permitir"**
8. **COPIE A URL** que aparece
   - Deve ser: `https://script.google.com/macros/s/AKfycbzmd0ZNz4WBkSw2Axey9EeDT9Mr_6_vpbKvxTj12IlL0Zj-lOgxDrIHbXzlafJMOsS9/exec`

---

## 📋 PASSO 4: Verificar se está funcionando

1. Abra a URL do script no navegador:
   - https://script.google.com/macros/s/AKfycbzmd0ZNz4WBkSw2Axey9EeDT9Mr_6_vpbKvxTj12IlL0Zj-lOgxDrIHbXzlafJMOsS9/exec
2. Deve aparecer:
   ```json
   {"success":false,"message":"Use POST para enviar arquivos","error":"Este endpoint requer método POST"}
   ```
3. **Se aparecer isso, o script está funcionando!** ✅

---

## 📋 PASSO 5: Testar o Sistema

1. **IMPORTANTE**: Use **Live Server** (não abra o arquivo diretamente)
   - No VS Code: Clique com **botão direito** no `index.html`
   - Selecione **"Open with Live Server"**
   - O navegador abrirá em `http://localhost:5500` (ou similar)

2. Complete uma pesquisa no sistema

3. Abra o **Console do navegador** (F12):
   - Deve aparecer: `✅ Banco de dados atualizado com sucesso!`
   - Deve mostrar o total de feedbacks
   - Deve aparecer um **alerta** confirmando o salvamento

4. Verifique a pasta do Google Drive:
   - https://drive.google.com/drive/folders/1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox
   - Deve aparecer o arquivo **`database_dasco.json`**

5. Abra o dashboard (engrenagem → senha: dasco2029)

6. Clique em **"🔄 Sincronizar Google Drive"**

7. Os dados devem aparecer no dashboard!

---

## 🔍 TROUBLESHOOTING (Se não funcionar)

### Erro: "Pasta não encontrada"
- Verifique se o ID da pasta está correto: `1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox`
- Verifique se você tem acesso à pasta

### Erro: "Erro de rede/CORS"
- **USE LIVE SERVER** - não abra o arquivo diretamente
- Instale a extensão "Live Server" no VS Code
- Abra o arquivo com "Open with Live Server"

### Erro: "Erro ao processar"
- Verifique o console do Google Apps Script:
  - Vá em **"Execuções"** (menu lateral)
  - Veja se há erros
  - Clique nos erros para ver detalhes

### O arquivo não aparece no Google Drive
- Verifique se você autorizou as permissões do script
- Verifique se o script foi reimplantado corretamente
- Verifique o console do navegador (F12) para ver erros

---

## ✅ CHECKLIST FINAL

- [ ] Código atualizado no Google Apps Script
- [ ] Script reimplantado (nova versão)
- [ ] Permissões autorizadas
- [ ] URL do script está correta no `index.html`
- [ ] Testando com Live Server (não file://)
- [ ] Console mostra sucesso
- [ ] Arquivo aparece no Google Drive
- [ ] Dashboard mostra os dados

---

## 📞 Se ainda não funcionar

Envie:
1. Screenshot do console do navegador (F12)
2. Screenshot da página "Execuções" do Google Apps Script
3. Mensagem de erro exata
