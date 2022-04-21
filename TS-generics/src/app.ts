// ジェネリック型...型の制約を限定的にせず、柔軟に設定できる。
// 関数名<引数の型定義>(引数:引数の型){}で記述 <>内がジェネリック型と呼ばれる任意の型 
// ↓の場合、"T / U は別々のオブジェクト型である"と<>内で定義をしており、T / U の中身は何でも良い
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// 
const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
    { name: 'Max', hobbies: ['Sports'] },
    { age: 40},
);
console.log(mergedObj.age);

interface Lengthy {
    length: number;
}

// ジェネリック型...
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = '値がありません';
    if(element.length > 0) {
        descriptionText = '値は' + element.length + '個です。';
    }
    return [element, descriptionText];
}

// console.log(countAndDescribe('お疲れ様です！'));

// "extends keyof T"...オブジェクトTのkey名を引数としてとるU という意味
// この型制約により、Tのkey名がUにない場合は、赤波線が引かれるようになる
function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U,
) {
    return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max'}, 'name');

class DataStorage<T extends string | number | boolean> {
    private data : T[]= [];

    addItem(item: T) {
        this.data.push(item);
    }
    
    removeItem(item: T){
        if(this.data.indexOf(item) === -1){
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStrage = new DataStorage<string>();
textStrage.addItem("Data1");
textStrage.addItem("Data2");
textStrage.removeItem("Data1");
console.log(textStrage.getItems());

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'Max' });
// objStorage.addItem({ name: 'NauMou' });
// objStorage.removeItem({ name: 'Max' });
// console.log(objStorage.getItems());


interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// function hoge():type...":type"は戻り値の型の指定
function createCourseGoal(title: string, description: string,  date:Date):CourseGoal {
    // Partial<T>はTの全てのプロパティをOptional(任意)のプロパティに変換してくれる
    let courseGoal: Partial<CourseGoal> = {};
        //Partialを利用したことでcourseGoal.titleを任意の値として定義することができる。
        // ※typeScriptは存在しないプロパティ(title,description,completeUntil)に即興で値を入れることができない
        courseGoal.title =  title;
        courseGoal.description = description;
        courseGoal.completeUntil = date;
        // courseGoalをinterfaceで定義したCourseGoalに変換する
        return courseGoal as CourseGoal;
}

// Readonly<ジェネリクス型>にすることで,読み取り専用の配列をデータ配列を作成する
const names : Readonly<string[]>= ['Max', 'Anna'];

