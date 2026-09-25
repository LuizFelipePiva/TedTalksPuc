import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../shared/lib/database";
import { saveSession } from "../../../shared/lib/session";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const user = await loginUser(username, password);

            if (!user) {
                setError("Usuário ou senha inválidos.");
                return;
            }

            saveSession(user);
            navigate(user.role === "admin" ? "/superadmin" : "/main", { replace: true });
        } catch (loginError) {
            setError(loginError.message || "Não foi possível fazer login.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#eaf2fa] px-5 py-10 text-[#172b50]">
            <section className="w-full max-w-md rounded-[2rem] border border-[#c9d8e8] bg-[#fffdf8] p-8 shadow-[0_20px_60px_rgba(42,75,115,0.14)]">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1555a0]">Ted Talks • PUCTEC</p>
                <h1 className="text-4xl font-black tracking-tight">Entrar</h1>
                <p className="mt-3 text-sm leading-6 text-[#53627a]">
                    Use o usuário gerado pelo superadmin para cadastrar seus tópicos.
                </p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-[#263d61]">Usuário</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="w-full rounded-xl border border-[#d8d3c8] bg-[#fffaf1] px-4 py-3.5 text-base text-[#17233b] outline-none transition focus:border-[#1555a0] focus:ring-4 focus:ring-[#1555a0]/15"
                            required
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-bold text-[#263d61]">Senha</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-[#d8d3c8] bg-[#fffaf1] px-4 py-3.5 text-base text-[#17233b] outline-none transition focus:border-[#1555a0] focus:ring-4 focus:ring-[#1555a0]/15"
                            required
                        />
                    </label>

                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-xl bg-[#1555a0] px-5 py-3.5 font-bold text-white shadow-[0_8px_20px_rgba(21,85,160,0.28)] transition hover:bg-[#0e4384] focus:outline-none focus:ring-4 focus:ring-[#1555a0]/25 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;
