import { LessonButton } from "~/components/lesson-button";
import { UnitBanner } from "~/components/unit-banner";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: {
    id: number;
    order: number;
    status: string; // current, completed, locked
  }[];
  activeLesson:
    | {
        id: number;
        unit: {
          id: number;
        };
      }
    | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  return (
    <>
      <UnitBanner
        title={title}
        description={description}
        activeLessonId={activeLesson?.id ?? null}
      />

      <div className="relative flex flex-col items-center">
        {lessons?.map((lesson, i) => {
          const isCurrent = lesson.status === "current";
          const isLocked = lesson.status === "locked";

          return (
            <LessonButton
              key={lesson.id}
              id={Number(lesson.id)}
              index={i}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};
