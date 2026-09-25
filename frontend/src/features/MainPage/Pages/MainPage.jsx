import { topicLabels, useProfessorTopics } from "../hooks/useProfessorTopics";

function MainPage() {
    const {
        error,
        filledTopicsCount,
        handleTopicChange,
        isLoading,
        isSaved,
        isSaving,
        saveTopics,
        topics,
    } = useProfessorTopics();

    if (isLoading) {
        return <p>Carregando tópicos...</p>;
    }

    return (
        <main>
            <h1>Cadastro de tópicos</h1>
            <p>{filledTopicsCount}/5 tópicos preenchidos</p>

            {/* Front provisório: pode trocar o JSX abaixo, mantendo o hook acima. */}
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    saveTopics();
                }}
            >
                {topicLabels.map((label, index) => (
                    <label key={label}>
                        {label}
                        <input
                            type="text"
                            value={topics[index]}
                            onChange={(event) => handleTopicChange(index, event.target.value)}
                        />
                    </label>
                ))}

                {error && <p>{error}</p>}
                {isSaved && <p>Tópicos salvos.</p>}

                <button type="submit" disabled={isSaving}>
                    {isSaving ? "Salvando..." : "Salvar tópicos"}
                </button>
            </form>
        </main>
    );
}

export default MainPage;
