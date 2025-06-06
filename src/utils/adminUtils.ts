import { database } from '../config/firebase';
import { ref, get } from 'firebase/database';

// List of admin emails (as a backup in case database check fails)
const ADMIN_EMAILS = ['admin@example.com'];

export const isAdminEmail = async (email: string | null): Promise<boolean> => {
  if (!email) return false;

  try {
    // First check in the database
    const adminRef = ref(database, `admins/${email.replace(/[.#$[\]]/g, '_')}`);
    const snapshot = await get(adminRef);
    
    if (snapshot.exists()) {
      return snapshot.val().isAdmin === true;
    }
    
    // Fallback to hardcoded admin emails
    return ADMIN_EMAILS.includes(email);
  } catch (error) {
    console.error('Error checking admin status:', error);
    // Fallback to hardcoded admin emails
    return ADMIN_EMAILS.includes(email);
  }
};

// Synchronous version for immediate checks
export const isAdminEmailSync = (email: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}; 