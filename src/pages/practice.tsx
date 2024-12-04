import { FeedWrapper } from "~/components/feedwrapper";
import { getPractices, getPracticeUnit } from "~/db/queries";
import { Header } from "~/components/header";
import { UnitBanner } from "~/components/unit-banner";
import { Quiz } from "~/lesson/quiz";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { NextPage } from "next";

type Props = {
  children: React.ReactNode;
};

const PracticeLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <div className="flex flex-1">
        <LeftBar selectedTab="Luyện tập" />

        <div className="flex flex-1 justify-center">{children}</div>
      </div>

      <BottomBar selectedTab="Luyện tập" />
    </div>
  );
};

type PracticePageProps = {
  practiceLessons: any;
  practices: any[];
};

const PracticePage: NextPage<PracticePageProps> = ({
  practiceLessons,
  practices,
}) => {
  if (practiceLessons) {
    const initialPercentage =
      (practiceLessons.challenges.filter(
        (challenge: { completed: boolean }) => challenge.completed,
      ).length /
        practiceLessons.challenges.length) *
      100;

    interface ChallengeOption {
      id: number;
      challengeId: number;
      text: string;
      option: string;
      isCorrect: boolean;
    }

    interface Challenge {
      id: number;
      question: string;
      completed: boolean;
      type: string;
      challengeOptions: ChallengeOption[];
    }

    interface PracticeLessons {
      id: number;
      challenges: Challenge[];
    }

    return (
      <PracticeLayout>
        <div className="flex flex-1 flex-col">
          <Quiz
            initialLessonId={Number(practiceLessons.id)}
            initialLessonChallenges={practiceLessons.challenges.map(
              (challenge: Challenge) => ({
                ...challenge,
                id: Number(challenge.id),
                challengeId: Number(challenge.id),
                challengeOptions: challenge.challengeOptions.map(
                  (option: ChallengeOption) => ({
                    ...option,
                    challengeId: Number(challenge.id),
                  }),
                ),
              }),
            )}
            initialPercentage={initialPercentage}
            isPractice={true}
            isTest={false}
            isLesson={false}
          />
        </div>
      </PracticeLayout>
    );
  }

  return (
    <PracticeLayout>
      <div className="flex w-full flex-row-reverse gap-[48px] px-6 md:ml-32 lg:ml-64">
        <FeedWrapper>
          <Header title="Japanese" />
          <div className="flex flex-col gap-3">
            {practices.map((practice) => (
              <UnitBanner
                key={practice.id}
                title={practice.title}
                description={practice.description}
                activeLessonId={practice.unitId}
                isPractice
              />
            ))}
          </div>
        </FeedWrapper>
      </div>
    </PracticeLayout>
  );
};

export default PracticePage;

import { GetServerSideProps } from "next";

interface ChallengeOption {
  id: number;
  challengeId: number;
  text: string;
  option: string;
  isCorrect: boolean;
}

interface Challenge {
  id: number;
  completed: boolean;
  challengeOptions: ChallengeOption[];
}

interface PracticeLesson {
  id: number;
  unitId: number;
  order: number;
  status: string;
  type: string;
  xpReward: number;
  challenges: Challenge[];
}

interface Practice {
  id: number;
  title: string;
  description: string;
  unitId: number;
}

interface Context {
  query: {
    unitId?: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { unitId } = context.query;

  const practiceUnit = await getPracticeUnit(
    unitId ? Number(unitId.toString()) : undefined,
  );
  const practiceLessons: PracticeLesson | null = practiceUnit
    ? {
        ...practiceUnit,
        challenges: practiceUnit.challenges.map((challenge: any) => ({
          ...challenge,
          challengeOptions: challenge.challengeOptions.map((option: any) => ({
            ...option,
            challengeId: challenge.id,
            text: option.text || "",
          })),
        })),
      }
    : null;

  const practices: Practice[] = await getPractices();

  return {
    props: {
      practiceLessons,
      practices,
    },
  };
};
