// ============================================
// CÓDIGO COMPLETO DO GOOGLE APPS SCRIPT
// Sistema Dasco - Upload e Sincronização
// ============================================
// 
// INSTRUÇÕES IMPORTANTES:
// 1. Acesse: https://script.google.com/
// 2. DELETE TODO O CÓDIGO ANTIGO
// 3. Cole TODO este código no editor
// 4. Salve o projeto (Ctrl+S)
// 5. Clique em "Implantar" > "Gerenciar implantações"
// 6. Se já existe implantação: Clique no lápis > Editar > Nova versão > Implantar
// 7. Se não existe: Nova implantação > Tipo: App da Web > Executar como: Eu > Acesso: Qualquer pessoa > Implantar
// 8. Autorize as permissões quando solicitado
// 9. Copie a URL gerada e verifique se está igual no index.html (linha 539)
//
// URL ATUAL: https://script.google.com/macros/s/AKfycbzmd0ZNz4WBkSw2Axey9EeDT9Mr_6_vpbKvxTj12IlL0Zj-lOgxDrIHbXzlafJMOsS9/exec
// PASTA DO DRIVE: 1cg0SPId-JFv0OqI5dVOCy9ReZBF6TIox
// ============================================

// Função doGet (necessária para evitar erros quando acessado via GET)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      message: 'Use POST para enviar arquivos',
      error: 'Este endpoint requer método POST'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função principal - recebe requisições POST
function doPost(e) {
  try {
    // Parse dos dados recebidos
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    // Listar arquivos JSON da pasta
    if (action === 'listFiles') {
      const folderId = data.folderId || 'root';
      let folder;
      
      try {
        // Obter a pasta do Google Drive
        folder = folderId === 'root' ? DriveApp.getRootFolder() : DriveApp.getFolderById(folderId);
      } catch (error) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Pasta não encontrada: ' + error.toString()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Buscar todos os arquivos JSON na pasta
      const files = folder.getFilesByType('application/json');
      const fileList = [];
      
      while (files.hasNext()) {
        const file = files.next();
        fileList.push({
          id: file.getId(),
          name: file.getName(),
          sizeBytes: file.getSize(),
          modifiedTime: file.getLastUpdated().toISOString(),
          url: file.getUrl()
        });
      }
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          files: fileList,
          count: fileList.length
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obter conteúdo de um arquivo
    if (action === 'getFile') {
      const fileId = data.fileId;
      try {
        const file = DriveApp.getFileById(fileId);
        const content = file.getBlob().getDataAsString();
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            content: content,
            fileName: file.getName(),
            fileId: fileId
          }))
          .setMimeType(ContentService.MimeType.JSON);
      } catch (error) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Arquivo não encontrado: ' + error.toString()
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Atualizar arquivo existente (adicionar dados ao array)
    if (action === 'updateFile') {
      const fileName = data.fileName;
      const newData = data.newData; // Novo feedback a ser adicionado
      const folderId = data.folderId || 'root';
      
      if (!fileName || !newData) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'fileName e newData são obrigatórios',
            received: { fileName: fileName, hasNewData: !!newData, folderId: folderId }
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      try {
        // Obter a pasta do Google Drive
        let folder;
        try {
          if (folderId === 'root') {
            folder = DriveApp.getRootFolder();
          } else {
            folder = DriveApp.getFolderById(folderId);
          }
        } catch (folderError) {
          return ContentService
            .createTextOutput(JSON.stringify({
              success: false,
              error: 'Erro ao acessar pasta: ' + folderError.toString(),
              folderId: folderId
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
        
        // Buscar o arquivo existente na pasta
        const files = folder.getFilesByName(fileName);
        let file;
        let existingData = [];
        
        if (files.hasNext()) {
          // Arquivo existe - ler conteúdo atual
          file = files.next();
          try {
            const content = file.getBlob().getDataAsString();
            const parsed = JSON.parse(content);
            // Se for array, usar diretamente; se for objeto, converter para array
            existingData = Array.isArray(parsed) ? parsed : [parsed];
          } catch (e) {
            // Se não conseguir fazer parse, começar com array vazio
            existingData = [];
          }
          
          // Adicionar novo dado ao array
          existingData.push(newData);
          
          // Atualizar o arquivo
          file.setContent(JSON.stringify(existingData, null, 2));
          
          return ContentService
            .createTextOutput(JSON.stringify({
              success: true,
              fileId: file.getId(),
              fileName: fileName,
              fileUrl: file.getUrl(),
              folderId: folderId,
              folderName: folder.getName(),
              message: 'Arquivo atualizado com sucesso',
              totalItems: existingData.length,
              timestamp: new Date().toISOString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
        } else {
          // Arquivo não existe - criar novo com o primeiro dado
          existingData = [newData];
          file = folder.createFile(fileName, JSON.stringify(existingData, null, 2));
          
          return ContentService
            .createTextOutput(JSON.stringify({
              success: true,
              fileId: file.getId(),
              fileName: fileName,
              fileUrl: file.getUrl(),
              folderId: folderId,
              folderName: folder.getName(),
              message: 'Arquivo criado com sucesso na pasta',
              totalItems: 1,
              timestamp: new Date().toISOString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      } catch (error) {
        return ContentService
          .createTextOutput(JSON.stringify({
            success: false,
            error: 'Erro ao processar: ' + error.toString(),
            stack: error.stack,
            folderId: folderId,
            fileName: fileName
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Upload de arquivo (padrão - criar novo arquivo)
    const fileName = data.fileName;
    const fileContent = data.fileContent;
    const folderId = data.folderId || 'root';
    
    // Validação dos dados obrigatórios
    if (!fileName || !fileContent) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'fileName e fileContent são obrigatórios'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    try {
      // Obter a pasta do Google Drive
      let folder;
      if (folderId === 'root') {
        folder = DriveApp.getRootFolder();
      } else {
        folder = DriveApp.getFolderById(folderId);
      }
      
      // Criar o arquivo JSON na pasta
      const file = folder.createFile(fileName, fileContent, 'application/json');
      
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          fileId: file.getId(),
          fileName: fileName,
          fileUrl: file.getUrl(),
          folderId: folderId,
          message: 'Arquivo criado com sucesso',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: error.toString(),
          folderId: folderId
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Erro geral: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

