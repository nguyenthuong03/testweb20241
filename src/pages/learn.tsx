import { redirect } from "next/navigation";
import { BottomBar } from "~/components/BottomBar";
import { LeftBar } from "~/components/LeftBar";
import { RightBar } from "~/components/RightBar";
import { TopBar } from "~/components/TopBar";
import { FeedWrapper } from "~/components/feedwrapper";
import { getUnits, getUserProgress } from "~/db/queries";
import { Header } from "~/components/header";
import { Unit } from "~/components/unit";
import { NextPage } from "next";

const LearnPage: NextPage = ({ userProgress, units }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <div className="flex flex-1">
        <LeftBar selectedTab="Học" />

        <div className="flex flex-1 items-start justify-center px-6 md:ml-32 lg:ml-64">
          <FeedWrapper>
            <Header title="Japanese" />
            {units
              .sort((unitFirst, unitLast) => unitFirst.order - unitLast.order)
              .map(
                (unit: {
                  id: number;
                  order: number;
                  description: string;
                  title: string;
                  lessons: any[];
                }) => {
                  const activeLesson = unit.lessons.find(
                    (lesson) => lesson.status === "current",
                  );

                  return (
                    <div key={unit.id} className="mb-10">
                      <Unit
                        id={unit.id}
                        order={unit.order}
                        description={unit.description}
                        title={unit.title}
                        lessons={unit.lessons}
                        activeLesson={
                          activeLesson
                            ? { id: activeLesson.id, unit: { id: unit.id } }
                            : undefined
                        }
                        activeLessonPercentage={userProgress.lessonPercentage}
                      />
                    </div>
                  );
                },
              )}
          </FeedWrapper>
        </div>

        <RightBar />
      </div>

      <BottomBar selectedTab="Học" />
    </div>
  );
};

export default LearnPage;

export async function getServerSideProps() {
  const [userProgress, units] = await Promise.all([
    getUserProgress(),
    getUnits(),
  ]);

  if (!userProgress) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      userProgress,
      units,
    },
  };
}
