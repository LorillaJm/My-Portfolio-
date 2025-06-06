import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';

export const addAdminToDatabase = async (email: string) => {
  try {
    const sanitizedEmail = email.replace(/[.#$[\]]/g, '_');
    const adminRef = ref(database, `admins/${sanitizedEmail}`);
    await set(adminRef, {
      email: email,
      isAdmin: true,
      addedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error adding admin:', error);
    return false;
  }
}; 