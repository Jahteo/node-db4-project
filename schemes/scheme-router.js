const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

//Routes
router.get('/', (req, res) => {
  Schemes.getRecipes()
  .then(recipes => {
    res.json(recipes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get recipes' });
  });
});


router.get("/:id/shoppinglist", (req, res) => {
  const { id } = req.params;
  Schemes.getShoppingList(id)
  .then(list => {
      if (list) {
          res.json(list);
      } else {
          res.status(404).json({ message: "Could not find shopping list with given id." });
      }
  })
  .catch(err => {
      res.status(500).json({ message: "Failed to get shopping list" });
  });
});

router.get("/:id/instructions", (req, res) => {
  const { id } = req.params;
  Schemes.getInstructions(id)
  .then(list => {
      if (list) {
          res.json(list);
      } else {
          res.status(404).json({ message: "Could not find shopping list with given id." });
      }
  })
  .catch(err => {
      res.status(500).json({ message: "Failed to get shopping list" });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // db("users")
  //   .where({ id })
  Schemes.getById(id)
  .then(user => {
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ message: "Could not find user with given id." });
      }
  })
  .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
  });
});

router.post("/", (req, res) => {
  const userData = req.body;
  // db("users")
  //   .insert(userData, "id")
  Schemes.add(userData)
    .then(user => {
      res.status(201).json({ created: user });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // db("users")
  //   .where({ id })
  //   .update(changes)
  Schemes.update(id, changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // db("users")
  //   .where({ id })
  //   .del()
  Schemes.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

//new endpoint
router.get('/:id/posts', (req, res) => {
  Schemes.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json({ data: posts });
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
})

module.exports = router;