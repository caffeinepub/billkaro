import Map "mo:core/Map";

module {
  // Old types (copied from .old/src/backend stable signature)
  type OldContactSubmission = {
    message : Text;
    name    : Text;
    phone   : Text;
  };

  type OldActor = {
    inquiries : Map.Map<Nat, OldContactSubmission>;
    var nextId : Nat;
  };

  // New types matching main.mo ContactRecord
  type NewContactRecord = {
    id        : Nat;
    name      : Text;
    phone     : Text;
    city      : Text;
    message   : Text;
    timestamp : Int;
  };

  type NewActor = {
    inquiries    : Map.Map<Nat, NewContactRecord>;
    var nextId   : Nat;
    visits       : Map.Map<Nat, { city : Text; timestamp : Int }>;
    var nextVisitId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    // Migrate each ContactSubmission → ContactRecord, filling in missing fields
    let newInquiries = old.inquiries.map<Nat, OldContactSubmission, NewContactRecord>(
      func(id, sub) {
        {
          id;
          name      = sub.name;
          phone     = sub.phone;
          city      = "";        // no city in old data — default to empty
          message   = sub.message;
          timestamp = 0;         // no timestamp in old data — default to 0
        }
      }
    );

    // visits is brand new — start empty
    let newVisits = Map.empty<Nat, { city : Text; timestamp : Int }>();

    {
      inquiries       = newInquiries;
      var nextId      = old.nextId;
      visits          = newVisits;
      var nextVisitId = 0;
    }
  };
};
