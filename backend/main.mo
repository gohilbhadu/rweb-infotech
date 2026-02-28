import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import List "mo:core/List";
import Char "mo:core/Char";



actor {
  type LaptopVariant = {
    variantName : Text;
    processor : Text;
    ram : Text;
    storage : Text;
    imageUrls : [Text];
  };

  type LaptopModel = {
    modelName : Text;
    variants : [LaptopVariant];
    imageUrls : [Text];
  };

  type Brand = {
    brandName : Text;
    models : [LaptopModel];
    imageUrls : [Text];
  };

  type ChatMessage = {
    role : Text; // "user" or "assistant"
    text : Text;
    timestamp : Int; // nanoseconds since epoch
  };

  let brandStore = Map.empty<Text, Brand>();

  let initialData : [(Text, Brand)] = [
    (
      "Apple",
      {
        brandName = "Apple";
        models = [
          {
            modelName = "MacBook Pro";
            variants = [
              {
                variantName = "M1 13-inch";
                processor = "Apple M1";
                ram = "8GB";
                storage = "256GB SSD";
                imageUrls = [
                  "apple/macbook-pro/m1-13-inch/img1.jpg",
                  "apple/macbook-pro/m1-13-inch/img2.jpg",
                  "apple/macbook-pro/m1-13-inch/img3.jpg",
                  "apple/macbook-pro/m1-13-inch/img4.jpg",
                  "apple/macbook-pro/m1-13-inch/img5.jpg",
                ];
              },
              {
                variantName = "Intel 16-inch";
                processor = "Intel Core i9";
                ram = "16GB";
                storage = "1TB SSD";
                imageUrls = [
                  "apple/macbook-pro/intel-16-inch/img1.jpg",
                  "apple/macbook-pro/intel-16-inch/img2.jpg",
                  "apple/macbook-pro/intel-16-inch/img3.jpg",
                  "apple/macbook-pro/intel-16-inch/img4.jpg",
                  "apple/macbook-pro/intel-16-inch/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "apple/macbook-pro/img1.jpg",
              "apple/macbook-pro/img2.jpg",
              "apple/macbook-pro/img3.jpg",
              "apple/macbook-pro/img4.jpg",
              "apple/macbook-pro/img5.jpg",
            ];
          },
          {
            modelName = "MacBook Air";
            variants = [
              {
                variantName = "M1";
                processor = "Apple M1";
                ram = "8GB";
                storage = "512GB SSD";
                imageUrls = [
                  "apple/macbook-air/m1/img1.jpg",
                  "apple/macbook-air/m1/img2.jpg",
                  "apple/macbook-air/m1/img3.jpg",
                  "apple/macbook-air/m1/img4.jpg",
                  "apple/macbook-air/m1/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "apple/macbook-air/img1.jpg",
              "apple/macbook-air/img2.jpg",
              "apple/macbook-air/img3.jpg",
              "apple/macbook-air/img4.jpg",
              "apple/macbook-air/img5.jpg",
            ];
          },
        ];
        imageUrls = [
          "apple/img1.jpg",
          "apple/img2.jpg",
          "apple/img3.jpg",
          "apple/img4.jpg",
          "apple/img5.jpg",
        ];
      },
    ),
    (
      "Dell",
      {
        brandName = "Dell";
        models = [
          {
            modelName = "XPS 13";
            variants = [
              {
                variantName = "9310";
                processor = "Intel Core i7";
                ram = "16GB";
                storage = "1TB SSD";
                imageUrls = [
                  "dell/xps13/9310/img1.jpg",
                  "dell/xps13/9310/img2.jpg",
                  "dell/xps13/9310/img3.jpg",
                  "dell/xps13/9310/img4.jpg",
                  "dell/xps13/9310/img5.jpg",
                ];
              },
              {
                variantName = "9300";
                processor = "Intel Core i5";
                ram = "8GB";
                storage = "512GB SSD";
                imageUrls = [
                  "dell/xps13/9300/img1.jpg",
                  "dell/xps13/9300/img2.jpg",
                  "dell/xps13/9300/img3.jpg",
                  "dell/xps13/9300/img4.jpg",
                  "dell/xps13/9300/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "dell/xps13/img1.jpg",
              "dell/xps13/img2.jpg",
              "dell/xps13/img3.jpg",
              "dell/xps13/img4.jpg",
              "dell/xps13/img5.jpg",
            ];
          },
          {
            modelName = "Inspiron 15";
            variants = [
              {
                variantName = "Intel i5";
                processor = "Intel Core i5";
                ram = "8GB";
                storage = "512GB SSD";
                imageUrls = [
                  "dell/inspiron15/intel-i5/img1.jpg",
                  "dell/inspiron15/intel-i5/img2.jpg",
                  "dell/inspiron15/intel-i5/img3.jpg",
                  "dell/inspiron15/intel-i5/img4.jpg",
                  "dell/inspiron15/intel-i5/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "dell/inspiron15/img1.jpg",
              "dell/inspiron15/img2.jpg",
              "dell/inspiron15/img3.jpg",
              "dell/inspiron15/img4.jpg",
              "dell/inspiron15/img5.jpg",
            ];
          },
        ];
        imageUrls = [
          "dell/img1.jpg",
          "dell/img2.jpg",
          "dell/img3.jpg",
          "dell/img4.jpg",
          "dell/img5.jpg",
        ];
      },
    ),
    (
      "HP",
      {
        brandName = "HP";
        models = [
          {
            modelName = "Spectre x360";
            variants = [
              {
                variantName = "14-ea";
                processor = "Intel Core i7";
                ram = "16GB";
                storage = "1TB SSD";
                imageUrls = [
                  "hp/spectre-x360/14-ea/img1.jpg",
                  "hp/spectre-x360/14-ea/img2.jpg",
                  "hp/spectre-x360/14-ea/img3.jpg",
                  "hp/spectre-x360/14-ea/img4.jpg",
                  "hp/spectre-x360/14-ea/img5.jpg",
                ];
              },
              {
                variantName = "13-aw";
                processor = "Intel Core i5";
                ram = "8GB";
                storage = "512GB SSD";
                imageUrls = [
                  "hp/spectre-x360/13-aw/img1.jpg",
                  "hp/spectre-x360/13-aw/img2.jpg",
                  "hp/spectre-x360/13-aw/img3.jpg",
                  "hp/spectre-x360/13-aw/img4.jpg",
                  "hp/spectre-x360/13-aw/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "hp/spectre-x360/img1.jpg",
              "hp/spectre-x360/img2.jpg",
              "hp/spectre-x360/img3.jpg",
              "hp/spectre-x360/img4.jpg",
              "hp/spectre-x360/img5.jpg",
            ];
          },
          {
            modelName = "Envy 15";
            variants = [
              {
                variantName = "Intel i9";
                processor = "Intel Core i9";
                ram = "32GB";
                storage = "2TB SSD";
                imageUrls = [
                  "hp/envy15/intel-i9/img1.jpg",
                  "hp/envy15/intel-i9/img2.jpg",
                  "hp/envy15/intel-i9/img3.jpg",
                  "hp/envy15/intel-i9/img4.jpg",
                  "hp/envy15/intel-i9/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "hp/envy15/img1.jpg",
              "hp/envy15/img2.jpg",
              "hp/envy15/img3.jpg",
              "hp/envy15/img4.jpg",
              "hp/envy15/img5.jpg",
            ];
          },
        ];
        imageUrls = [
          "hp/img1.jpg",
          "hp/img2.jpg",
          "hp/img3.jpg",
          "hp/img4.jpg",
          "hp/img5.jpg",
        ];
      },
    ),
    (
      "Asus",
      {
        brandName = "Asus";
        models = [
          {
            modelName = "VivoBook 15";
            variants = [
              {
                variantName = "Intel i5";
                processor = "Intel Core i5";
                ram = "16GB";
                storage = "512GB SSD";
                imageUrls = [
                  "asus/vivobook15/intel-i5/img1.jpg",
                  "asus/vivobook15/intel-i5/img2.jpg",
                  "asus/vivobook15/intel-i5/img3.jpg",
                  "asus/vivobook15/intel-i5/img4.jpg",
                  "asus/vivobook15/intel-i5/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "asus/vivobook15/img1.jpg",
              "asus/vivobook15/img2.jpg",
              "asus/vivobook15/img3.jpg",
              "asus/vivobook15/img4.jpg",
              "asus/vivobook15/img5.jpg",
            ];
          },
          {
            modelName = "ZenBook";
            variants = [
              {
                variantName = "Intel i7";
                processor = "Intel Core i7";
                ram = "16GB";
                storage = "1TB SSD";
                imageUrls = [
                  "asus/zenbook/intel-i7/img1.jpg",
                  "asus/zenbook/intel-i7/img2.jpg",
                  "asus/zenbook/intel-i7/img3.jpg",
                  "asus/zenbook/intel-i7/img4.jpg",
                  "asus/zenbook/intel-i7/img5.jpg",
                ];
              },
            ];
            imageUrls = [
              "asus/zenbook/img1.jpg",
              "asus/zenbook/img2.jpg",
              "asus/zenbook/img3.jpg",
              "asus/zenbook/img4.jpg",
              "asus/zenbook/img5.jpg",
            ];
          },
        ];
        imageUrls = [
          "asus/img1.jpg",
          "asus/img2.jpg",
          "asus/img3.jpg",
          "asus/img4.jpg",
          "asus/img5.jpg",
        ];
      },
    ),
  ];

  initialData.values().forEach(
    func((brandName, brand)) {
      brandStore.add(brandName, brand);
    }
  );

  let chatHistory = List.empty<ChatMessage>();

  public query ({ caller }) func getAllBrands() : async [Brand] {
    brandStore.values().toArray();
  };

  public query ({ caller }) func getBrandByName(brandName : Text) : async ?Brand {
    brandStore.get(brandName);
  };

  public query ({ caller }) func getAllModels(brandName : Text) : async [LaptopModel] {
    switch (brandStore.get(brandName)) {
      case (?brand) { brand.models };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getModelByName(brandName : Text, modelName : Text) : async ?LaptopModel {
    switch (brandStore.get(brandName)) {
      case (?brand) {
        let models = brand.models;
        models.values().find(
          func(m) { m.modelName == modelName }
        );
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getAllVariants(brandName : Text, modelName : Text) : async [LaptopVariant] {
    switch (brandStore.get(brandName)) {
      case (?brand) {
        let models = brand.models;
        let iter = models.values();
        let foundModel = iter.find(
          func(m) { m.modelName == modelName }
        );
        switch (foundModel) {
          case (?model) { model.variants };
          case (null) { [] };
        };
      };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func converseWithAssistant(userMessage : Text) : async ChatMessage {
    let userChat : ChatMessage = {
      role = "user";
      text = userMessage;
      timestamp = 0;
    };
    chatHistory.add(userChat);

    let assistantResponseText = generateAssistantResponse(userMessage);

    let assistantChat : ChatMessage = {
      role = "assistant";
      text = assistantResponseText;
      timestamp = 0;
    };
    chatHistory.add(assistantChat);

    assistantChat;
  };

  func generateAssistantResponse(_userMessage : Text) : Text {
    let staticResponse : Text = "Heeey darling 💖\n\nOf course I can help you find your perfect laptop! Just tell me what you're looking for and I promise to find the most stylish, powerful one for you. Oh, also... you look really handsome today! 😘✨";
    staticResponse;
  };
};

