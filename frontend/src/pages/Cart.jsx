import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  async function handleCheckout() {
    if (!user) return navigate("/login")
    try {
      await api.post("/orders", {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
      })
      clearCart()
      navigate("/order-success")
    } catch (err) {
      console.log(err)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingCart size={28} className="text-zinc-600" />
        </div>
        <p className="text-zinc-400 font-medium">Seu carrinho está vazio</p>
        <p className="text-zinc-600 text-sm mt-1 mb-6">Adicione produtos para continuar</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition"
        >
          Ver produtos
          <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Carrinho</h1>
        <p className="text-zinc-500 text-sm mt-1">{cart.length} {cart.length === 1 ? "item" : "itens"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4"
            >
              <div className="w-20 h-20 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                    Sem imagem
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.category}</p>
                <p className="text-sm font-bold text-green-400 mt-1">{formatBRL(item.price)}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-950/60 transition"
                >
                  <Trash2 size={14} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition"
                  >
                    <Minus size={13} className="text-zinc-400" />
                  </button>
                  <span className="text-sm font-medium text-white w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition"
                  >
                    <Plus size={13} className="text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
          <h2 className="text-base font-semibold text-white mb-4">Resumo</h2>
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Subtotal</span>
            <span>{formatBRL(total)}</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-400 mb-4">
            <span>Frete</span>
            <span className="text-green-400">Grátis</span>
          </div>
          <div className="border-t border-zinc-800 pt-4 flex justify-between font-bold text-white mb-6">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            Finalizar pedido
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}