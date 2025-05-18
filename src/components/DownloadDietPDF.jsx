"use client";

import React, { useState } from "react";
import { createDietPDF } from "../app/actions/files/createDietPDF";

/**
 * Component that provides a button to download a pet's diet as a PDF
 */
export default function DownloadDietPDF({ petId, dietId, buttonText = "Descargar PDF" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    if (!petId || !dietId) {
      setError("Se requiere el ID de la mascota y de la dieta");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await createDietPDF(petId, dietId);
      
      if (result.success) {
        // Create an invisible anchor element to trigger the download
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
    <div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner"></span>
            Generando...
          </>
        ) : (
          buttonText
        )}
      </button>
      
      {error && (
        <div className="text-error text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
}
