{

  const data = {
    favorites: ['js', 'rx', 'ramda'],
    greeting: function () {
      this.favorites.forEach(function (item) {
        console.log('this', this) // window 对象
        console.log('item', item);
      })
    }
  }

  data.greeting();

}