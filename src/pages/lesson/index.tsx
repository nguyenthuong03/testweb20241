import { getLesson } from "~/db/queries";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FlashcardSet from "~/lesson/flashcard";
import { Quiz } from "~/lesson/quiz";
import { LESSON_TYPE } from "~/pages/lesson/[lessonId]";
import { SessionKey, SessionStorage } from "~/utils/session-storage";

interface Lesson {
  id: number;
  unitId: number;
  order: number;
  status: string;
  type: string;
  xpReward: number;
  challenges: {
    id: number;
    question: string;
    imageSrc?: string;
    audioSrc?: string;
    challengeOptions: {
      id: number;
      option: string;
      isCorrect: boolean;
      challengeId?: number;
      imageSrc?: string;
      audioSrc?: string;
    }[];
    type: string;
    completed: boolean;
    challengeId?: number;
  }[];
}

const LessonPage: NextPage = () => {
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchData = async (): Promise<Lesson | undefined> => {
    try {
      const lessonId = Number(SessionStorage.get(SessionKey.LESSON_ID));
      const result = await getLesson(lessonId);

      if (result && "challenges" in result) {
        result.challenges = result.challenges.map((challenge: any) => ({
          ...challenge,
          question: challenge.question || "",
          challengeOptions: challenge.challengeOptions || [],
          type: challenge.type || "",
        }));
      }

      return result as Lesson;
    } catch (error) {
      console.log(error);
      router.push("/learn");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then((value) => {
      setLesson(value);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (lesson && lesson.type === LESSON_TYPE.FLASHCARD) {
    return (
      <FlashcardSet
        initFlashCards={lesson.challenges.map((challenge) => ({
          id: challenge.id,
          word: challenge.question,
          meaning: challenge.challengeOptions
            .map((option) => option.option)
            .join(", "),
        }))}
      />
    );
  }

  const initialPercentage = lesson
    ? (lesson.challenges.filter(
        (challenge: { completed?: boolean }) => challenge.completed === true,
      ).length /
        lesson.challenges.length) *
      100
    : 0;

  return (
    lesson && (
      <Quiz
        initialLessonId={Number(lesson.id)}
        initialLessonChallenges={lesson.challenges.map((challenge) => ({
          ...challenge,
          id: Number(challenge.id),
          challengeId: Number(challenge.challengeId),
          completed: challenge.completed ?? false,
          text: challenge.question,
          correct:
            challenge.challengeOptions.find((option) => option.isCorrect)
              ?.option || "",
          imageSrc: challenge.imageSrc || "",
          audioSrc: challenge.audioSrc || "",
          challengeOptions: challenge.challengeOptions.map((option) => ({
            ...option,
            challengeId: Number(challenge.challengeId),
            imageSrc: option.imageSrc || "",
            audioSrc: option.audioSrc || "",
          })),
        }))}
        initialPercentage={initialPercentage}
        isTest={lesson.type === LESSON_TYPE.TEST}
        isLesson={lesson.type === LESSON_TYPE.LESSON}
      />
    )
  );
};

export default LessonPage;
