import { doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { db } from "../components/firebase";

async function markStarred(db, id, docType) {
  let emailRef;

  if (docType === "draft") {
    emailRef = collection(db, "drafts");
    console.log("doctype is draft");
  } else if (docType === "starred") {
    emailRef = collection(db, "starred");
    console.log("doctype is starred");
  } else if (docType === "important") {
    emailRef = collection(db, "important");
    console.log("doctype is important");
  } else if (docType === "sent mail") {
    emailRef = collection(db, "sent");
  } else if (docType === "received mail") {
    emailRef = collection(db, "inbox");
  }
  const docRef = doc(emailRef, id);

  const docSnap = await getDoc(docRef);
  const targetDoc = docSnap.data();
  console.log(targetDoc);

  if (targetDoc.starred) {
    setDoc(docRef, { starred: false }, { merge: true }); // adding 'starred' key in sent/drafts collection
    await deleteDoc(doc(db, "starred", id)); //deleting doc from 'starred' collection
    console.log("unstarred");
  } else if (!targetDoc.starred) {
    await setDoc(doc(db, "starred", id), {
      ...targetDoc, // adding the complete data of the sent/drafts to starred
      starred: true,
    });

    setDoc(docRef, { starred: true }, { merge: true });
    console.log("starred successfully");
  }
  console.log(targetDoc);
}
export default markStarred;

export async function markImportant(db, id, docType) {
  let emailRef;
  if (docType === "draft") {
    emailRef = collection(db, "drafts");
    console.log("doctype is draft");
  } else if (docType === "starred") {
    emailRef = collection(db, "starred");
    console.log("doctype is starred");
  } else if (docType === "important") {
    emailRef = collection(db, "important");
    console.log("doctype is important");
  } else if (docType === "sent mail") {
    emailRef = collection(db, "sent");
  } else if (docType === "received mail") {
    emailRef = collection(db, "inbox");
  }
  const docRef = doc(emailRef, id);

  // const emailRef = collection(db, "sent"); //to get the collection
  // const docRef = doc(emailRef, id); //to get reference the rqd doc inside the said collection
  const docSnap = await getDoc(docRef); // awaiting the fetching of doc from firestore
  const targetDoc = docSnap.data(); // converting the data received to presentable data
  console.log(targetDoc);

  if (targetDoc.important) {
    setDoc(docRef, { important: false }, { merge: true });
    await deleteDoc(doc(db, "important", id));
    console.log("unimportant");
  } else {
    setDoc(docRef, { important: true }, { merge: true });
    await setDoc(doc(db, "important", id), {
      ...targetDoc, // adding the complete data of the sent/drafts to starred
      important: true,
    });
    console.log("marked important");
  }
}

export const fetchMailCount = (collectionName) => {
  const q = query(collection(db, `${collectionName}`), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    let items = [];
    snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    let mailCount = 0;
    items.forEach((item) => {
      mailCount += 1;
    });

    return mailCount;
  });

  const requiredMailCount = unsubscribe();
  return requiredMailCount;
};
