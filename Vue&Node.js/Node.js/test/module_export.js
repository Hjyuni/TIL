let A = {
  a:'a',
  f: ()=>{
    console.log(this.a)
  },
}

module.exports = A;