module.exports = {
    getUserScore: async function (promoId,userId) {
        // req.body should contain .promo and .user
         // Get Promo requirements
        let promo = await Promo.findOne({id: promoId});
        let categories = await PromoCategory.find({promo: promoId});
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
      },

    getRemaingTime: function (end_time) {
      const actualTime = + Date.now() // '+' convert into timestamp
      const minute = 1000 * 60 // milliseconds in a minute
      const hour = minute * 60 // minutes in an hour
      const day = hour * 24 // hours in a day
      let diff = end_time - actualTime;

      if (diff < 0) return { quantity: diff, type: 'over' }
      if (diff > 2 * day) { // if diff > 2 days
        return { quantity: parseInt(diff / day), type: 'd' }
      }
      if (diff > 2 * hour) { // if diff > 2 hours
        return { quantity: parseInt(diff / hour), type: 'h' }
      }
      return { quantity: parseInt(diff / minute), type: 'm' }
    }
}