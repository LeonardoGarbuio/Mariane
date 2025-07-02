# MCB - Sistema de Cursos Online

Sistema completo para gerenciamento de cursos online da Modern Care Business, com backend Node.js e frontend responsivo.

## 🚀 Funcionalidades

- ✅ **CRUD Completo de Cursos** - Criar, editar, remover e listar cursos
- ✅ **Upload de Imagens** - Sistema de upload com preview
- ✅ **Badge "Novo" Automático** - Cursos ficam marcados como "Novo" por 60 dias
- ✅ **Banco de Dados Persistente** - SQLite para armazenamento seguro
- ✅ **API REST** - Endpoints para integração
- ✅ **Interface Responsiva** - Design moderno e mobile-friendly
- ✅ **Sincronização Multi-dispositivo** - Dados centralizados no servidor

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone ou baixe o projeto**
2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   npm start
   ```
   
   Ou para desenvolvimento (com auto-reload):
   ```bash
   npm run dev
   ```

4. **Acesse o sistema:**
   - **Site principal:** http://localhost:3000
   - **Painel admin:** http://localhost:3000/admin-cursos.html
   - **API:** http://localhost:3000/api

## 📁 Estrutura do Projeto

```
Mariane/
├── server.js              # Servidor Node.js
├── package.json           # Dependências
├── database.sqlite        # Banco de dados (criado automaticamente)
├── public/                # Arquivos estáticos
│   └── uploads/           # Imagens enviadas
├── css/                   # Estilos CSS
├── imagem/                # Imagens do site
├── javascript/            # Scripts do frontend
├── index.html             # Página principal
├── index1.html            # Página de produtos/cursos
├── admin-cursos.html      # Painel de administração
└── README.md              # Este arquivo
```

## 🔧 Configuração

### Variáveis de Ambiente (Opcional)
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
NODE_ENV=development
```

### Banco de Dados
O SQLite é criado automaticamente na primeira execução. A tabela `cursos` contém:
- `id` - ID único do curso
- `titulo` - Título do curso
- `descricao` - Descrição detalhada
- `imagem` - Caminho da imagem
- `link` - URL do curso
- `cargaHoraria` - Carga horária
- `certificado` - Se oferece certificado (Sim/Não)
- `alunos` - Número de alunos
- `dataCadastro` - Data de cadastro (automática)

## 📖 Como Usar

### 1. Cadastrar um Curso
1. Acesse http://localhost:3000/admin-cursos.html
2. Preencha todos os campos obrigatórios
3. Selecione uma imagem (máximo 5MB)
4. Clique em "Salvar Curso"

### 2. Editar um Curso
1. No painel admin, clique no ícone de editar (lápis)
2. Modifique os campos desejados
3. Clique em "Atualizar Curso"

### 3. Remover um Curso
1. No painel admin, clique no ícone de lixeira
2. Confirme a exclusão

### 4. Visualizar Cursos
- Os cursos aparecem automaticamente na página de produtos
- Cursos cadastrados há menos de 60 dias ficam marcados como "Novo"

## 🔌 API Endpoints

### GET /api/cursos
Lista todos os cursos
```bash
curl http://localhost:3000/api/cursos
```

### GET /api/cursos/:id
Busca um curso específico
```bash
curl http://localhost:3000/api/cursos/1
```

### POST /api/cursos
Cria um novo curso
```bash
curl -X POST -F "titulo=Curso Teste" -F "descricao=Descrição" -F "imagem=@imagem.jpg" -F "link=https://exemplo.com" -F "cargaHoraria=40 horas" -F "certificado=Sim" -F "alunos=100" http://localhost:3000/api/cursos
```

### PUT /api/cursos/:id
Atualiza um curso
```bash
curl -X PUT -F "titulo=Curso Atualizado" -F "descricao=Nova descrição" -F "imagem=@nova-imagem.jpg" -F "link=https://exemplo.com" -F "cargaHoraria=50 horas" -F "certificado=Sim" -F "alunos=150" http://localhost:3000/api/cursos/1
```

### DELETE /api/cursos/:id
Remove um curso
```bash
curl -X DELETE http://localhost:3000/api/cursos/1
```

### GET /api/health
Verifica status da API
```bash
curl http://localhost:3000/api/health
```

## 🎨 Personalização

### Cores e Estilos
Edite o arquivo `css/style.css` para personalizar:
- Cores principais
- Tipografia
- Layout dos cards
- Responsividade

### Badge "Novo"
Para alterar o período do badge "Novo", edite a função `isNovo()`:
```javascript
function isNovo(dataCadastro) {
    const dias = 60; // Altere este valor
    // ... resto do código
}
```

## 🔒 Segurança

- **Upload de Imagens:** Apenas arquivos de imagem são aceitos
- **Tamanho Máximo:** 5MB por imagem
- **Validação:** Todos os campos obrigatórios são validados
- **CORS:** Configurado para permitir requisições do frontend

## 🚀 Deploy

### Local/Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Serviços de Hospedagem Recomendados
- **Heroku** - Deploy simples
- **Railway** - Deploy automático
- **Vercel** - Para frontend
- **DigitalOcean** - VPS completo

## 🐛 Solução de Problemas

### Erro: "API Offline"
- Verifique se o servidor está rodando
- Confirme se a porta 3000 está livre
- Verifique os logs do console

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Verifique se o Node.js está atualizado

### Imagens não carregam
- Verifique se a pasta `public/uploads` existe
- Confirme se as permissões estão corretas
- Verifique se o caminho da imagem está correto

### Banco não conecta
- Verifique se o arquivo `database.sqlite` foi criado
- Confirme as permissões de escrita na pasta

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs do console
- Teste a API com curl ou Postman
- Verifique se todas as dependências estão instaladas

## 📄 Licença

Este projeto está sob a licença MIT.

---

**MCB - Modern Care Business**  
Transformando a educação em saúde através da tecnologia. 
>>>>>>> b87d0a4 (Projeto MCB: versão inicial modernizada, frontend responsivo e backend Node.js/SQLite)

