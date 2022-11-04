import { firestore } from '../firebase/firebase.utils';

const generateUid = () => {
  const { id } = firestore.collection('workspaces').doc();
  return id;
};

export default generateUid;
