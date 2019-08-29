const Rating = require("../../models/rating.model");
const Object = require("../../models/object.model");
const Instance = require("../../models/instance.model");
const {
  success,
  objectNotFound,
  instanceNotFound,
  attributeRatingMissing,
  attributesMissing,
  unknown,
  attributeNameMissing
} = require("../constants/statusCodes");
exports.RateInstance = async (req, res) => {
  try {
    const obj = await Object.findByPk(req.body.Rating.Object.id);
    if (!obj) {
      return res.send({
        StatusCode: objectNotFound
      });
    }
    const inst = await Instance.findByPk(req.body.Rating.Instance.id);
    if (!inst) {
      return res.send({
        StatusCode: instanceNotFound
      });
    }
    const attrib = req.body.Rating.AttributeRatings;
    const instanceAttribute = inst.AttributeListOverAllRating;
    const objectAttribute = obj.AttributeList;
    /*if (inst.ObjectId != obj.id) {
      return res.send({
        StatusCode: 1012
      });
    }*/
    for (let i = 0; i < attrib.length; i++) {
      let attribName = attrib[i].name;
      for (let j = i + 1; j < attrib.length; j++) {
        let attribName2 = attrib[j].name;
        if (attribName == attribName2) {
          return res.send({
            StatusCode: attributesMissing
          });
        }
      }
    }
    let flag = true;
    attrib.map(item => {
      if (item.name == null || item.name == "")
        return res.send({ StatusCode: attributeNameMissing });
      if (item.rate == null) return res.send({ StatusCode: attributeRatingMissing });
      objectAttribute.map(item2 => {
        if (item.name == item2.name) {
          flag = false;
        }
      }
      )
      if (flag == true) {
        return res.send({
          StatusCode: attributesMissing
        });
      } else {
        flag = true;
      }
    })

    // for (let i = 0; i < attrib.length; i++) {
    //   let attribName = attrib[i].name;
    //   if (attribName == null || attribName == "")
    //     return res.send({ StatusCode: attributeNameMissing });
    //   if (attrib[i].rate == null) return res.send({ StatusCode: attributeRatingMissing });

    //   for (let j = 0; j < objectAttribute.length; j++) {
    //     let attribName2 = objectAttribute[j].name;
    //     if (attribName == attribName2) {
    //       flag = false;
    //     }
    //   }
    //   if (flag == true) {
    //     return res.send({
    //       StatusCode: attributesMissing
    //     });
    //   } else {
    //     flag = true;
    //   }
    // }
    let flag2 = true;
    objectAttribute.map(item => {
      attrib.map(item2 => {
        if (item.name == item2.name) {
          flag2 = false;
        }
      }
      )
      if (flag2 == true) {
        return res.send({
          StatusCode: attributesMissing
        });
      } else {
        flag2 = true;
      }
    })
    // for (let i = 0; i < objectAttribute.length; i++) {
    //   let attribName = objectAttribute[i].name;
    //   for (let j = 0; j < attrib.length; j++) {
    //     let attribName2 = attrib[j].name;
    //     if (attribName == attribName2) {
    //       flag2 = false;
    //     }
    //   }
    //   if (flag2 == true) {
    //     return res.send({
    //       StatusCode: attributesMissing
    //     });
    //   } else {
    //     flag2 = true;
    //   }
    // }
    let attributes = [];
    let averageRating = 0;
    // for (let i = 0; i < objectAttribute.length; i++) {
    //   for (let j = 0; j < attrib.length; j++) {
    //     if (attrib[j].name == objectAttribute[i].name) {
    //       attributes.push({
    //         name: objectAttribute[i].name,
    //         weight: objectAttribute[i].weight,
    //         rate: attrib[j].rate
    //       });
    //       averageRating =
    //         averageRating + attrib[j].rate * objectAttribute[i].weight;
    //     }
    //   }
    // }
    objectAttribute.map(item => {
      attrib.map(item2 => {
        if (item.name == item2.name) {
          attributes.push({
            name: item.name,
            weight: item.weight,
            rate: item2.rate
          });
          averageRating =
            averageRating + item2.rate * item.weight;
        }
      })
    })
    const ratng = await Rating.create({
      InstanceId: req.body.Rating.Instance.id,
      Note: req.body.Rating.Note,
      UserId: req.body.Rating.UserId,
      AttributeRatings: attributes,
      overAllRating: averageRating
    });

    const allInstanceRatings = await Rating.findAll({
      where: {
        InstanceId: ratng.InstanceId
      }
    });
    let instanceAverageRating = 0;
    const attributesx = [];
    objectAttribute.map(item => {
      attributesx.push({
        name: item.name,
        rate: 0
      });
    }
    )
    // for (let i = 0; i < objectAttribute.length; i++) {
    //   attributesx.push({
    //     name: objectAttribute[i].name,
    //     rate: 0
    //   });
    // }
    for (let i = 0; i < allInstanceRatings.length; i++) {
      instanceAverageRating =
        instanceAverageRating + allInstanceRatings[i].overAllRating;
      for (let j = 0; j < allInstanceRatings[i].AttributeRatings.length; j++) {
        attributesx[j].rate =
          allInstanceRatings[i].AttributeRatings[j].rate + attributesx[j].rate;
      }
    }
    attributesx.map(attribute => {
      attribute.rate=attribute.rate/allInstanceRatings.length;
    }
    )
    // for (let i = 0; i < attributesx.length; i++) {
    //   attributesx[i].rate = attributesx[i].rate / allInstanceRatings.length;
    // }
    instanceAverageRating = instanceAverageRating / allInstanceRatings.length;
    Instance.update(
      {
        AttributeListOverAllRating: attributesx,
        OverAllRating: instanceAverageRating
      },
      { where: { id: req.body.Rating.Instance.id } }
    );
    res.send({
      StatusCode: success,
      Rating: {
        id: ratng.id,
        OverAllRating: ratng.overAllRating
      }
    });
  } catch (exception) {
    console.log(exception)
    return res.send({
      StatusCode: unknown
    });
  }
};
