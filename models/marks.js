import firestore from '@react-native-firebase/firestore';

async function getStudent(id) {
  const studentRef = firestore().collection('Student');
  const snapshot = await studentRef.get();
  const students = [];
  snapshot.forEach(doc => {
    if(doc.id == id)
        students.push({id: doc.id, ...doc.data()});
  });
  return students[0];
}



//Each student can view the marks of his previous years as well
export async function getMarks(std) {

    const studentRef = firestore().collection('Student');
  const snapshot = await studentRef.get();
  const students = [];
  snapshot.forEach(doc => {
    if(doc.id == 'sU8qjPfFlNEA36lu54o4')
        students.push({id: doc.id, ...doc.data()});
  });
  tempStd = students[0];
  //for the time being i am getting a particular student

  console.log("----------------")
  console.log(tempStd)
  console.log("----------------")

  //now in the marks collection i will get the records matching his id and create separate arrays based on the year
  const marksRef = firestore().collection('Marks');
  const marksQuery = marksRef.where('student', '==', `/Student/${tempStd.id}`);

  console.log("Marks Query",(await marksQuery.get()).docs);

  const distinctYears = [];
  marksQuery.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const year = doc.data().year;
      if (!distinctYears.includes(year)) {
        distinctYears.push(year);
      }
    });
  });
  console.log("YEARSSSSS",distinctYears);
  return distinctYears;




//   const marksData = [];
//   // Fetch marks data from Firestore
//   marksQuery.get().then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//       const markData = doc.data();
//       const subjectRef = markData.subject;
//       // Fetch subject data from Firestore
//       subjectRef.get().then(subjectDoc => {
//         const subjectData = subjectDoc.data();
//         const year = markData.year;
//         // Find the existing year data in marksData array
//         const yearData = marksData.find(data => data.year === year);
//         if (yearData) {
//           // If year data exists, push the new mark to the marks array
//           yearData.marks.push({subject: subjectData, marks: markData.marks});
//         } else {
//           // If year data doesn't exist, create a new object and push it to marksData array
//           marksData.push({
//             year,
//             marks: [{subject: subjectData, marks: markData.marks}],
//           });
//         }
//       });
//     });
//   });

}

