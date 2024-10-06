import { object, string, number, boolean } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const registerSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  confirm_password: string({ required_error: "Confirm password is required" })
})

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const bmiSchema = object({
  weight: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 1000, {
      message: "Waga musi być mniejsza niż 1000",
    }),
  height: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 300, {
      message: "Waga musi być mniejsza niż 300",
    }),
})

export const bmrSchema = object({
  weight: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 1000, {
      message: "Waga musi być mniejsza niż 1000",
    }),
  height: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 300, {
      message: "Waga musi być mniejsza niż 300",
    }),
  age: string()
    .refine(value => /^\d+$/.test(value), {
      message: "Waga musi być liczbą całkowitą",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 130, {
      message: "Waga musi być mniejsza niż 130",
    }),
  gender: string(),
})

export const tdeeSchema = object({
  weight: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 1000, {
      message: "Waga musi być mniejsza niż 1000",
    }),
  height: string()
    .refine(value => /^\d+(\.\d+)?$/.test(value), {
      message: "Waga musi być liczbą dodatnią",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 300, {
      message: "Waga musi być mniejsza niż 300",
    }),
  age: string()
    .refine(value => /^\d+$/.test(value), {
      message: "Waga musi być liczbą całkowitą",
    })
    .refine(value => parseFloat(value) > 0, {
      message: "Waga musi być większa od 0",
    })
    .refine(value => parseFloat(value) < 130, {
      message: "Waga musi być mniejsza niż 130",
    }),
  gender: string(),
  activityLevel: string(),
})

export const profileSchemas = {
  image: object({
    image: string({ required_error: "Obraz jest wymagany" }),
  }),
  name: object({
    name: string({ required_error: "Imię jest wymagane" })
      .min(2, "Imię musi mieć co najmniej 2 znaki")
      .max(50, "Imię nie może przekraczać 50 znaków"),
  }),
  email: object({
    email: string({ required_error: "Email jest wymagany" })
      .email("Nieprawidłowy adres email"),
  }),
  description: object({
    description: string(),
  }),
  password: object({
    password: string({ required_error: "Hasło jest wymagane" })
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .max(32, "Hasło nie może przekraczać 32 znaków"),
    confirmPassword: string({ required_error: "Potwierdzenie hasła jest wymagane" })
      .min(8, "Potwierdzenie hasła musi mieć co najmniej 8 znaków")
      .max(32, "Potwierdzenie hasła nie może przekraczać 32 znaków"),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła nie są zgodne",
  }),
  notifications: object({
    notifications: boolean(),
    ads: boolean(),
  }),
};