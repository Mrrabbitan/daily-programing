  const obj1 = {
        a:1,
        b:2
    };
  const obj2 = {
        c:3,
        d:4
    };
    // const assignObj = Object.create(obj1,obj2);
    // console.log('assignObj',assignObj);
    // console.log('obj1',obj1);
    // console.log('obj2',obj2);


    // const assignOObj = Object.create({},obj1,obj2);
    // console.log('assignOObj',assignOObj);
    // console.log('obj1',obj1);
    // console.log('obj2',obj2);

    const assignObj1 = Object.assign(obj1,obj2);
    console.log('assignObj',assignObj1);
    console.log('obj1',obj1);
    console.log('obj2',obj2);

    const assignObj2 = Object.assign({},obj1,obj2);
    console.log('assignObj',assignObj2);
    console.log('obj1',obj1);
    console.log('obj2',obj2);

    //使用assign的情况下被注入的target属性也会被改变