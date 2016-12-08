'use strict'

describe("Gilded Rose", function() {

  beforeEach(() => {
    items = []
    // items.push(new Item('+5 Dexterity Vest', 10, 20));
    //
    // items.push(new Item('Elixir of the Mongoose', 5, 7));
    // items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    // items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    // items.push(new Item('Conjured Mana Cake', 3, 6));
  })

  describe("Aged Brie", function(){
    it("should decrease the sell_in and increase the quality value of aged brie at the end of each day", function() {
      items.push(new Item('Aged Brie', 2, 0));
      update_quality()

      expect(items[0].name).toBe('Aged Brie')
      expect(items[0].sell_in).toBe(1)
      expect(items[0].quality).toBe(1)
    })

    it("quality can never be higher than 50", function() {
    items.push(new Item('Aged Brie', 2, 50));

      update_quality()

      expect(items[0].name).toBe('Aged Brie')
      expect(items[0].sell_in).toBe(1)
      expect(items[0].quality).toBe(50)
    })

  })

  describe("Sulfuras, Hand of Ragnaros", function(){
    it('Sulfuras never has to be sold and never decreases in quality', () => {
      items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
      update_quality()

      expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros')
      expect(items[0].sell_in).toBe(0)
      expect(items[0].quality).toBe(80)
    })
  })

  describe("Backstage passes to a TAFKAL80ETC concert", function(){
    it('backstage passes should decrease sell_in and increase quality when sell_in is greater than 10 days', () => {
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20))
      update_quality()

      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert')
      expect(items[0].sell_in).toBe(14)
      expect(items[0].quality).toBe(21)
    })

    it('backstage passes should decrease sell_in and increase quality twice when sell_in is less than 10 days', () => {
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20))

      update_quality()
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert')
      expect(items[0].sell_in).toBe(9)
      expect(items[0].quality).toBe(22)
    })

    it('backstage passes should decrease sell_in and increase quality by 3 when sell_in is less than 5 days', () => {
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20))

      update_quality()
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert')
      expect(items[0].sell_in).toBe(4)
      expect(items[0].quality).toBe(23)
    })

    it('backstage passes should set quality to 0 when sell_in is less than 0', () => {
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20))

      update_quality()
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert')
      expect(items[0].sell_in).toBe(-1)
      expect(items[0].quality).toBe(0)
    })

    it('backstage passes should not have a quality more than 50', () => {
      items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 12, 50))

      update_quality()
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert')
      expect(items[0].sell_in).toBe(11)
      expect(items[0].quality).toBe(50)
    })
  })

  describe("standard items", function(){
    it("should decrease the sell_in and quality value by 1 of standard items at the end of each day", function() {
      items.push(new Item('computer table', 5, 10))

      update_quality()
      expect(items[0].name).toBe('computer table')
      expect(items[0].sell_in).toBe(4)
      expect(items[0].quality).toBe(9)

    })
    it('the quality of a standard item decreases twice as fast when its sell_in days is negative', () => {
      items.push(new Item('desk chair', 0, 10))

      update_quality()
      expect(items[0].name).toBe('desk chair')
      expect(items[0].sell_in).toBe(-1)
      expect(items[0].quality).toBe(8)
    })

    it('the quality of an item is never negative', () => {
      items.push(new Item('mouse pad', 0, 1))

      update_quality()
      expect(items[0].name).toBe('mouse pad')
      expect(items[0].sell_in).toBe(-1)
      expect(items[0].quality).toBe(0)
    })
  })

  describe("conjured items", function(){
    it("should decrease the sell_in value by 1 and quality value by 2", function() {
      items.push(new Item('Conjured Mana Cake', 3, 6))

      update_quality()
      expect(items[0].name).toBe('Conjured Mana Cake')
      expect(items[0].sell_in).toBe(2)
      expect(items[0].quality).toBe(4)

    })
  })

})
