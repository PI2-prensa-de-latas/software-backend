module.exports = {
    getUserScore: async function (promoId,userId) {
        // req.body should contain .promo and .user
         // Get Promo requirements
        let promo = await Promo.findOne({id: promoId});
        let categories = await PromoCategory.find({Promo: promoId});
        let categoriesId = categories.map((value => value.id));
        let machines = await PromoMachine.find({promo: promoId});
        let machinesId = machines.map((value => value.id));

        // Get Cans that fit in promotion requirements
        let cans = await SmashedCan.find({
          user: userId,
          createdAt: {'>': parseInt(promo.init_date)},
          createdAt: {'<': parseInt(promo.end_date)},
          canCategory: {in: categoriesId},
          machine: {in: machinesId},
        })

        return cans.length
      }
}