import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar";

const topicLabels = ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"];

function MainPage() {
    const [topics, setTopics] = useState(() => {
        const storedTopics = localStorage.getItem("puctec-topics");
        return storedTopics ? JSON.parse(storedTopics) : ["", "", "", "", ""];
    });
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    function handleTopicChange(index, value) {
        setTopics((currentTopics) =>
            currentTopics.map((topic, topicIndex) =>
                topicIndex === index ? value : topic,
            ),
        );
        setIsSaved(false);
    }

    function handleSave() {
        const filledTopics = topics.filter((topic) => topic.trim() !== "");
        localStorage.setItem("puctec-topics", JSON.stringify(filledTopics));
        setIsSaved(true);
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#eaf2fa] lg:flex-row">
            <Sidebar />
            <main className="flex-1 px-5 py-8 text-[#172b50] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-8 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#1555a0]">Ted Talks • PUCTEC</p>
                            <h1 className="max-w-xl text-4xl font-black leading-[0.95] tracking-tight text-[#172b50] sm:text-6xl">Cadastre seus tópicos</h1>
                            <p className="mt-4 max-w-lg text-base leading-7 text-[#53627a]">Organize as ideias que vão guiar sua próxima conversa.</p>
                        </div>
                        <div className="hidden h-20 w-20 items-center justify-center rounded-full border border-[#9ab3d0] bg-[#dce8f5] text-3xl text-[#1555a0] shadow-sm sm:flex" aria-hidden="true">
                            ✦
                        </div>
                    </header>

                    <section className="mx-auto overflow-hidden rounded-[2rem] border border-[#c9d8e8] bg-[#fffdf8] shadow-[0_20px_60px_rgba(42,75,115,0.14)]">
                        <div className="p-6 sm:p-10 lg:p-12">
                            <div className="mb-8 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#1555a0]">Seu roteiro</p>
                                    <h2 className="mt-1 text-2xl font-bold">Cinco pontos para começar</h2>
                                </div>
                                <span className="rounded-full bg-[#dce8f5] px-3 py-1 text-xs font-bold text-[#174e91]">{topics.filter(Boolean).length}/5</span>
                            </div>

                            <div className="space-y-5">
                                {topicLabels.map((label, index) => (
                                    <label className="group block" key={label}>
                                        <span className="mb-2 flex items-center gap-3 text-sm font-bold text-[#263d61]">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dce8f5] text-xs text-[#174e91]">{index + 1}</span>
                                            {label}
                                        </span>
                                        <input
                                            type="text"
                                            value={topics[index]}
                                            onChange={(event) => handleTopicChange(index, event.target.value)}
                                            placeholder="Escreva uma ideia..."
                                            className="w-full rounded-xl border border-[#d8d3c8] bg-[#fffaf1] px-4 py-4 text-base text-[#17233b] outline-none transition placeholder:text-[#9c9b98] focus:border-[#1555a0] focus:ring-4 focus:ring-[#1555a0]/15"
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="flex-1 rounded-xl bg-[#1555a0] px-5 py-3.5 font-bold text-white shadow-[0_8px_20px_rgba(21,85,160,0.28)] transition hover:bg-[#0e4384] focus:outline-none focus:ring-4 focus:ring-[#1555a0]/25"
                                >
                                    {isSaved ? "Tópicos salvos" : "Salvar tópicos"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/show-topics")}
                                    className="flex-1 rounded-xl border border-[#9ab3d0] px-5 py-3.5 font-bold text-[#174e91] transition hover:border-[#174e91] hover:bg-[#e6eef8] focus:outline-none focus:ring-4 focus:ring-[#174e91]/15"
                                >
                                    Mostrar tópicos
                                </button>
                            </div>
                        </div>



                    </section>
                </div>
            </main>
        </div>
    );
}

export default MainPage;