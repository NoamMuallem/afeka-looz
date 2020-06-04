import XLSX from "xlsx";

export const excelBuilder = (data) => {
  const set_right_to_left = (wb /*:Workbook*/) => {
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Views) wb.Workbook.Views = [];
    if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;
  };
  var ws_name = "myCourses";
  var wb = XLSX.utils.book_new();
  set_right_to_left(wb);
  var ws_data = [];
  data.forEach((course) => {
    ws_data.push([course.name, course.courseNumber]);
    const bigTable = course.lectures.find((lecture) => lecture.day2);
    //set headers
    bigTable
      ? ws_data.push([
          "הערות",
          "סמסטר",
          "מס' קבוצה",
          "סוג",
          "מרצה",
          "יום",
          "מתחיל",
          "נגמר",
          "כיתה",
          "יום",
          "מתחיל",
          "נגמר",
          "כיתה",
        ])
      : ws_data.push([
          "הערות",
          "סמסטר",
          "מס' קבוצה",
          "סוג",
          "מרצה",
          "יום",
          "מתחיל",
          "נגמר",
          "כיתה",
        ]);
    course.lectures.forEach((lecture) => {
      if (lecture.day2) {
        ws_data.push([
          lecture.fyi,
          lecture.semester,
          lecture.groupId,
          lecture.lectureType,
          lecture.lecturer,
          lecture.day,
          lecture.start,
          lecture.ends,
          lecture.classRoom,
          lecture.day2,
          lecture.start2,
          lecture.ends2,
          lecture.classRoom2,
        ]);
      } else {
        ws_data.push([
          lecture.fyi,
          lecture.semester,
          lecture.groupId,
          lecture.lectureType,
          lecture.lecturer,
          lecture.day,
          lecture.start,
          lecture.ends,
          lecture.classRoom,
        ]);
      }
    });
    ws_data.push([]);
  });
  var ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, ws_name);
  XLSX.writeFile(wb, "myCourses.xlsx");
};
