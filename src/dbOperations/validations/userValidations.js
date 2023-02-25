import joi from "joi";

class UserValidation {
  static validateUser(user, required) {
    const userSchemaValidation = joi.object({
      email: required ? joi.string().min(3).required() : joi.string(),
      password: required ? joi.string().min(3).required() : joi.string(),
      nombre: required ? joi.string().min(3).required() : joi.string(),
      direccion: required ? joi.string().min(3).required() : joi.string(),
      edad: required ? joi.number().required() : joi.number(),
      telefono: required ? joi.string().min(3).required() : joi.string(),
      fotoUrl: required ? joi.string().min(3).required() : joi.string(),
    });
    const { error } = userSchemaValidation.validate(user);
    if (error) {
      throw new Error(`Hub un problema en la validación ${error}`);
    }
  }
}

export { UserValidation };
