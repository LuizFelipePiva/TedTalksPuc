import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeacherUser, listTeacherUsers } from "../../../shared/lib/database";
import { clearSession, getSession } from "../../../shared/lib/session";

function SuperAdmin() {
    const navigate = useNavigate();
    const [session] = useState(() => getSession());
    const [teachers, setTeachers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!session || session.role !== "admin") {
            navigate("/", { replace: true });
            return;
        }

        loadTeachers();
    }, [navigate, session]);

    async function loadTeachers() {
        try {
            const data = await listTeacherUsers();
            setTeachers(data);
        } catch (loadError) {
            setError(loadError.message || "Não foi possível carregar usuários.");
        }
    }

    async function handleCreateTeacher(event) {
        event.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            await createTeacherUser(username, password);
            setUsername("");
            setPassword("");
            setMessage("Usuário de professor criado com sucesso.");
            await loadTeachers();
        } catch (createError) {
            setError(createError.message || "Não foi possível criar o usuário.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        clearSession();
        navigate("/", { replace: true });
    }

    return (
        <main className="min-h-screen bg-[#eaf2fa] px-5 py-8 text-[#172b50] sm:px-8 lg:px-12 lg:py-12">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1555a0]">Superadmin</p>
                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Gerar usuários</h1>
                        <p className="mt-3 text-base leading-7 text-[#53627a]">
                            Crie acessos genéricos para os professores entrarem na plataforma.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-[#9ab3d0] px-5 py-3 font-bold text-[#174e91] transition hover:border-[#174e91] hover:bg-[#e6eef8]"
                    >
                        Sair
                    </button>
                </header>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
                    <section className="rounded-[2rem] border border-[#c9d8e8] bg-[#fffdf8] p-6 shadow-[0_20px_60px_rgba(42,75,115,0.14)]">
                        <h2 className="text-2xl font-bold">Novo professor</h2>
                        <p className="mt-2 text-sm text-[#53627a]">Logado como {session?.username}.</p>

                        <form className="mt-6 space-y-5" onSubmit={handleCreateTeacher}>
                            <label className="block">
                                <span className="mb-2 block text-sm font-bold text-[#263d61]">Usuário</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className="w-full rounded-xl border border-[#d8d3c8] bg-[#fffaf1] px-4 py-3.5 outline-none transition focus:border-[#1555a0] focus:ring-4 focus:ring-[#1555a0]/15"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-bold text-[#263d61]">Senha</span>
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="w-full rounded-xl border border-[#d8d3c8] bg-[#fffaf1] px-4 py-3.5 outline-none transition focus:border-[#1555a0] focus:ring-4 focus:ring-[#1555a0]/15"
                                    required
                                />
                            </label>

                            {message && (
                                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                                    {message}
                                </p>
                            )}
                            {error && (
                                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-[#1555a0] px-5 py-3.5 font-bold text-white shadow-[0_8px_20px_rgba(21,85,160,0.28)] transition hover:bg-[#0e4384] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isLoading ? "Criando..." : "Criar usuário"}
                            </button>
                        </form>
                    </section>

                    <section className="rounded-[2rem] border border-[#c9d8e8] bg-[#fffdf8] p-6 shadow-[0_20px_60px_rgba(42,75,115,0.14)]">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold">Professores</h2>
                            <span className="rounded-full bg-[#dce8f5] px-3 py-1 text-xs font-bold text-[#174e91]">{teachers.length}</span>
                        </div>

                        <div className="space-y-3">
                            {teachers.length === 0 ? (
                                <p className="rounded-xl border border-[#d8d3c8] bg-[#fffaf1] p-4 text-sm text-[#53627a]">
                                    Nenhum professor criado ainda.
                                </p>
                            ) : (
                                teachers.map((teacher) => (
                                    <article
                                        key={teacher.id}
                                        className="flex items-center justify-between gap-4 rounded-xl border border-[#d8d3c8] bg-[#fffaf1] p-4"
                                    >
                                        <div>
                                            <p className="font-bold text-[#172b50]">{teacher.username}</p>
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#53627a]">{teacher.role}</p>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default SuperAdmin;
