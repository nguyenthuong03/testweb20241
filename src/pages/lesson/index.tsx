import { getLesson } from "~/db/queries";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FlashcardSet from "~/lesson/flashcard";
import { Quiz } from "~/lesson/quiz";
import { LESSON_TYPE } from "~/pages/lesson/[lessonId]";
import { SessionKey, SessionStorage } from "~/utils/session-storage";

const LessonPage: NextPage = () => {
  const [lesson, setLesson] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchData = () => {
    try {
      const lessonId = Number(SessionStorage.get(SessionKey.LESSON_ID));
      const result = getLesson(lessonId);

      return result;
    } catch (error) {
      console.log(error);
      return router.push("/learn");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const value = fetchData();
    setLesson(value);
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (lesson.type === LESSON_TYPE.FLASHCARD) {
    return <FlashcardSet initFlashCards={lesson.challenges} />;
  }

  const initialPercentage =
    (lesson.challenges.filter(
      (challenge: { completed: boolean }) => challenge.completed,
    ).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={Number(lesson.id)}
      initialLessonChallenges={lesson.challenges.map((challenge) => ({
        ...challenge,
        id: Number(challenge.id),
        challengeId: Number(challenge.challengeId),
        challengeOptions: challenge.challengeOptions.map((option) => ({
          ...option,
          challengeId: Number(challenge.challengeId),
          imageSrc: challenge.imageSrc,
          audioSrc: challenge.audioSrc,
        })),
      }))}
      initialPercentage={initialPercentage}
      isTest={lesson.type === LESSON_TYPE.TEST}
      isLesson={lesson.type === LESSON_TYPE.LESSON}
    />
  );
};

export default LessonPage;
