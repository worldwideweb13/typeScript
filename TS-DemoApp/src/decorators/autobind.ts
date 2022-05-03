namespace App {
  // autobind decorator
  export function autobind(
    // _(アンダースコア)...引数として便宜上、設定するが関数内では利用しない。そのことをTSに明示的に示す記号
    _target: any,
    _methodName: string,
    descriptor: PropertyDescriptor
  ) {
    // originalMethod...関数の実態を取得
    const originalMethod = descriptor.value;
    const adjDescripter: PropertyDescriptor = {
      // configurable...メソッドの編集可能にする（true）
      configurable: true,
      // getメソッドでthisがoriginalMethodのオブジェクトを参照するように変更。
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescripter;
  }
}
