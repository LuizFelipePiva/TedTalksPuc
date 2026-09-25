import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopicsByUser, saveTopicsForUser } from "../../../shared/lib/database";
import { getSession } from "../../../shared/lib/session";

export const topicLabels = ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"];

export function useProfessorTopics() {
  const navigate = useNavigate();
  const [session] = useState(() => getSession());
  const [topics, setTopics] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
      return;
    }

    async function loadTopics() {
      try {
        const storedTopics = await getTopicsByUser(session.id);
        setTopics(storedTopics);
      } catch (loadError) {
        setError(loadError.message || "Não foi possível carregar os tópicos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTopics();
  }, [navigate, session]);

  function handleTopicChange(index, value) {
    setTopics((currentTopics) =>
      currentTopics.map((topic, topicIndex) =>
        topicIndex === index ? value : topic,
      ),
    );
    setIsSaved(false);
  }

  async function saveTopics() {
    if (!session) {
      navigate("/", { replace: true });
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      await saveTopicsForUser(session.id, topics);
      setIsSaved(true);
    } catch (saveError) {
      setError(saveError.message || "Não foi possível salvar os tópicos.");
    } finally {
      setIsSaving(false);
    }
  }

  return {
    error,
    filledTopicsCount: topics.filter((topic) => topic.trim() !== "").length,
    handleTopicChange,
    isLoading,
    isSaved,
    isSaving,
    saveTopics,
    session,
    topics,
  };
}
