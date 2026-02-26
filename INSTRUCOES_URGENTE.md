# ⚠️ INSTRUÇÕES URGENTES - CONFIGURAÇÃO DO GOOGLE APPS SCRIPT

## 🔴 PROBLEMA IDENTIFICADO
O sistema não está enviando nem buscando dados porque o Google Apps Script precisa ser **REIMPLANTADO** com as novas funções.

## ✅ SOLUÇÃO PASSO A PASSO

### 1️⃣ Acessar o Google Apps Script
1. Abra: https://script.google.com/
2. Faça login com sua conta Google
3. Encontre o projeto "Dasco" ou crie um novo

### 2️⃣ Atualizar o Código
1. **DELETE TODO O CÓDIGO ANTIGO**
2. Abra o arquivo `GOOGLE_APPS_SCRIPT_COMPLETO.js` neste projeto
3. **COPIE TODO O CÓDIGO**
4. Cole no Google Apps Script
5. Clique em **SALVAR** (Ctrl+S ou ícone de disco)

### 3️⃣ REIMPLANTAR O APPS SCRIPT (MUITO IMPORTANTE!)
1. Clique em **"Implantar"** (no canto superior direito)
2. Clique em **"Gerenciar implantações"**
3. Se já existe uma implantação:
   - Clique no ícone de **lápis** (editar) ao lado da implantação
   - Clique em **"Editar"**
   - Em **"Nova versão"**, selecione **"Nova versão"**
   - Clique em **"Implantar"**
4. Se não existe implantação:
   - Clique em **"Nova implantação"**
   - Clique no ícone de **engrenagem** ao lado de "Tipo"
   - Selecione **"App da Web"**
   - Configure:
     - **Executar como**: Eu (seu email)
     - **Quem tem acesso**: Qualquer pessoa
   - Clique em **"Implantar"**

### 4️⃣ Verificar a URL
1. Após implantar, copie a **URL do App da Web**
2. Deve ser algo como: `https://script.google.com/macros/s/AKfycbzmd0ZNz4WBkSw2Axey9EeDT9Mr_6_vpbKvxTj12IlL0Zj-lOgxDrIHbXzlafJMOsS9/exec`
3. Verifique se está igual no `index.html` (linha 539)

### 5️⃣ Testar o Sistema
1. **IMPORTANTE**: Use **Live Server** (não abra direto o arquivo)
   - No VS Code: Clique com botão direito no `index.html`
   - Selecione **"Open with Live Server"**
2. Complete uma pesquisa
3. Abra o Console (F12) e verifique:
   - Se aparece `✅ Banco de dados atualizado com sucesso!`
   - Se mostra o total de feedbacks
4. Verifique a pasta do Google Drive:
   - https://drive.google.com/drive/folders/1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox
   - Deve aparecer o arquivo `database_dasco.json`

## 🔍 VERIFICAÇÕES IMPORTANTES

### Se ainda não funcionar:

1. **Verifique as permissões do Google Apps Script:**
   - Vá em "Execuções" (menu lateral)
   - Veja se há erros de autorização
   - Se houver, clique em "Revisar permissões" e autorize

2. **Verifique o Console do navegador (F12):**
   - Procure por erros em vermelho
   - Copie e me envie os erros que aparecerem

3. **Teste a URL do Script diretamente:**
   - Abra: https://script.google.com/macros/s/AKfycbzmd0ZNz4WBkSw2Axey9EeDT9Mr_6_vpbKvxTj12IlL0Zj-lOgxDrIHbXzlafJMOsS9/exec
   - Deve aparecer: `{"success":false,"message":"Use POST para enviar arquivos"}`
   - Se aparecer isso, o script está funcionando!

## 📝 NOTAS IMPORTANTES

- **SEMPRE use Live Server** - não abra o arquivo diretamente (file://)
- O arquivo será criado como `database_dasco.json` na pasta do Google Drive
- Cada novo feedback será **adicionado** ao mesmo arquivo (não cria arquivos novos)
- O dashboard sincroniza automaticamente quando aberto

## 🆘 SE PRECISAR DE AJUDA

Envie:
1. Screenshot do console (F12) mostrando os erros
2. Screenshot da página de "Execuções" do Google Apps Script
3. Mensagem de erro exata que aparece
