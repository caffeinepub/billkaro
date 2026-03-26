import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      sub1.name.compare(sub2.name);
    };
  };

  var nextId = 0;

  let inquiries = Map.empty<Nat, ContactSubmission>();

  public shared ({ caller }) func submitContact(form : ContactSubmission) : async Nat {
    let id = nextId;
    nextId += 1;
    inquiries.add(id, form);
    id;
  };

  public query ({ caller }) func getAllContacts() : async [ContactSubmission] {
    inquiries.values().toArray().sort();
  };

  public query ({ caller }) func getContact(id : Nat) : async ContactSubmission {
    switch (inquiries.get(id)) {
      case (?contact) { contact };
      case (null) { Runtime.trap("Contact entry not found!") };
    };
  };

  public shared ({ caller }) func removeContact(id : Nat) : async () {
    if (not inquiries.containsKey(id)) { Runtime.trap("Contact entry does not exist!") };
    inquiries.remove(id);
  };
};
