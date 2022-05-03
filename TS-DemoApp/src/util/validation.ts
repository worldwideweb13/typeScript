// validation
export interface Validatable {
  value: string | number;
  // ?...設定してもしなくても良い
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(ValidatableInput: Validatable) {
  let isValid = true;
  // requiredフラグがtrueの時は文字列有無のチェック式を実行
  if (ValidatableInput.required) {
    // isValid = 条件式1 && 条件式2...条件1,2が正の時、isValidはtrue, そうでなければ false
    // Interface Validatableのvalueの型がnumberの時.trim()が使えないため、.toString()でstring型に変換
    isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
  }
  // 最小文字数は入力された値が文字列の場合のみ動作する
  if (
    // != null...0が入力値になった場合の考慮
    ValidatableInput.minLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
  }

  if (
    ValidatableInput.min != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
  }

  if (
    ValidatableInput.maxLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
  }

  if (
    ValidatableInput.max != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
  }
  return isValid;
}
