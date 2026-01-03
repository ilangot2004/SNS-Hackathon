import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Create a new trip
 * @param {object} tripData - Trip data (name, place, startDate, endDate, userId, etc.)
 * @returns {Promise<string>} Trip ID
 */
export async function createTrip(tripData) {
  try {
    const tripRef = await addDoc(collection(db, "trips"), {
      ...tripData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return tripRef.id;
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error;
  }
}

/**
 * Get all trips for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of trips
 */
export async function getUserTrips(userId) {
  try {
    const q = query(
      collection(db, "trips"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user trips:", error);
    throw error;
  }
}

/**
 * Get a single trip by ID
 * @param {string} tripId - Trip ID
 * @returns {Promise<object>} Trip data
 */
export async function getTrip(tripId) {
  try {
    const tripDoc = await getDoc(doc(db, "trips", tripId));
    if (tripDoc.exists()) {
      return {
        id: tripDoc.id,
        ...tripDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting trip:", error);
    throw error;
  }
}

/**
 * Update a trip
 * @param {string} tripId - Trip ID
 * @param {object} tripData - Updated trip data
 * @returns {Promise}
 */
export async function updateTrip(tripId, tripData) {
  try {
    await updateDoc(doc(db, "trips", tripId), {
      ...tripData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating trip:", error);
    throw error;
  }
}

/**
 * Delete a trip
 * @param {string} tripId - Trip ID
 * @returns {Promise}
 */
export async function deleteTrip(tripId) {
  try {
    await deleteDoc(doc(db, "trips", tripId));
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
}

/**
 * Create itinerary section
 * @param {string} tripId - Trip ID
 * @param {object} sectionData - Section data (title, description, startDate, endDate, budget)
 * @returns {Promise<string>} Section ID
 */
export async function createItinerarySection(tripId, sectionData) {
  try {
    const sectionRef = await addDoc(collection(db, "trips", tripId, "sections"), {
      ...sectionData,
      createdAt: new Date().toISOString()
    });
    return sectionRef.id;
  } catch (error) {
    console.error("Error creating itinerary section:", error);
    throw error;
  }
}

/**
 * Get all sections for a trip
 * @param {string} tripId - Trip ID
 * @returns {Promise<Array>} Array of sections
 */
export async function getTripSections(tripId) {
  try {
    const querySnapshot = await getDocs(collection(db, "trips", tripId, "sections"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting trip sections:", error);
    throw error;
  }
}

