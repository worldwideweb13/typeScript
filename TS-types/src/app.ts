type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

// 交差型...AdminとEmployee双方の型を組み合わせた型となる
const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
}

// Union型
type Combinable = string | number;
type Numeric = number | boolean;

// 交差型...CombinableとNumericの共通の型(number)が型となる
type Universal = Combinable & Numeric;

// 関数オーバーロード...関数の戻り値をtsが正確に判断できない時、利用する
// 戻り値を引数の型毎に設定できる
function add(a: number, b: number):number;
function add(a: string, b:string):string;
function add(a: string, b:number):string;
function add(a: number, b:string):string;
function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    // in hoge...hoge(hogeは関数でも可)が含まれる場合,
    if('privileges' in emp){
        console.log('Privileges: ' + emp.privileges);
    }
    if('startDate' in emp){
        console.log('Start Date: ' + emp.startDate);
    }
}

// printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Mai', startDate: new Date() });

class Car {
    drive() {
        console.log("運転中...");
    }
}

class Truck {
    drive() {
        console.log("トラックを運転中...");
    }

    loadCargo(amount: number){
        console.log("荷物を載せています..." + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    // instanceof...Truckクラスで作られたインスタンスだった場合,
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// discriminated union型の使い方
// あらかじめ設定した文字列を識別詞として利用する
interface Bird {
    type: 'bird',
    flyingSpeed : number;
}

interface Horse {
    type: 'horse',
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('移動速度: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

// DOMアクセス
// !...その値が絶対にnullをかえすことがないことを表す
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'こんにちは';
// !が使えない場合、(nullの場合が想定される場合)以下の書き方でnullチェックを行う
if(userInputElement){
    (userInputElement as HTMLInputElement).value = 'こんにちは';
}

// インデックス型
// 可変長プロパティ...変数の項目が増える場合、コード作成時点で定義できない場合に使える
interface ErrorContainer {
    // propの項目数は増えるクラス毎に増減する
    [prop: string]:string;
}

const errorBag: ErrorContainer = {
    email: '正しいメールアドレスではありません',
    username: 'ユーザー名に記号を含めることはできません',
}

// オプショナルチェーニング
// ネストされたオブジェクトを取得する場合、データ取得時点で存在しない可能性のあるプロパティがある場合に使う
const fetchUserData = {
    id: 'u1',
    name: 'user1',
    // job: {
    //     title: 'Developer',
    //     description: 'TypeScript',
    // },
};

// ?..左型(fetchUserData)のオブジェクトが存在しない場合、右側(job)の値の取得を実行しない
console.log(fetchUserData?.job?.title);


// null合体演算子(??)
const userInput = null;
// ??...userInputがnullまたはundfinedの場合は右('DEFAULT')を表示
// ''(空文字)の場合は、その値を保持してnull, undefinedと別物と識別できる
const storedData = userInput ?? 'DEFAULT';