const Object = require("../../models/object.model");
const validator = require("../validations/object.validations");
const {
success,
objectNameExist,
objectNotFound,
attributeWeights,
unknown,
attributeNameMissing
} = require("../constants/statusCodes");

exports.viewAll = async (req, res) => {
  const obj = await Object.findAll();
  return res.send(obj);
};
exports.view = async (req, res) => {
  const isValid = validator.idValidation(req.body)
  if(!isValid){
    //status code 1004 for now
    return res.send({StatusCode:objectNotFound})
  }
  const obj = await Object.findByPk(req.body.id);
  if (obj) return res.send(obj);
  else return res.send({ StatusCode: objectNotFound });
};
exports.create = async (req, res) => {
  try {
    if(req.body.Object.name=="")
    return res.send({StatusCode:1010})
    const isValid = validator.createValidation(req.body);
    if (!isValid) {
      return res.send({ StatusCode: objectNameExist });
    }
    const attrib = req.body.Object.AttributeList;
    let total = 0;
    for (let i = 0; i < attrib.length; i++) {
      if (attrib[i].name == null || attrib[i].name == "")
        return res.send({ StatusCode: attributeNameMissing });
      if (attrib[i].weight == null) return res.send({ StatusCode: attributeWeights });
      total = total + attrib[i].weight;
      let obja = attrib[i].name;
      for (let j = i + 1; j < attrib.length; j++) {
        let objb = attrib[j].name;
        if (obja == objb) {
          return res.send({ StatusCode: attributeWeights });
        }
      }
    }
    if (total != 1) {
      return res.send({ StatusCode: attributeWeights });
    }
    try {
      const obj = await Object.create(req.body.Object);
    } catch (exception) {
      return res.send({ StatusCode: objectNameExist });
    }
    return res.send({ StatusCode: success });
  } catch (exception) {
    return res.send({ StatusCode: unknown });
  }
};
//not used for now:
/*
exports.update = async (req, res) => {
  try {
    const obj = await Object.findByPk(req.body.id);
    if (!obj) return res.send("Object not found");
    await Object.update(
      { name: req.body.name, attributes: req.body.attributes },
      { where: { id: req.body.id } }
    );
    return res.send("updated successfully");
  } catch (exception) {
    return res.send("Something went wrong");
  }
};
exports.deleteObject = async (req, res) => {
  try {
    
    const obj = await Object.findByPk(req.body.id);
    if (!obj) return res.send("Object not found");
    await Object.destroy({ where: { id: req.body.id } });
    return res.send("Object deleted successfully");
  } catch (exception) {
    return res.send("Something went wrong");
  }
};
*/