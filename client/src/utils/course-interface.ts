export interface Course {
  courseNumber: string;
  filters: Array<boolean>;
  data: null | {
    name: string;
    semesterA: Array<Option>;
    semesterB: Array<Option>;
    semesterC: Array<Option>;
  };
  svg?: any;
}

export interface Option extends Array<Lecture> {}

export interface Lecture {
  semester: string;
  groupId: string;
  lectureType: string;
  fyi: string;
  lecturer: string;
  parts: Array<Part>;
}

interface Part {
  day: string;
  start: string;
  ends: string;
  classRoom: string;
}
