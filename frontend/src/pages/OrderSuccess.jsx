import { Link } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-950 border border-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Pedido realizado!</h1>
        <p className="text-zinc-400 text-sm mb-8">
          Seu pedido foi confirmado e está sendo processado.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-3 rounded-xl transition"
        >
          Continuar comprando
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}