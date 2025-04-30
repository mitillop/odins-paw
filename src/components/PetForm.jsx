"use client";
import React from "react";
import { useState } from "react";

function PetForm() {
  const [activityLevel, setActivityLevel] = useState(25);
  return (
    <form>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Nombre de la mascota</label>
        <input
          type="input"
          className="input validator"
          required
          placeholder="Ingresa el nombre "
          pattern="[A-Za-z][A-Za-z]*"
          minLength="2"
          maxLength="30"
          title="Solo se permiten letras"
        />
        <p className="validator-hint hidden">
          Debe tener entre 2 y 30 caracteres conteniendo solo letras
        </p>

        <label className="label">Raza de la mascota</label>
        <input
          type="input"
          className="input validator"
          required
          placeholder="Ingresa la raza"
          pattern="[A-Za-z][A-Za-z]*"
          minLength="2"
          maxLength="30"
          title="Solo se permiten letras"
        />
        <p className="validator-hint hidden">
          Debe tener entre 2 y 30 caracteres conteniendo solo letras
        </p>
        {/* <label className="label">Edad</label>
        <input
          type="float"
          className="input validator"
          required
          placeholder="Edad de tu mascota en años"
          min="0.1"
          max="23"
          title="Edad de tu mascota en años"
        />
        <p className="validator-hint hidden">
          Solo edades entre 1 y 23 años.
        </p> */}

        <label className="label">Tipo de mascota</label>
        <select className="select validator" required>
          <option disabled selected value="">
            Selecciona:
          </option>
          <option>Perro</option>
          <option>Gato</option>
        </select>
        <p className="validator-hint hidden">Selecciona uno.</p>

        <label className="label">Fecha de nacimiento</label>
        <input
          type="date"
          className="input validator"
          required
          placeholder="Selecciona una fecha"
          min="2002-01-01"
          max="2025-05-29"
          title="Fecha de nacimiento de tu mascota"
        />
        <p className="validator-hint hidden">Fechas entre 2002 y 2025</p>

        <label className="label">Peso</label>
        <div className="relative">
          <input
            type="number"
            className="input validator pr-8"
            required
            placeholder="Ingresa el peso en kg de tu mascota"
            min="1"
            max="80"
            title="Entre 1 y 80 kg"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            kg
          </span>
        </div>
        <p className="validator-hint hidden">Numeros entre 2 y 80</p>


        <label className="label">Nivel de actividad de tu mascota</label>
        <div className="w-full max-w-xs">
          <input
            type="range"
            min={0}
            max="100"
            value={activityLevel}
            className="range"
            step="25"
            onChange={(e) => setActivityLevel(e.target.value)}
          />

          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        <label className="label pb-1">Género</label>
        <div className="flex justify-center items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="radio-6"
              className="radio radio-accent"
              defaultChecked
            />
            <span>Hembra</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="radio-6" className="radio radio-accent" />
            <span>Macho</span>
          </label>
        </div>

        <button className="btn" type="submit">
          Submit form
        </button>
      </fieldset>
    </form>
  );
}
export default PetForm;
