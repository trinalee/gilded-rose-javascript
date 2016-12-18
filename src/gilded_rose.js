function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

Item.prototype = {
  update_quality: function (item) {
    return this.strategy.update_quality(item)
  }
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));


function Brie () {
  this.update_quality = (item) => {
    item.sell_in --
    if(item.quality != 50) {
      item.quality ++
    }
  }
}

function BackstagePasses () {
  this.update_quality = (item) => {
    item.sell_in --
    if (item.sell_in < 10) {
      item.quality++
    }
    if (item.sell_in < 5) {
      item.quality++
    }
    item.quality ++

    if(item.quality > 50) {
      item.quality = 50
    }

    if (item.sell_in < 0) {
      item.quality = 0
    }
  }
}

function Standard () {
  this.update_quality = (item) => {
    item.sell_in --
    if (item.quality != 0){
      item.quality --
      if (item.sell_in < 0 && item.quality != 0){
        item.quality --
      }
    }
  }
}


function update_quality() {

  let brie = new Brie()
  let backstagePasses = new BackstagePasses()
  let standard = new Standard()

  items.forEach((item) => {
    switch (item.name) {
      case 'Aged Brie':
        item.strategy = brie
        item.update_quality(item)
        break
      case 'Sulfuras, Hand of Ragnaros':
        break
      case 'Backstage passes to a TAFKAL80ETC concert':
        item.strategy = backstagePasses
        item.update_quality(item)
        break
      default:
      item.strategy = standard
      item.update_quality(item)
      }
    })
  }
