"use server";

import { jsPDF } from "jspdf";

export async function generateDietPDF(dietInfo) {
  try {
    const { pet, diet } = dietInfo;
    
    if (!pet || !diet) {
      return { 
        success: false, 
        message: "Error: Se requiere información de la mascota y la dieta" 
      };
    }

    const doc = new jsPDF();

    const marginLeft = 20;
    const marginRight = 20;
    const pageWidth = 210; 
    const contentWidth = pageWidth - marginLeft - marginRight;
    const rightColumnX = marginLeft + 120; 
    const chartCenterX = pageWidth / 2; 
    
    doc.setProperties({
      title: `Plan de Alimentación - ${pet.name}`,
      author: "Odin Project",
      subject: "Plan de Alimentación para Mascotas",
      keywords: "mascota, alimentación, dieta",
    });

    doc.setFontSize(22);
    doc.setTextColor(33, 33, 33);
    doc.text(`Plan de Alimentación - ${pet.name}`, marginLeft, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(70, 70, 70);
    doc.text(`Mascota: ${pet.name}`, marginLeft, 35);
    doc.text(`Tipo: ${pet.type}`, marginLeft, 42);
    doc.text(`Raza: ${pet.breed || "No especificada"}`, marginLeft, 49);
    doc.text(`Peso: ${pet.weight || "No especificado"} kg`, marginLeft, 56);
    
    const currentDate = new Date();
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generado el: ${currentDate.toLocaleDateString()}`, marginLeft, 65);
    
    doc.setFontSize(16);
    doc.setTextColor(33, 33, 33);
    doc.text(`Dieta: ${diet.name}`, marginLeft, 75);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(marginLeft, 80, pageWidth - marginRight, 80);
    
    const COLORS = ["#FFBB28", "#FF8042", "#8884D8"];
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Porciones diarias:", marginLeft, 90);
    
    doc.setFillColor(COLORS[0]);
    doc.circle(marginLeft + 5, 100, 3, 'F');
    doc.setFontSize(12);
    doc.text("Mañana (7:00 - 8:00 AM):", marginLeft + 10, 100);
    doc.text(`${diet.portion_sizes.data[0].value} gramos`, rightColumnX, 100);
    
    doc.setFillColor(COLORS[1]);
    doc.circle(marginLeft + 5, 110, 3, 'F');
    doc.text("Tarde (1:00 - 2:00 PM):", marginLeft + 10, 110);
    doc.text(`${diet.portion_sizes.data[1].value} gramos`, rightColumnX, 110);
    
    doc.setFillColor(COLORS[2]);
    doc.circle(marginLeft + 5, 120, 3, 'F');
    doc.text("Noche (7:00 - 8:00 PM):", marginLeft + 10, 120);
    doc.text(`${diet.portion_sizes.data[2].value} gramos`, rightColumnX, 120);
    
    const totalPortion = diet.grams;
    const totalCalories = diet.calorie_intake;
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text(`Porción diaria total: ${totalPortion} gramos`, marginLeft, 135);
    doc.text(`Calorías diarias totales: ${totalCalories} kcal`, marginLeft, 145);

    const centerY = 180;
    const radius = 30;
    const total = diet.portion_sizes.data.reduce((sum, entry) => sum + entry.value, 0);
    
    let startAngle = 0;
    diet.portion_sizes.data.forEach((entry, index) => {
      const portionPercentage = entry.value / total;
      const endAngle = startAngle + portionPercentage * Math.PI * 2;
      
      doc.setFillColor(COLORS[index % COLORS.length]);
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      
      doc.setLineWidth(0.1);
      doc.circle(chartCenterX, centerY, radius, 'S');
      
      doc.moveTo(chartCenterX, centerY);
      doc.lineTo(
        chartCenterX + Math.cos(startAngle) * radius,
        centerY + Math.sin(startAngle) * radius
      );
      
      const steps = 40; // Smoothness of the arc
      for (let i = 0; i <= steps; i++) {
        const angle = startAngle + (endAngle - startAngle) * (i / steps);
        const x = chartCenterX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        doc.lineTo(x, y);
      }
      
      doc.lineTo(chartCenterX, centerY);
      doc.fill();
      
      startAngle = endAngle;
    });
    
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    
    const legendX = chartCenterX + 50;
    const legendTextX = legendX + 5;
    
    doc.setFillColor(COLORS[0]);
    doc.circle(legendX, 165, 3, 'F');
    doc.text("Mañana", legendTextX, 168);
    
    doc.setFillColor(COLORS[1]);
    doc.circle(legendX, 175, 3, 'F');
    doc.text("Tarde", legendTextX, 178);
    
    doc.setFillColor(COLORS[2]);
    doc.circle(legendX, 185, 3, 'F');
    doc.text("Noche", legendTextX, 188);
    
    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Descripcion de dieta:", marginLeft, 220);
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    const descriptionDiet = diet.description || "No hay descripción de dieta especificada";

    const splitDescriptionDiet = doc.splitTextToSize(descriptionDiet, contentWidth);
    doc.text(splitDescriptionDiet, marginLeft, 230);

    doc.setFontSize(14);
    doc.setTextColor(33, 33, 33);
    doc.text("Alimentos recomendados:", marginLeft, 255);

    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    const recommendedFoods = diet.recommended_foods || "No hay alimentos recomendados especificados";
    
    const splitRecommendedFoods = doc.splitTextToSize(recommendedFoods, contentWidth);
    doc.text(splitRecommendedFoods, marginLeft, 265);

    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("© Odin Project - Plan de Alimentación para Mascotas", marginLeft, 285);
    
    const petName = pet.name.replace(/\s+/g, '_').toLowerCase();
    const dietName = diet.name.replace(/\s+/g, '_').toLowerCase();
    const fileName = `plan_alimentacion_${petName}_${dietName}.pdf`;
    
    const pdfDataUri = doc.output('datauristring');
    
    return { 
      success: true, 
      message: "PDF generado correctamente", 
      pdfDataUri,
      fileName 
    };
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    return { 
      success: false, 
      message: `Error al generar el PDF: ${error.message}` 
    };
  }
}
