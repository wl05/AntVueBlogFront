console.log("=========start creating db========");

// db.createUser({
//   user: "admin",
//   pwd: "123456",
//   roles: [{ role: "root", db: "admin" }],
// });

// db.auth("admin", "123456");

db.createUser({
  user: "ant",
  pwd: "123456",
  roles: [
    { role: "dbAdmin", db: "ant_blog" },
    { role: "readWrite", db: "ant_blog" },
  ],
});

console.log("=========end========");
