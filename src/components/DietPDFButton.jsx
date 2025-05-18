"use client";

import React, { useState } from "react";
import { generateDietPDF } from "../app/actions/files/generateDietPDF";
import { Download } from "lucide-react";


export default function DietPDFButton({ dietInfo, buttonText = "Descargar PDF", className = "btn btn-primary btn-sm" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    if (!dietInfo || !dietInfo.pet || !dietInfo.diet) {
      setError("Se requiere información de la mascota y la dieta");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await generateDietPDF(dietInfo);
      
      if (result.success) {
        // Crear un enlace invisible para descargar el PDF
        const link = document.createElement("a");
        link.href = result.pdfDataUri;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error al descargar el PDF:", err);
      setError("Ocurrió un error al generar el PDF");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className={className}
        title={error ? error : "Descargar PDF"}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          typeof buttonText === 'string' ? buttonText : buttonText
        )}
      </button>
      
      {error && console.error("Error al generar PDF:", error)}
    </>
  );
}
