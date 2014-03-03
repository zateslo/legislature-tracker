/**
 * Collections for LT
 */

// Object to get collections
var collections = {};

/**
 * Collection of categories.
 */
collections.CategoriesCollection = Backbone.Collection.extend({
  model: LT.CategoryModel,

  comparator: function(cat) {
    return (cat.get('title').toLowerCase().indexOf('recent') !== -1) ?
      'zzzzz' : cat.get('title');
  }
});

/**
 * Collection of editorial (meta) bills.
 */
collections.BillsCollection = Backbone.Collection.extend({
  model: LT.BillModel,

  comparator: function(b) {
    var compare = (b.newestAction()) ? b.newestAction().date.unix() * -1 :
      b.get('title');
    return compare;
  }
});

/**
 * Collection of Open States bills.
 */
collections.OSBillsCollection = Backbone.Collection.extend({
  model: LT.OSBillModel,

  comparator: function(bill) {
    var last_action = bill.get('newest_action');

    if (last_action) {
      last_action = last_action.date.unix() * -1;
    }
    return last_action;
  }
});

// Attach collections to LT object
_.extend(LT, collections);
