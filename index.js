var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = require("express-fileupload");
app.use(upload());

const uniqid = require("uniqid");

let products = [
  {
    id: 1,
    name: "Blackpepper Beef",
    price: "35.000",
    image_filename: "black-pepper-beef.jpg",
    description: "Taste the oriental flavor of blackpepper and the tenderness of the beef.",
  },
  {
    id: 2,
    name: "Seafood Noodle",
    price: "20.000",
    image_filename: "noodle.jpg",
    description: "Pan-fried noodle, squid, fish and prawn, served with vegetables and oyster sauce.",
  },
];

app.get("/", function (req, res) {
  let response = {
    nama: "Arya",
    usia: 24,
  };

  res.json(response);
});

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

  res.json(products);
});

app.get("/search", function (req, res) {
  const keyword = req.query.keyword;
  const category = req.query.category;
  const location = req.query.location;

  if (keyword != "" || category != "" || location != "") {
    for (var i = 0; i < products.length; i++) {
      if (keyword != "") {
        //filter berdasarkan keyword
      }
      if (category != "") {
        //filter berdasarkan category
      }
      if (location != "") {
        //filter berdasarkan location
      }
    }
  }

  console.log(req.query);

  res.json(products);
});

app.get("/satu", function (req, res) {
  res.render("satu", {
    products,
  });
});

app.get("/dua", function (req, res) {
  let products = [
    {
      id: 1,
      name: "Nasi Goreng Ayam",
      price: 15000,
      image_url:
        "https://s1.bukalapak.com/img/69197156361/large/2019_12_11T14_28_18_07_00.jpg",
      description: "Nasi Goreng Ayam terenak di Jakarta",
    },
    {
      id: 2,
      name: "Bakmie Ayam",
      price: 10000,
      image_url:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-7994805/bakmi_bb_bakmie_ayam_full02_oc4dm6hd.jpg",
      description: "Bakmie Ayam buatan orang terkeren di Jakarta",
    },
  ];

  res.render(`satu`, {
    products,
  });
});

app.get("/dua/:product_id", function (req, res) {
  let product = {};
  for (var i = 0; i < products.length; i++) {
    if (products[i].id == req.params.product_id) product = products[i];
  }

  res.render("dua", {
    product,
  });
});

app.post("/product/add", function (req, res) {
  let data = {
    id: products[products.length - 1].id + 1,
    name: req.body.name,
    price: req.body.price.toLocaleString("id-ID"),
    description: req.body.description,
  };

  if (req.files) {
    console.log(req.files);
    let file = req.files.product_image;
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];
    let filename = `${uniqid()}.${extension}`;

    file.mv(`./assets/images/${filename}`, function (err) {
      if (err) console.log(err);
    });
    data.image_filename = filename;
  }

  products.push(data);

  //   res.redirect("/satu");
  res.json({
    succes: true,
    return: data,
  });
});


app.delete("/product/delete/:product_id?", function (req, res) {
  console.log(req.params.product_id);
  products = products.filter((product) => product.id != req.params.product_id);
  console.log(products);
  res.json(products);
});

app.put("/product/edit/:product_id", function (req, res) {
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
  res.json(data);
});

app.get("/*", function (req, res) {
  res.send("<h1>404 Not Found</h1>");
});

app.listen(3001);
