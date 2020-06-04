/* this function will get an array of practices and lectures and group all linked
   practices with lectures (if lecture groupId is 5, practice groupId is 5/1) */

const sort = (lecturesArray) => {
  //1.initialize object, giving it a subject name
  const newStructuredLectures = {
    name: lecturesArray[lecturesArray.length - 1].name,
    semesterA: [],
    semesterB: [],
    semesterC: [],
    statuse: 0,
  };
  lecturesArray.splice(lecturesArray.length - 1, 1);

  const isLecture = (id) => {
    str = String(id.groupId);
    return !str.includes("/");
  };

  //2.groupping lectures and practice together
  let lectures = lecturesArray.filter((el) => isLecture(el));

  let practices = lecturesArray.filter((el) => !isLecture(el));

  //2.5 if there are no prectices
  if (practices.length === 0) {
    while (lectures.length > 0) {
      let option = [];
      let lecture = lectures.pop();
      option.push(lecture);

      if (lecture.semester.localeCompare("א") === 0) {
        newStructuredLectures.semesterA.push(option);
      } else if (lecture.semester.localeCompare("ב") === 0) {
        newStructuredLectures.semesterB.push(option);
      } else {
        newStructuredLectures.semesterC.push(option);
      }
    }

    return newStructuredLectures;
  }

  //3. populating
  while (lectures.length > 0) {
    let option = [];
    let lecture = lectures.pop();
    option.push(lecture);
    practicelinex = practices.findIndex((el) => {
      return lecture.linkedGroupes.includes(el.groupId);
    });
    while (practicelinex != -1) {
      option.push(practices[practicelinex]);
      practices.splice(practicelinex, 1);
      practicelinex = practices.findIndex((el) =>
        lecture.linkedGroupes.includes(el.groupId)
      );
    }

    if (lecture.semester.localeCompare("א") === 0) {
      newStructuredLectures.semesterA.push(option);
    } else if (lecture.semester.localeCompare("ב") === 0) {
      newStructuredLectures.semesterB.push(option);
    } else {
      newStructuredLectures.semesterC.push(option);
    }
  }

  //4. checking practices is empty, if not change statuse on object
  //   and pushing remain practices to object
  if (practices.length > 0) {
    newStructuredLectures.statuse = -1;
    while (practices.length > 0) {
      const arry = [];
      let temp = practices.pop();
      arry.push(temp);
      if (temp.semester.localeCompare("א") === 0) {
        newStructuredLectures.semesterA.push(arry);
      } else if (temp.semester.localeCompare("ב") === 0) {
        newStructuredLectures.semesterB.push(arry);
      } else {
        newStructuredLectures.semesterC.push(arry);
      }
    }
  }

  return newStructuredLectures;
};

module.exports = sort;
