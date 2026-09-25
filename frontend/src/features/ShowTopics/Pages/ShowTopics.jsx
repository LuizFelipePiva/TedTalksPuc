import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";
import { getTopicsByUser } from "../../../shared/lib/database";
import { getSession } from "../../../shared/lib/session";

function ShowTopics() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const currentSession = getSession();

        if (!currentSession) {
            navigate("/", { replace: true });
            return;
        }

        async function loadTopics() {
            try {
                const storedTopics = await getTopicsByUser(currentSession.id);
                setTopics(storedTopics.filter((topic) => topic.trim() !== ""));
            } catch (loadError) {
                setError(loadError.message || "Não foi possível carregar os tópicos.");
            } finally {
                setIsLoading(false);
            }
        }

        loadTopics();
    }, [navigate]);

    return (
        <div className="flex min-h-screen flex-col bg-[#eaf2fa] lg:flex-row">
            <Sidebar />
            <main className="flex-1 px-5 py-8 text-[#172b50] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-5xl">
                    <header className="mb-8">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1555a0]">Meus tópicos</p>
                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Tópicos salvos</h1>
                    </header>

                    <section className="rounded-[2rem] border border-[#c9d8e8] bg-[#fffdf8] p-6 shadow-[0_20px_60px_rgba(42,75,115,0.14)] sm:p-8">
                        {isLoading && (
                            <p className="rounded-xl border border-[#d8d3c8] bg-[#fffaf1] p-4 text-sm font-semibold text-[#53627a]">
                                Carregando tópicos...
                            </p>
                        )}

                        {error && (
                            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                                {error}
                            </p>
                        )}

                        {!isLoading && !error && topics.length === 0 && (
                            <p className="rounded-xl border border-[#d8d3c8] bg-[#fffaf1] p-4 text-sm font-semibold text-[#53627a]">
                                Nenhum tópico salvo ainda.
                            </p>
                        )}

                        {!isLoading && topics.length > 0 && (
                            <ol className="space-y-4">
                                {topics.map((topic, index) => (
                                    <li
                                        key={`${topic}-${index}`}
                                        className="flex gap-4 rounded-xl border border-[#d8d3c8] bg-[#fffaf1] p-4"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dce8f5] text-sm font-bold text-[#174e91]">
                                            {index + 1}
                                        </span>
                                        <p className="pt-1 font-semibold text-[#172b50]">{topic}</p>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ShowTopics;
