"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Cat, Dog, Mars, Venus } from "lucide-react";
import { usePets } from "../hooks/usePets";
import { useDiets } from "../hooks/useDiets";

function PetEditForm({ pet, onClose }) {
  const { updatePet, isUpdating } = usePets();
  const { regenerateDiets, isRegeneratingDiets } = useDiets();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    defaultValues: {
      weight: pet.weight || 0,
      activityLevel: pet.activityLevel === "Bajo" ? 25 :
                    pet.activityLevel === "Moderado" ? 50 :
                    pet.activityLevel === "Alto" ? 75 : 100,
      medicalConditions: pet.medicalConditions || "",
    },
  });

  const activityLevel = watch("activityLevel");

  const onSubmit = async (data) => {
    try {
      const formActivityLevel = data.activityLevel <= 25 ? "Bajo" :
                             data.activityLevel <= 50 ? "Moderado" :
                             data.activityLevel <= 75 ? "Alto" : "Muy alto";

      const weightChanged = Number(data.weight) !== Number(pet.weight);
      const activityChanged = formActivityLevel !== pet.activityLevel;
      const medicalConditionsChanged = (data.medicalConditions || "Ninguna") !== (pet.medicalConditions || "Ninguna");

      if (!weightChanged && !activityChanged && !medicalConditionsChanged) {
        console.log("No hay cambios - cerrando modal");
        onClose();
        return;
      }

      const updatedPet = {
        ...pet,
        weight: Number(data.weight) || 0,
        activityLevel: formActivityLevel,
        medicalConditions: data.medicalConditions || "Ninguna",
      };

      if (weightChanged || activityChanged || medicalConditionsChanged) {
        try {
          await updatePet(updatedPet);
          await regenerateDiets(updatedPet);
          onClose();
        } catch (error) {
          console.error("Error updating pet:", error);
        }
      }
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="bg-base-200/50 rounded-lg p-4">
          <h4 className="font-semibold text-base mb-4 text-base-content/80">
            Información no editable
          </h4>

          <div className="grid gap-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Nombre</span>
              </label>
              <div className="input input-bordered bg-base-200/70 flex items-center w-full">
                {pet.name}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Género</span>
                </label>
                <div className="input input-bordered bg-base-200/70 flex items-center gap-2 w-full">
                  {pet.sex === "Hembra" ? (
                    <>
                      <Venus size={18}  />
                      <span>Hembra</span>
                    </>
                  ) : (
                    <>
                      <Mars size={18}  />
                      <span>Macho</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Tipo</span>
                </label>
                <div className="input input-bordered bg-base-200/70 flex items-center gap-2">
                  {pet.type === "Perro" ? (
                    <>
                      <Dog size={18} />
                      <span>Perro</span>
                    </>
                  ) : (
                    <>
                      <Cat size={18} />
                      <span>Gato</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Raza</span>
              </label>
              <div className="input input-bordered bg-base-200/70 flex items-center w-full">
                {pet.breed}
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Edad</span>
              </label>
              <div className="input input-bordered bg-base-200/70 flex items-center w-full  ">
                {pet.age} años
              </div>
            </div>
          </div>
        </div>

        {/* Sección de información editable */}
        <div className="bg-base-100 rounded-lg p-4 border border-base-300">
          <h4 className="font-semibold text-base mb-4 text-base-content/80">
            Información editable
          </h4>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Peso (kg)</span>
                <span className="label-text-alt text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  className={`input input-bordered w-full pr-10 ${
                    errors.weight ? "input-error" : ""
                  }`}
                  placeholder="Ingresa el peso en kg"
                  {...register("weight", {
                    required: "El peso es obligatorio",
                    min: {
                      value: 0.1,
                      message: "El peso mínimo es 0.1 kg",
                    },
                    max: {
                      value: 100,
                      message: "El peso máximo es 100 kg",
                    },
                  })}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50">
                  kg
                </span>
              </div>
              {errors.weight && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.weight.message}
                  </span>
                </label>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Nivel de actividad</span>
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
                <span className={`text-xs ${activityLevel <= 25 ? "text-primary font-medium" : "text-base-content/70"}`}>
                  Bajo
                </span>
                <span className={`text-xs ${activityLevel > 25 && activityLevel <= 50 ? "text-primary font-medium" : "text-base-content/70"}`}>
                  Moderado
                </span>
                <span className={`text-xs ${activityLevel > 50 && activityLevel <= 75 ? "text-primary font-medium" : "text-base-content/70"}`}>
                  Alto
                </span>
                <span className={`text-xs ${activityLevel > 75 ? "text-primary font-medium" : "text-base-content/70"}`}>
                  Muy alto
                </span>
              </div>
            </div>

            <div >
              <label className="label">
                <span className="label-text font-medium">Condiciones médicas</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Describe cualquier condición médica relevante"
                {...register("medicalConditions")}
              />
              <label className="label">
                <span className="label-text-alt text-xs text-base-content/70 ml-2">
                  Deja este campo vacío si no hay condiciones médicas que reportar
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isUpdating || isRegeneratingDiets}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isUpdating || isRegeneratingDiets}
          >
            {isUpdating || isRegeneratingDiets ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {isUpdating ? "Guardando..." : "Actualizando dietas..."}
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>
      </div>

      {/* Loading overlay */}
      {(isUpdating || isRegeneratingDiets) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-lg font-medium">
              {isUpdating ? "Guardando cambios..." : "Actualizando dietas..."}
            </p>
            <p className="text-sm text-base-content/70">
              {isUpdating ? "Esto tomará un momento" : "Estamos recalculando las dietas de tu mascota"}
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

export default PetEditForm; 