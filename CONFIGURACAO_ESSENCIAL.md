# ⚙️ Configuração Essencial - Sistema Dasco

## 📋 Passo a Passo Rápido

### 1️⃣ Google Apps Script

1. Acesse: **https://script.google.com/**
2. Clique em **"Novo Projeto"**
3. Abra o arquivo **`GOOGLE_APPS_SCRIPT_COMPLETO.js`**
4. **Copie TODO o código** e cole no editor do Google Apps Script
5. Clique em **"Salvar"** (Ctrl+S)
6. Clique em **"Implantar"** → **"Nova implantação"**
7. Configure:
   - Tipo: **"App da Web"**
   - Executar como: **"Eu mesmo"**
   - Quem tem acesso: **"Qualquer pessoa"**
8. Clique em **"Implantar"**
9. **COPIE A URL GERADA** (será algo como: `https://script.google.com/macros/s/.../exec`)
10. Na primeira vez, clique em **"Revisar permissões"** → **"Avançado"** → **"Ir para [projeto] (não seguro)"** → **"Permitir"**

### 2️⃣ Google Drive

1. Acesse: **https://drive.google.com/**
2. Crie uma pasta ou use uma existente
3. Abra a pasta e olhe a URL:
   ```
   https://drive.google.com/drive/folders/1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox
   ```
4. **COPIE O ID** que vem depois de `/folders/`
   - No exemplo: `1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox`

### 3️⃣ Configurar no index.html

1. Abra o arquivo **`index.html`**
2. Procure pelas linhas **460-462**:
   ```javascript
   const GOOGLE_DRIVE_FOLDER_ID = '1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox';
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   const GOOGLE_DRIVE_SYNC_URL = 'https://script.google.com/macros/s/.../exec';
   ```
3. **Substitua**:
   - `GOOGLE_DRIVE_FOLDER_ID`: Cole o ID da pasta que você copiou
   - `GOOGLE_APPS_SCRIPT_URL`: Cole a URL do Apps Script que você copiou
   - `GOOGLE_DRIVE_SYNC_URL`: Use a mesma URL do `GOOGLE_APPS_SCRIPT_URL`
4. Salve o arquivo (Ctrl+S)

## ✅ Pronto!

O sistema está configurado. Agora:
- ✅ Quando uma pesquisa terminar, o JSON será enviado automaticamente para o Google Drive
- ✅ Quando você abrir o dashboard, ele sincronizará automaticamente
- ✅ A cada 30 segundos, o dashboard sincroniza novamente
- ✅ Novos arquivos aparecem automaticamente no dashboard

## 🧪 Teste

1. Complete uma pesquisa no chat
2. Verifique se aparece a mensagem: "✅ Seu feedback foi salvo com sucesso no Google Drive!"
3. Abra o Google Drive e verifique se o arquivo JSON apareceu na pasta
4. Abra o dashboard (engrenagem ⚙️ → senha: dasco2029)
5. Verifique se os dados aparecem nos gráficos

## ❌ Problemas?

- **Erro de CORS**: Use um servidor local (Live Server no VS Code) em vez de abrir o arquivo diretamente
- **Arquivo não aparece**: Verifique se o ID da pasta e a URL do Apps Script estão corretos
- **Dashboard não sincroniza**: Clique no botão "🔄 Sincronizar Google Drive" manualmente
