import Data from "./validPeople.json";

export function nameValidator(inputtedName) {
  let valid = false;
  const allNames = Data.map(({ name }) => {
    return name;
  });
  for (let i = 0; i < allNames.length; i++) {
    if (inputtedName === allNames[i]) {
      valid = true;
    }
  }
  if (!inputtedName) return "Name can't be empty.";
  if (valid) return "";
  else return "Not Valid User, if you don't have an account, plz Sign Up!";
}
