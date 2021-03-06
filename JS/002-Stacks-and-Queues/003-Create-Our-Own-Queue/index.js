/*
* @Author: LENOVO
* @Date:   2018-10-19 14:51:45
* @Last Modified by:   LENOVO
* @Last Modified time: 2018-10-20 19:49:14
*/

'use strict';

// 自定义类
class MyArray {

  // 构造函数，传入数组的容量capacity构造Array 默认数组的容量capacity=10
  constructor (capacity = 10) {
    this.data = new Array(capacity);
    this.size = 0;
  }

  // 获取数组中的元素实际个数
  getSize () {
    return this.size;
  }

  // 获取数组的容量
  getCapacity () {
    return this.data.length;
  }

  // 判断数组是否为空
  isEmpty () {
    return this.size === 0;
  }

  // 给数组扩容
  resize (capacity) {

    let newArray = new Array(capacity);
    for (var i = 0; i < this.size; i++) {
      newArray[i] = this.data[i];
    }

    // let index = this.size - 1;
    // while (index > -1) {
    //   newArray[index] = this.data[index];
    //   index --;
    // }

    this.data = newArray;
  }

  // 在指定索引处插入元素
  insert (index, element) {
    // 先判断数组是否已满
    if (this.size == this.getCapacity()) {
      // throw new Error("add error. Array is full.");
      this.resize(this.size * 2);
    }

    // 然后判断索引是否符合要求
    if (index < 0 || index > this.size) {
      throw new Error("insert error. require  index < 0 or index > size.");
    }

    // 最后 将指定索引处腾出来
    // 从指定索引处开始，所有数组元素全部往后移动一位
    // 从后往前移动
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }

    // 在指定索引处插入元素
    this.data[index] = element;
    // 维护一下size
    this.size ++;
  }

  // 扩展 在数组最前面插入一个元素
  unshift (element) {
    this.insert(0, element);
  }

  // 扩展 在数组最后面插入一个元素
  push (element) {
    this.insert(this.size, element);
  }

  // 其实在数组中添加元素 就相当于在数组最后面插入一个元素
  add (element) {
    if (this.size == this.getCapacity()) {
      // throw new Error("add error. Array is full.");
      this.resize(this.size * 2);
    }

    // size其实指向的是 当前数组最后一个元素的 后一个位置的索引。
    this.data[this.size] = element;
    // 维护size
    this.size ++;
  }

  // get
  get (index) {
    // 不能访问没有存放元素的位置
    if (index < 0 || index >= this.size) {
      throw new Error("get error. index < 0 or index >= size.");
    }
    return this.data[index];
  }

  // 扩展： 获取数组中第一个元素
  getFirst () {
    return this.get(0);
  }


  // 扩展： 获取数组中最后一个元素
  getLast () {
    return this.get(this.size - 1);
  }


  // set
  set (index, newElement) {
    // 不能修改没有存放元素的位置
    if (index < 0 || index >= this.size) {
      throw new Error("set error. index < 0 or index >= size.");
    }
    this.data[index] = newElement;
  }

  // contain
  contain (element) {
    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return true;
      }
    }
    return false;
  }

  // find
  find (element) {
    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        return i;
      }
    }
    return -1;
  }

  // findAll
  findAll (element) {
    // 创建一个自定义数组来存取这些 元素的索引
    let myarray = new MyArray(this.size);

    for (var i = 0; i < this.size; i++) {
      if (this.data[i] === element) {
        myarray.push(i);
      }
    }

    // 返回这个自定义数组
    return myarray;
  }

  // 删除指定索引处的元素
  remove (index) {

    // 索引合法性验证
    if (index < 0 || index >= this.size) {
      throw new Error("remove error. index < 0 or index >= size.");
    }

    // 暂存即将要被删除的元素
    let element = this.data[index];

    // 后面的元素覆盖前面的元素
    for (let i = index; i < this.size - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    this.size --;
    this.data[this.size] = null;

    // 如果size 为容量的四分之一时 就可以缩容了
    // 防止复杂度震荡 
    if (Math.floor(this.getCapacity() / 4) === this.size) {
      
        // 缩容一半
      this.resize(Math.floor(this.getCapacity() / 2));
    }

    return element;
  }

  // 扩展：删除数组中第一个元素
  shift () {
    return this.remove(0);
  }

  // 扩展： 删除数组中最后一个元素
  pop () {
    return this.remove(this.size - 1);
  }


  // 扩展： 根据元素来进行删除
  removeElement (element) {

    let index = this.find(element);
    if (index !== -1) {
      this.remove(index);
    }
  }

  // 扩展： 根据元素来删除所有元素
  removeAllElement (element) {
    let index = this.find(element);
    while (index != -1) {
      this.remove(index);
      index = this.find(element);
    }

    // let indexArray = this.findAll(element);
    // let cur, index = 0;
    // for (var i = 0; i < indexArray.getSize(); i++) {
    //   // 每删除一个元素 原数组中就少一个元素，
    //   // 索引数组中的索引值是按照大小顺序排列的，
    //   // 所以 这个cur记录的是 原数组元素索引的偏移量
    //   // 只有这样才能够正确的删除元素。
    //   index = indexArray.get(i) - cur++;
    //   this.remove(index);
    // }
  }

  // @Override toString 2018-10-17-jwl
  toString () {
    let arrInfo = `Array: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = [`;
    for (var i = 0; i < this.size - 1; i++) {
      arrInfo += `${this.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.data[this.size - 1]}`;
    }
    arrInfo += `]`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定栈
class MyStack {
  constructor (capacity = 10) {
    this.myArray = new MyArray(capacity);
  }

  // 入栈
  push (element) {
    this.myArray.push(element);
  }

  // 出栈
  pop () {
    return this.myArray.pop();
  }

  // 查看栈顶的元素
  peek () {
    return this.myArray.getLast();
  }

  // 栈中实际元素的个数
  getSize () {
    return this.myArray.getSize();
  }

  // 栈是否为空
  isEmpty () {
    return this.myArray.isEmpty();
  }

  // 查看栈的容量
  getCapacity () {
    return this.myArray.getCapacity();
  }

  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `Stack: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `] stack top is right!`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义队列
class MyQueue {
  constructor (capacity = 10) {
    this.myArray = new MyArray(capacity);
  }

  // 入队
  enqueue (element) {
    this.myArray.push(element);
  }

  // 出队
  dequeue () {
    return this.myArray.shift();
  }

  // 查看队首的元素
  getFront () {
    return this.myArray.getFirst();
  }

  // 查看队列中实际元素的个数
  getSize () {
    return this.myArray.getSize();
  }

  // 查看 队列当前的容量
  getCapacity () {
    return this.myArray.getCapacity();
  }

  // 查看队列是否为空
  isEmpty () {
    return this.myArray.isEmpty();
  }

  // 输出队列中的信息
  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `Queue: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = front  [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `]  tail`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// 自定义循环队列
class MyLoopQueue {
  constructor (capacity = 10) {
    // 初始化新数组
    this.data = new Array(capacity);
    // 初始化 队首、队尾的值 (索引)
    this.front = this.tail = 0;
    // 队列中实际元素个数
    this.size = 0;
  }

  // 扩容
  resize (capacity) {
    let newArray = new Array(capacity);
    let index = 0;

    for (let i = 0; i < this.size; i++) {
        // 索引可能会越界，于是就要取余一下，
        // 如果越界了，就从队首开始
        index = (this.front + i) % this.getCapacity()
        newArray[i] = this.data[index] ;
    }

    this.data = newArray;
    this.front = 0;
    this.tail = this.size;
  }

  // 入队
  enqueue (element) {

    // 判断队列中是否已满
    if ((this.tail + 1) % this.getCapacity() === this.front) {
      this.resize(Math.floor(this.getCapacity() * 2));
    }

    this.data[this.tail] = element;
    this.tail = (this.tail + 1) % this.getCapacity();
    this.size ++;
  }

  // 出队
  dequeue () {
    // 判断队列是否为空
    if (this.isEmpty()) {
      throw new Error("can't dequeue from an empty queue.");
    }

    let element = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.getCapacity();
    this.size --;

    // 当size 为容量的四分之一时就缩容一倍
    if (this.size === Math.floor(this.getCapacity() / 4)) {
      this.resize(this.getCapacity() / 2);
    }
    return element;

  }

  // 查看队首的元素
  getFront () {
    if (this.isEmpty()) {
      throw new Error("queue is empty.");
    }

    return this.data[front];
  }

  // 查看实际的元素个数
  getSize () {
    return this.size;
  }

  // 查看容量
  getCapacity () {
    return this.data.length;
  }

  // 队列是否为空
  isEmpty () {
    // return this.size === 0;
    return this.front == this.tail;
  }
  // 输出循环队列中的信息
  // @Override toString 2018-10-20-jwl
  toString () {
    let arrInfo = `LoopQueue: size = ${this.getSize()}，capacity = ${this.getCapacity()}，\n`;
    arrInfo += `data = front  [`;
    for (var i = 0; i < this.myArray.size - 1; i++) {
      arrInfo += `${this.myArray.data[i]}, `;
    }
    if (!this.isEmpty()) {
     arrInfo += `${this.myArray.data[this.myArray.size - 1]}`;
    }
    arrInfo += `]  tail`;

    // 在页面上展示
    document.body.innerHTML += `${arrInfo}<br /><br /> `;

    return arrInfo;
  }
}

// main 函数
class Main {
  constructor () {

    // this.alterLine("MyStack Area");

    // let ms = new MyStack(10);
    // for (let i = 1; i <= 10 ; i++) {
    //     ms.push(i);
    //     console.log(ms.toString());
    // }

    // console.log(ms.peek());
    // this.show(ms.peek());

    // while (!ms.isEmpty()) {
    //   console.log(ms.toString());
    //   ms.pop();
    // }

    // this.alterLine("leetcode 20. 有效的括号");
    // let s = new Solution();
    // this.show(s.isValid("{ [ ( ) ] }"));
    // this.show(s.isValid(" [ ( ] ) "));

    // this.alterLine("MyQueue Area");
    // let mq = new MyQueue(10);
    // for (let i = 1; i <= 10 ; i++) {
    //     mq.enqueue(i);
    //     console.log(mq.toString());
    // }

    // console.log(mq.getFront());
    // this.show(mq.getFront());

    // while (!mq.isEmpty()) {
    //   console.log(mq.toString());
    //   mq.dequeue();
    // }
    
    this.alterLine("MyLoopQueue Area");
    let mlq = new MyQueue(10);
    for (let i = 1; i <= 10 ; i++) {
        mlq.enqueue(i);
        console.log(mlq.toString());
    }

    console.log(mlq.getFront());
    this.show(mlq.getFront());

    while (!mlq.isEmpty()) {
      console.log(mlq.toString());
      mlq.dequeue();
    }

  }

  // 将内容显示在页面上
  show (content) {
    document.body.innerHTML += `${content}<br /><br />`;
  }

  // 展示分割线
  alterLine (title) {
    let line = `--------------------${title}----------------------`
    console.log(line);
    document.body.innerHTML += `${line}<br /><br />`;
  }
}

// 答题
class Solution {

  isValid (s) {
      // leetcode 20. 有效的括号
    /**
     * @param {string} s
     * @return {boolean}
     */
    var isValid = function(s) {
        let stack = [];

        // 以遍历的方式进行匹配操作
        for (let i = 0; i < s.length; i++) {

          // 是否是正括号
          switch (s[i]) {
            case '{' :
            case '[' : 
            case '(' : 
              stack.push(s[i]);
            break;
            default:
              break;
          }
          // 是否是反括号
          switch (s[i]) {
            case '}' :
              if (stack.length === 0 || stack.pop() !== '{') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            case ']' :

              if (stack.length === 0 || stack.pop() !== '[') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            case ')' : 
              if (stack.length === 0 || stack.pop() !== '(') {
                console.log("valid error. not parentheses. in");
                return false;
              }
            break;
            default:
            break;
          }
        }

        // 是否全部匹配成功
        if (stack.length === 0) {
          return true;
        } else {
          console.log("valid error. not parentheses. out");
          return false;
        }
    }

    return isValid(s);
  }
}


// Student
class Student {
  constructor (studentName, studentScore) {
    this.name = studentName;
    this.score = studentScore;
  }

  //@Override toString 2018-10-19-jwl
  toString () {
    let studentInfo = `Student(name: ${this.name}, score: ${this.score})`;
    return studentInfo;
  }
}

// 页面加载完毕
window.onload = function () {
  // 执行主函数
  new Main();
}
