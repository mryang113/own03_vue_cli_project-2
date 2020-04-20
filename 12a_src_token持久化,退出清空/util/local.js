export default {
  //从缓存中读取一个数据  后加的
  get(key,defVal){  //这里的defVal默认隐士转换为 undefined
    let val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defVal;
  },
  set(key,val){
    // val : {a:"a"}  ---> "[Object object]"
    // val : {a:"a"}  ---> "{"a":"a"}"
    localStorage.setItem(key,JSON.stringify(val))
  },
  remove(key){
    localStorage.removeItem(key)
  }
}
