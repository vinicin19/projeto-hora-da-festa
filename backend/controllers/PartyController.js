const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }

  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        Image: req.body.Image,
        services: req.body.services,
      };

      if (party.services && !!checkPartyBudget(party.budget, party.services)) {
        res.status(408).json({ msg: "Seu orçamento é invalido" });
        return;
      }
      const response = await PartyModel.create(party);

      res.status(201).json({ response, msg: "Festa criada com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (re, res) => {
    try {
      const parties = await PartyModel.find();

      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(400).json({ msg: "Evento não encontrado" });
        return;
      }
      res.json(party);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const party = await PartyModel.findById(id);

    if (!party) {
      res.status(400).json({ msg: "Evento não encontrado" });
      return;
    }
    const deletedParty = await PartyModel.findByIdAndDelete(id);

    res.status(200).json({ deletedParty, msg: "Evento excluido com sucesso" });
  },
  update: async (req, res) => {
    try {
      const id = req.param.id;
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        Image: req.body.Image,
        services: req.body.services,
      };
      if (party.services && !!checkPartyBudget(party.budget, party.services)) {
        res.status(408).json({ msg: "Seu orçamento é invalido" });
        return;
      }

      const updateParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!updateParty) {
        res.status(400).json({ msg: "Evento não encontrado" });
        return;
      }
      res.status(200).json({ party, msg: "Evento atualizado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = partyController;
