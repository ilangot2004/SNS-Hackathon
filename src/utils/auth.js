import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {object} userData - Additional user data (firstName, lastName, phone, city, country, etc.)
 * @param {File} profileImage - Optional profile image file
 * @returns {Promise} User credential
 */
export async function registerUser(email, password, userData, profileImage = null) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    let photoURL = null;

    // Upload profile image if provided
    if (profileImage) {
      photoURL = await uploadProfilePhoto(user.uid, profileImage);
      // Update auth profile with photo URL
      await updateProfile(user, { photoURL });
    }

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone || '',
      city: userData.city || '',
      country: userData.country || '',
      additionalInfo: userData.additionalInfo || '',
      photoURL: photoURL,
      role: userData.role || 'user',
      uid: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} User credential
 */
export async function loginUser(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Logout current user
 * @returns {Promise}
 */
export async function logoutUser() {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

/**
 * Get current user data from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<object>} User data
 */
export async function getUserData(uid) {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

/**
 * Update user data in Firestore
 * @param {string} uid - User ID
 * @param {object} userData - Updated user data
 * @returns {Promise}
 */
export async function updateUserData(uid, userData) {
  try {
    await setDoc(doc(db, "users", uid), {
      ...userData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

/**
 * Upload profile photo to Firebase Storage
 * @param {string} uid - User ID
 * @param {File} file - Image file
 * @returns {Promise<string>} Download URL
 */
export async function uploadProfilePhoto(uid, file) {
  try {
    const storageRef = ref(storage, `profiles/${uid}.jpg`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    throw error;
  }
}

/**
 * Listen to authentication state changes
 * @param {function} callback - Callback function that receives the user object
 * @returns {function} Unsubscribe function
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

