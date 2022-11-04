import { storage } from '../firebase/firebase.utils';
import generateUid from './generateUid';

const uploadImageToStorage = async (fileToBeAdded, pathOfStorage) => {
  const fileName = generateUid();
  const storageRef = storage
    .ref()
    .child(`${pathOfStorage}/${fileName}`);
  const url = await storageRef.put(fileToBeAdded);
  const downloadUrl = await url.ref.getDownloadURL();
  return downloadUrl;
};

export default uploadImageToStorage;
