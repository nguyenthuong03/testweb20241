import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
// TODO: viet ham get user id by token
const units = [
  {
    id: 1,
    order: 1,
    description: "description 1",
    title: "title 1",
    lessons: [
      {
        id: 1,
        order: 1,
        status: "completed",
      },
      {
        id: 2,
        order: 2,
        status: "current",
      },
      {
        id: 3,
        order: 3,
        status: "locked",
      },
    ],
  },
  {
    id: 2,
    order: 2,
    description: "description 2",
    title: "title 2",
    lessons: [
      {
        id: 4,
        order: 1,
        status: "current",
      },
      {
        id: 5,
        order: 2,
        status: "locked",
      },
      {
        id: 6,
        order: 3,
        status: "locked",
      },
    ],
  },
];

const practices = [
  {
    id: 1,
    unitId: 1,
    description: "description 1",
    title: "title 1",
  },
  {
    id: 2,
    unitId: 2,
    description: "description 2",
    title: "title 2",
  },
];

export const getPractices = () => {
  return practices;
};

export const updateQuestionRightAnswer = async (
  questionId: number,
  userId: number,
  type: string,
) => {
  //try {
  //  const response = await axios.post(
  //    `${API_BASE_URL}/questions/right-answer`,
  //    {
  //      questionId,
  //    },
  //  );
  //  console.log(response.data.message);
  //  return response.data;
  //} catch (error) {
  //  console.error("Error updating right answer:", error);
  //  throw error;
  //}
  console.log("Update right answer");
};

export const updateQuestionWrongAnswer = async (
  questionId: number,
  userId: number,
  type: string,
) => {
  //try {
  //  const response = await axios.post(
  //    `${API_BASE_URL}/questions/wrong-answer`,
  //    {
  //      questionId,
  //    },
  //  );
  //  console.log(response.data.message);
  //  return response.data;
  //} catch (error) {
  //  console.error("Error updating wrong answer:", error);
  //  throw error;
  //}
  console.log("Update wrong answer");
};

export const updateStatusLesson = async (lessonId: number, userId: number) => {
  // try {
  //   const response = await axios.post(`${API_BASE_URL}/lessons/update-status`, {
  //     lessonId,
  //   });
  //   console.log(response.data.message);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error updating lesson status:", error);
  //   throw error;
  // }
  console.log("Update lesson status");
};

export const getUnits = () => {
  // try {
  //   const response = await axios.get(`${API_BASE_URL}/units`);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error fetching units:", error);
  //   throw error;
  // }
  return units;
};

export const getLessonById = async (lessonId: number) => {
  const response = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
  return response.data;
};

export const getCurrentLesson = async () => {
  const units = await getUnits();
  const currentLesson = units
    .flatMap((unit: { lessons: any[] }) => unit.lessons)
    .find((lesson: { status: string }) => lesson.status === "current");

  if (!currentLesson) return null;
  return await getLessonById(currentLesson.id);
};

export const getPreviousLessons = async () => {
  const units = await getUnits();
  const lessons = units.flatMap((unit: { lessons: any[] }) => unit.lessons);
  const currentLesson = lessons.find(
    (lesson: { status: string }) => lesson.status === "current",
  );
  if (!currentLesson) return [];
  return lessons.filter(
    (lesson: { id: number }) => lesson.id < currentLesson.id,
  );
};

export const getPracticeChallenges = async () => {
  const previousLessons = await getPreviousLessons();
  const challenges = [];
  for (const lesson of previousLessons) {
    const lessonDetails = await getLessonById(lesson.id);
    const incompleteChallenges = lessonDetails.challenges.filter(
      (challenge: { completed: boolean }) => !challenge.completed,
    );
    challenges.push(...incompleteChallenges);
  }

  return challenges;
};

export const isLessonCompleted = async (lessonId: number, userId: number) => {
  const units = await getUnits();
  const lesson = units
    .flatMap((unit: { lessons: any[] }) => unit.lessons)
    .find((lesson: { id: number; status: string }) => lesson.id === lessonId);

  return lesson?.status === "completed" || false;
};

export const getLesson = (lessonId: number) => {
  // const response = await axios.get(`${API_BASE_URL}/lessons/${lessonId}`);
  // return response.data;

  const lessonList = [
    {
      id: 1,
      unitId: 1,
      order: 1,
      status: "",
      type: "flashcard",
      xpReward: 100,
      challenges: [
        { id: 1, word: "Ephemeral", meaning: "Lasting for a very short time" },
        {
          id: 2,
          word: "Ubiquitous",
          meaning: "Present, appearing, or found everywhere",
        },
        {
          id: 3,
          word: "Serendipity",
          meaning: "The occurrence of events by chance in a happy way",
        },
      ],
    },
    {
      id: 2,
      unitId: 1,
      order: 2,
      status: "",
      type: "lesson",
      xpReward: 10,
      challenges: [
        {
          id: 1,
          question: "Question 1",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
        {
          id: 2,
          question: "Question 2",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
      ],
    },
    {
      id: 3,
      unitId: 1,
      order: 3,
      status: "",
      type: "test",
      xpReward: 10,
      challenges: [
        {
          id: 1,
          question: "Question 1",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
        {
          id: 2,
          question: "Question 2",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
      ],
    },
  ];

  const lesson = lessonList.filter((l) => l.id === lessonId)[0];

  return lesson;
};

export const getPracticeUnit = async (unitId: number | undefined) => {
  if (unitId === undefined) return null;

  const practiceLessons = [
    {
      id: 1,
      unitId: 1,
      order: 1,
      status: "",
      type: "practice",
      xpReward: 10,
      challenges: [
        {
          id: 1,
          question: "Question 1",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
        {
          id: 2,
          question: "Question 2",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
      ],
    },
    {
      id: 2,
      unitId: 2,
      order: 3,
      status: "",
      type: "practice",
      xpReward: 10,
      challenges: [
        {
          id: 1,
          question: "Question 1",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
        {
          id: 2,
          question: "Question 2",
          challengeOptions: [
            {
              id: 1,
              option: "text 1",
              isCorrect: true,
            },
            {
              id: 2,
              option: "text 2",
              isCorrect: false,
            },
            {
              id: 3,
              option: "text 3",
              isCorrect: false,
            },
            {
              id: 4,
              option: "text 4",
              isCorrect: false,
            },
          ],
          completed: false,
          type: "SELECT",
        },
      ],
    },
  ];
  const lesson = practiceLessons.filter((l) => l.unitId === unitId)[0];

  return lesson;
};

export const getUserProgress = async () => {
  // const response = await axios.get(`${API_BASE_URL}/user-progress`);
  // return response.data;

  return {
    points: 10,
    lessonPercentage: 100,
  };
};
