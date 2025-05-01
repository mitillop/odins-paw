"use client";
import React, { useState } from "react";
import { Mars, Venus, Dog, Cat } from "lucide-react";

function PetForm() {
  const [formData, setFormData] = useState({
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
    photo: null, // Add photo field
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  const [activityLevel, setActivityLevel] = useState(formData.activityLevel);
  const [breedType, setBreedType] = useState(formData.breedType);
  const [petType, setPetType] = useState(formData.petType);

  const handleActivityLevelChange = (value) => {
    setActivityLevel(value);
    setFormData({
      ...formData,
      activityLevel: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label mb-1">Nombre de la mascota</label>
        <input
          type="text"
          name="name"
          className="input input-bordered w-full mb-4"
          required
          placeholder="Ingresa el nombre"
          pattern="[A-Za-z][A-Za-z]*"
          minLength={2}
          maxLength={30}
          title="Solo se permiten letras"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="label mb-1">Género</label>
        <div className="grid grid-cols-[auto_1px_auto] items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="gender"
              className="radio radio-accent"
              checked={formData.gender === "female"}
              onChange={() => handleRadioChange("gender", "female")}
            />
            <span>Hembra</span>
            <Venus size={18} />
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="gender"
              className="radio radio-accent"
              checked={formData.gender === "male"}
              onChange={() => handleRadioChange("gender", "male")}
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
              name="petType"
              className="radio radio-accent"
              checked={petType === "dog"}
              onChange={() => {
                setPetType("dog");
                handleRadioChange("petType", "dog");
              }}
            />
            <span>Perro</span>
            <Dog size={18} />
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="petType"
              className="radio radio-accent"
              checked={petType === "cat"}
              onChange={() => {
                setPetType("cat");
                handleRadioChange("petType", "cat");
              }}
            />
            <span>Gato</span>
            <Cat size={18} />
          </label>
        </div>

        {/* Tipo de raza */}
        <label className="label mb-1">Tipo de raza</label>
        <div className="grid grid-cols-[auto_1px_auto] items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="breedType"
              className="radio radio-accent"
              checked={breedType === "purebred"}
              onChange={() => {
                setBreedType("purebred");
                handleRadioChange("breedType", "purebred");
              }}
            />
            <span>Raza pura</span>
          </label>

          <div className="w-px h-6 bg-gray-300" />

          <label className="flex items-center gap-2 px-4">
            <input
              type="radio"
              name="breedType"
              className="radio radio-accent"
              checked={breedType === "mixed"}
              onChange={() => {
                setBreedType("mixed");
                handleRadioChange("breedType", "mixed");
              }}
            />
            <span>Raza mixta</span>
          </label>
        </div>
        {breedType === "purebred" ? (
          <>
            <label className="label mb-1">Raza de la mascota</label>
            <input
              type="text"
              name="breed"
              className="input input-bordered w-full mb-4"
              required
              placeholder="Ingresa la raza"
              pattern="[A-Za-z][A-Za-z ]*"
              minLength={2}
              maxLength={30}
              title="Solo se permiten letras"
              value={formData.breed}
              onChange={handleChange}
            />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label mb-1">Raza del padre</label>
              <input
                type="text"
                name="fatherBreed"
                className="input input-bordered w-full"
                required
                placeholder="Padre"
                pattern="[A-Za-z][A-Za-z ]*"
                minLength={2}
                maxLength={30}
                title="Solo se permiten letras"
                value={formData.fatherBreed}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label mb-1">Raza de la madre</label>
              <input
                type="text"
                name="motherBreed"
                className="input input-bordered w-full"
                required
                placeholder="Madre"
                pattern="[A-Za-z][A-Za-z ]*"
                minLength={2}
                maxLength={30}
                title="Solo se permiten letras"
                value={formData.motherBreed}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <label className="label mb-1">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthDate"
          className="input input-bordered w-full mb-4"
          required
          min="2002-01-01"
          max="2025-05-29"
          title="Fecha de nacimiento de tu mascota"
          value={formData.birthDate}
          onChange={handleChange}
        />

        <label className="label mb-1">Peso</label>
        <div className="relative mb-4">
          <input
            type="number"
            name="weight"
            className="input input-bordered w-full pr-10"
            required
            placeholder="Ingresa el peso en kg"
            min={1}
            max={80}
            title="Entre 1 y 80 kg"
            value={formData.weight}
            onChange={handleChange}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            kg
          </span>
        </div>

        {/* Nivel de actividad */}
        <label className="label mb-1">Nivel de actividad</label>
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={100}
            step={25}
            value={activityLevel}
            className="range"
            onChange={(e) => {
              const value = Number(e.target.value);
              setActivityLevel(value);
              handleActivityLevelChange(value);
            }}
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
            name="otherConditions"
            rows={2}
            value={formData.otherConditions}
            onChange={handleChange}
          />
        </div>

        <label className="label mb-1">Foto de mascota</label>
        <input
          type="file"
          className="file-input"
          name="photo"
          onChange={handleFileChange}
        />
        <label className="label">Tamaño maximo 2MB</label>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Guardar
        </button>
      </fieldset>
    </form>
  );
}

export default PetForm;
