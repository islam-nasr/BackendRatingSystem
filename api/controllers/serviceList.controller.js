const{ ServiceList}=require( "../helpers/serviceList");

exports.viewList = async (req,res) =>{
    res.send({"ServiceList": ServiceList})
}