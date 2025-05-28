"use client";
import React, { useState } from "react";
import { Mars, Venus, Dog, Cat } from "lucide-react";
import { createPet } from "../app/actions/pets/createPet";
import { useForm } from "react-hook-form";
import { uploadFile } from "../app/actions/files/uploadFile";
import { usePets } from "../hooks/usePets";
import { useDiets } from "../hooks/useDiets";

function PetForm({ onClose }) {
  const { createNewPet, isCreating } = usePets();
  const { regenerateDiets, isRegeneratingDiets } = useDiets();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isCreating: formSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      gender: "female",
      petType: "dog",
      breed: "",
      breedType: "purebred",
      fatherBreed: "",
      motherBreed: "",
      birthDate: "",
      weight: "",
      activityLevel: 25,
      otherConditions: "",
      photo: null,
    },
  });

  const breedType = watch("breedType");
  const petType = watch("petType");
  const activityLevel = watch("activityLevel");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getActivityLevelText = (level) => {
    if (level <= 25) return "Bajo";
    if (level <= 50) return "Medio";
    if (level <= 75) return "Alto";
    return "Muy alto";
  };

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(false);

    try {
      const birthDate = new Date(data.birthDate);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        years--;
      }

      let months = today.getMonth() - birthDate.getMonth();
      if (months < 0) {
        months += 12;
      }

      if (today.getDate() < birthDate.getDate()) {
        months = (months - 1 + 12) % 12;
      }

      let formattedAge;
      if (years === 0) {
        formattedAge = months / 10;
        if (months >= 10) {
          formattedAge = months / 100;
        }
      } else {
        formattedAge = years + (months / 10);
      }

      const breedValue =
        data.breedType === "purebred"
          ? data.breed
          : `${data.motherBreed} ${data.fatherBreed}`;

      const photoFile =
        data.photo && data.photo.length > 0 ? data.photo[0] : null;

      let imgUrl = null;
      if (photoFile) {
        imgUrl = await uploadFile(photoFile);
      }

      const petData = {
        name: data.name,
        sex: data.gender === "female" ? "Hembra" : "Macho",
        type: data.petType === "dog" ? "Perro" : "Gato",
        breed: breedValue,
        age: Number(formattedAge),
        weight: Number(data.weight) || 0,
        activityLevel: getActivityLevelText(data.activityLevel),
        medicalConditions: data.otherConditions || "Ninguna",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrl: imgUrl,
      };

      let createdPet = null;

      await new Promise((resolve, reject) => {
        createNewPet(petData, {
          onSuccess: async (newPet) => {
            try {
              createdPet = newPet;
              reset();
              resolve();
            } catch (error) {
              reject(error);
            }
          },
          onError: (error) => {
            setError(error.message || "Error al crear la mascota");
            reject(error);
          }
        });
      });

      if (createdPet) {
        await regenerateDiets(createdPet);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onClose();
      }
    } catch (err) {
      setError(err.message || "Error al crear la mascota");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <div className="bg-base-200/50 rounded-lg p-4">
            <h4 className="font-semibold text-base mb-4 text-base-content/80">
              Información básica
            </h4>

            <div className="space-y-4">
              <div>
                <label className="label font-medium">
                  <span className="label-text">Nombre de la mascota</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <input
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Ingresa el nombre"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                    pattern: {
                      value: /^[A-Za-z][A-Za-z]*$/,
                      message: "Solo se permiten letras",
                    },
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 30,
                      message: "El nombre no puede exceder 30 caracteres",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label font-medium">
                    <span className="label-text">Género</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-6 mt-2">
                    <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                      <input
                        type="radio"
                        className="radio radio-accent"
                        value="female"
                        {...register("gender")}
                      />
                      <span>Hembra</span>
                      <Venus size={18} />
                    </label>

                    <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                      <input
                        type="radio"
                        className="radio radio-accent"
                        value="male"
                        {...register("gender")}
                      />
                      <span>Macho</span>
                      <Mars size={18} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="label font-medium">
                    <span className="label-text">Tipo de mascota</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-6 mt-2">
                    <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                      <input
                        type="radio"
                        className="radio radio-accent"
                        value="dog"
                        {...register("petType")}
                      />
                      <span>Perro</span>
                      <Dog size={18} />
                    </label>

                    <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                      <input
                        type="radio"
                        className="radio radio-accent"
                        value="cat"
                        {...register("petType")}
                      />
                      <span>Gato</span>
                      <Cat size={18} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información de raza */}
          <div className="bg-base-200/50 rounded-lg p-4">
            <h4 className="font-semibold text-base mb-4 text-base-content/80">
              Información de raza
            </h4>

            <div className="space-y-4">
              <div>
                <label className="label font-medium">
                  <span className="label-text">Tipo de raza</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <div className="grid grid-cols-2 gap-6 mt-2">
                  <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="radio"
                      className="radio radio-accent"
                      value="purebred"
                      {...register("breedType")}
                    />
                    <span>Raza pura</span>
                  </label>

                  <label className="flex items-center justify-start gap-3 px-5 py-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors">
                    <input
                      type="radio"
                      className="radio radio-accent"
                      value="mixed"
                      {...register("breedType")}
                    />
                    <span>Raza mixta</span>
                  </label>
                </div>
              </div>

              {breedType === "purebred" ? (
                <div>
                  <label className="label font-medium">
                    <span className="label-text">Raza de la mascota</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    className={`input input-bordered w-full ${
                      errors.breed ? "input-error" : ""
                    }`}
                    placeholder="Ingresa la raza"
                    {...register("breed", {
                      required: "La raza es obligatoria",
                      pattern: {
                        value: /^[A-Za-z][A-Za-z ]*$/,
                        message: "Solo se permiten letras",
                      },
                      minLength: {
                        value: 2,
                        message: "La raza debe tener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "La raza no puede exceder 30 caracteres",
                      },
                    })}
                  />
                  {errors.breed && (
                    <p className="text-error text-xs mt-1">
                      {errors.breed.message}
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label font-medium">
                      <span className="label-text">Raza del padre</span>
                      <span className="label-text-alt text-error">*</span>
                    </label>
                    <input
                      className={`input input-bordered w-full ${
                        errors.fatherBreed ? "input-error" : ""
                      }`}
                      placeholder="Ej: Labrador"
                      {...register("fatherBreed", {
                        required: "La raza del padre es obligatoria",
                        pattern: {
                          value: /^[A-Za-z][A-Za-z ]*$/,
                          message: "Solo se permiten letras",
                        },
                      })}
                    />
                    {errors.fatherBreed && (
                      <p className="text-error text-xs mt-1">
                        {errors.fatherBreed.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label font-medium">
                      <span className="label-text">Raza de la madre</span>
                      <span className="label-text-alt text-error">*</span>
                    </label>
                    <input
                      className={`input input-bordered w-full ${
                        errors.motherBreed ? "input-error" : ""
                      }`}
                      placeholder="Ej: Golden Retriever"
                      {...register("motherBreed", {
                        required: "La raza de la madre es obligatoria",
                        pattern: {
                          value: /^[A-Za-z][A-Za-z ]*$/,
                          message: "Solo se permiten letras",
                        },
                      })}
                    />
                    {errors.motherBreed && (
                      <p className="text-error text-xs mt-1">
                        {errors.motherBreed.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-base-200/50 rounded-lg p-4">
            <h4 className="font-semibold text-base mb-4 text-base-content/80">
              Información física y de salud
            </h4>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label font-medium">
                    <span className="label-text">Fecha de nacimiento</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="date"
                    className={`input input-bordered w-full ${
                      errors.birthDate ? "input-error" : ""
                    }`}
                    {...register("birthDate", {
                      required: "La fecha de nacimiento es obligatoria",
                      validate: (value) => {
                        const date = new Date(value);
                        const min = new Date("2002-01-01");
                        const max = new Date("2025-05-29");
                        return (
                          (date >= min && date <= max) ||
                          "Fecha fuera del rango permitido"
                        );
                      },
                    })}
                  />
                  {errors.birthDate && (
                    <p className="text-error text-xs mt-1">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label font-medium">
                    <span className="label-text">Peso</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      className={`input input-bordered w-full pr-10 ${
                        errors.weight ? "input-error" : ""
                      }`}
                      placeholder="Ingresa el peso"
                      {...register("weight", {
                        required: "El peso es obligatorio",
                        min: {
                          value: 1,
                          message: "El peso mínimo es 1 kg",
                        },
                        max: {
                          value: 80,
                          message: "El peso máximo es 80 kg",
                        },
                      })}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      kg
                    </span>
                  </div>
                  {errors.weight && (
                    <p className="text-error text-xs mt-1">
                      {errors.weight.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="label font-medium">
                  <span className="label-text">Nivel de actividad</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={25}
                  className="range w-full"
                  {...register("activityLevel", {
                    valueAsNumber: true,
                  })}
                />
                <div className="flex justify-between px-2 mt-1">
                  <span
                    className={`text-xs ${
                      activityLevel <= 25
                        ? "text-primary font-medium"
                        : "text-base-content/70"
                    }`}
                  >
                    Bajo
                  </span>
                  <span
                    className={`text-xs ${
                      activityLevel > 25 && activityLevel <= 50
                        ? "text-primary font-medium"
                        : "text-base-content/70"
                    }`}
                  >
                    Moderado
                  </span>
                  <span
                    className={`text-xs ${
                      activityLevel > 50 && activityLevel <= 75
                        ? "text-primary font-medium"
                        : "text-base-content/70"
                    }`}
                  >
                    Alto
                  </span>
                  <span
                    className={`text-xs ${
                      activityLevel > 75
                        ? "text-primary font-medium"
                        : "text-base-content/70"
                    }`}
                  >
                    Muy alto
                  </span>
                </div>
              </div>

              <div>
                <label className="label font-medium">
                  <span className="label-text">Condiciones médicas</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe cualquier condición médica relevante"
                  rows={3}
                  {...register("otherConditions")}
                />
                <p className="text-xs text-base-content/70 mt-1">
                  Si no hay condiciones médicas, puedes dejar este campo vacío
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-200/50 rounded-lg p-4">
            <h4 className="font-semibold text-base mb-4 text-base-content/80">
              Foto de la mascota
            </h4>

            <div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                {...register("photo")}
              />
              <p className="text-xs text-base-content/70 mt-2">
                Formato permitido: JPG, PNG. Tamaño máximo: 2MB
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <span>Mascota registrada exitosamente</span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isCreating || isRegeneratingDiets}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isCreating || isRegeneratingDiets}
            >
              {isCreating || isRegeneratingDiets ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isCreating ? "Guardando mascota..." : "Generando dietas..."}
                </>
              ) : (
                "Guardar mascota"
              )}
            </button>
          </div>
        </div>
      </div>

      {(isCreating || isRegeneratingDiets) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-lg font-medium">
              {isCreating ? "Registrando mascota..." : "Generando dietas personalizadas..."}
            </p>
            <p className="text-sm text-base-content/70">
              {isCreating 
                ? "Estamos guardando la información de tu mascota" 
                : "Estamos calculando las dietas óptimas para tu mascota"}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

export default PetForm;
