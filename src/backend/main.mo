import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Laptop = {
    id : Nat;
    name : Text;
    brand : Text;
    price : Nat;
    specs : Text;
    category : Text;
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  let laptops = Map.empty<Nat, Laptop>();
  let contactForms = List.empty<ContactForm>();
  var nextId = 0;

  // Add new laptop listing
  public shared ({ caller }) func addLaptop(name : Text, brand : Text, price : Nat, specs : Text, category : Text) : async () {
    let laptop : Laptop = {
      id = nextId;
      name;
      brand;
      price;
      specs;
      category;
    };
    laptops.add(nextId, laptop);
    nextId += 1;
  };

  // Get all laptops
  public query ({ caller }) func getAllLaptops() : async [Laptop] {
    laptops.values().toArray();
  };

  // Get laptops by brand
  public query ({ caller }) func getLaptopsByBrand(brand : Text) : async [Laptop] {
    laptops.values().toArray().filter(
      func(laptop) {
        Text.equal(laptop.brand, brand);
      }
    );
  };

  // Submit contact form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let form : ContactForm = {
      name;
      email;
      message;
    };
    contactForms.add(form);
  };

  public query ({ caller }) func getContactForms() : async [ContactForm] {
    contactForms.toArray();
  };
};
