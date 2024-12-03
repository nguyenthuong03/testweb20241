import { useParams, useRouter } from "next/navigation";

import { getLesson, getUserProgress } from "~/db/queries";

import { Quiz } from "~/lesson/quiz";
import FlashcardSet from "~/lesson/flashcard";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { SessionKey, SessionStorage } from "~/utils/session-storage";

export enum LESSON_TYPE {
  FLASHCARD = "flashcard",
  LESSON = "lesson",
  TEST = "test",
}

const LessonIdPage: NextPage = ({ lessonId }) => {
  const [lesson, setLesson] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchData = () => {
    try {
      const result = getLesson(Number(lessonId));

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

export default LessonIdPage;

export async function getServerSideProps(context) {
  const { lessonId } = context.params; // Access the dynamic route parameter

  return {
    props: {
      lessonId,
    },
  };
}
