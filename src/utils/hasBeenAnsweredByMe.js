export const hasBeenAnsweredByMe = (answers, id) => {
	return answers.some((e) => e.mentorId === id);
};
