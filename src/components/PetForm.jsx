"use client";
import React, { useState } from "react";
import { Mars, Venus, Dog, Cat } from "lucide-react";
import { createPet } from "../app/actions/pets/createPet";
import { useForm } from "react-hook-form";
import { image } from "@heroui/react";
import { uploadFile } from "../app/actions/uploadFile";

function PetForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting: formSubmitting },
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getActivityLevelText = (level) => {
    if (level <= 25) return "Bajo";
    if (level <= 50) return "Medio";
    if (level <= 75) return "Alto";
    return "Muy alto";
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const birthDate = new Date(data.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      const breedValue =
        data.breedType === "purebred"
          ? data.breed
          : `${data.motherBreed} ${data.fatherBreed}`;

      const photoFile = data.photo && data.photo.length > 0 ? data.photo[0] : null;
      console.log("Photo file:", photoFile);
      
      let imgUrl = null;
      if (photoFile) {
        imgUrl = await uploadFile(photoFile);
      }

      const petData = {
        name: data.name,
        sex: data.gender === "female" ? "Hembra" : "Macho",
        type: data.petType === "dog" ? "Perro" : "Gato",
        breed: breedValue,
        age: age || 0,
        weight: Number(data.weight) || 0,
        activityLevel: getActivityLevelText(data.activityLevel),
        medicalConditions: data.otherConditions || "Ninguna",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        imageUrl: imgUrl,
      };

      const result = await createPet(petData);
      setSuccess(true);
      reset();
    } catch (err) {
      setError(err.message || "Error al crear la mascota");
      console.error("Error al crear mascota:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ml-5"
        disabled={isSubmitting}
      >
        <label className="label mb-1">Nombre de la mascota</label>
        <input
          className={`input input-bordered w-full mb-4 ${
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
          <p className="text-error text-xs -mt-3 mb-2">{errors.name.message}</p>
        )}

        <label className="label mb-1">Género</label>
        <div className="grid grid-cols-[auto_1px_auto] items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              className="radio radio-accent"
              value="female"
              {...register("gender")}
            />
            <span>Hembra</span>
            <Venus size={18} />
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
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

        <label className="label mb-1">Tipo de mascota</label>
        <div className="grid grid-cols-[auto_1px_auto] items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              className="radio radio-accent"
              value="dog"
              {...register("petType")}
            />
            <span>Perro</span>
            <Dog size={18} />
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
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

        <label className="label mb-1">Tipo de raza</label>
        <div className="grid grid-cols-[auto_1px_auto] items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              className="radio radio-accent"
              value="purebred"
              {...register("breedType")}
            />
            <span>Raza pura</span>
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              className="radio radio-accent"
              value="mixed"
              {...register("breedType")}
            />
            <span>Raza mixta</span>
          </label>
        </div>

        {breedType === "purebred" ? (
          <>
            <label className="label mb-1">Raza de la mascota</label>
            <input
              className={`input input-bordered w-full mb-4 ${
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
              <p className="text-error text-xs -mt-3 mb-2">
                {errors.breed.message}
              </p>
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label mb-2">Raza del padre</label>
              <input
                className={`input input-bordered w-full ${
                  errors.fatherBreed ? "input-error" : ""
                }`}
                placeholder="Padre"
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
              <label className="label mb-2">Raza de la madre</label>
              <input
                className={`input input-bordered w-full ${
                  errors.motherBreed ? "input-error" : ""
                }`}
                placeholder="Madre"
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

        <label className="label mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          className={`input input-bordered w-full mb-4 ${
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
          <p className="text-error text-xs -mt-3 mb-2">
            {errors.birthDate.message}
          </p>
        )}

        <label className="label mb-1">Peso</label>
        <div className="relative mb-4">
          <input
            type="number"
            className={`input input-bordered w-full pr-10 ${
              errors.weight ? "input-error" : ""
            }`}
            placeholder="Ingresa el peso en kg"
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
          {errors.weight && (
            <p className="text-error text-xs mt-1">{errors.weight.message}</p>
          )}
        </div>

        <label className="label mb-1">Nivel de actividad</label>
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={100}
            step={25}
            className="range"
            {...register("activityLevel", {
              valueAsNumber: true,
            })}
          />
          <div className="flex justify-between px-2 mt-1 text-xs text-center">
            <span>Perezoso</span>
            <span>Juguetón</span>
            <span>Hiperactivo</span>
          </div>
        </div>

        <label className="label mb-1">Condiciones médicas</label>
        <div className="mb-3">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Ej. Epilepsia, hipotiroidismo, etc."
            rows={2}
            {...register("otherConditions")}
          />
        </div>

        <label className="label mb-1">Foto de mascota</label>
        <input 
          type="file" 
          className="file-input" 
          accept="image/*"
          {...register("photo")} 
        />
        <label className="label">Tamaño maximo 2MB</label>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success mb-4">
            <span>Mascota registrada exitosamente</span>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={isSubmitting || formSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </button>
      </fieldset>
    </form>
  );
}

export default PetForm;
