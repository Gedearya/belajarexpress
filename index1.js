const express = require("express");
const app = express();
// ============ Supaya bisa link ke folder assets
app.use("/assets", express.static("assets"));
// ============ Supaya data backend bisa di akses di folder repo yang berbeda
const cors = require("cors");
app.use(cors());
// ============  Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ============ Supaya bisa upload file
const upload = require("express-fileupload");
app.use(upload());
// ============ Supaya bisa dapat unique id ketika uplod file
const uniqid = require("uniqid");

// ~*~*~*~*~*~*~*~*~*~*~*~* MAIN DATA ~*~*~*~*~*~*~*~*~*~*~*~*
let products = [
  {
    id: 1,
    name: "Nasi Goreng Ayam",
    price: 15000,
    image_filename: "nasi-goreng.jpg",
    description: "Nasi Goreng Pakai Telor dan Lalapan",
  },
  {
    id: 2,
    name: "Bakmie Ayam",
    price: 10000,
    image_filename: "bakmi-ayam.jpg",
    description: "Bakmie Ayam Gurih Dengan Ekstra Bakso!",
  },
];
// ~*~*~*~*~*~*~* MAIN DATA ~*~*~*~*~*~*~*~*~*~*~*~*

// ~*~*~*~* MAIN PAGE ~*~*~*~*
app.get("/", function (req, res) {
  let response = {
    nama: "Nijiko",
    usia: 26,
  };
  res.json(response);
});

// HASIL:
// {"nama":"Nijiko","usia":26}
// ~*~*~*~* MAIN PAGE ~*~*~*~*

app.get("/product/:product_id?", function (req, res) {
  if (req.params.product_id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id == req.params.product_id) {
        // products = products[i];
        // break;
        res.json(products[i]);
        return;
      }
    }
  }

  res.json(products); // show all default products OBJECT
});

app.post("/product/add", function (req, res) {
  console.log(`==============================================================`);
  console.log(`INI CONSOLE LOG REQ.BDOY START`);
  console.log(req.body);
  console.log(`INI CONSOLE LOG REQ.BDOY END`);
  let data = {
    id: products[products.length - 1].id + 1,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image_filename: req.body.product_image,
  };

  if (req.files) {
    console.log(`INI CONSOLE LOG REQ.FILES START`);
    console.log(req.files);
    console.log(`INI CONSOLE LOG REQ.FILES END`);
    let file = req.files.product_image;
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];
    let filename = `${uniqid()}.${extension}`;

    file.mv(`./assets/images/${filename}`, function (err) {
      if (err) console.log(err);
    });
    data.image_filename = filename;
    console.log(`INI CONSOLE LOG DATA.IMAGE FILENAME START`);
    console.log(data.image_filename);
    console.log(`INI CONSOLE LOG DATA.IMAGE FILENAME END`);
  }

  products.push(data);
  // res.json({
  //   succes: true,
  //   return: data,
  // });
  // res.json(data);
  console.log(`INI CONSOLE LOG DATAAAAAAAAAAAAA START`);
  console.log(data);
  console.log(`INI CONSOLE LOG DATAAAAAAAAAAAAA END`);
  console.log(`INI CONSOLE LOG PRODUCTSSSSSSSSSSSSSSSSSS START`);
  console.log(products);
  console.log(`INI CONSOLE LOG PRODUCTSSSSSSSSSSSSSSSSSS END`);
});
console.log(products);
app.delete("/product/delete/:product_id?", function (req, res) {
  console.log(req.params.product_id);
  products = products.filter((product) => product.id != req.params.product_id);
  console.log(products);
  res.json(products);
  // res.redirect("http://localhost:3000/");
  // res.send("removed");
});

app.put("/product/edit/:product_id", function (req, res) {
  console.log(`-------------------- METHOD EDIIITTT`);
  console.log(req.params);
  console.log(req.body);

  let data = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == data.id) {
      products[i].name = data.name;
      products[i].price = data.price;
      products[i].description = data.description;

      if (req.files) {
        console.log(req.files);
        let file = req.files.product_image;
        let extension = file.name.split(".");
        extension = extension[extension.length - 1];
        let filename = `${uniqid()}.${extension}`;

        file.mv(`./assets/images/${filename}`, function (err) {
          if (err) console.log(err);
        });
        console.log("*************************");
        data.image_filename = filename;
        console.log(data.image_filename);
        products[i].image_filename = data.image_filename;
        console.log(products[i].image_filename);
      } else {
        data.image_filename = products[i].image_filename;
        console.log(data.image_filename);
        products[i].image_filename = data.image_filename;
        console.log(products[i].image_filename);
      }
    }
  }

  console.log(`-----------------DATAAAAAAAAAAAAAAAA`);
  console.log(data);
  console.log(`-----------------PRODUCTSssssssssssss`);
  console.log(products);
  res.json(data);
  // res.redirect("http://localhost:3001/product");
});

app.get("/*", function (req, res) {
  res.send("<h1>404 Not Found</h1>");
});

app.listen(3001);

// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ..
// ====== DUMP DUMP DUMP DUMP DUMP
// ######### 1
// app.get("/search", function (req, res) {
//   const keyword = req.query.keyword;
//   const category = req.query.category;
//   const location = req.query.location;

//   if (keyword != "" || category != "" || location != "") {
//     for (var i = 0; i < products.length; i++) {
//       if (keyword != "") {
//         //filter berdasarkan keyword
//       }
//       if (category != "") {
//         //filter berdasarkan category
//       }
//       if (location != "") {
//         //filter berdasarkan location
//       }
//     }
//   }

//   console.log(req.query);

//   res.json(products);
// });
// ######### 2 TRYING DELETE AND EDIT
// app.delete("/product/delete", function (req, res) {
//   res.redirect("http://localhost:3000/productlist");
// });

// app.patch("/product/edit/:id?", function (req, res) {
//   console.log(req.params.product_id);
//   console.log(products);
//   let original = products;
//   console.log(original);
//   res.redirect("http://localhost:3000/productlist");
// });

// app.get("/product/edit/:product_id?", function (req, res) {
//   console.log(req.params);
//   console.log(req.body);
// });
