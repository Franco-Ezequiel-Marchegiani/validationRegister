const mainController = {
  index: (req, res) => {
    res.render("index");
  },
  aprobationMsg: (req, res) => {
    res.render("aprobationMessage");
  },
};

module.exports = mainController;
