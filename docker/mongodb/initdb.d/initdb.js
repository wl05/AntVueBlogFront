db = db.getSiblingDB("admin");
db.auth("root", "root");
db = db.getSiblingDB("ant_blog");
db.createUser({
  user: "ant",
  pwd: "wl123456",
  roles: [
    {
      role: "readWrite",
      db: "ant_blog",
    },
  ],
});
