import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import ProductCard from "../components/ProductCard"
import api from "../services/api"

const CATEGORIES = ["Todos", "Celulares", "Notebooks", "Periféricos", "Acessórios"]

export default function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Todos")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [search, category])

  async function fetchProducts() {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category !== "Todos") params.category = category
      const { data } = await api.get("/products", { params })
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Produtos</h1>
        <p className="text-zinc-500 text-sm mt-1">{products.length} produtos encontrados</p>
      </div>

      {/* Busca */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
        />
      </div>

      {/* Categorias */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-sm px-4 py-2 rounded-xl transition font-medium
              ${category === cat
                ? "bg-green-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Produtos */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-zinc-800" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-3 bg-zinc-800 rounded w-1/3" />
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
                <div className="h-5 bg-zinc-800 rounded w-1/2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-400 text-sm font-medium">Nenhum produto encontrado</p>
          <p className="text-zinc-600 text-xs mt-1">Tente buscar por outro termo</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}