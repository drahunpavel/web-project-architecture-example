import UserModel from "../models/User";

class UserController {
  async index(req, res) {
    UserModel.find().then((err, users) => {
      if (err) {
        // res.send(err);
        console.log("err", err);
      }

      res.json(users);
    });
  }

  async create(req, res) {
    const { userName, email, password } = req;
    const newUser = new UserModel({
      user: userName,
      email,
      password,
    });

    let resObj = await newUser
      .save()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("--err", err);
        return null;
      });
    return resObj;
  }

  read(req, res) {
    UserModel.findOne({ _id: req.params.id }).then((post) => {
      if (!post) {
        res.send({ error: "not found" });
      } else {
        res.json(post);
      }
    });
  }

  update(req, res) {
    console.log("-================================", req.params, req.body);
    UserModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
      if (err) {
        res.send(err);
      }

      res.json({ status: "updated" });
    });
  }

  delete(req, res) {
    UserModel.remove({
      _id: req.params.id,
    }).then((post) => {
      if (post) {
        res.json({ status: "deleted" });
      } else {
        res.json({ status: "error" });
      }
    });
  }
}

export default UserController;
