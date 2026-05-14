import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl overflow-hidden transition group">
      {/* Imagem */}
      <div className="aspect-square bg-zinc-800 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="text-zinc-600 text-sm">Sem imagem</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-[11px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-white mt-2 hover:text-green-400 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-green-400">
            {formatBRL(product.price)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="w-8 h-8 bg-green-600 hover:bg-green-500 rounded-xl flex items-center justify-center transition"
          >
            <ShoppingCart size={15} className="text-white" />
          </button>
        </div>
        {product.stock === 0 && (
          <p className="text-xs text-red-400 mt-2">Fora de estoque</p>
        )}
      </div>
    </div>
  )
}