import { db } from '@/utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default async function getData(
  collectionName: string,
  uid: string | null
) {
  let result = null;
  let error = null;

  try {
    const queryData = query(
      collection(db, collectionName),
      where('userId', '==', uid)
    );
    const querySnapshot = await getDocs(queryData);
    result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
