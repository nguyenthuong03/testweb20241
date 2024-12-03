"use client";
import { NotebookText } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { SessionKey, SessionStorage } from "../utils/session-storage";

type UnitBannerProps = {
  title: string;
  description: string;
  activeLessonId: number | null;
  isPractice?: boolean;
};

export const UnitBanner = ({
  title,
  description,
  activeLessonId,
  isPractice = false,
}: UnitBannerProps) => {
  const saveStorage = () => {
    if (activeLessonId !== null) {
      SessionStorage.set(SessionKey.LESSON_ID, activeLessonId.toString());
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>

      <Link
        href={isPractice ? `/practice?unitId=${activeLessonId}` : "/lesson"}
        onClick={saveStorage}
      >
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};
