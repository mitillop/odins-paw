export enum PetType {
    Gato = "Gato",
    Perro = "Perro"
  }
  
  export enum Sex {
    Macho = "Macho",
    Hembra = "Hembra"
  }
  
  export enum DietType {
    PRINCIPAL = "PRINCIPAL",
    ALTERNATIVA = "ALTERNATIVA"
  }
  
  export enum ChatCategory {
    Alimentacion = "Alimentacion",
    Cuidados = "Cuidados",
    Preguntas_Generales = "Preguntas_Generales"
  }
  
  export interface Diet {
    id: bigint;
    petId: bigint;
    calorie_intake: number;
    recommended_foods: string;
    type: DietType;
  }
  
  export interface FoodPortion {
    id: bigint;
    petId: bigint;
    portionSize: number;
    visualRepresentation: string;
    grams: number;
  }
  
  export interface Mascota {
    id: bigint;
    userId: bigint;
    name: string;
    age: number;
    type: PetType;
    weight: number;
    breed: string;
    sex: Sex;
    activityLevel: string;
    medicalConditions?: string;
    diets?: Diet[];
    foodPortions?: FoodPortion[];
    chatHistory?: ChatHistory[];
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
  }
  
  export interface ChatHistory {
    id: bigint;
    userId: bigint;
    petId?: bigint;
    message: string;
    category: ChatCategory;
    createdAt: Date;
  }