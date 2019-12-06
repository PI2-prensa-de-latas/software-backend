/**
 * NotificationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
registerSimpleCan:async function(req,res){
    let {cansNumber} = req.body
    let user = 1;
    // sails.log(cansNumber)
    let indice=parseInt(cansNumber)-1;
    sails.log(indice)
    let idPromos = []
    let smashedCans = await SmashedCan.find()
    let resultPromos = []
    let init = parseInt(smashedCans.length)-indice
    sails.log('init',init)
    let end = smashedCans.length
    sails.log('end',end)
    let allPromos = await Promo.find()
    // Todos os ids das promoções cadastradas
    allPromos.map(allPromo=>idPromos.push(allPromo.id))
    //Pega o range das latinhas selecionadas
    let smashedCansSelect = smashedCans.slice(init-1,end+1)
    // verifica as promoções associadas a canCategories
    let promoOfSmached = await Promise.all(
        smashedCansSelect.map(async(smashedCanSelect)=>{
        let canCategory = await CanCategory.find({id:smashedCanSelect.canCategory.id}).populateAll()
        let promos = canCategory[0].promo 
        return promos
    }))

    // promoOfSmached = promoOfSmached[0]
    // sails.log('teste',promoOfSmached[0])
    sails.log('ids',idPromos)
    let i=0;
    for(i;i<promoOfSmached.length;i++){
        promoOfSmached[i].map(promo=>resultPromos.push(promo.id))
    }
    
    sails.log('bora',resultPromos)
    let quantityOfPromoId = idPromos.map(promo =>{
        return resultPromos.filter(resultPromo=>resultPromo==promo)
    })
    sails.log('t',quantityOfPromoId)
    let countArray= []
    let count=0
    for(count;count<quantityOfPromoId.length;count++){
        countArray.push(quantityOfPromoId[count].length)
    }
    let response =  await Promise.all(countArray.map(async (result,index)=>{
        sails.log('length',result)
        if(result!==0){
            let promoIndex = allPromos.find(element=>element.id == index+1)
            sails.log('index',promoIndex)
            let notifications = await Notification.create({description:`Você reciclou ${result} latas para a promoção ${promoIndex.name}`,iconUri:promoIndex.imageUri,user:user,promo:index+1}).fetch()
            return notifications
        }else{
            sails.log('não possui nenhuma latinha dessa category')
        }
    }))
    
return res.json(response)

},
};

