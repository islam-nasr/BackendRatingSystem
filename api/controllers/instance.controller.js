const Instance = require("../../models/instance.model");
const validator = require("../validations/instance.validations");
const Object = require("../../models/object.model");
const Rating = require("../../models/rating.model");

const {
  success,
  objectNotFound,
  instanceNotFound,
  attributesMissing,
  unknown
  } = require("../constants/statusCodes");

exports.ObjectInstanceListInquiry = async (req, res) => {
  try {
    const obj = await Object.findByPk(req.body.Object.id)
    if (!obj)
      return res.send({ StatusCode: objectNotFound })
    const inst = await Instance.findAll( { where: { ObjectId: obj.id } , attributes: ["id", "name", "OverAllRating"] })
    const list = { StatusCode: success, InstanceList: inst }
    return res.send(list);
  }
  catch (exception) {
    return res.status.send(errorCreator(unkown, "Something went wrong"));
  }
}
exports.CreateObjectInstance = async (req, res) => {
  const isValid = validator.createValidation(req.body);
  if (!isValid) {
    return res
      .send(isValid);

  }
  try {
    const obj = await Object.findByPk(req.body.Instance.Object.id);
    if (!obj) {
      return res.send({ StatusCode: objectNotFound })
    }
    const attrib = obj.AttributeList;
    const attributes = [];
    // for (let i = 0; i < attrib.length; i++) {
    //   attributes.push({
    //     name: attrib[i].name,
    //     rate: 0.1
    //   })
    // }
    attrib.map(item => {
      attributes.push({
        name: item.name,
        rate: 0.1
      })
    }
    )
    try{
    const inst = await Instance.create({
      name: req.body.Instance.name,
      ObjectId: req.body.Instance.Object.id,
      AttributeListOverAllRating: attributes
    });}
    catch(exception){
      return res.send({StatusCode:1005})
    }
    return res.send({StatusCode:0});

  }
  catch (exception) {
    return res.send({ StatusCode: unknown })
  }
};

exports.ObjectInstanceDetailsInquiry = async (req, res) => {
  const inst = await Instance.findByPk(req.body.Instance.id);
  const i = { StatusCode: success, Instance: inst }
  if (inst) return res.send(i);
  else return res.send({
    StatusCode: instanceNotFound
  });
};

//not used for now:
/*exports.update = async (req, res) => {
  try {

    const inst = await Instance.findByPk(req.body.id);
    if (!inst) return res.send("Object not found");
    await Instance.update({ name: req.body.name }, { where: { id: req.body.id } });
    return res.send("updated successfully");
  } catch (exception) {
    return res.send("Something went wrong");
  }
};

exports.deleteInstance = async (req, res) => {
  try {
    const inst = await Instance.findByPk(req.body.id);
    if (!inst) return res.send("Instance not found");
    await Instance.destroy({ where: { id: req.body.id } });
    return res.send("Instance deleted successfully");
  } catch (exception) {
    console.log(exception);
    return res.send("Something went wrong");
  }
};
*/
exports.InstanceUserRatingListInquiry = async (req, res) => {
  try {
    const inst = await Instance.findByPk(req.body.Instance.id);
    if (!inst) return res.send({ StatusCode: attributesMissing });
    const rating = await Rating.findAll({ where: { InstanceId: inst.id } })
    res.send({ StatusCode: success, RatingList: rating })
  }
  catch (exception) {
    return res.send({ StatusCode: unknown })
  }
}
