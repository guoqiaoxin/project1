/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
// action - create
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('realestate/create');

    if (!req.body.realestate)
        return res.badRequest("Form-data not received.");

    await realestate.create(req.body.realestate);

    return res.ok("Successfully created!");
},
json: async function (req, res) {

    var realestate = await realestate.find();

    return res.json(realestate);
},
admin: async function (req, res) {

    var models = await realestate.find();
    return res.view('realestate/admin', { realestate: models });
    
},
//action - update
update: async function (req, res) {

    if (req.method == "GET") {

        var model = await realestate.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('realestate/update', { realestate: model });

    } else {

        if (!req.body.realestate)
            return res.badRequest("Form-data not received.");

        var models = await realestate.update(req.params.id).set({
            title: req.body.realestate.title,
            Estate: req.body.realestate.Estate,
            GrossArea: req.body.realestate.GrossArea,
            Rent: req.body.realestate.Rent,
            ImageURL: req.body.realestate.ImageURL,
            Bedroom: req.body.realestate.Bedroom,
            ExpectedTenant: req.body.realestate.ExpectedTenant,
            HighlightedProperty:req.body.realestate.HighlightedProperty

        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
    
},  
// action - delete 
delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var models = await realestate.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    return res.ok("The real estate Deleted.");

},
home: async function (req, res) {

    var models = await realestate.find();
    return res.view('realestate/home', { realestate: models });
    
},

details: async function (req, res) {

    var model = await realestate.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('realestate/details', { model: model });

},
// action - update
update: async function (req, res) {

    if (req.method == "GET") {

        var model = await Person.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('person/update', { person: model });

    } else {

        if (!req.body.Person)
            return res.badRequest("Form-data not received.");

        var models = await Person.update(req.params.id).set({
            name: req.body.Person.name,
            age: req.body.Person.age
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
},

// search function
search: async function (req, res) {

    const qtitle= req.query.title || "";
     const qestate=req.query.Estate;
     const qimg = req.query.ImageURL;
     const qarea=parseInt(req.query.GrossArea);
     const qbedroom=parseInt(req.query.Bedroom);
     const qRent=parseInt(req.query.Rent);
 
     if (isNaN(qRent)) {
 
         var models = await realestate.find({
            where: {title: { contains: qtitle}},
             sort: 'id'
         });
 
     } if (isNaN(qbedroom)) {
 
         var models = await realestate.find({
            where: {title: { contains: qtitle}},
             sort: 'id'
         });
 
     }if (isNaN(qarea)) {
 
         var models = await realestate.find({
            where: {title: { contains: qtitle}},
             sort: 'id'
         });
 
     }
     else {
         var models = await realestate.find({
             where: { Estate: { contains: qestate}, title: { contains: qtitle}, ImageURL: { contains: qimg},Rent:qRent, GrossArea:qarea,Bedroom:qbedroom},
             sort: 'id'
         });
 
     }
     const qPage = Math.max(req.query.page - 1, 0) || 0;
 
     const numOfItemsPerPage = 2;
 
     var models = await realestate.find({
         limit: numOfItemsPerPage, 
         skip: numOfItemsPerPage * qPage
     });
 
     var numOfPage = Math.ceil(await realestate.count() / numOfItemsPerPage);
 
     return res.view('realestate/search', { realestate: models, count: numOfPage });
     
 },
 
 
 
   
 


};

