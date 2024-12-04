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

interface LessonIdPageProps {
  lessonId: string;
}

type FlashcardChallenge = { id: number; word: string; meaning: string };
type QuizChallenge = {
  id: number;
  question: string;
  challengeOptions: { id: number; option: string; isCorrect: boolean }[];
  completed: boolean;
  type: string;
};

const LessonIdPage: NextPage<LessonIdPageProps> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<
    | {
        id: number;
        unitId: number;
        order: number;
        status: string;
        type: string;
        xpReward: number;
        challenges: (FlashcardChallenge | QuizChallenge)[];
      }
    | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (lessonId: string) => {
      try {
        const result = await getLesson(Number(lessonId));

        return result;
      } catch (error) {
        console.log(error);
        router.push("/learn");
        return undefined;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(lessonId).then((value: any) => {
      if (value) {
        setLesson(value);
      }
    });
  }, [lessonId, router]);

  if (isLoading) return <p>Loading...</p>;

  if (!lesson) return <p>Lesson not found</p>;

  if (lesson.type === LESSON_TYPE.FLASHCARD) {
    return (
      <FlashcardSet
        initFlashCards={
          lesson.challenges as { id: number; word: string; meaning: string }[]
        }
      />
    );
  }

  const initialPercentage =
    (lesson.challenges.filter(
      (
        challenge,
      ): challenge is {
        id: number;
        question: string;
        challengeOptions: { id: number; option: string; isCorrect: boolean }[];
        completed: boolean;
        type: string;
      } => "completed" in challenge && challenge.completed,
    ).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={Number(lesson.id)}
      initialLessonChallenges={lesson.challenges.map((challenge) => ({
        ...challenge,
        id: Number(challenge.id),
        challengeId:
          "challengeId" in challenge ? Number(challenge.challengeId) : 0, // Provide a default value of 0
        text: "word" in challenge ? challenge.word : "",
        correct: "meaning" in challenge ? challenge.meaning : "",
        question: "question" in challenge ? challenge.question : undefined,
        imageSrc: "imageSrc" in challenge ? (challenge.imageSrc as string) : "",
        audioSrc: "audioSrc" in challenge ? (challenge.audioSrc as string) : "",
        challengeOptions:
          "challengeOptions" in challenge
            ? challenge.challengeOptions.map((option) => ({
                ...option,
                challengeId: Number(challenge.id),
                imageSrc:
                  "imageSrc" in option ? (option.imageSrc as string) : "",
                audioSrc:
                  "audioSrc" in option ? (option.audioSrc as string) : "",
              }))
            : [],
        completed: "completed" in challenge ? challenge.completed : false,
        type: "type" in challenge ? challenge.type : "",
      }))}
      initialPercentage={initialPercentage}
      isTest={lesson.type === LESSON_TYPE.TEST}
      isLesson={lesson.type === LESSON_TYPE.LESSON}
    />
  );
};

export default LessonIdPage;

interface ServerSidePropsContext {
  params: {
    lessonId: string;
  };
}

interface ServerSideProps {
  props: {
    lessonId: string;
  };
}

export async function getServerSideProps(
  context: ServerSidePropsContext,
): Promise<ServerSideProps> {
  const { lessonId } = context.params; // Access the dynamic route parameter

  return {
    props: {
      lessonId,
    },
  };
}
