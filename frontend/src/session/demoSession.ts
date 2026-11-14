import { isUserProfile, type UserProfile } from "../domain/userProfile";

/**
 * Demo session kept in this browser. It only records which demo profile the
 * visitor chose: it is not authentication and protects nothing, since anyone
 * can change browser storage. Sign-in and authorization will be enforced by
 * the backend; this module is the single place the frontend will swap then.
 */
export type DemoSession = {
  profile: UserProfile;
  /** Name of the demo user that represents the profile. */
  userName: string;
};

/** Demo users of each profile (briefing, section 11). */
const DEMO_USER_NAMES: Record<UserProfile, string> = {
  ADMIN: "Marina Duarte",
  ATTENDANT: "Rafael Lima",
  STOCK_CLERK: "Joana Ribeiro",
  FINANCE: "Carlos Mendes",
};

/** Storage key; other tabs report changes to it through the storage event. */
export const DEMO_SESSION_KEY = "pedimova:demo-session";

/** Raised whenever the stored shape changes, so older records are discarded. */
const STORED_VERSION = 1;

type StoredSession = {
  version: typeof STORED_VERSION;
  profile: UserProfile;
};

/** Name of the demo user that represents a profile. */
export function getDemoUserName(profile: UserProfile): string {
  return DEMO_USER_NAMES[profile];
}

function toSession(profile: UserProfile): DemoSession {
  return { profile, userName: getDemoUserName(profile) };
}

/** Profile of a stored record, or null when the record is not valid. */
function parseStoredProfile(raw: string): UserProfile | null {
  try {
    const value: unknown = JSON.parse(raw);

    if (
      typeof value === "object" &&
      value !== null &&
      "version" in value &&
      value.version === STORED_VERSION &&
      "profile" in value &&
      isUserProfile(value.profile)
    ) {
      return value.profile;
    }
  } catch {
    // Malformed JSON is handled like any other invalid record.
  }

  return null;
}

/** Current session, or null when there is none or the stored record is invalid. */
export function getDemoSession(): DemoSession | null {
  let raw: string | null;

  try {
    raw = window.localStorage.getItem(DEMO_SESSION_KEY);
  } catch {
    // The browser blocks storage for this site.
    return null;
  }

  if (raw === null) {
    return null;
  }

  const profile = parseStoredProfile(raw);

  if (profile === null) {
    // Drop the invalid record so it is not read again.
    endDemoSession();
    return null;
  }

  return toSession(profile);
}

/** Starts a session with the chosen profile. Throws when storage is blocked. */
export function startDemoSession(profile: UserProfile): DemoSession {
  const stored: StoredSession = { version: STORED_VERSION, profile };
  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(stored));
  return toSession(profile);
}

/** Ends the session. Does nothing when there is none. */
export function endDemoSession(): void {
  try {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
  } catch {
    // Nothing to remove when storage is blocked.
  }
}
