import Map "mo:core/Map";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  // ── Shared types ──────────────────────────────────────────────────────────

  public type ContactRecord = {
    id      : Nat;
    name    : Text;
    phone   : Text;
    city    : Text;
    message : Text;
    timestamp : Int;
  };

  public type VisitStats = {
    totalVisits  : Nat;
    visitsByCity : [(Text, Nat)];
    dailyVisits  : [(Int, Nat)];
  };

  // Internal visit record
  type VisitEntry = {
    city      : Text;
    timestamp : Int;
  };

  // ── State ─────────────────────────────────────────────────────────────────

  var nextId : Nat = 0;
  let inquiries = Map.empty<Nat, ContactRecord>();

  // Separate stable map for visit analytics: visit index → VisitEntry
  var nextVisitId : Nat = 0;
  let visits = Map.empty<Nat, VisitEntry>();

  // ── Contact methods ───────────────────────────────────────────────────────

  public shared ({ caller = _ }) func submitContact(
    name    : Text,
    phone   : Text,
    city    : Text,
    message : Text,
  ) : async Nat {
    let id = nextId;
    nextId += 1;
    let record : ContactRecord = {
      id;
      name;
      phone;
      city;
      message;
      timestamp = Time.now();
    };
    inquiries.add(id, record);
    id;
  };

  public query ({ caller = _ }) func getAllContacts() : async [ContactRecord] {
    inquiries.values().toArray();
  };

  public query ({ caller = _ }) func getContact(id : Nat) : async ?ContactRecord {
    inquiries.get(id);
  };

  // Legacy alias — kept for backward compatibility
  public shared ({ caller = _ }) func removeContact(id : Nat) : async Bool {
    if (not inquiries.containsKey(id)) { return false };
    inquiries.remove(id);
    true;
  };

  // Admin delete — same logic, new name matches contract
  public shared ({ caller = _ }) func deleteContact(id : Nat) : async Bool {
    if (not inquiries.containsKey(id)) { return false };
    inquiries.remove(id);
    true;
  };

  // ── Visit analytics ───────────────────────────────────────────────────────

  public shared ({ caller = _ }) func recordVisit(city : Text) : async () {
    let vid = nextVisitId;
    nextVisitId += 1;
    visits.add(vid, { city; timestamp = Time.now() });
  };

  public query ({ caller = _ }) func getVisitStats() : async VisitStats {
    let totalVisits = visits.size();

    // Build city → count map
    let cityMap = Map.empty<Text, Nat>();
    visits.values().forEach(func(v : VisitEntry) {
      let current = switch (cityMap.get(v.city)) {
        case (?n) n;
        case null 0;
      };
      cityMap.add(v.city, current + 1);
    });

    // Convert to sorted array of (city, count)
    let visitsByCity : [(Text, Nat)] = cityMap.entries().toArray();

    // Build day → count map
    // Epoch day = timestamp / nanoseconds_per_day
    let nsPerDay : Int = 86_400_000_000_000;
    let dayMap = Map.empty<Int, Nat>();
    visits.values().forEach(func(v : VisitEntry) {
      let day : Int = v.timestamp / nsPerDay;
      let current = switch (dayMap.get(day)) {
        case (?n) n;
        case null 0;
      };
      dayMap.add(day, current + 1);
    });

    let dailyVisits : [(Int, Nat)] = dayMap.entries().toArray();

    { totalVisits; visitsByCity; dailyVisits };
  };
};
