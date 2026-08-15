// Data access layer for provinces. Reads from Firestore when data has
// been seeded there; falls back to the local seed data otherwise, so
// the app keeps working before you've run the migration script.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { provinces as localProvinces } from "../data/provinces";

const PROVINCES_COLLECTION = "provinces";

/**
 * Fetch all provinces. Tries Firestore first; if the collection is
 * empty (not seeded yet) or the request fails, returns local seed data.
 */
export async function fetchProvinces() {
  try {
    const snapshot = await getDocs(collection(db, PROVINCES_COLLECTION));
    if (snapshot.empty) {
      return localProvinces;
    }
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  } catch (err) {
    console.warn("Falling back to local province data:", err.message);
    return localProvinces;
  }
}

/**
 * Fetch a single province by id. Tries Firestore first, falls back to
 * local seed data if not found or on error.
 */
export async function fetchProvinceById(provinceId) {
  try {
    const ref = doc(db, PROVINCES_COLLECTION, provinceId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
  } catch (err) {
    console.warn("Falling back to local province data:", err.message);
  }
  return localProvinces.find((p) => p.id === provinceId) ?? null;
}

/**
 * Create or overwrite a province document. `id` is the document id
 * (used as the URL slug, e.g. "siem-reap"). `data` should NOT include
 * the id field itself.
 */
export async function saveProvince(id, data) {
  const ref = doc(db, PROVINCES_COLLECTION, id);
  await setDoc(ref, data);
}

/**
 * Permanently delete a province document.
 */
export async function deleteProvince(id) {
  const ref = doc(db, PROVINCES_COLLECTION, id);
  await deleteDoc(ref);
}

/**
 * Turn a province name into a URL-safe id, e.g. "Siem Reap" -> "siem-reap".
 */
export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}