import { useState, useEffect } from "react"
import { Plus, Trash2, Pencil, Check, X, Package } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const emptyForm = { name: "", description: "", price: "", stock: "", category: "", image_url: "" }
  const [form, setForm] = useState(emptyForm)

  const CATEGORIES = ["Celulares", "Notebooks", "Periféricos", "Acessórios"]

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await api.get("/products")
    setProducts(data)
  }

  async function handleSubmit() {
    if (!form.name || !form.price || !form.stock) return
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        })
      } else {
        await api.post("/products", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        })
      }
      fetchProducts()
      setForm(emptyForm)
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  async function handleDelete(id) {
    if (!confirm("Remover este produto?")) return
    await api.delete(`/products/${id}`)
    fetchProducts()
  }

  function startEdit(product) {
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      stock: String(product.stock),
      category: product.category ?? "",
      image_url: product.image_url ?? "",
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <p className="text-zinc-500 text-sm mt-1">{products.length} produtos cadastrados</p>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setEditingId(null); setForm(emptyForm) }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
          <Plus size={16} />
          Novo produto
        </button>
      </div>

      {/* Formulário */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-8">
          <p className="text-sm font-semibold text-white mb-4">
            {editingId ? "Editar produto" : "Novo produto"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Nome do produto"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 text-white text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
            >
              <option value="">Selecione a categoria</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input
              type="number"
              placeholder="Preço (R$)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
            />
            <input
              type="number"
              placeholder="Estoque"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
            />
            <input
              placeholder="URL da imagem"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition sm:col-span-2"
            />
            <textarea
              placeholder="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition sm:col-span-2 resize-none"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.price || !form.stock}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              <Check size={15} />
              {loading ? "Salvando..." : editingId ? "Salvar alterações" : "Cadastrar"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm) }}
              className="text-sm text-zinc-500 hover:text-zinc-300 px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-3.5 rounded-2xl flex items-center gap-4 transition group"
          >
            <div className="w-12 h-12 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={18} className="text-zinc-600" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{product.name}</p>
              <p className="text-xs text-zinc-500">{product.category} · {product.stock} em estoque</p>
            </div>
            <p className="text-sm font-bold text-green-400 shrink-0">{formatBRL(product.price)}</p>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => startEdit(product)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-green-400 hover:bg-green-950/60 transition"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-950/60 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}