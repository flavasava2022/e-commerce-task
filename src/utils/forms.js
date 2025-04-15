export function inputValidate(data, errors) {
  if (data?.fullName?.trim().length === 0) {
    errors.fullName = "fieldRequired";
  }

  if (data?.email?.trim().length === 0) {
    errors.email = "fieldRequired";
  }

  if (data?.email && !data?.email?.includes("@")) {
    errors.email = "invalidEmail";
  }
  if (data?.confPassword?.trim().length === 0) {
    errors.confPassword = "fieldRequired";
  }
  if (data.confPassword&&
    data?.confPassword?.trim().length !== 0 &&
    data?.confPassword !== data?.password
  ) {
    errors.confPassword = "passwordsMatch";
  }
  if (data?.password?.trim().length === 0) {
    errors.password = "fieldRequired";
  }
}
