import { database, auth } from '../config/firebase';
import { ref, set, get } from 'firebase/database';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

export const seedAdmin = async (email: string, password?: string) => {
  const sanitizedEmail = email.replace(/[.#$[\]]/g, '_');
  
  try {
    // First check if admin already exists
    const adminRef = ref(database, `admins/${sanitizedEmail}`);
    const adminSnapshot = await get(adminRef);
    
    if (adminSnapshot.exists()) {
      return {
        success: false,
        message: 'This email is already registered as an admin.'
      };
    }

    // Create or sign in the user
    let userCredential;
    try {
      if (password) {
        // Try to create new user with email/password
        try {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('New admin user created with email/password');
        } catch (authError: any) {
          if (authError.code === 'auth/email-already-in-use') {
            // If user exists, try to sign in
            try {
              userCredential = await signInWithEmailAndPassword(auth, email, password);
              console.log('Existing user signed in with email/password');
            } catch (signInError: any) {
              return {
                success: false,
                message: 'Invalid password for existing account. Please use the correct password.'
              };
            }
          } else {
            throw authError;
          }
        }
      } else {
        // Try Google sign in if no password provided
        const googleProvider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, googleProvider);
        console.log('User signed in with Google');
      }
    } catch (authError) {
      console.error('Authentication error:', authError);
      throw authError;
    }

    // Now that we're authenticated, store admin status
    try {
      // Store in admins node
      await set(adminRef, {
        email: email,
        isAdmin: true,
        addedAt: new Date().toISOString(),
        role: 'superadmin',
        uid: userCredential.user.uid,
        provider: userCredential.user.providerData[0]?.providerId || 'email'
      });

      // Store in users node
      const userRef = ref(database, `users/${userCredential.user.uid}`);
      await set(userRef, {
        email: email,
        isAdmin: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        role: 'superadmin',
        provider: userCredential.user.providerData[0]?.providerId || 'email'
      });

      return {
        success: true,
        message: 'Admin account created successfully. You can now log in.',
        uid: userCredential.user.uid
      };
    } catch (dbError) {
      // If database update fails, clean up the authentication if it was a new user
      console.error('Database update failed:', dbError);
      if (userCredential?.user) {
        try {
          await userCredential.user.delete();
        } catch (deleteError) {
          console.error('Failed to cleanup user after error:', deleteError);
        }
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error in admin setup:', error);
    return {
      success: false,
      message: error instanceof Error ? 
        `Error: ${error.message}` : 
        'Failed to setup admin account. Please try again.'
    };
  } finally {
    // Sign out after setup
    try {
      await auth.signOut();
    } catch (signOutError) {
      console.error('Error signing out:', signOutError);
    }
  }
}; 