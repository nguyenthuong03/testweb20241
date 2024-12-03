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

const PracticePage: NextPage = ({ practiceLessons, practices }) => {
  if (practiceLessons) {
    const initialPercentage =
      (practiceLessons.challenges.filter(
        (challenge: { completed: boolean }) => challenge.completed,
      ).length /
        practiceLessons.challenges.length) *
      100;

    return (
      <PracticeLayout>
        <div className="flex flex-1 flex-col">
          <Quiz
            initialLessonId={Number(practiceLessons.id)}
            initialLessonChallenges={practiceLessons.challenges.map(
              (challenge) => ({
                ...challenge,
                id: Number(challenge.id),
                challengeId: Number(challenge.id),
                challengeOptions: challenge.challengeOptions.map((option) => ({
                  ...option,
                  challengeId: Number(challenge.id),
                })),
              }),
            )}
            initialPercentage={initialPercentage}
            isPractice={true}
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

export async function getServerSideProps(context) {
  const { unitId } = context.query; // Access searchParams

  const practiceLessons = await getPracticeUnit(
    unitId ? Number(unitId.toString()) : undefined,
  );

  const practices = await getPractices();

  return {
    props: {
      practiceLessons,
      practices,
    },
  };
}
