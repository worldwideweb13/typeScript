class project {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;

    constructor(){
        // コンテンツを表示するためにアクセスしなければいけない要素へのアクセス修飾子
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // templateElement.content...templateエレメントの内側の要素を取得したいときは'.content'
        const importedNode = document.importNode(this.templateElement.content);

        
    }
}