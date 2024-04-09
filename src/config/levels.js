const levels = [{
  "cellCount": 3,
  "memoryCount": 3,
  "fieldSize": 300,
  "space": 2,
  "score": 1,
  "time": 1000
},
{
  "cellCount": 3,
  "memoryCount": 3,
  "fieldSize": 300,
  "space": 2,
  "score": 1,
  "time": 700
},
{
  "cellCount": 3,
  "memoryCount": 3,
  "fieldSize": 300,
  "space": 2,
  "score": 1,
  "time": 500
},
{
  "cellCount": 3,
  "memoryCount": 4,
  "fieldSize": 300,
  "space": 2,
  "score": 1,
  "time": 1000
},
{
  "cellCount": 3,
  "memoryCount": 4,
  "fieldSize": 350,
  "space": 2,
  "score": 2,
  "time": 700
},
{
  "cellCount": 4,
  "memoryCount": 3,
  "fieldSize": 350,
  "space": 2,
  "score": 1,
  "time": 1000
},
{
  "cellCount": 4,
  "memoryCount": 3,
  "fieldSize": 350,
  "space": 2,
  "score": 1,
  "time": 700
},
{
  "cellCount": 4,
  "memoryCount": 4,
  "fieldSize": 350,
  "space": 2,
  "score": 1,
  "time": 1000
},
{
  "cellCount": 4,
  "memoryCount": 4,
  "fieldSize": 350,
  "space": 2,
  "score": 1,
  "time": 700
},
{
  "cellCount": 4,
  "memoryCount": 5,
  "fieldSize": 350,
  "space": 2,
  "score": 10,
  "time": 700
}];
let cellCount = 5;
const time = [1500, 1000, 700];
let timeCount = 2;
for(let lvl = 5; lvl <= 7; lvl++) {
  for(let i = 0; i<10;i++) {
    let memoryCount = (i<5) ? 5 : 6;
    let time;
    if(i==0 || i==1 || i == 5 || i == 6) time = 1000;
    else if (i==2 || i==3 || i == 7 || i == 8) time = 700;
    else time = 500;
    let test = {
      "cellCount": lvl,
      "memoryCount": memoryCount,
      "fieldSize": 350,
      "space": 2,
      "score": 2,
      "time": time,
    }
      levels.push(test);
  }
}
for(let lvl = 5; lvl <= 7; lvl++) {
  for(let i = 0; i<10;i++) {
    let memoryCount = (i<5) ? 6 : 7;
    let time;
    if(i==0 || i==1 || i == 5 || i == 6) time = 1000;
    else if (i==2 || i==3 || i == 7 || i == 8) time = 700;
    else time = 500;
    let test = {
      "cellCount": lvl,
      "memoryCount": memoryCount,
      "fieldSize": 350,
      "space": 2,
      "score": 2,
      "time": time,
    }
      levels.push(test);
  }
}
for(let lvl = 5; lvl <= 7; lvl++) {
  for(let i = 0; i<10;i++) {
    let memoryCount = (i<5) ? 7 : 8;
    let time;
    if(i==0 || i==1 || i == 5 || i == 6) time = 1000;
    else if (i==2 || i==3 || i == 7 || i == 8) time = 700;
    else time = 500;
    let test = {
      "cellCount": lvl,
      "memoryCount": memoryCount,
      "fieldSize": 350,
      "space": 2,
      "score": 2,
      "time": time,
    }
      levels.push(test);
  }
}

export default levels;