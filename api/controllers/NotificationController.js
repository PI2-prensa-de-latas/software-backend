/**
 * NotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
registerSimpleCan:async function(req,res){
    let {cansNumber,user} = req.body
    // sails.log(cansNumber)
    let indice=parseInt(cansNumber)-1;
    sails.log(indice)
    let idPromos = []
    let smashedCans = await SmashedCan.find()
    let resultOfPromos = []
    let init = parseInt(smashedCans.length)-indice
    sails.log('init',init)
    let end = smashedCans.length
    sails.log('end',end)
    let allPromos = await Promo.find()
    // Todos os ids das promoções cadastradas
    allPromos.map(allPromo=>idPromos.push(allPromo.id))
    //Pega o range das latinhas selecionadas
    let smashedCansSelect = smashedCans.slice(init-1,end+1)
    // sails.log(smashedCansSelect)
    // verifica as promoções associadas a canCategories
    let promoOfSmached = await Promise.all(
        smashedCansSelect.map(async(smashedCanSelect)=>{
        let canCategory = await CanCategory.find({id:smashedCanSelect.canCategory.id}).populateAll()
        let promos = canCategory[0].promo 
        return promos
    }))
    // promoOfSmached = promoOfSmached[0]
    sails.log(promoOfSmached)
    sails.log('ids',idPromos)
    // idPromos.map(idPromo=>{
    //        let filterPromobyId = promoOfSmached.filter(promo=>promo.id==idPromo)
    //        sails.log('viva',filterPromobyId)
    // })
 

    sails.log('haha',promoOfSmached)

},
registerPromoCan:function(req,res){

},
registerNewPromo:function(req,res){

}

};

