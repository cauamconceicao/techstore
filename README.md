# 🛒 TechStore

E-commerce completo de produtos de tecnologia com autenticação JWT, carrinho de compras e painel administrativo.

🔗 **[Ver demo ao vivo](https://techstore-66285ozke-caua-martins-conceicao-s-projects.vercel.app)**

---

## ✨ Funcionalidades

- **Autenticação** — cadastro e login com JWT
- **Listagem de produtos** — busca e filtro por categoria
- **Página de produto** — detalhes, especificações técnicas e estoque
- **Carrinho** — adicionar, remover e ajustar quantidade
- **Finalizar pedido** — salvo no banco com confirmação
- **Painel Admin** — cadastrar, editar e remover produtos
- **Responsivo** — funciona em mobile e desktop

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Uso |
|---|---|
| [React](https://react.dev/) | Interface |
| [Vite](https://vitejs.dev/) | Bundler |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização |
| [React Router](https://reactrouter.com/) | Navegação |
| [Axios](https://axios-http.com/) | Requisições HTTP |
| [Lucide React](https://lucide.dev/) | Ícones |
| [Vercel](https://vercel.com/) | Deploy |

### Backend
| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express](https://expressjs.com/) | Framework HTTP |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados |
| [Supabase](https://supabase.com/) | Hospedagem do banco |
| [JWT](https://jwt.io/) | Autenticação |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Hash de senhas |
| [Render](https://render.com/) | Deploy |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/cauamconceicao/techstore.git
cd techstore
```

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend`:

```env
PORT=3000
DATABASE_URL=sua_url_do_supabase
JWT_SECRET=sua_chave_secreta
```

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
```

Crie um arquivo `.env` na pasta `frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

Acesse em `http://localhost:5173`

---

## 🗄️ Tabelas do banco

**users**
| Coluna | Tipo |
|---|---|
| id | uuid (PK) |
| name | text |
| email | text (unique) |
| password | text |
| role | text (default: 'customer') |
| created_at | timestamptz |

**products**
| Coluna | Tipo |
|---|---|
| id | uuid (PK) |
| name | text |
| description | text |
| price | numeric |
| stock | integer |
| category | text |
| image_url | text |
| specs | jsonb |
| created_at | timestamptz |

**orders**
| Coluna | Tipo |
|---|---|
| id | uuid (PK) |
| user_id | uuid (FK) |
| items | jsonb |
| total | numeric |
| status | text (default: 'pending') |
| created_at | timestamptz |

---

## 📁 Estrutura do projeto

```
techstore/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── orders.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   └── orders.js
│   │   ├── middlewares/
│   │   │   └── auth.js
│   │   └── db/
│   │       └── index.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProductCard.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Product.jsx
        │   ├── Cart.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Admin.jsx
        │   └── OrderSuccess.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CartContext.jsx
        └── services/
            └── api.js
```

---

## 📄 Licença

MIT © [Cauã Conceição](https://github.com/cauamconceicao)
