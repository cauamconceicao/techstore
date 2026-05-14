import { Link } from "react-router-dom"
import { ShoppingCart, User, LogOut, Cpu } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Cpu size={16} className="text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-zinc-100">
            TechStore
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition text-sm"
          >
            <ShoppingCart size={20} />
            Carrinho
            {totalItems > 0 && (
              <span className="w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400 flex items-center gap-1.5">
                <User size={15} />
                {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-400 transition"
              >
                <LogOut size={15} />
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="text-sm bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl transition"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}