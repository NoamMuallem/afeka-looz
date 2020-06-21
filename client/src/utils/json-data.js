export const courseToJson = (courses) => {
  return courses.map((course) => {
    const name = course.data.name;
    const { courseNumber, filters } = course;

    let options = [];
    if (filters[0]) {
      options = options.concat(course.data.semesterA.map((option) => option));
    }
    if (filters[1]) {
      options = options.concat(course.data.semesterB.map((option) => option));
    }
    if (filters[2]) {
      options = options.concat(course.data.semesterC.map((option) => option));
    }

    let events = options.map((event) => event);
    let lectures = events.map((event1) => {
      return event1
        .map((event) => {
          const { semester, groupId, lectureType, lecturer, fyi } = event;
          const twoPart = event.parts.length === 2;
          let answer = null;
          twoPart
            ? (answer = {
                semester,
                groupId,
                lectureType,
                lecturer,
                day: event.parts[0].day,
                start: event.parts[0].start,
                ends: event.parts[0].ends,
                classRoom: event.parts[0].classRoom,
                day2: event.parts[1].day,
                start2: event.parts[1].start,
                ends2: event.parts[1].ends,
                classRoom2: event.parts[1].classRoom,
                fyi,
              })
            : (answer = {
                semester,
                groupId,
                lectureType,
                lecturer,
                day: event.parts[0].day,
                start: event.parts[0].start,
                ends: event.parts[0].ends,
                classRoom: event.parts[0].classRoom,
                fyi,
              });
          return answer;
        })
        .concat([{ delimitor: "" }]);
    });

    lectures = [].concat.apply([], lectures);

    return {
      name,
      courseNumber,
      lectures,
    };
  });
};
