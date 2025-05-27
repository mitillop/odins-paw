"use client";
import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../libs/hooks";
import { usePets } from "../hooks/usePets";
import { CirclePlus, Cat, Dog, Settings, X } from "lucide-react";
import PetForm from "./PetForm";

function PetManagement() {
  const selectedPet = useAppSelector((state) => state.pet.selectedPet);
  const { pets, isLoading, handleSelectPet, createNewPet, isCreating } = usePets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoizar el ID de la mascota seleccionada para comparaciones más eficientes
  const selectedPetId = useMemo(() => selectedPet?.id, [selectedPet]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreatePet = (petData) => {
    createNewPet(petData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="card w-96 h-171 bg-white shadow-md">
        <div className="card-body p-4">
          <div className="flex items-center justify-center bg-base-200 p-2 rounded-lg mb-4">
            <h2 className="text-xl font-bold">Mis Mascotas</h2>
          </div>
          <div className="space-y-3">
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card w-96 h-171 bg-white shadow-md">
        <div className="card-body p-4 overflow-y-auto" style={{ maxHeight: "100%" }}>
          <div className="flex items-center justify-center bg-base-200 p-2 rounded-lg mb-4">
            <h2 className="text-xl font-bold mr-2">Mis Mascotas</h2>
            <Settings className="text-primary" size={20} />
          </div>

          <button
            onClick={openModal}
            className="w-full btn btn-primary mb-4 hover:bg-primary-focus transition-all duration-200"
            disabled={isCreating}
          >
            <CirclePlus size={18} />
            <span>{isCreating ? "Creando..." : "Agregar Nueva Mascota"}</span>
          </button>

          {pets && pets.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-base-content/70 mb-2">
                Mascotas registradas ({pets.length})
              </h3>
              <ul className="space-y-2">
                {pets.map((pet) => (
                  <li
                    key={pet.id}
                    className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedPetId === pet.id
                        ? "bg-primary/10 border-primary/30 shadow-sm"
                        : "bg-base-100 border-base-300 hover:bg-base-50"
                    }`}
                    onClick={() => handleSelectPet(pet)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {pet.type === "Perro" ? (
                          <Dog 
                            size={32} 
                            className={selectedPetId === pet.id ? "text-primary" : "text-base-content/70"} 
                          />
                        ) : (
                          <Cat 
                            size={32} 
                            className={selectedPetId === pet.id ? "text-primary" : "text-base-content/70"} 
                          />
                        )}
                        <div className="flex flex-col">
                          <span 
                            className={`font-medium ${
                              selectedPetId === pet.id ? "text-primary" : "text-base-content"
                            }`}
                          >
                            {pet.name}
                          </span>
                          <span className="text-xs text-base-content/60">
                            {pet.breed || "Sin raza especificada"}
                          </span>
                        </div>
                      </div>
                      {selectedPetId === pet.id && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary font-medium">Seleccionada</span>
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CirclePlus size={32} className="text-base-content/70" />
                </div>
                <h3 className="font-medium text-base-content/70 mb-2">
                  No tienes mascotas registradas
                </h3>
                <p className="text-sm text-base-content/50">
                  Agrega tu primera mascota para comenzar a usar todas las funciones
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <dialog
          className="modal modal-open modal-bottom sm:modal-middle"
          onClick={(e) => {
            if (e.target.classList.contains("modal")) {
              closeModal();
            }
          }}
        >
          <div className="modal-box relative max-w-2xl mx-auto bg-base-100">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-base-100 pt-2 z-10">
              <h3 className="font-bold text-xl text-primary">
                Registrar Nueva Mascota
              </h3>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost hover:bg-error/10 hover:text-error transition-colors duration-200"
                disabled={isCreating}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[80vh] pb-4">
              <PetForm
                onClose={closeModal}
                onSubmit={handleCreatePet}
                isSubmitting={isCreating}
              />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default PetManagement; 