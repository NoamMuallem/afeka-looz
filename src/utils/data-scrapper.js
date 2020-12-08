const puppeteer = require("puppeteer");

const scrape = async (courseNumber) => {
  //set-up
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    "https://yedion.afeka.ac.il/yedion/fireflyweb.aspx?prgname=Enter_Search"
  );

  //select course number input
  await page.focus("#SubjectCode");

  //enter course number
  await page.keyboard.type(courseNumber);

  //click on search button
  await page.click('input[name="B2"]');

  //initialize empty array is course number is invald
  let data = [];

  //waite for the page to load is does not load reaturn empty lectures
  await page
    .waitForXPath(
      "/html/body/main/div[4]/div[2]/div/div/form/table/tbody/tr[1]/td/h1",
      { timeout: 8000 }
    )
    .then(async () => {
      //get data
      data = await page.evaluate(() => {
        //takes the data and arrange it all in one lecture object
        const createLecture = (table, subHeader, header) => {
          //get group id
          const groupId = elementToFiteredText(header.querySelector("span"));

          //get linked groups
          const linkedGroupes = elementToFiteredText(subHeader);
          //gonne srearch for spesiphic terms in the string to clasified the lecture type
          let lectureType = "";
          if (header.textContent.includes("הרצאה")) {
            lectureType = "הרצאה";
          } else if (header.textContent.includes("תרגול")) {
            lectureType = "תרגול";
          } else if (header.textContent.includes("מעבדה")) {
            lectureType = "מעבדה";
          } else {
            lectureType = "אחר";
          }
          //getting additional information like full course
          let fyi = "";
          //if ther is no additional data dont try to get text, becouse the element is null
          if (header.querySelector("span.text") != null) {
            fyi = elementToFiteredText(header.querySelector("span.text"), 1);
          }
          //in case there is no lecturer yet:
          let lecturer = elementToFiteredText(table[4], 1);

          if (table.length === 12) {
            return (lecture = {
              semester: elementToFiteredText(table[0]),
              groupId,
              linkedGroupes,
              lectureType,
              fyi,
              lecturer,
              parts: [
                {
                  day: elementToFiteredText(table[1]),
                  start: elementToFiteredText(table[2]),
                  ends: elementToFiteredText(table[3]),
                  classRoom: elementToFiteredText(table[5], 1),
                },
                {
                  day: elementToFiteredText(table[7]),
                  start: elementToFiteredText(table[8]),
                  ends: elementToFiteredText(table[9]),
                  classRoom: elementToFiteredText(table[11], 1),
                },
              ],
            });
          } else {
            return (lecture = {
              semester: elementToFiteredText(table[0]),
              groupId,
              linkedGroupes,
              lectureType,
              fyi,
              lecturer: elementToFiteredText(table[4], 1),
              parts: [
                {
                  day: elementToFiteredText(table[1]),
                  start: elementToFiteredText(table[2]),
                  ends: elementToFiteredText(table[3]),
                  classRoom: elementToFiteredText(table[5], 1),
                },
              ],
            });
          }
        };
        //filtering the text, if second argument was passed, inner spaces remain
        const elementToFiteredText = (element, innerSpaces = null) => {
          if (innerSpaces != null)
            return element.textContent
              .replace("\n\t\tקבוצה : ", "")
              .replace("קבוצות הקשורות לקורס זה :", "")
              .trim();
          else {
            return element.textContent
              .replace("\n\t\tקבוצה : ", "")
              .replace("קבוצות הקשורות לקורס זה :", "")
              .replace(/\s/g, "")
              .trim();
          }
        };
        //initialize
        let lectures = [];

        //read all headers
        let headers = document.querySelectorAll("div.text.TextAlignRight");
        //read all subheadre
        let subHeaders = document.querySelectorAll("b > span.text");
        //amount of tables
        const amount = headers.length - 1;

        //read all tables data
        for (let i = 0; i < amount; i++) {
          let table = document.querySelectorAll(
            `div#DataTables_Table_${i}_wrapper > .row > div > table > tbody > tr > td`
          );
          try {
            //in case there in an empty table
            lectures.push(createLecture(table, subHeaders[i], headers[i]));
          } catch (e) {}
        }
        //getting the course name
        const name = document
          .querySelectorAll("h1")[1]
          .textContent.replace("\t", " ")
          .replace('"', "")
          .replace('"', '"')
          .replace("שנהל ", "")
          .replace("קורס ", "")
          .trim();

        lectures.push({ name });

        return lectures;
      });
    })
    .catch(async (e) => {});

  browser.close();
  return data;
};

module.exports = scrape;
