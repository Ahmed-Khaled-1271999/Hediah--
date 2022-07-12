// each product has its likes and comments(array) from
let productsMainSource = [
  {
    id: 1,
    name: 'Head Phone',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 25,
    imageURL: 'images/headphone.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 1, // personalized
    inCart: false, // personalized
    tags: 'mens teenegers birthDay',
  },
  {
    id: 2,
    name: 'IPhone',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 1000,
    imageURL: 'images/product-iphone.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 1, // personalized
    inCart: false, // personalized
    tags: 'mens adults birthDay',
  },
  {
    id: 3,
    name: 'PlayStation5',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 2250,
    imageURL: 'images/PS5.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 1, // personalized
    inCart: false, // personalized
    tags: 'mens teenegers birthDay',
  },
  {
    id: 4,
    name: 'Tertan',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 18,
    imageURL: 'images/stars.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 1, // personalized
    inCart: false, // personalized
    tags: 'mens adults birthDay',
  },
  {
    id: 5,
    name: 'Suit/Men',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 250,
    imageURL: 'images/suitMen.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 0,
    inCart: false,
    tags: 'mens adults wedding',
  },
  {
    id: 6,
    name: 'Sun Glasses',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 10,
    imageURL: 'images/sunglasses.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 0,
    inCart: false,
    tags: 'mens teenegers',
  },
  {
    id: 7,
    name: 'Ring',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 199,
    imageURL: 'images/ring.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 0,
    inCart: false,
    tags: 'wome-ns adults wedding',
  },
  {
    id: 8,
    name: 'Watch',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 999,
    imageURL: 'images/watch.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 0,
    inCart: false,
    tags: 'mens teenegers birthDay',
  },
  {
    id: 9,
    name: 'Guitar',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    price: 480,
    imageURL: 'images/guitar.png',
    likes: 0,
    Comments: [],
    belongsTo: '0', //"0" belongs to هدية id
    qauntity: 0,
    inCart: false,
    tags: 'mens teenegers birthDay',
  },
]
/**
 *
 */
// it overwrite anu update created by any user
localStorage.setItem('AllProducts', JSON.stringify(productsMainSource))
// each user has its Cart buiseness!
let USERS = [
  {
    id: '1',
    UserName: 'Ahmed Khaled',
    imageURL: 'images/users/Default.png',
    e_mail: 'ahmed3bkarino33.33@gmail.com',
    password: '1999Seven12',
    phone: '01126258559',
    role: 'admin', //"admin" or ""
    cart: {},
    favourites: [],
  },
]
/**
 * only register has the authority to overwrit "USERS".
 * from here ,you can add data manually for test
 */
/**user RAM! */
localStorage.setItem('id', USERS[0].id)
localStorage.setItem('userName', USERS[0].UserName)
localStorage.setItem('E_mail', USERS[0].e_mail)
localStorage.setItem('password', USERS[0].password)
localStorage.setItem('userImage', USERS[0].imageURL)
localStorage.setItem('phoneNumber', USERS[0].phone)
// retrive the cart as it was
// console.log(authentication1.cart);
localStorage.setItem('cart', JSON.stringify(USERS[0].cart))
localStorage.setItem('loggedIn', 'true')
// /**************************************************/
localStorage.setItem('USERS', JSON.stringify(USERS))
