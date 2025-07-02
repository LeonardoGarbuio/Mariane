const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configuração do banco SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco:', err);
    } else {
        console.log('Conectado ao banco SQLite');
        createTable();
    }
});

// Criar tabela de cursos
function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS cursos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            imagem TEXT NOT NULL,
            link TEXT NOT NULL,
            cargaHoraria TEXT NOT NULL,
            certificado TEXT NOT NULL,
            alunos INTEGER DEFAULT 0,
            dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err);
        } else {
            console.log('Tabela cursos criada/verificada');
        }
    });
}

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'curso-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'), false);
        }
    }
});

// ROTAS DA API

// GET - Listar todos os cursos
app.get('/api/cursos', (req, res) => {
    const sql = 'SELECT * FROM cursos ORDER BY dataCadastro DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// GET - Buscar curso por ID
app.get('/api/cursos/:id', (req, res) => {
    const sql = 'SELECT * FROM cursos WHERE id = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Curso não encontrado' });
            return;
        }
        res.json(row);
    });
});

// POST - Criar novo curso
app.post('/api/cursos', upload.single('imagem'), (req, res) => {
    const { titulo, descricao, link, cargaHoraria, certificado, alunos } = req.body;
    
    // Se foi enviada uma imagem, usar o caminho do arquivo
    const imagem = req.file ? `uploads/${req.file.filename}` : req.body.imagem;
    
    if (!titulo || !descricao || !imagem || !link || !cargaHoraria || !certificado) {
        res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
        return;
    }

    const sql = `
        INSERT INTO cursos (titulo, descricao, imagem, link, cargaHoraria, certificado, alunos)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [titulo, descricao, imagem, link, cargaHoraria, certificado, alunos || 0], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Buscar o curso criado para retornar
        db.get('SELECT * FROM cursos WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json(row);
        });
    });
});

// PUT - Atualizar curso
app.put('/api/cursos/:id', upload.single('imagem'), (req, res) => {
    const { titulo, descricao, link, cargaHoraria, certificado, alunos } = req.body;
    
    // Se foi enviada uma nova imagem, usar o caminho do arquivo
    let imagem = req.body.imagem;
    if (req.file) {
        imagem = `uploads/${req.file.filename}`;
    }
    
    if (!titulo || !descricao || !imagem || !link || !cargaHoraria || !certificado) {
        res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
        return;
    }

    const sql = `
        UPDATE cursos 
        SET titulo = ?, descricao = ?, imagem = ?, link = ?, cargaHoraria = ?, certificado = ?, alunos = ?
        WHERE id = ?
    `;
    
    db.run(sql, [titulo, descricao, imagem, link, cargaHoraria, certificado, alunos || 0, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (this.changes === 0) {
            res.status(404).json({ error: 'Curso não encontrado' });
            return;
        }
        
        // Buscar o curso atualizado para retornar
        db.get('SELECT * FROM cursos WHERE id = ?', [req.params.id], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(row);
        });
    });
});

// DELETE - Remover curso
app.delete('/api/cursos/:id', (req, res) => {
    // Primeiro, buscar o curso para pegar o caminho da imagem
    db.get('SELECT imagem FROM cursos WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (!row) {
            res.status(404).json({ error: 'Curso não encontrado' });
            return;
        }
        
        // Deletar o curso
        const sql = 'DELETE FROM cursos WHERE id = ?';
        db.run(sql, [req.params.id], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Se havia uma imagem local, deletar o arquivo
            if (row.imagem && row.imagem.startsWith('uploads/')) {
                const imagePath = path.join(__dirname, row.imagem);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            
            res.json({ message: 'Curso removido com sucesso' });
        });
    });
});

// Rota para verificar se o servidor está rodando
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MCB API está funcionando',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API disponível em: http://localhost:${PORT}/api`);
    console.log(`Painel admin: http://localhost:${PORT}/admin-cursos.html`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar banco:', err);
        } else {
            console.log('Banco fechado com sucesso');
        }
        process.exit(0);
    });
}); 