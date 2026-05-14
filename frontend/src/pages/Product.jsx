import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowLeft, Package } from "lucide-react"
import { useCart } from "../context/CartContext"
import api from "../services/api"

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProduct()
  }, [id])

  async function fetchProduct() {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  function renderSpecs() {
    if (!product.specs) return null
    let specs = product.specs
    if (typeof specs === "string") {
      try { specs = JSON.parse(specs) } catch { return null }
    }
    if (typeof specs !== "object") return null
    const entries = Object.entries(specs)
    if (entries.length === 0) return null
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
          Especificações
        </p>
        <div className="flex flex-col gap-2">
          {entries.map(([key, value]) => (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-zinc-500">{String(key)}</span>
              <span className="text-white font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-zinc-900 rounded-2xl" />
          <div className="flex flex-col gap-4">
            <div className="h-4 bg-zinc-900 rounded w-1/4" />
            <div className="h-8 bg-zinc-900 rounded w-3/4" />
            <div className="h-4 bg-zinc-900 rounded w-full" />
            <div className="h-10 bg-zinc-900 rounded w-1/3 mt-4" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-zinc-400">Produto não encontrado</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={48} className="text-zinc-700" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-white mt-3 mb-3">
            {product.name}
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {renderSpecs()}

          <div className="mt-auto">
            <p className="text-3xl font-bold text-green-400 mb-4">
              {formatBRL(product.price)}
            </p>

            {product.stock > 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-xl transition"
              >
                <ShoppingCart size={18} />
                Adicionar ao carrinho
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-zinc-800 text-zinc-500 font-medium py-3 rounded-xl cursor-not-allowed"
              >
                Fora de estoque
              </button>
            )}

            <p className="text-xs text-zinc-600 mt-3 text-center">
              {product.stock} unidades em estoque
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}