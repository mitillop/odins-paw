"use client";
import React, { useState } from "react";
import { useAppSelector } from "../libs/hooks";
import { Cat, Dog, VenusAndMars, HeartPulse, Weight, Zap, CalendarHeart, Squirrel, X } from "lucide-react";
import { usePets } from "../hooks/usePets";
import PetEditForm from "./PetEditForm";
import ModalPortal from "./ModalPortal";

function PetInfo() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { selectLatestPet, pets, deletePet, isDeleting } = usePets();

  if (!pets || pets.length === 0) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 flex flex-col">
        <div className="card-body p-5 flex flex-col items-center justify-center text-center flex-1 mt-39">
          <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <Cat size={30} className="text-base-content/70" />
          </div>
          <h3 className="text-lg font-semibold text-base-content/70 mb-2">
            No tienes mascotas registradas
          </h3>
          <p className="text-base-content/50 text-sm">
            Agrega tu primera mascota para ver su información aquí
          </p>
        </div>
      </div>
    );
  }

  if (!selectedPet) {
    return (
      <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10 flex flex-col">
        <div className="card-body p-5 flex flex-col items-center justify-center text-center flex-1 mt-40">
          <div className="w-17 h-17 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <Dog size={30} className="text-base-content/70" />
          </div>
          <h3 className="text-lg font-semibold text-base-content/70 mb-2">
            Ninguna mascota seleccionada
          </h3>
          <p className="text-base-content/50 text-sm">
            Selecciona una mascota para ver su información detallada
          </p>
        </div>
      </div>
    );
  }

  const handleDeletePet = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    deletePet(selectedPet, {
      onSuccess: () => {
        setIsConfirmModalOpen(false);
      },
      onError: () => {
        setIsConfirmModalOpen(false);
      }
    });
  };

  const handleEditPet = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="card w-96 h-171 shadow-sm bg-white border border-gray-300 relative z-10">
      <figure className="w-full h-60">
        {selectedPet.imageUrl ? (
          <img
            src={selectedPet.imageUrl}
            alt={selectedPet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            {selectedPet.type === "Perro" ? (
              <Dog size={64} className="text-gray-400" />
            ) : (
              <Cat size={64} className="text-gray-400" />
            )}
          </div>
        )}
      </figure>
      <div className="card-body p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 15rem)" }}>
        <div className="flex items-center justify-between mb-3 bg-base-200 p-2 rounded-lg">
          <h2 className="text-xl font-bold">{selectedPet.name}</h2>
          <div className="badge badge-secondary ">
            {selectedPet.type === "Perro" ? (
              <Dog width={16} height={16} />
            ) : (
              <Cat width={16} height={16} />
            )}
            {selectedPet.type}
          </div>
        </div>
        
        <div className="stats stats-vertical shadow w-full mb-3 text-sm">
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <VenusAndMars size={14} className="text-primary" /> Sexo
            </div>
            <div className="stat-value text-base">{selectedPet.sex || "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <CalendarHeart size={14} className="text-primary" /> Edad
            </div>
            <div className="stat-value text-base">{selectedPet.age ? `${selectedPet.age} años` : "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Weight size={14} className="text-primary" /> Peso
            </div>
            <div className="stat-value text-base">{selectedPet.weight ? `${selectedPet.weight} kg` : "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Squirrel size={14} className="text-primary" /> Raza
            </div>
            <div className="stat-value text-base">{selectedPet.breed || "-"}</div>
          </div>
          
          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <Zap size={14} className="text-primary" /> Nivel de Actividad
            </div>
            <div className="stat-value text-base">{selectedPet.activityLevel || "-"}</div>
          </div>

          <div className="stat px-3 py-1">
            <div className="stat-title text-xs flex items-center gap-1">
              <HeartPulse size={14} className="text-primary" /> Condiciones medicas
            </div>
            <div className="stat-value text-base">{selectedPet.medicalConditions || "Sin condiciones registradas"}</div>
          </div>
        
        </div>
        
        <div className="card-actions justify-between">
          <button 
            className="btn btn-error btn-sm"
            onClick={handleDeletePet}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleEditPet}
          >
            Editar información
          </button>
        </div>
      </div>

      {isConfirmModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirmar eliminación</h3>
            <p className="py-4">¿Estás seguro que deseas eliminar a {selectedPet.name}? </p>
            <div className="modal-action">
              <button 
                className="btn btn-outline" 
                onClick={() => setIsConfirmModalOpen(false)}
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </dialog>
      )}

      {isEditModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="absolute inset-0 bg-black/50" onClick={handleCloseEditModal}></div>
            <div className="relative w-full max-w-2xl mx-auto bg-base-100 rounded-lg shadow-xl mt-16 sm:mt-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-xl text-primary">
                    Editar información de {selectedPet.name}
                  </h3>
                  <button
                    onClick={handleCloseEditModal}
                    className="btn btn-sm btn-circle btn-ghost hover:bg-error/10 hover:text-error transition-colors duration-200"
                    aria-label="Cerrar modal"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
                  <PetEditForm
                    pet={selectedPet}
                    onClose={handleCloseEditModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default PetInfo;
