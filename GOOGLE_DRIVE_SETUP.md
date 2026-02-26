# Configuração do Google Drive para Upload Automático

## Passo a Passo para Configurar o Upload para Google Drive

### 1. Criar um Google Apps Script

1. Acesse: https://script.google.com/
2. Clique em "Novo Projeto"
3. Cole o código abaixo no editor
4. Salve o projeto (dê um nome como "Dasco Drive Uploader")
5. Clique em "Implantar" > "Nova implantação"
6. Selecione tipo: "Aplicativo da Web"
7. Configure:
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
8. Clique em "Implantar"
9. Copie a URL da implantação (será algo como: https://script.google.com/macros/s/...)
10. Cole essa URL na variável `GOOGLE_APPS_SCRIPT_URL` no arquivo `index.html`

### 2. Código do Google Apps Script

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const fileName = data.fileName;
    const fileContent = data.fileContent;
    const folderId = data.folderId || 'root';
    
    // Criar o arquivo no Google Drive
    const folder = folderId === 'root' ? DriveApp.getRootFolder() : DriveApp.getFolderById(folderId);
    const file = folder.createFile(fileName, fileContent, 'application/json');
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: file.getId(),
        fileName: fileName,
        fileUrl: file.getUrl()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Obter o ID da Pasta do Google Drive (Opcional)

1. Abra o Google Drive
2. Crie uma pasta ou abra a pasta onde deseja salvar os arquivos
3. Clique com o botão direito na pasta > "Obter link"
4. O ID da pasta está na URL: `https://drive.google.com/drive/folders/ID_AQUI`
5. Cole o ID na variável `GOOGLE_DRIVE_FOLDER_ID` no arquivo `index.html`

### 4. Configurar no index.html

No arquivo `index.html`, encontre estas linhas e preencha:

```javascript
const GOOGLE_DRIVE_FOLDER_ID = 'COLE_O_ID_DA_PASTA_AQUI'; // Exemplo: '1a2b3c4d5e6f7g8h9i0j'
const GOOGLE_APPS_SCRIPT_URL = 'COLE_A_URL_DO_APPS_SCRIPT_AQUI'; // URL da implantação
```

### 5. Testar

1. Complete uma pesquisa no chat
2. O arquivo JSON será enviado automaticamente para o Google Drive
3. Verifique a pasta configurada no Google Drive

## Nota de Segurança

- O Google Apps Script permite acesso público ao endpoint
- Para maior segurança, considere adicionar autenticação por token
- Os arquivos serão salvos com nome único baseado em timestamp
