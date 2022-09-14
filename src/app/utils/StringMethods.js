export function addSpaceIntoPascalString(inputString) {
  return inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
}