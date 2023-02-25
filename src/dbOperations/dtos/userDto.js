class UserDto {
  constructor({ email, nombre, edad }) {
    (this.nombre = nombre), (this.email = email), (this.edad = edad);
  }
}

export const convertToDto = (users) => {
  if (Array.isArray(users)) {
    const newData = users.map((user) => new UserDto(user));
    return newData;
  } else {
    const newData = new UserDto(users);
  }
  return newData;
};
