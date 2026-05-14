import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data } = await api.post("/auth/login", { email, password })
      login(data.user, data.token)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error ?? "Erro ao fazer login")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Entrar</h1>
          <p className="text-zinc-500 text-sm mt-1">Acesse sua conta</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {error && (
            <div className="bg-red-950/50 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500 mb-1.5 block">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-green-600 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-40 text-white font-medium py-2.5 rounded-xl transition mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Não tem conta?{" "}
            <Link to="/register" className="text-green-400 hover:text-green-300 transition">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}